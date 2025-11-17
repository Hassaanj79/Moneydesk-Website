"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

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

export default function BlogDetail({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load blog from API
    const loadBlog = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/blogs/${params.id}`);
        const data = await response.json();
        
        if (data.success && data.blog && data.blog.published) {
          setBlog(data.blog);
          
          // Load related posts from API
          const blogsResponse = await fetch("/api/blogs?published=true");
          const blogsData = await blogsResponse.json();
          
          if (blogsData.success && blogsData.blogs) {
            const publishedBlogs = blogsData.blogs.filter((b: BlogPost) => b.id !== data.blog.id);
            // Get posts from same category first, then others
            const sameCategory = publishedBlogs.filter((b: BlogPost) => b.category === data.blog.category);
            const otherPosts = publishedBlogs.filter((b: BlogPost) => b.category !== data.blog.category);
            const related = [...sameCategory, ...otherPosts].slice(0, 3);
            setRelatedPosts(related);
          }
        } else {
          // Blog not found or not published
          setBlog(null);
        }
      } catch (error) {
        console.error("Error loading blog:", error);
        // Fallback to localStorage
        const storedBlogs = localStorage.getItem("moneydesk_blogs");
        if (storedBlogs) {
          const blogs = JSON.parse(storedBlogs);
          const foundBlog = blogs.find((b: BlogPost) => b.id === params.id);
          if (foundBlog && foundBlog.published) {
            setBlog(foundBlog);
            const publishedBlogs = blogs.filter((b: BlogPost) => b.published && b.id !== foundBlog.id);
            const sameCategory = publishedBlogs.filter((b: BlogPost) => b.category === foundBlog.category);
            const otherPosts = publishedBlogs.filter((b: BlogPost) => b.category !== foundBlog.category);
            const related = [...sameCategory, ...otherPosts].slice(0, 3);
            setRelatedPosts(related);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadBlog();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="pt-16 pb-20 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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
    <div className="min-h-screen pt-16">
      {/* Header Navigation */}
      <div className="border-b border-gray-200 bg-white sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link
              href="/blog"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: blog.title,
                    text: blog.excerpt,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium inline-flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Article Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Article Content */}
          <article className="lg:col-span-2">
            {/* Cover Photo */}
            {blog.coverPhoto && (
              <div className="mb-8 rounded-xl overflow-hidden relative w-full" style={{ aspectRatio: '1200/628' }}>
                <Image
                  src={blog.coverPhoto}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority
                />
              </div>
            )}

            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {blog.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-12 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium text-gray-900">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time>{blog.date}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-800 leading-relaxed font-poppins blog-content" 
                style={{ fontSize: '18px', lineHeight: '1.8' }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Footer Actions */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <Link
                  href="/blog"
                  className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  View All Posts
                </Link>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: blog.title,
                        text: blog.excerpt,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }
                  }}
                  className="text-gray-600 hover:text-gray-900 font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share Article
                </button>
              </div>
            </div>
          </article>

          {/* Related Articles Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-primary-500">
                Related Articles
              </h2>
              {relatedPosts.length === 0 ? (
                <p className="text-gray-500 text-sm">No related articles yet.</p>
              ) : (
                <div className="space-y-6">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="block group"
                      onClick={(e) => {
                        e.preventDefault();
                        sessionStorage.setItem("selectedBlog", JSON.stringify(post));
                        window.location.href = `/blog/${post.id}`;
                      }}
                    >
                      {/* Cover Photo or Placeholder */}
                      <div className="h-32 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg mb-3 overflow-hidden relative">
                        {post.coverPhoto ? (
                          <img
                            src={post.coverPhoto}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-primary-300 text-2xl font-bold opacity-30">MD</div>
                          </div>
                        )}
                      </div>
                      
                      {/* Date */}
                      <time className="text-xs text-gray-500 block mb-2">
                        {post.date}
                      </time>
                      
                      {/* Title */}
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
