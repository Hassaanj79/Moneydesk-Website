"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, X, CheckCircle, Clock, AlertCircle, Trash2, Download, MessageSquare, ThumbsUp, Bug, Lightbulb } from "lucide-react";
import Link from "next/link";

interface FeedbackSubmission {
  id: string;
  title: string;
  description: string;
  type: "enhancement" | "bug";
  status: "under-review" | "planned" | "in-progress" | "completed" | "rejected";
  votes: number;
  voters: string[];
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

const ADMIN_EMAIL = "Hassyku786@gmail.com";
const ADMIN_PASSWORD = "Hassaan@786";

export default function FeedbackAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState<FeedbackSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<FeedbackSubmission[]>([]);
  const [filterType, setFilterType] = useState<"all" | "enhancement" | "bug">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "under-review" | "planned" | "in-progress" | "completed" | "rejected">("all");
  const [sortBy, setSortBy] = useState<"newest" | "votes" | "comments">("newest");

  useEffect(() => {
    const auth = sessionStorage.getItem("blogAdminAuth");
    const authEmail = sessionStorage.getItem("blogAdminEmail");
    if (auth === "authenticated" && authEmail === ADMIN_EMAIL) {
      setIsAuthenticated(true);
      loadSubmissions();
    } else {
      sessionStorage.removeItem("blogAdminAuth");
      sessionStorage.removeItem("blogAdminEmail");
    }
  }, []);

  useEffect(() => {
    filterAndSortSubmissions();
  }, [submissions, filterType, filterStatus, sortBy]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("blogAdminAuth", "authenticated");
      sessionStorage.setItem("blogAdminEmail", ADMIN_EMAIL);
      setIsAuthenticated(true);
      loadSubmissions();
    } else {
      alert("Invalid email or password. Access denied.");
      setPassword("");
    }
  };

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

    if (filterType !== "all") {
      filtered = filtered.filter((sub) => sub.type === filterType);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((sub) => sub.status === filterStatus);
    }

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

  const updateStatus = (id: string, newStatus: FeedbackSubmission["status"]) => {
    const updated = submissions.map((sub) =>
      sub.id === id ? { ...sub, status: newStatus } : sub
    );
    saveSubmissions(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      const updated = submissions.filter((sub) => sub.id !== id);
      saveSubmissions(updated);
    }
  };

  const exportSubmissions = () => {
    const csv = [
      ["Title", "Type", "Status", "Votes", "Comments", "Submitted By", "Email", "Date", "Description"].join(","),
      ...filteredSubmissions.map((sub) =>
        [
          `"${sub.title.replace(/"/g, '""')}"`,
          sub.type,
          sub.status,
          sub.votes,
          sub.comments.length,
          sub.submittedByName || sub.submittedBy || "Anonymous",
          sub.submittedByEmail || "",
          sub.date,
          `"${sub.description.replace(/"/g, '""')}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `feedback-submissions-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback Admin Portal</h1>
            <p className="text-gray-600">Authorized access only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Website
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Feedback Admin Portal</h1>
              <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-semibold">
                {ADMIN_EMAIL}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/blog"
              className="px-4 py-2 bg-primary-100 text-primary-600 rounded-xl font-semibold hover:bg-primary-200 transition-all"
            >
              Manage Blog
            </Link>
            <Link
              href="/admin/careers"
              className="px-4 py-2 bg-primary-100 text-primary-600 rounded-xl font-semibold hover:bg-primary-200 transition-all"
            >
              Manage Careers
            </Link>
            <button
              onClick={() => {
                sessionStorage.removeItem("blogAdminAuth");
                sessionStorage.removeItem("blogAdminEmail");
                window.location.reload();
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700">Type:</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as "all" | "enhancement" | "bug")}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
              >
                <option value="all">All</option>
                <option value="enhancement">Enhancements</option>
                <option value="bug">Bugs</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700">Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
              >
                <option value="all">All</option>
                <option value="under-review">Under Review</option>
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700">Sort:</label>
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
            {filteredSubmissions.length > 0 && (
              <button
                onClick={exportSubmissions}
                className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-600 rounded-xl font-semibold hover:bg-primary-200 transition-all"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            )}
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Feedback Submissions ({filteredSubmissions.length})
          </h2>

          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No feedback submissions found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-primary-300 transition-all"
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
                      <div className="flex flex-col gap-2 text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span>Submitted {submission.date}</span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {submission.votes} votes
                          </span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {submission.comments.length} comments
                          </span>
                        </div>
                        {(submission.submittedByName || submission.submittedByEmail) && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-semibold text-gray-700">Submitted by:</span>
                            {submission.submittedByName && (
                              <span className="text-gray-900">{submission.submittedByName}</span>
                            )}
                            {submission.submittedByEmail && (
                              <>
                                {submission.submittedByName && <span>•</span>}
                                <a 
                                  href={`mailto:${submission.submittedByEmail}`}
                                  className="text-primary-600 hover:text-primary-700 hover:underline"
                                >
                                  {submission.submittedByEmail}
                                </a>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                    <span className="text-sm font-semibold text-gray-700">Update Status:</span>
                    <select
                      value={submission.status}
                      onChange={(e) => updateStatus(submission.id, e.target.value as FeedbackSubmission["status"])}
                      className="px-3 py-1 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-sm"
                    >
                      <option value="under-review">Under Review</option>
                      <option value="planned">Planned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button
                      onClick={() => handleDelete(submission.id)}
                      className="ml-auto px-3 py-1 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition-all text-sm"
                    >
                      <Trash2 className="w-4 h-4 inline mr-1" />
                      Delete
                    </button>
                  </div>

                  {/* Comments */}
                  {submission.comments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Comments:</h4>
                      <div className="space-y-2">
                        {submission.comments.map((comment) => (
                          <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-900 text-sm">{comment.author}</span>
                              <span className="text-xs text-gray-500">• {comment.date}</span>
                            </div>
                            <p className="text-gray-700 text-sm">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

