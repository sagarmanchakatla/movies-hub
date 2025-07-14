// app/api/favorite/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded !== "object" || decoded === null || !("id" in decoded)) {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 }
      );
    }
    const userId = (decoded as { id: number }).id;

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      select: {
        id: true,
        movieId: true,
        title: true,
        posterPath: true,
        overview: true,
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("GET /api/favorite error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Check if token looks valid (basic format check)
    if (!token.includes(".") || token.split(".").length !== 3) {
      return NextResponse.json(
        { error: "Invalid token format" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (jwtError) {
      return NextResponse.json(
        { error: `Invalid token ${jwtError}` },
        { status: 401 }
      );
    }

    if (typeof decoded !== "object" || !("id" in decoded)) {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 }
      );
    }

    const userId = (decoded as { id: number }).id;
    const body = await req.json();
    const { movieId, title, posterPath, overview } = body;

    if (!movieId || !title) {
      return NextResponse.json(
        { error: "Missing movieId or title" },
        { status: 400 }
      );
    }

    // Check if already favorited
    const existing = await prisma.favorite.findFirst({
      where: { userId, movieId },
    });
    if (existing) {
      return NextResponse.json(
        { message: "Already favorited" },
        { status: 200 }
      );
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        movieId,
        title,
        posterPath: posterPath || null,
        overview: overview || null,
      },
    });

    return NextResponse.json({ message: "Favorite added", favorite });
  } catch (error) {
    console.error("/api/favorite error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (jwtError) {
      return NextResponse.json(
        { error: `Invalid token ${jwtError}` },
        { status: 401 }
      );
    }

    if (typeof decoded !== "object" || !("id" in decoded)) {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 }
      );
    }

    const userId = (decoded as { id: number }).id;
    const { searchParams } = new URL(req.url);
    const movieId = searchParams.get("movieId");

    if (!movieId) {
      return NextResponse.json(
        { error: "Missing movieId parameter" },
        { status: 400 }
      );
    }

    await prisma.favorite.deleteMany({
      where: {
        userId,
        movieId: Number.parseInt(movieId),
      },
    });

    return NextResponse.json({ message: "Favorite removed" });
  } catch (error) {
    console.error("/api/favorite DELETE error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
