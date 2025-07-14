"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, Eye, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    release_date: string;
    overview?: string;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const method = isFavorite ? "DELETE" : "POST";
      const response = await fetch(`/api/favorite?movieId=${movie.id}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body:
          method === "POST"
            ? JSON.stringify({
                movieId: movie.id,
                title: movie.title,
                posterPath: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : null,
                overview: movie.overview,
              })
            : undefined,
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Link href={`/all-movies/${movie.id}`} className="group block">
        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/20 bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-0 relative aspect-[2/3] overflow-hidden">
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/placeholder.svg?height=750&width=500"
              }
              alt={movie.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex flex-col gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Button
                  size="sm"
                  variant="secondary"
                  className="gap-2 bg-white/90 hover:bg-white text-black font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    // Link will handle navigation
                  }}
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>

                <Button
                  size="sm"
                  variant={isFavorite ? "destructive" : "default"}
                  onClick={handleToggleFavorite}
                  disabled={loading}
                  className={`gap-2 font-medium ${
                    isFavorite
                      ? "bg-red-500/90 hover:bg-red-600/90 text-white"
                      : "bg-primary/90 hover:bg-primary text-primary-foreground"
                  }`}
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Heart
                      className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
                    />
                  )}
                  {isFavorite ? "Remove" : "Add to Favorites"}
                </Button>
              </div>
            </div>
          </CardContent>

          <CardHeader className="space-y-1">
            <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors duration-200">
              {movie.title}
            </CardTitle>
            {movie.overview && (
              <CardDescription className="line-clamp-2">
                {movie.overview}
              </CardDescription>
            )}
          </CardHeader>

          <CardFooter className="flex justify-between items-center px-4 pb-4">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {movie.release_date.split("-")[0]}
            </span>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
