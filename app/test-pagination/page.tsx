'use client';

import { useEffect, useState } from 'react';

export default function RawApiInspector() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Get token
        const tokenRes = await fetch('https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/auth/token');
        const tokenData = await tokenRes.json();
        
        // Get movies
        const moviesRes = await fetch(
          'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/movies?page=1&limit=5',
          {
            headers: {
              'Authorization': `Bearer ${tokenData.token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const moviesData = await moviesRes.json();
        
        console.log('Raw API Response:', moviesData);
        setResponse(moviesData);
      } catch (error) {
        console.error('Error:', error);
        setResponse({ error: String(error) });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', color: 'white' }}>Loading...</div>;
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#000', 
      color: '#fff', 
      padding: '2rem',
      fontFamily: 'monospace'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#f59e0b' }}>
        Raw API Response Inspector
      </h1>

      <div style={{ background: '#18181b', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Response Structure:</h2>
        <div style={{ fontSize: '1rem' }}>
          <p><strong>Response Keys:</strong> {response ? Object.keys(response).join(', ') : 'None'}</p>
        </div>
      </div>

      <div style={{ background: '#18181b', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Full Response (JSON):</h2>
        <pre style={{ 
          background: '#09090b', 
          padding: '1rem', 
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '0.875rem',
          maxHeight: '600px'
        }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>

      <div style={{ 
        padding: '1rem', 
        background: '#172554', 
        borderRadius: '8px',
        fontSize: '0.875rem'
      }}>
        <strong>What to look for:</strong>
        <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
          <li>Does it have a "data" property with movies?</li>
          <li>Does it have "pagination", "meta", "page", or similar?</li>
          <li>What are the top-level keys?</li>
        </ul>
      </div>
    </div>
  );
}
