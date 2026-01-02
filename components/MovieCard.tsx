//Movie Card gonna display the movies detail
'use client';

import Image from 'next/image';
import type { Movie } from '@/types/movie';
import { getGenreName } from '@/services/movieApi';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const genres = movie.genre_ids?.slice(0, 2).map(id => getGenreName(id)) || [];

  return (
    <div
      onClick={onClick}
      className="group relative bg-zinc-900 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
            <div className="text-6xl mb-2">🎬</div>
            <div className="text-zinc-600 text-sm text-center px-4">
              {movie.title.substring(0, 30)}
              {movie.title.length > 30 ? '...' : ''}
            </div>
          </div>
        )}
        
        <div className="absolute top-3 right-3 bg-amber-500 text-black font-bold px-2.5 py-1 rounded-full text-sm shadow-lg">
          ★ {rating}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg text-white line-clamp-2 group-hover:text-amber-400 transition-colors">
          {movie.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span className="text-amber-500 font-semibold">{year}</span>
          {genres.length > 0 && (
            <>
              <span className="text-zinc-600">•</span>
              <span className="line-clamp-1">{genres.join(', ')}</span>
            </>
          )}
        </div>

        <p className="text-sm text-zinc-500 line-clamp-3 leading-relaxed">
          {movie.overview || 'No description available.'}
        </p>

        {movie.vote_count > 0 && (
          <div className="text-xs text-zinc-600 pt-1">
            {movie.vote_count.toLocaleString()} votes
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
}
