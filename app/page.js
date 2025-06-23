"use client";
import React from "react";
import Header from "@/Components/Header";
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";

export default function Home() {
  return (
    <div >
      <BlogList />
      <Footer />
    </div>
  );
}
