// The filter to show genre provided by the API Service
'use client';

import { getAllGenres } from '@/services/moviesAPI';

interface GenreFilterProps {
  selectedGenre?: string;
  onGenreChange: (genre: string | undefined) => void;
}

// Component creation here

export default function GenreFilter({ selectedGenre, onGenreChange }: GenreFilterProps) {
    const genres = getAllGenres();
  
    return (
     {/**Working on component development */}
    );
  }