// Movie API Service
import type {
  Movie,
  MoviesResponse,
  GenresMoviesResponse,
  MovieTitlesResponse,
  GenreStats,
  AuthTokenResponse,
  ApiError,
} from '@/types/movie';

const BASE_URL = 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com';

// Token management
let authToken: string | null = null;

/**
 * Fetches a bearer token from the API
 * This token is required for all subsequent API calls
 */
export async function getAuthToken(): Promise<string> {
  // Return cached token if available
  if (authToken) {
    return authToken;
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/token`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch auth token: ${response.statusText}`);
    }

    const data: AuthTokenResponse = await response.json();
    authToken = data.token;
    
    return authToken;
  } catch (error) {
    console.error('Error fetching auth token:', error);
    throw error;
  }
}

/**
 * Generic fetch wrapper with auth token
 */
async function fetchWithAuth(endpoint: string): Promise<Response> {
  const token = await getAuthToken();
  
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error: ApiError = {
      message: ` ${response.statusText}`,
      status: response.status,
    };
    throw error;
  }

  return response;
}

/**
 * Fetches a paginated list of movies
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 25)
 * @param search - Search query for movie titles
 * @param genre - Filter by exact genre match
 */
export async function getMovies(
  page: number = 1,
  limit: number = 25,
  search?: string,
  genre?: string
): Promise<MoviesResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) {
    params.append('search', search);
  }

  if (genre) {
    params.append('genre', genre);
  }

  try {
    const response = await fetchWithAuth(`/movies?${params.toString()}`);
    const rawData = await response.json();
    
    console.log('Raw API Response:', rawData);
    
    // Transform API response to our expected format
    const total = rawData.totalPages * limit; // Estimate total from totalPages
    
    const data: MoviesResponse = {
      data: rawData.data,
      totalPages: rawData.totalPages,
      pagination: {
        page: page,
        limit: limit,
        total: total,
        totalPages: rawData.totalPages,
      }
    };
    
    console.log('Transformed Response:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

/**
 * Fetches details of a specific movie by ID
 * @param id - Movie ID
 */
export async function getMovieById(id: string): Promise<Movie> {
  try {
    const response = await fetchWithAuth(`/movies/${id}`);
    const data: Movie = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching movie ${id}:`, error);
    throw error;
  }
}

/**
 * Fetches a list of all movie IDs and titles
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 25)
 */
export async function getMovieTitles(
  page: number = 1,
  limit: number = 25
): Promise<MovieTitlesResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  try {
    const response = await fetchWithAuth(`/movies/titles?${params.toString()}`);
    const data: MovieTitlesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie titles:', error);
    throw error;
  }
}

/**
 * Fetches all movie IDs grouped by genre
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 25)
 */
export async function getGenresMovies(
  page: number = 1,
  limit: number = 25
): Promise<GenresMoviesResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  try {
    const response = await fetchWithAuth(`/genres/movies?${params.toString()}`);
    const data: GenresMoviesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
}

/**
 * Fetches statistics for a specific genre
 * @param id - Genre ID
 */
export async function getGenreStats(id: number): Promise<GenreStats> {
  try {
    const response = await fetchWithAuth(`/movies/genres/${id}`);
    const data: GenreStats = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching genre ${id} stats:`, error);
    throw error;
  }
}

/**
 * Health check endpoint
 */
export async function healthCheck(): Promise<{ status: string }> {
  try {
    const response = await fetch(`${BASE_URL}/healthcheck`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
}

/**
 * Helper function to extract unique genres from movies
 */
export function extractGenres(movies: Movie[]): string[] {
  const genreSet = new Set<string>();

  movies.forEach(movie => {
    // Handle genres array (if present)
    if (movie.genres && Array.isArray(movie.genres)) {
      movie.genres.forEach(genre => {
        // Handle both string and GenreObject formats
        if (typeof genre === 'string') {
          genreSet.add(genre);
        } else if (genre && typeof genre === 'object' && 'title' in genre) {
          genreSet.add(genre.title);
        }
      });
    }

    // Handle genre_ids array (legacy format)
    if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
      movie.genre_ids.forEach(genreId => {
        const genreName = getGenreName(genreId);
        if (genreName !== 'Unknown') {
          genreSet.add(genreName);
        }
      });
    }
  });

  return Array.from(genreSet).sort();
}

/**
 * Genre ID to Name mapping
 * You might want to fetch this from the API or maintain it separately
 */
export const GENRE_MAP: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

/**
 * Get genre name from ID
 */
export function getGenreName(genreId: number): string {
  return GENRE_MAP[genreId] || 'Unknown';
}

/**
 * Get all available genres
 */
export function getAllGenres(): Array<{ id: number; name: string }> {
  return Object.entries(GENRE_MAP).map(([id, name]) => ({
    id: parseInt(id),
    name,
  }));
}