import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { FavoritesClient } from "@/components/FavoritesClient";

export default async function FavoritesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded !== "object" || !("id" in decoded)) {
      redirect("/login");
    }
    userId = decoded.id;
  } catch {
    redirect("/login");
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    orderBy: { id: "desc" },
  });

  return <FavoritesClient favorites={favorites} />;
}
