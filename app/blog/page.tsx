"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User, ArrowRight, Clock, FileText } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";

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

export default function Blog() {
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const postsAnimation = useScrollAnimation({ threshold: 0.2 });
  const newsletterAnimation = useScrollAnimation({ threshold: 0.3 });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load blogs from localStorage
    const storedBlogs = localStorage.getItem("moneydesk_blogs");
    if (storedBlogs) {
      const blogs = JSON.parse(storedBlogs);
      // Only show published blogs
      const publishedBlogs = blogs.filter((blog: BlogPost) => blog.published);
      setBlogPosts(publishedBlogs);
    }
  }, []);

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-pulse-slow animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl animate-pulse-slow delay-1000" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative text-center mb-12" ref={heroAnimation.ref}>
          <div className={`transition-all duration-1000 ease-out ${
            heroAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <Link
              href="/"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              MoneyDesk Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights, tips, and guides to help you master your personal finances
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" ref={postsAnimation.ref}>
        {blogPosts.length === 0 ? (
          <div className={`text-center py-20 transition-all duration-1000 ease-out ${
            postsAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
              <FileText className="w-10 h-10 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No blog posts yet</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Check back soon for expert insights, tips, and guides to help you master your personal finances.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-primary-300 transform hover:-translate-y-2 ${
                postsAnimation.isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-100 via-accent-50 to-success-50 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-primary-400 text-4xl font-bold opacity-20">MD</div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-primary-600">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{post.author}</span>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-primary-600 hover:text-primary-700 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                      onClick={(e) => {
                        e.preventDefault();
                        // Store selected blog in sessionStorage to view on detail page
                        sessionStorage.setItem("selectedBlog", JSON.stringify(post));
                        window.location.href = `/blog/${post.id}`;
                      }}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" ref={newsletterAnimation.ref}>
        <div className={`relative bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-dark rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden transition-all duration-1000 ease-out ${
          newsletterAnimation.isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 scale-95'
        }`}>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with Our Latest Articles
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Subscribe to our newsletter and get financial tips delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-8 py-3 bg-white text-primary-600 rounded-xl font-bold hover:bg-gray-50 transition-all transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

