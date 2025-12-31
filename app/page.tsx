import styles from "./page.module.css";
//import { useState } from 'react';
import { useMovies, useDebounce } from '@/hooks/theMovies';
import SearchBar from '@/components/SearchBar';
import GenreFilter from '@/components/GenreFilter';
import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';
import ResultsCount from '@/components/ResultsCount';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className="ComponentsPageToRender">
        <h1>HAPPY NEW YEAR IN AUSTRALIA</h1>
      </div>
    </div>
  );
}