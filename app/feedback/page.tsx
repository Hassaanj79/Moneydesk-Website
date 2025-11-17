"use client";

import React, { useState, useEffect } from "react";
import { Plus, ThumbsUp, MessageSquare, Bug, Lightbulb, Filter, X, CheckCircle, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";

interface FeedbackSubmission {
  id: string;
  title: string;
  description: string;
  type: "enhancement" | "bug";
  status: "under-review" | "planned" | "in-progress" | "completed" | "rejected";
  votes: number;
  voters: string[]; // Array of user identifiers (IP or email)
  comments: Comment[];
  submittedBy: string;
  submittedByEmail?: string;
  submittedByName?: string;
  submittedAt: string;
  date: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  submittedAt: string;
  date: string;
}

export default function FeedbackPage() {
  const [submissions, setSubmissions] = useState<FeedbackSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<FeedbackSubmission[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "enhancement" | "bug">("all");
  const [sortBy, setSortBy] = useState<"newest" | "votes" | "comments">("newest");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "enhancement" as "enhancement" | "bug",
    name: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

  useEffect(() => {
    loadSubmissions();
  }, []);

  useEffect(() => {
    filterAndSortSubmissions();
  }, [submissions, filterType, sortBy]);

  const loadSubmissions = () => {
    const stored = localStorage.getItem("moneydesk_feedback");
    if (stored) {
      const parsed = JSON.parse(stored) as FeedbackSubmission[];
      setSubmissions(parsed);
    }
  };

  const saveSubmissions = (updated: FeedbackSubmission[]) => {
    localStorage.setItem("moneydesk_feedback", JSON.stringify(updated));
    setSubmissions(updated);
  };

  const filterAndSortSubmissions = () => {
    let filtered = [...submissions];

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter((sub) => sub.type === filterType);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "votes") {
        return b.votes - a.votes;
      } else if (sortBy === "comments") {
        return b.comments.length - a.comments.length;
      } else {
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      }
    });

    setFilteredSubmissions(filtered);
  };

  const getUserIdentifier = (): string => {
    // Use a combination of user agent and timestamp as identifier
    // In production, you might want to use a more robust method
    const stored = sessionStorage.getItem("feedback_user_id");
    if (stored) {
      return stored;
    }
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("feedback_user_id", id);
    return id;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim() || !formData.name.trim() || !formData.email.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      alert("Please enter a valid email address");
      return;
    }

    setSubmitting(true);

    const newSubmission: FeedbackSubmission = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      type: formData.type,
      status: "under-review",
      votes: 0,
      voters: [],
      comments: [],
      submittedBy: formData.name.trim() || "Anonymous User",
      submittedByName: formData.name.trim(),
      submittedByEmail: formData.email.trim(),
      submittedAt: new Date().toISOString(),
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    };

    const updated = [...submissions, newSubmission];
    saveSubmissions(updated);
    
    setFormData({ title: "", description: "", type: "enhancement", name: "", email: "" });
    setShowForm(false);
    setSubmitting(false);
    alert("Thank you for your feedback! Your submission has been received.");
  };

  const handleVote = (submissionId: string) => {
    const userId = getUserIdentifier();
    const updated = submissions.map((sub) => {
      if (sub.id === submissionId) {
        const hasVoted = sub.voters.includes(userId);
        if (hasVoted) {
          // Remove vote
          return {
            ...sub,
            votes: Math.max(0, sub.votes - 1),
            voters: sub.voters.filter((v) => v !== userId),
          };
        } else {
          // Add vote
          return {
            ...sub,
            votes: sub.votes + 1,
            voters: [...sub.voters, userId],
          };
        }
      }
      return sub;
    });
    saveSubmissions(updated);
  };

  const handleCommentSubmit = (submissionId: string) => {
    if (!commentText.trim() || !commentAuthor.trim()) {
      alert("Please enter your name and comment");
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      author: commentAuthor.trim(),
      content: commentText.trim(),
      submittedAt: new Date().toISOString(),
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    };

    const updated = submissions.map((sub) => {
      if (sub.id === submissionId) {
        return {
          ...sub,
          comments: [...sub.comments, newComment],
        };
      }
      return sub;
    });

    saveSubmissions(updated);
    setCommentText("");
    setCommentAuthor("");
    setShowCommentForm(null);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      "under-review": { icon: Clock, text: "Under Review", color: "bg-yellow-100 text-yellow-800" },
      "planned": { icon: CheckCircle, text: "Planned", color: "bg-blue-100 text-blue-800" },
      "in-progress": { icon: Clock, text: "In Progress", color: "bg-purple-100 text-purple-800" },
      "completed": { icon: CheckCircle, text: "Completed", color: "bg-green-100 text-green-800" },
      "rejected": { icon: X, text: "Rejected", color: "bg-red-100 text-red-800" },
    };
    const badge = badges[status as keyof typeof badges] || badges["under-review"];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {badge.text}
      </span>
    );
  };

  return (
    <div className="pt-16 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Enhancement Portal
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Share your ideas, request enhancements, or report bugs. Vote and comment on existing requests to help us prioritize what to build next.
            </p>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as "all" | "enhancement" | "bug")}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
              >
                <option value="all">All</option>
                <option value="enhancement">Enhancements</option>
                <option value="bug">Bugs</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "newest" | "votes" | "comments")}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
              >
                <option value="newest">Newest</option>
                <option value="votes">Most Voted</option>
                <option value="comments">Most Comments</option>
              </select>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Share Your Idea
            </button>
          </div>

          {/* Submission Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
                  <h2 className="text-2xl font-bold text-gray-900">Share Your Idea</h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setFormData({ title: "", description: "", type: "enhancement", name: "", email: "" });
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Type *
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="enhancement"
                          checked={formData.type === "enhancement"}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value as "enhancement" | "bug" })}
                          className="w-4 h-4 text-primary-600"
                        />
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium">Enhancement</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="bug"
                          checked={formData.type === "bug"}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value as "enhancement" | "bug" })}
                          className="w-4 h-4 text-primary-600"
                        />
                        <Bug className="w-5 h-5 text-red-500" />
                        <span className="font-medium">Bug Report</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Brief description of your idea or bug"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      rows={6}
                      placeholder="Provide more details about your enhancement request or bug report..."
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:from-primary-600 hover:to-primary-700 transition-all disabled:opacity-50"
                    >
                      {submitting ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setFormData({ title: "", description: "", type: "enhancement", name: "", email: "" });
                      }}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Submissions List */}
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
              <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No submissions yet</h3>
              <p className="text-gray-600 mb-6">Be the first to share your idea or report a bug!</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-all"
              >
                <Plus className="w-5 h-5" />
                Share Your Idea
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => {
                const userId = getUserIdentifier();
                const hasVoted = submission.voters.includes(userId);
                return (
                  <div
                    key={submission.id}
                    className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-primary-300 transition-all p-6"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {submission.type === "enhancement" ? (
                            <Lightbulb className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <Bug className="w-5 h-5 text-red-500" />
                          )}
                          <h3 className="text-xl font-bold text-gray-900">{submission.title}</h3>
                          {getStatusBadge(submission.status)}
                        </div>
                        <p className="text-gray-600 mb-3">{submission.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Submitted {submission.date}</span>
                          <span>•</span>
                          <span>{submission.votes} votes</span>
                          <span>•</span>
                          <span>{submission.comments.length} comments</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleVote(submission.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                          hasVoted
                            ? "bg-primary-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        {hasVoted ? "Voted" : "Vote"}
                      </button>
                      <button
                        onClick={() => {
                          setShowCommentForm(submission.id === showCommentForm ? null : submission.id);
                          setCommentAuthor("");
                          setCommentText("");
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Comment ({submission.comments.length})
                      </button>
                    </div>

                    {/* Comment Form */}
                    {showCommentForm === submission.id && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={commentAuthor}
                            onChange={(e) => setCommentAuthor(e.target.value)}
                            placeholder="Your name"
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                          <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add your comment..."
                            rows={3}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleCommentSubmit(submission.id)}
                              className="px-4 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-all"
                            >
                              Post Comment
                            </button>
                            <button
                              onClick={() => {
                                setShowCommentForm(null);
                                setCommentText("");
                                setCommentAuthor("");
                              }}
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Comments List */}
                    {submission.comments.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {submission.comments.map((comment) => (
                          <div key={comment.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-900">{comment.author}</span>
                              <span className="text-xs text-gray-500">• {comment.date}</span>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
    </div>
  );
}

