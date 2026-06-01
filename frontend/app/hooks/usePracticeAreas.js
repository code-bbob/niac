'use client';

import { useState, useEffect } from 'react';

export function useServices() {
  const [Services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${API_BASE_URL}/services/`);
        if (!response.ok) {
          throw new Error('Failed to fetch service');
        }
        const data = await response.json();
        setServices(data.results || data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching service:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { Services, loading, error };
}
