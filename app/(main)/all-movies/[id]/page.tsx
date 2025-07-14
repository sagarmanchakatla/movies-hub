// app/all-movies/[id]/page.tsx

import { notFound } from "next/navigation";
import { fetchMovieDetails } from "@/lib/api";
import { MovieDetailClient } from "@/components/MovieDetailClient";

interface MoviePageProps {
  params: {
    id: string;
  };
}

export default async function MovieDetailPage({ params }: MoviePageProps) {
  const { id } = params;
  const movieId = Number(id);
  if (isNaN(movieId)) return notFound();

  const movie = await fetchMovieDetails(movieId);
  if (!movie) return notFound();

  return <MovieDetailClient movie={movie} />;
}
