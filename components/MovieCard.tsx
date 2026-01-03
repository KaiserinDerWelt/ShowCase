"use client";

import Image from "next/image";
import { useState } from "react";
import type { Movie } from "@/types/movie";
import { getGenreName, getMovieById } from "@/services/movieApi";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

// Parse ISO 8601 duration (e.g., "PT42M", "PT2H30M") to { hours, minutes }
function parseDuration(duration: string | undefined): { hours: number; minutes: number } | null {
  if (!duration) return null;
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return null;
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  if (hours === 0 && minutes === 0) return null;
  return { hours, minutes };
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);
  const [fullDetails, setFullDetails] = useState<Movie | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [detailsFetched, setDetailsFetched] = useState(false);

  // Fetch details on hover (lazy loading)
  const handleMouseEnter = async () => {
    if (detailsFetched) return; // Already fetched

    setLoadingDetails(true);
    setDetailsFetched(true);

    try {
      const details = await getMovieById(movie.id);
      setFullDetails(details);
      console.log(`Loaded details for: ${movie.title}`, details);
    } catch (error) {
      console.error(`Failed to load details for ${movie.title}:`, error);
      setFullDetails(movie);
    } finally {
      setLoadingDetails(false);
    }
  };

  const displayMovie = fullDetails || movie;

  const imageUrl =
    displayMovie.posterUrl ||
    (displayMovie.poster_path
      ? `https://image.tmdb.org/t/p/w500${displayMovie.poster_path}`
      : null);

  const year = displayMovie.releaseDate
    ? new Date(displayMovie.releaseDate).getFullYear()
    : displayMovie.datePublished
    ? new Date(displayMovie.datePublished).getFullYear()
    : displayMovie.release_date
    ? new Date(displayMovie.release_date).getFullYear()
    : null;

  const rating =
    displayMovie.rating ||
    (displayMovie.ratingValue ? displayMovie.ratingValue.toFixed(1) : null) ||
    (displayMovie.vote_average ? displayMovie.vote_average.toFixed(1) : null);

  // FIX: Handle genres properly - extract names from objects or use strings directly
  const genres = (() => {
    if (displayMovie.genres && Array.isArray(displayMovie.genres)) {
      // Check if first element is an object with 'title' or 'name' property
      if (
        displayMovie.genres.length > 0 &&
        typeof displayMovie.genres[0] === "object" &&
        displayMovie.genres[0] !== null
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - Extract title/name from genre objects (API returns 'title')
        return displayMovie.genres.slice(0, 2).map((g) => g.title || g.name || String(g));
      }
      // Already an array of strings
      return displayMovie.genres.slice(0, 2);
    }

    // Fallback to genre_ids
    if (displayMovie.genre_ids && Array.isArray(displayMovie.genre_ids)) {
      return displayMovie.genre_ids.slice(0, 2).map((id) => getGenreName(id));
    }

    return [];
  })();

  const shouldShowImage = imageUrl && !imageError;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      className="group relative bg-zinc-900 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20"
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-800">
        {shouldShowImage ? (
          <>
            <Image
              src={imageUrl}
              alt={displayMovie.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              unoptimized
              onError={handleImageError}
            />
            <img
              src={imageUrl}
              alt=""
              style={{ display: "none" }}
              onError={handleImageError}
            />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
            <div className="text-6xl mb-2">🎬</div>
            <div className="text-zinc-600 text-sm text-center px-4">
              {displayMovie.title.substring(0, 30)}
              {displayMovie.title.length > 30 ? "..." : ""}
            </div>
          </div>
        )}

        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-3 right-3 bg-amber-500 text-black font-bold px-2.5 py-1 rounded-full text-sm shadow-lg z-10">
            {rating}
          </div>
        )}

        {/* Loading indicator */}
        {loadingDetails && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Movie Info */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <h3 className="font-bold text-lg text-white line-clamp-2 group-hover:text-amber-400 transition-colors min-h-[3.5rem]">
          {displayMovie.title}
        </h3>

        {/* Year & Genres */}
        {(year || genres.length > 0) && (
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            {year && (
              <span className="text-amber-500 font-semibold">{year}</span>
            )}
            {year && genres.length > 0 && (
              <span className="text-zinc-600">•</span>
            )}
            {genres.length > 0 && (
              <span className="line-clamp-1">{genres.join(", ")}</span>
            )}
          </div>
        )}

        {/* Overview */}
        {displayMovie.overview && (
          <p className="text-sm text-zinc-500 line-clamp-3 leading-relaxed">
            {displayMovie.overview}
          </p>
        )}

        {/* Runtime - handle both ISO duration and legacy runtime */}
        {(() => {
          // Try ISO 8601 duration first (e.g., "PT42M", "PT2H30M")
          const parsed = parseDuration(displayMovie.duration);
          if (parsed) {
            return (
              <div className="text-xs text-zinc-600">
                {parsed.hours > 0 && `${parsed.hours}h `}{parsed.minutes}m
              </div>
            );
          }
          // Fallback to legacy runtime (in minutes)
          if (displayMovie.runtime) {
            return (
              <div className="text-xs text-zinc-600">
                {Math.floor(displayMovie.runtime / 60)}h {displayMovie.runtime % 60}m
              </div>
            );
          }
          return null;
        })()}

        {/* Votes Count */}
        {displayMovie.vote_count && displayMovie.vote_count > 0 && (
          <div className="text-xs text-zinc-600 pt-1">
            {displayMovie.vote_count.toLocaleString()} votes
          </div>
        )}
      </div>

      {/* Hover Effect Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
}
