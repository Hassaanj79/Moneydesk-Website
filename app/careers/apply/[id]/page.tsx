"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle, MapPin, Clock } from "lucide-react";

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements?: string;
  published: boolean;
}

export default function ApplyPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const [job, setJob] = useState<JobPosition | null>(null);
  const [jobId, setJobId] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Handle both sync and async params
    const getParams = async () => {
      const resolvedParams = 'then' in params ? await params : params;
      setJobId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!jobId) return;
    
    // Load job position from API
    const loadJob = async () => {
      try {
        const response = await fetch("/api/jobs/positions?published=true");
        const data = await response.json();
        if (data.success && data.positions) {
          const foundJob = data.positions.find((p: JobPosition) => p.id === jobId);
          if (foundJob) {
            setJob(foundJob);
          }
        }
      } catch (error) {
        console.error("Error loading job position:", error);
        // Fallback to localStorage
        const storedPositions = localStorage.getItem("moneydesk_job_positions");
        if (storedPositions) {
          const positions = JSON.parse(storedPositions);
          const foundJob = positions.find((p: JobPosition) => p.id === jobId);
          if (foundJob && foundJob.published) {
            setJob(foundJob);
          }
        }
      }
    };
    loadJob();
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    setIsSubmitting(true);

    try {
      // Create new application
      const newApplication = {
        id: Date.now().toString(),
        positionId: job.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        coverLetter: formData.coverLetter,
        appliedAt: new Date().toISOString(),
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      };

      // Save to database via API
      const response = await fetch("/api/jobs/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApplication),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to submit application");
      }

      // Send notification email (optional)
      try {
        await fetch("/api/newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "support@moneydesk.co",
            date: newApplication.date,
            subscribedAt: newApplication.appliedAt,
            subject: `New Job Application: ${job.title}`,
            message: `New application received for ${job.title} from ${formData.name} (${formData.email})`,
          }),
        });
      } catch (error) {
        console.error("Error sending notification:", error);
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", coverLetter: "" });
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Position Not Found</h1>
          <p className="text-gray-600 mb-8">The job position you're looking for doesn't exist or is no longer available.</p>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-20 min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/careers"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Careers
        </Link>

        {submitted ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your interest in joining MoneyDesk. We've received your application for <strong>{job.title}</strong> and will review it shortly.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-all"
              >
                View Other Positions
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Job Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                      {job.department}
                    </span>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <div className="prose max-w-none">
                    <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>
                    {job.requirements && (
                      <div className="mt-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Requirements:</h3>
                        <p className="text-gray-600 whitespace-pre-line">{job.requirements}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for this Position</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-semibold text-gray-700 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    id="coverLetter"
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    rows={8}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                  <Link
                    href="/careers"
                    className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

