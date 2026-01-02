'use client';

import { useState } from 'react';
import { useMovies } from '@/hooks/useMovies';

export default function PaginationTest() {
  const [page, setPage] = useState(1);
  
  const { movies, pagination, isLoading, error } = useMovies({
    page,
    limit: 20,
  });

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#000', 
      color: '#fff', 
      padding: '2rem',
      fontFamily: 'monospace'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#f59e0b' }}>
        Pagination Debug Test
      </h1>

      <div style={{ background: '#18181b', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Current State:</h2>
        <div style={{ fontSize: '1rem', lineHeight: '1.8' }}>
          <p><strong>Current Page:</strong> {page}</p>
          <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
          <p><strong>Error:</strong> {error ? error.message : 'None'}</p>
          <p><strong>Movies Count:</strong> {movies.length}</p>
        </div>
      </div>

      {pagination && (
        <div style={{ background: '#18181b', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#10b981' }}>
            ✓ Pagination Data Found:
          </h2>
          <div style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            <p><strong>Page:</strong> {pagination.page}</p>
            <p><strong>Limit:</strong> {pagination.limit}</p>
            <p><strong>Total Results:</strong> {pagination.total}</p>
            <p><strong>Total Pages:</strong> {pagination.totalPages}</p>
          </div>
        </div>
      )}

      {!pagination && !isLoading && (
        <div style={{ background: '#7f1d1d', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            ✗ No Pagination Data
          </h2>
          <p>The API response doesnt contain pagination information.</p>
        </div>
      )}

      <div style={{ background: '#18181b', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Navigation:</h2>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: '0.75rem 1.5rem',
              background: page === 1 ? '#27272a' : '#f59e0b',
              color: page === 1 ? '#52525b' : '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: page === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            ← Previous
          </button>

          <div style={{ 
            padding: '0.75rem 1.5rem', 
            background: '#27272a', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1rem'
          }}>
            Page {page} {pagination ? `of ${pagination.totalPages}` : ''}
          </div>

          <button
            onClick={() => setPage(p => p + 1)}
            disabled={pagination ? page >= pagination.totalPages : false}
            style={{
              padding: '0.75rem 1.5rem',
              background: (pagination && page >= pagination.totalPages) ? '#27272a' : '#f59e0b',
              color: (pagination && page >= pagination.totalPages) ? '#52525b' : '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: (pagination && page >= pagination.totalPages) ? 'not-allowed' : 'pointer'
            }}
          >
            Next →
          </button>
        </div>
      </div>

      <div style={{ background: '#18181b', padding: '1.5rem', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Movies:</h2>
        {movies.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {movies.map((movie, index) => (
              <li 
                key={movie.id}
                style={{ 
                  padding: '0.75rem',
                  background: '#27272a',
                  marginBottom: '0.5rem',
                  borderRadius: '4px'
                }}
              >
                <strong>{index + 1}.</strong> {movie.title} 
                <span style={{ color: '#71717a', marginLeft: '1rem' }}>
                  ({movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'})
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#71717a' }}>No movies loaded yet...</p>
        )}
      </div>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#172554', 
        borderRadius: '8px',
        fontSize: '0.875rem'
      }}>
        <strong>Instructions:</strong>
        <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
          <li>Check if Pagination Data Found appears above</li>
          <li>Try clicking Next/Previous buttons</li>
          <li>Open browser console (F12) for detailed logs</li>
        </ul>
      </div>
    </div>
  );
}