"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Film, Heart, AlertCircle } from "lucide-react";

interface Favorite {
  id: number;
  movieId: number;
  title: string;
  posterPath: string | null;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("");
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [recent, setRecent] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserEmail = localStorage.getItem("userEmail");

    if (!token) {
      router.push("/login");
      return;
    }

    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    } else {
      // Fallback if userEmail is not in localStorage, though it should be set on login
      setError("User email not found. Please log in again.");
      router.push("/login");
      return;
    }

    // Fetch favorites
    fetch("/api/favorite", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            router.push("/login");
          }
          throw new Error("Failed to fetch favorites.");
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setFavorites(data);
        } else {
          setError("Failed to load favorites data.");
        }
      })
      .catch((err) => {
        console.error("Error fetching favorites:", err);
        setError(err.message || "Failed to load favorites.");
      });

    // Load recent movies from localStorage
    const recentData = localStorage.getItem("recentMovies");
    if (recentData) {
      try {
        setRecent(JSON.parse(recentData));
      } catch (parseError) {
        console.error(
          "Error parsing recent movies from localStorage:",
          parseError
        );
        setError("Failed to load recently viewed movies.");
      }
    }
  }, [router]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Profile Header Card */}
      <Card className="p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg rounded-lg">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary-foreground shadow-md">
          <AvatarFallback className="text-4xl md:text-6xl font-bold text-primary-foreground bg-primary">
            {userEmail ? (
              userEmail.charAt(0).toUpperCase()
            ) : (
              <User className="h-12 w-12" />
            )}
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            Welcome, {userEmail.split("@")[0] || "User"}!
          </h1>
          <p className="text-lg text-muted-foreground mb-3">
            Your personalized movie hub.
          </p>
          <Badge variant="secondary" className="px-4 py-2 text-base">
            <User className="mr-2 h-4 w-4" />
            {userEmail}
          </Badge>
        </div>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Recently Viewed Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" /> Recently Viewed
          </h2>
        </div>
        {recent.length === 0 ? (
          <p className="text-muted-foreground">
            No recently viewed movies. Start exploring!
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recent.slice(0, 5).map((movie) => (
              <Link key={movie.id} href={`/all-movies/${movie.id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                  <div className="relative aspect-[2/3] w-full">
                    <Image
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/placeholder-movie.jpg"
                      }
                      alt={movie.title}
                      fill
                      className="object-cover rounded-t-lg"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  </div>
                  <CardContent className="p-3">
                    <CardTitle className="text-sm font-medium line-clamp-2">
                      {movie.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      ⭐ {movie.vote_average.toFixed(1)} |{" "}
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Favorites Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Heart className="h-6 w-6 text-destructive" /> Your Favorites
          </h2>
        </div>
        {favorites.length === 0 ? (
          <p className="text-muted-foreground">
            You haven’t added any favorites yet. Start building your collection!
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favorites.slice(0, 5).map((fav) => (
              <Link key={fav.movieId} href={`/all-movies/${fav.movieId}`}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                  <div className="relative aspect-[2/3] w-full">
                    <Image
                      src={fav.posterPath || "/placeholder-movie.jpg"}
                      alt={fav.title}
                      fill
                      className="object-cover rounded-t-lg"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                  </div>
                  <CardContent className="p-3">
                    <CardTitle className="text-sm font-medium line-clamp-2">
                      {fav.title}
                    </CardTitle>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
