// The filter to show genre provided by the API Service
'use client';

import { getAllGenres } from '@/services/moviesAPI';

interface GenreFilterProps {
  selectedGenre?: string;
  onGenreChange: (genre: string | undefined) => void;
}