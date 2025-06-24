"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/login";
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
    setCategory("");
    setContent("");
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, category, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      const newBlog = await response.json();
      console.log("Blog created:", newBlog);
      closeModal();
      window.location.reload(); // Refresh to show the new blog
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-black text-white p-6 shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wider">Blooger</h1>
        <nav className="flex items-center">
          <ul className="flex space-x-4 items-center">
            <li>
              <a
                href="/"
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300 font-medium text-center"
              >
                Home
              </a>
            </li>
            {isMounted && isAuthenticated ? (
              <>
                <li>
                  <Button
                    onClick={openModal}
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300 font-medium text-center"
                  >
                    Create Blog
                  </Button>
                </li>
                <li className="text-sm font-light ml-4">
                  Welcome, {user?.email}
                </li>
                <li>
                  <Button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition-colors duration-300 font-medium text-center"
                  >
                    Logout
                  </Button>
                </li>
              </>
            ) : isMounted ? (
              <>
                <li>
                  <a
                    href="/login"
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300 font-medium text-center"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/signup"
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-300 font-medium text-center"
                  >
                    Sign Up
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <span className="px-4 py-2 bg-gray-700 rounded-lg font-medium text-center">
                    Login
                  </span>
                </li>
                <li>
                  <span className="px-4 py-2 bg-gray-700 rounded-lg font-medium text-center">
                    Sign Up
                  </span>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Modal for creating a blog using Shadcn Dialog component */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Create New Blog</DialogTitle>
          </DialogHeader>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="flex-1 overflow-y-auto pr-2">
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                  required
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Startup">Startup</SelectItem>
                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Content
                </label>
                <div className="relative">
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    className="min-h-[200px] max-h-[300px] resize-y"
                    placeholder="Write your blog content here..."
                    required
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white px-1 rounded">
                    {content.length} chars
                  </div>
                </div>
              </div>
              <DialogFooter className="pt-4 flex-shrink-0 sticky bottom-0 bg-white border-t mt-4 -mx-6 px-6 py-4">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </div>
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
