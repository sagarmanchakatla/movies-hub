// app/(main)/all-movies/[id]/page.tsx

import { notFound } from "next/navigation";
import { fetchMovieDetails } from "@/lib/api";
import { MovieDetailClient } from "@/components/MovieDetailClient";

// ✅ Updated for Next.js 15+ - params is now a Promise
export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params Promise
  const { id } = await params;

  const movieId = Number(id);
  if (isNaN(movieId)) return notFound();

  const movie = await fetchMovieDetails(movieId);
  if (!movie) return notFound();

  return <MovieDetailClient movie={movie} />;
}
