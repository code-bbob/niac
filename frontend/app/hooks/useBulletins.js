'use client';

import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export function useBulletins() {
  const [bulletins, setBulletins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBulletins = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/bulletins/`);
        if (!response.ok) {
          throw new Error('Failed to fetch bulletins');
        }
        const data = await response.json();
        console.log('Fetched bulletins:', data);
        setBulletins(data.results || data);
        console.log('Bulletins state updated:', bulletins);
        setError(null);
      } catch (err) {
        console.error('Error fetching bulletins:', err);
        setError(err.message);
        setBulletins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBulletins();
  }, []);

  return { bulletins, loading, error };
}
