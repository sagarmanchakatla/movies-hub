"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  CalendarDays,
  Clock,
  Heart,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count?: number;
  runtime?: number;
  genres?: Array<{ id: number; name: string }>;
  production_countries?: Array<{ name: string }>;
  tagline?: string;
}

interface MovieDetailClientProps {
  movie: Movie;
}

export function MovieDetailClient({ movie }: MovieDetailClientProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingFavorite, setCheckingFavorite] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if movie is already favorited
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCheckingFavorite(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/favorite/check?movieId=${movie.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsFavorite(data.isFavorite);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      } finally {
        setCheckingFavorite(false);
      }
    };

    checkFavoriteStatus();
  }, [movie.id]);

  useEffect(() => {
    // Save current movie to recentMovies in localStorage
    const existing = localStorage.getItem("recentMovies");
    let recent: Movie[] = existing ? JSON.parse(existing) : [];

    // Avoid duplicates
    recent = recent.filter((m) => m.id !== movie.id);
    recent.unshift({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview,
    });

    // Limit to 10
    if (recent.length > 10) recent = recent.slice(0, 10);

    localStorage.setItem("recentMovies", JSON.stringify(recent));
  }, [movie]);

  const handleToggleFavorite = async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(
        isFavorite ? `/api/favorite?movieId=${movie.id}` : "/api/favorite",
        {
          method: isFavorite ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: isFavorite
            ? undefined
            : JSON.stringify({
                movieId: movie.id,
                title: movie.title,
                posterPath: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : null,
                overview: movie.overview,
              }),
        }
      );

      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        setError("Failed to update favorites. Please try again.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-movie.jpg";

  return (
    <div className="min-h-screen">
      {/* Backdrop Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        {backdropUrl && (
          <Image
            src={backdropUrl || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        )}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

        {/* Header with Back Button - Fixed at top */}
        <div className="absolute top-0 left-0 right-0 z-10 p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => router.push("/all-movies")}
              className="gap-2 border-white/30 text-white hover:bg-white/10 bg-black/20 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Movies
            </Button>

            <div className="flex items-center gap-2">
              <Button
                onClick={handleToggleFavorite}
                disabled={isLoading || checkingFavorite}
                variant={isFavorite ? "default" : "outline"}
                className={`gap-2 backdrop-blur-sm ${
                  isFavorite
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "border-white/30 text-white hover:bg-white/10 bg-black/20"
                }`}
              >
                <Heart
                  className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
                />
                {checkingFavorite
                  ? "Checking..."
                  : isLoading
                  ? "Loading..."
                  : isFavorite
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="gap-2 border-white/30 text-white hover:bg-white/10 bg-black/20 backdrop-blur-sm"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Error Alert - Fixed at top below header */}
        {error && (
          <div className="absolute top-20 left-0 right-0 z-10 p-6">
            <div className="max-w-7xl mx-auto">
              <Alert
                variant="destructive"
                className="bg-red-500/20 border-red-500/30 backdrop-blur-sm"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-white">Error</AlertTitle>
                <AlertDescription className="text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )}

        {/* Centered Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
            >
              {/* Poster */}
              <div className="relative aspect-[2/3] w-full max-w-sm mx-auto md:mx-0">
                <Image
                  src={posterUrl || "/placeholder.svg"}
                  alt={movie.title}
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Movie Info */}
              <div className="md:col-span-2 text-white">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-3xl md:text-6xl font-bold mb-4">
                      {movie.title}
                    </h1>
                    {movie.tagline && (
                      <p className="text-m text-yellow-400 italic mb-4">
                        "{movie.tagline}"
                      </p>
                    )}
                  </div>

                  {movie.overview && (
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <p className="text-gray-200 leading-relaxed text-m">
                        {movie.overview}
                      </p>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold">
                        <span className="text-sm font-semibold">
                          {Number.isFinite(movie.vote_average)
                            ? movie.vote_average.toFixed(1)
                            : "N/A"}
                        </span>
                      </span>
                      {movie.vote_count && (
                        <span className="text-xs text-gray-400">
                          ({movie.vote_count.toLocaleString()})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                      <CalendarDays className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">
                        {movie.release_date
                          ? new Date(movie.release_date).getFullYear()
                          : "N/A"}
                      </span>
                    </div>

                    {movie.runtime && (
                      <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                        <Clock className="h-4 w-4 text-green-400" />
                        <span className="text-sm">
                          {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}
                          m
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Genres */}
                  {movie.genres && movie.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <Badge
                          key={genre.id}
                          variant="secondary"
                          className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
                        >
                          {genre.name}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Production Countries */}
                  {movie.production_countries &&
                    movie.production_countries.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-300 mb-2">
                          Production Countries
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {movie.production_countries.map((country, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="border-white/30 text-white bg-black/20 backdrop-blur-sm"
                            >
                              {country.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
