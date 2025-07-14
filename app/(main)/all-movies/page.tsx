"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "@/components/MovieCard";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fetchPopularMovies, searchMovies } from "@/lib/api";
import { Input } from "@/components/ui/input";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  // [key: string]: any; // optional, allows flexibility
}

export default function AllMoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [totalPages, setTotalPages] = useState(500);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setIsSearching(false);
    try {
      const result = await fetchPopularMovies(currentPage);
      setMovies(result.results || []);
      setTotalPages(Math.min(result.total_pages || 500, 500)); // API limit
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  }, [currentPage]);

  const performSearch = useCallback(async (searchQuery: string, page = 1) => {
    setLoading(true);
    setIsSearching(true);
    try {
      const result = await searchMovies(searchQuery, page);
      if (result && result.results.length > 0) {
        setMovies(result.results || []);
        setTotalPages(Math.min(result.total_pages || 1, 500)); // API limit
        setError(null);
      } else {
        setMovies([]);
        setTotalPages(1);
        setError(new Error("No matching movies found."));
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
      setMovies([]);
      setTotalPages(1);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    if (!token || !email) {
      router.push("/login");
      return;
    }

    fetchData();
  }, [currentPage, router, fetchData]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(1);
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      if (startPage > 2) pageNumbers.push("ellipsis1");
      for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
      if (endPage < totalPages - 1) pageNumbers.push("ellipsis2");
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      clearSearch();
      return;
    }
    setCurrentPage(1);
    await performSearch(searchTerm.trim(), 1);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
    setIsSearching(false);
    fetchData();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      handleSearch();
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 py-8 space-y-8"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              {isSearching
                ? `Search Results for "${searchTerm}"`
                : "Popular Movies"}
            </h1>
            <p className="text-muted-foreground">
              {loading ? (
                "Loading movies..."
              ) : (
                <>
                  Page {currentPage} of {totalPages} • {movies.length} movies
                </>
              )}
            </p>
          </div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 w-full lg:w-auto"
          >
            <div className="relative flex-1 lg:w-80">
              <Input
                placeholder="Search movies by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-200"
                disabled={loading}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <Button
              onClick={handleSearch}
              disabled={loading}
              className="gap-2 min-w-[100px] bg-primary hover:bg-primary/90 transition-all duration-200"
            >
              <Search className="h-4 w-4" />
              Search
            </Button>

            {isSearching && (
              <Button
                variant="outline"
                onClick={clearSearch}
                disabled={loading}
                className="gap-2 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-muted/50 transition-all duration-200"
              >
                Clear
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={
                isSearching
                  ? () => performSearch(searchTerm.trim(), currentPage)
                  : fetchData
              }
              disabled={loading}
              className="gap-2 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-muted/50 transition-all duration-200"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Error Alert */}
      <AnimatePresence>
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="flex items-center justify-between">
                <span>{error.message || "Something went wrong."}</span>
                <Button
                  onClick={
                    isSearching
                      ? () => performSearch(searchTerm.trim(), currentPage)
                      : fetchData
                  }
                  variant="outline"
                  size="sm"
                  className="ml-4"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Section */}
      <div className="flex-1">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <MovieCardSkeleton />
              </motion.div>
            ))}
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex items-center justify-center py-16"
          >
            <div className="text-center max-w-md">
              <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {isSearching ? "No movies found" : "Something went wrong"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {isSearching
                  ? `No movies found matching "${searchTerm}". Try a different search term.`
                  : "We couldn't load the movies. Please try again."}
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={
                    isSearching
                      ? () => performSearch(searchTerm.trim(), currentPage)
                      : fetchData
                  }
                  variant="outline"
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                {isSearching && (
                  <Button onClick={clearSearch} variant="default">
                    Browse Popular Movies
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Movies Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
            >
              <AnimatePresence>
                {movies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                    }}
                    layout
                  >
                    <MovieCard movie={movie} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {movies.length > 0 && totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex justify-center pt-8"
              >
                <div className="bg-background/50 backdrop-blur-sm rounded-lg border border-border/50 p-2">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            currentPage > 1 && handlePageChange(currentPage - 1)
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer hover:bg-muted/50 transition-colors duration-200"
                          }
                        />
                      </PaginationItem>

                      {getPageNumbers().map((pageNumber, index) => (
                        <PaginationItem key={index}>
                          {pageNumber === "ellipsis1" ||
                          pageNumber === "ellipsis2" ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              isActive={pageNumber === currentPage}
                              onClick={() =>
                                handlePageChange(Number(pageNumber))
                              }
                              className="cursor-pointer hover:bg-muted/50 transition-colors duration-200 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                            >
                              {pageNumber}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            currentPage < totalPages &&
                            handlePageChange(currentPage + 1)
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer hover:bg-muted/50 transition-colors duration-200"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.main>
  );
}
