"use client";

import { useState } from "react";
import { useMovies, useDebounce } from "@/hooks/theMovies";
import SearchBar from "@/components/SearchBar";
import GenreFilter from "@/components/GenreFilter";
import MovieGrid from "@/components/MovieGrid";
import Pagination from "@/components/Pagination";
import ResultsCount from "@/components/ResultsCount";

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>();

  // Search for extensive api calls
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Fetch movies and filters
  const { movies, pagination, isLoading, error } = useMovies({
    page,
    limit: 20,
    search: debouncedSearch,
    genre: selectedGenre,
  });

  // Reset to page 1 if the filter change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleGenreChange = (genre: string | undefined) => {
    setSelectedGenre(genre);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-6">
            {/* Logo/Title */}
            <div className="text-center">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Showcase Home Movies
              </h1>
              <p className="text-zinc-500 text-sm mt-2">
                Movies and chill
              </p>
            </div>

            {/* Search & Filter Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-4xl">
              <div className="flex-1 w-full">
                <SearchBar
                  onSearch={handleSearchChange}
                  placeholder="Search..."
                  initialValue={searchQuery}
                />
                <br></br>
              </div>
              <GenreFilter
                selectedGenre={selectedGenre}
                onGenreChange={handleGenreChange}
              />
              <br></br>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 container-main">
        {/* Results Count */}
        {pagination && !isLoading && (
          <div className="mb-8">
            <ResultsCount
              total={pagination.total}
              searchQuery={debouncedSearch}
              genre={selectedGenre}
            />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-zinc-400 max-w-md mb-6">
              {error.message ||
                "Failed to load movies. Please try again later."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-amber-500 text-black font-semibold rounded-full hover:bg-amber-400 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        )}

        {/* Movie Grid */}
        {!error && (
          <>
            <MovieGrid movies={movies} isLoading={isLoading} />

            {/* Pagination */}
            {!isLoading && pagination && (
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
          <p className="mt-2">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
