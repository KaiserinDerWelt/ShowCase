//This is the file for my react hooks
// Custom React Hook for Movies API
"use client";

import { useState, useEffect, useCallback } from "react";
import { getMovies, getMovieById } from "@/services/movieApi";
import type { Movie, MoviesResponse, ApiError } from "@/types/movie";

interface UseMoviesOptions {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
  enabled?: boolean; // Control when to fetch
}

interface UseMoviesReturn {
  movies: Movie[];
  pagination: MoviesResponse["pagination"] | null;
  isLoading: boolean;
  error: ApiError | null;
  refetch: () => void;
}

//Custom hook for fetching movies

export function useMovies({
  page = 1,
  limit = 25, //Pagination limit of 25
  search,
  genre,
  enabled = true,
}: UseMoviesOptions = {}): UseMoviesReturn {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pagination, setPagination] = useState<
    MoviesResponse["pagination"] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchMovies = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await getMovies(page, limit, search, genre);
      setMovies(response.data);
      setPagination(response.pagination);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      console.error("Error fetching movies:", err);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, genre, enabled]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return {
    movies,
    pagination,
    isLoading,
    error,
    refetch: fetchMovies,
  };
}

interface UseMovieReturn {
  movie: Movie | null;
  isLoading: boolean;
  error: ApiError | null;
  refetch: () => void;
}

//Custom hook for fetching a movie by ID
export function useMovie(id: string | null): UseMovieReturn {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchMovie = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await getMovieById(id);
      setMovie(response);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      console.error("Error fetching movie:", err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  return {
    movie,
    isLoading,
    error,
    refetch: fetchMovie,
  };
}

//Hook for a search
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
