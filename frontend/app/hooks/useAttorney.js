import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export function useTeam(slugOrId) {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slugOrId) {
      setLoading(false);
      return;
    }

    const fetchTeam = async () => {
      try {
        setLoading(true);
        // Backend viewset now handles both slug (name) and ID lookups
        const url = `${API_BASE_URL}/teams/${slugOrId}/`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Team not found');
        }
        const data = await response.json();
        setTeam(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching team:', err);
        setError(err.message);
        setTeam(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [slugOrId]);

  return { team, loading, error };
}
