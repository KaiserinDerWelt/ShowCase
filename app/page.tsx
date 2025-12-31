import styles from "./page.module.css";
import { useState } from 'react';
import { useMovies, useDebounce } from '@/hooks/theMovies';
import SearchBar from '@/components/SearchBar';
import GenreFilter from '@/components/GenreFilter';
import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';
import ResultsCount from '@/components/ResultsCount';

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

}