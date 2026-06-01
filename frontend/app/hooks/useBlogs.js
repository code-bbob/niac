'use client';

import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export function useBlogs(page = 1) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/blogs/?page=${page}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data.results || []);
        setTotal(data.count || 0);
        setTotalPages(data.count ? Math.ceil(data.count / 10) : 0);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.message);
        setBlogs([]);
        setTotal(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  return { blogs, loading, error, total, totalPages, currentPage: page };
}
