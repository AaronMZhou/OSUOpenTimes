// pages/index.js
'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [times, setTimes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/scott')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then(setTimes)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!times) return <div>Loading Scott hours…</div>;

  return (
    <main style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>Traditions at Scott – Hours</h1>
      <ul>
        <li>{times.scott1RawText}</li>
        <li>{times.scott2RawText}</li>
        <li>{times.scott3RawText}</li>
        <li>{times.scott4RawText}</li>
      </ul>
    </main>
  );
}
