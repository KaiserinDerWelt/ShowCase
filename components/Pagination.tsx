// Pagination display in the bottom
'use client';

import type { PaginationInfo } from '@/types/movie';

interface PaginationProps {
  pagination: PaginationInfo | null;
  onPageChange: (page: number) => void;
}