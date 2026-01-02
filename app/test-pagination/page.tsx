'use client';

import { useEffect, useState } from 'react';

export default function ApiTotalPagesTest() {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    async function test() {
      const tests = [];
      
      try {
        // Get token
        const tokenRes = await fetch('https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/auth/token');
        const tokenData = await tokenRes.json();
        const token = tokenData.token;

        // Test 1: Default (no params)
        let res = await fetch('https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/movies', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        let data = await res.json();
        tests.push({ 
          name: 'Default (no params)', 
          totalPages: data.totalPages, 
          itemsReturned: data.data?.length 
        });

        // Test 2: page=1, limit=20
        res = await fetch('https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/movies?page=1&limit=20', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        data = await res.json();
        tests.push({ 
          name: 'page=1, limit=20', 
          totalPages: data.totalPages, 
          itemsReturned: data.data?.length,
          calculation: `${data.totalPages} pages × 20 = ${data.totalPages * 20} total movies`
        });

        // Test 3: page=1, limit=5
        res = await fetch('https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/movies?page=1&limit=5', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        data = await res.json();
        tests.push({ 
          name: 'page=1, limit=5', 
          totalPages: data.totalPages, 
          itemsReturned: data.data?.length,
          calculation: `${data.totalPages} pages × 5 = ${data.totalPages * 5} total movies`
        });

        // Test 4: page=1, limit=100
        res = await fetch('https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/movies?page=1&limit=100', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        data = await res.json();
        tests.push({ 
          name: 'page=1, limit=100', 
          totalPages: data.totalPages, 
          itemsReturned: data.data?.length,
          calculation: `${data.totalPages} pages × 100 = ${data.totalPages * 100} total movies`
        });

        setResults(tests);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    test();
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#000', 
      color: '#fff', 
      padding: '2rem',
      fontFamily: 'system-ui'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#f59e0b' }}>
        API totalPages Test
      </h1>

      <div style={{ background: '#18181b', padding: '1.5rem', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Results:</h2>
        
        {results.length === 0 ? (
          <p style={{ color: '#71717a' }}>Loading tests...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {results.map((result, index) => (
              <div 
                key={index}
                style={{ 
                  background: '#27272a', 
                  padding: '1rem', 
                  borderRadius: '8px',
                  borderLeft: '4px solid #f59e0b'
                }}
              >
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: '#fbbf24' }}>
                  {result.name}
                </h3>
                <p><strong>Total Pages:</strong> {result.totalPages}</p>
                <p><strong>Items in Response:</strong> {result.itemsReturned}</p>
                {result.calculation && (
                  <p style={{ color: '#10b981', marginTop: '0.5rem' }}>
                    <strong>Calculation:</strong> {result.calculation}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#172554', 
        borderRadius: '8px'
      }}>
        <strong>Understanding totalPages:</strong>
        <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>The API returns <code>totalPages</code> based on the <code>limit</code> you set</li>
          <li>If total movies = 480 and limit = 20, then totalPages = 24</li>
          <li>If total movies = 480 and limit = 5, then totalPages = 96</li>
          <li>The actual total number of movies is: <strong>totalPages × limit</strong></li>
        </ul>
      </div>

      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        background: '#7f1d1d', 
        borderRadius: '8px'
      }}>
        <strong>⚠️ Potential Issue:</strong>
        <p style={{ marginTop: '0.5rem' }}>
          If totalPages changes based on limit, the total count we show might be inaccurate.
          We need to test if the API returns a consistent total count or if it varies.
        </p>
      </div>
    </div>
  );
}