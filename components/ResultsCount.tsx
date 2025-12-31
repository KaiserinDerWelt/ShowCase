//This component gonna handle the results count, remember in the API I've set a limit of 25 results per page.
'use client';

interface ResultsCountProps {
  total: number;
  searchQuery?: string;
  genre?: string;
}

export default function ResultsCount({ total, searchQuery, genre }: ResultsCountProps) {
    const hasFilters = searchQuery || genre;
  
    return (
      <></>
      
    );
  }
  