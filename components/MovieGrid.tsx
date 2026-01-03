//Container to manage the movie cards.
"use client";

import type { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean; //Yes or No
}

export default function MovieGrid({
  movies,
  isLoading = false,
}: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-2xl font-bold text-white mb-2">No results for this category</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

// Loader for loading state
function MovieCardSkeleton() {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-[2/3] bg-zinc-800" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-zinc-800 rounded w-3/4" />
        <div className="h-4 bg-zinc-800 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-zinc-800 rounded" />
          <div className="h-3 bg-zinc-800 rounded" />
          <div className="h-3 bg-zinc-800 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}
