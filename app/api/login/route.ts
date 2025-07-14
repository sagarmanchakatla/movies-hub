import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  console.log("Logging in user");
  try {
    // Parse the request body
    const { email, password, rememberMe } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Check if the user exists and the password is correct
    if (user && bcrypt.compareSync(password, user.password)) {
      // Create JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: rememberMe ? "30d" : "1h",
      });

      // Create response object
      const response = NextResponse.json({
        token,
        message: "Login successful",
        email: user.email,
      });

      // Set secure cookie
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60, // 30d or 1h
      });

      return response;
    } else {
      // Return an error if credentials are invalid
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: "Error logging in" }, { status: 500 });
  }
}
