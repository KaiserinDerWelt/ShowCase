// The filter to show genre provided by the API Service
"use client";

import { getAllGenres } from "@/services/movieApi";

interface GenreFilterProps {
  selectedGenre?: string;
  onGenreChange: (genre: string | undefined) => void;
}

// Component creation here
{
  /**Working on component development */
}

export default function GenreFilter({
  selectedGenre,
  onGenreChange,
}: GenreFilterProps) {
  const genres = getAllGenres();

  return (
    <div className="relative genre-position">
      <label htmlFor="genre-select" className="sr-only">
        Filter by genre:
      </label>
      {/*Genre selector dafault all genres*/}
      <select
        id="genre-select"
        value={selectedGenre || ""}
        onChange={(e) => onGenreChange(e.target.value || undefined)}
        className="appearance-none bg-zinc-900 text-white border-2 border-zinc-800 rounded-full pl-6 pr-12 py-3 cursor-pointer hover:border-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300 text-base font-medium shadow-lg hover:shadow-amber-500/10 focus:shadow-amber-500/20 style-genres-bar"
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-500">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      
    </div>
  );
}
