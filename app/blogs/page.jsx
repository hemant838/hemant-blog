"use client";

import React, { useEffect, useState } from 'react';
import BlogList from '../../Components/BlogList';

export default function Blogs() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // A basic check for token presence; in a real app, you'd validate the token
      setIsAuthenticated(true);
    } else {
      window.location.href = '/login';
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex min-h-screen flex-col items-center justify-center py-2">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // The redirect will happen in useEffect
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <BlogList />
    </div>
  );
}
