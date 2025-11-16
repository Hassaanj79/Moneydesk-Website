"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  published: boolean;
}

export default function BlogDetail({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    // Try to get from sessionStorage first (if navigated from list)
    const selectedBlog = sessionStorage.getItem("selectedBlog");
    if (selectedBlog) {
      setBlog(JSON.parse(selectedBlog));
      sessionStorage.removeItem("selectedBlog");
    } else {
      // Otherwise, load from localStorage
      const storedBlogs = localStorage.getItem("moneydesk_blogs");
      if (storedBlogs) {
        const blogs = JSON.parse(storedBlogs);
        const foundBlog = blogs.find((b: BlogPost) => b.id === params.id);
        if (foundBlog && foundBlog.published) {
          setBlog(foundBlog);
        }
      }
    }
  }, [params.id]);

  if (!blog) {
    return (
      <div className="pt-16 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <Link
            href="/blog"
            className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-20 min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <div className="mb-4">
            <span className="px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
              {blog.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            View All Blog Posts
          </Link>
        </div>
      </article>
    </div>
  );
}

