// app/(main)/all-movies/[id]/page.tsx

import { notFound } from "next/navigation";
import { fetchMovieDetails } from "@/lib/api";
import { MovieDetailClient } from "@/components/MovieDetailClient";

// ✅ Next.js expects this signature for dynamic routes
export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const movieId = Number(params.id);
  if (isNaN(movieId)) return notFound();

  const movie = await fetchMovieDetails(movieId);
  if (!movie) return notFound();

  return <MovieDetailClient movie={movie} />;
}
