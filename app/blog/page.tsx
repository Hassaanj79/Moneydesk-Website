"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, ArrowRight, Clock, FileText, CheckCircle, X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Toast } from "@/components/Toast";

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
  coverPhoto?: string;
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" | "info"; isVisible: boolean }>({
    message: "",
    type: "info",
    isVisible: false,
  });

  // Sanitize search input on client side
  const sanitizeSearchInput = (input: string): string => {
    return input
      .trim()
      .replace(/[<>'"\\]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .slice(0, 100);
  };

  useEffect(() => {
    // Get search query from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get("search");
    if (searchParam) {
      const sanitized = sanitizeSearchInput(searchParam);
      setSearchQuery(sanitized);
    }
  }, []);

  useEffect(() => {
    // Load blogs from API
    const loadBlogs = async () => {
      setIsLoading(true);
      try {
        // Build API URL with search parameter if present
        let apiUrl = "/api/blogs?published=true";
        if (searchQuery.trim()) {
          const sanitized = sanitizeSearchInput(searchQuery);
          if (sanitized) {
            apiUrl += `&search=${encodeURIComponent(sanitized)}`;
          }
        }
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.success && data.blogs) {
          // Sort by date (newest first)
          const sortedBlogs = data.blogs.sort((a: BlogPost, b: BlogPost) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          setBlogPosts(sortedBlogs);
          setFilteredPosts(sortedBlogs);
        }
      } catch (error) {
        console.error("Error loading blogs:", error);
        // Fallback to localStorage if API fails
        const storedBlogs = localStorage.getItem("moneydesk_blogs");
        if (storedBlogs) {
          const blogs = JSON.parse(storedBlogs);
          const publishedBlogs = blogs
            .filter((blog: BlogPost) => blog.published)
            .sort((a: BlogPost, b: BlogPost) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
          setBlogPosts(publishedBlogs);
          setFilteredPosts(publishedBlogs);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadBlogs();
  }, [searchQuery]);

  // Get unique categories (memoized to prevent recalculation)
  const categories = useMemo(() => {
    return ["all", ...Array.from(new Set(blogPosts.map(post => post.category)))];
  }, [blogPosts]);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === selectedCategory));
    }
  }, [selectedCategory, blogPosts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = sanitizeSearchInput(searchQuery);
    if (sanitized) {
      // Update URL with search parameter
      const url = new URL(window.location.href);
      url.searchParams.set("search", sanitized);
      window.history.pushState({}, "", url.toString());
      setSearchQuery(sanitized);
    } else {
      // Clear search
      const url = new URL(window.location.href);
      url.searchParams.delete("search");
      window.history.pushState({}, "", url.toString());
      setSearchQuery("");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Client-side validation: prevent dangerous characters
    const sanitized = value
      .replace(/[<>'"\\]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .slice(0, 100);
    setSearchQuery(sanitized);
  };

  const showToast = (message: string, type: "success" | "error" | "warning" | "info" = "info") => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, isVisible: false })), 5000);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    const emailValue = email.toLowerCase().trim();
    if (!emailValue) {
      showToast("Please enter a valid email address", "warning");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
      const subscribedAt = new Date().toISOString();

      // Save to database via API
      const response = await fetch("/api/newsletter/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          date,
          subscribedAt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error && data.error.includes("already subscribed")) {
          showToast("This email is already subscribed!", "warning");
        } else {
          showToast("Failed to subscribe. Please try again.", "error");
        }
        setIsSubmitting(false);
        return;
      }

      setEmail("");
      setSubscribed(true);
      setShowPopup(true);
      setIsSubmitting(false);
      
      setTimeout(() => {
        setShowPopup(false);
        setSubscribed(false);
      }, 5000);

      // Send email notification
      fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          date,
          subscribedAt,
        }),
      })
      .then(response => {
        if (response.ok) {
          console.log("✅ Notification email sent to support@moneydesk.co");
        } else {
          console.error("⚠️ Failed to send notification email");
        }
      })
      .catch(error => {
        console.error("⚠️ Error sending notification email:", error);
      });
      
    } catch (error) {
      console.error("❌ Error subscribing:", error);
      setIsSubmitting(false);
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  return (
    <>
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Personal Finance Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert tips, guides, and stories to help you take control of your finances
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search articles..."
              className="w-full px-4 py-3 pl-12 pr-4 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              maxLength={100}
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  const url = new URL(window.location.href);
                  url.searchParams.delete("search");
                  window.history.pushState({}, "", url.toString());
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12 pb-8 border-b border-gray-200">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Blog Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">
              {selectedCategory === "all" 
                ? "Check back soon for new articles."
                : `No posts in the "${selectedCategory}" category yet.`
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Cover Photo or Placeholder */}
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 relative overflow-hidden" style={{ aspectRatio: '1200/628' }}>
                  {post.coverPhoto ? (
                    <Image
                      src={post.coverPhoto}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-primary-300 text-3xl font-bold opacity-30">MD</div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <time>{post.date}</time>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      sessionStorage.setItem("selectedBlog", JSON.stringify(post));
                      window.location.href = `/blog/${post.id}`;
                    }}
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-gray-200 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Get the latest financial tips
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter and never miss an update
          </p>
          <form 
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </section>
    </div>

    {/* Success Popup Modal */}
    {showPopup && (
      <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.3s ease-out forwards',
        }}
        onClick={() => {
          setShowPopup(false);
          setSubscribed(false);
        }}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative mx-4"
          style={{
            animation: 'scaleIn 0.3s ease-out forwards',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Successfully Subscribed!
            </h3>
            <p className="text-gray-600 mb-6">
              Thank you for subscribing to our newsletter. You'll receive the latest financial tips and updates delivered to your inbox.
            </p>
            <button
              onClick={() => {
                setShowPopup(false);
                setSubscribed(false);
              }}
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              Got it!
            </button>
          </div>
          <button
            onClick={() => {
              setShowPopup(false);
              setSubscribed(false);
            }}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    )}
    
    {/* Toast Notification */}
    <Toast
      message={toast.message}
      type={toast.type}
      isVisible={toast.isVisible}
      onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
    />
    </>
  );
}
