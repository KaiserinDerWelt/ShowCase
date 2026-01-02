// Movie API Types

export interface Movie {
  id: string;
  title: string;
  overview?: string;
  posterUrl?: string;
  rating?: string;
  releaseDate?: string;
  runtime?: number;
  genres?: string[];
  // Legacy fields for backward compatibility
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  genre_ids?: number[];
  original_language?: string;
  adult?: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreStats {
  id: number;
  name: string;
  movieCount: number;
  averageRating: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface MoviesResponse {
  data: Movie[];
  totalPages: number;
  // Computed pagination info
  pagination?: PaginationInfo;
}

export interface GenresMoviesResponse {
  data: Record<string, string[]>; // genre name -> array of movie IDs
  pagination: PaginationInfo;
}

export interface MovieTitlesResponse {
  data: Array<{
    id: string;
    title: string;
  }>;
  pagination: PaginationInfo;
}

export interface AuthTokenResponse {
  token: string;
  expiresIn?: number;
}

export interface ApiError {
  message: string;
  status: number;
}