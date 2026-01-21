// pages/index.js
'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [times, setTimes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTimes = async () => {
      try {
        const res = await fetch('/api/scott');
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          const message = data?.error || 'Failed to load';
          throw new Error(message);
        }
        setTimes(data);
      } catch (err) {
        setError(err?.message || 'Failed to load');
      }
    };

    loadTimes();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!times) return <div>Loading Scott hours...</div>;

  return (
    <main style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>Traditions at Scott Hours</h1>
      <ul>
        <li>{times.scott1RawText}</li>
        <li>{times.scott2RawText}</li>
        <li>{times.scott3RawText}</li>
        <li>{times.scott4RawText}</li>
      </ul>
    </main>
  );
}

