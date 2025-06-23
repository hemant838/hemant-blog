"use client";

import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        // Store the token in localStorage for future authenticated requests
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Login successful', data);
        window.location.href = '/';
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md border border-gray-300">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl text-gray-900">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600">Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && <p className="text-red-500 text-center text-sm font-medium">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="border-gray-300 text-gray-900 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-gray-300 text-gray-900 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white focus:ring-gray-500"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600">
          <p>
            Don't have an account? <a href="/signup" className="text-gray-800 hover:underline font-medium">Sign up</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
