"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function BlogDetail() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

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

  useEffect(() => {
    if (isAuthenticated && id) {
      const fetchBlog = async () => {
        try {
          const res = await fetch(`/api/blogs/${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch blog');
          }
          const data = await res.json();
          setBlog(data);
        } catch (error) {
          console.error(error);
          setBlog(null);
        }
      };
      fetchBlog();
    }
  }, [isAuthenticated, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // The redirect will happen in useEffect
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog not found</h2>
          <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative">
            <button 
              onClick={() => router.push('/blogs')}
              className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Blogs
            </button>
            {/* Title */}
            <div className="px-8 pt-8 pb-4">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
                {blog.title}
              </h1>
              {/* Author Info */}
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-medium text-gray-600">
                    {blog.author?.email ? blog.author.email.charAt(0).toUpperCase() : 'A'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {blog.author?.name || blog.author?.email || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {blog.author?.title || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Meta Information */}
          <div className="px-8 pb-6">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {blog.createdAt && (
                <span>Published: {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              )}
              {blog.category && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {blog.category}
                </span>
              )}
            </div>
          </div>

          {/* Introduction */}
          {blog.description && (
            <div className="px-8 pb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                {blog.description}
              </p>
            </div>
          )}

          {/* Featured Image */}
          <div className="px-8 pb-6">
            {blog.image ? (
              <img src={blog.image} alt={blog.title || "Featured Image"} className="w-full h-64 object-cover rounded-lg" />
            ) : (
              <div className="w-full h-64 bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                  </div>
                  <p className="text-sm opacity-75">Featured Image</p>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="px-8 pb-8">
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
