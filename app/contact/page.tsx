"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from "lucide-react";
import { Toast } from "@/components/Toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" | "info"; isVisible: boolean }>({
    message: "",
    type: "info",
    isVisible: false,
  });
  
  const showToast = (message: string, type: "success" | "error" | "warning" | "info" = "info") => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, isVisible: false })), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Generate a more unique ID to avoid collisions
      const uniqueId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const submission = {
        id: uniqueId,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        submittedAt: new Date().toISOString(),
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      };

      // Save to database via API
      const saveResponse = await fetch("/api/contact/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      const saveData = await saveResponse.json();

      if (!saveData.success) {
        throw new Error(saveData.error || "Failed to save submission");
      }

      // Send email notification to support@moneydesk.co
      const emailResponse = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (emailResponse.ok) {
        console.log("✅ Contact form submission sent successfully");
      } else {
        console.error("⚠️ Failed to send contact form submission");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("❌ Error submitting contact form:", error);
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        
        <div className="relative text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-50 text-primary-600 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-primary-200 shadow-lg">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
            We're here to help
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Let's talk
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600"> about your money</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? Need help? Want to share feedback? We're listening. Drop us a line and we'll get back to you as soon as we can.
          </p>
        </div>

        <div className="relative grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="group flex items-start p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                  <Mail className="h-7 w-7 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <a
                    href="mailto:support@moneydesk.co"
                    className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
                  >
                    support@moneydesk.co
                  </a>
                </div>
              </div>

              <div className="group flex items-start p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                  <Phone className="h-7 w-7 text-secondary-dark" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                  <a
                    href="tel:+13022193149"
                    className="text-gray-600 hover:text-primary-500 font-medium transition-colors"
                  >
                    +1 302 219 3149
                  </a>
                </div>
              </div>

              <div className="group flex items-start p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-success/20 to-success/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                  <MapPin className="h-7 w-7 text-success-dark" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">
                    1111B S Governors Ave STE 26220
                    <br />
                    Dover, DE 19904
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send us a message
              </h2>
              {submitted ? (
                <div className="bg-gradient-to-br from-success/20 to-success/10 border-2 border-success/40 rounded-2xl p-8 text-center animate-pulse">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-success/20 rounded-full mb-4">
                    <CheckCircle className="h-10 w-10 text-success-dark" />
                  </div>
                  <h3 className="text-xl font-bold text-success-dark mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-success-dark/80">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all hover:border-primary-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all hover:border-primary-300"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all hover:border-primary-300"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="feature">Feature Request</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all hover:border-primary-300 resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 rounded-xl font-bold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-2xl flex items-center justify-center transform hover:-translate-y-1"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <div className="relative bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-dark rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-block px-4 py-2 bg-primary-400/30 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                <span className="text-white font-semibold text-sm">Get Started</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to take control of your finances?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Start your free 30-day trial (no credit card required) and see how MoneyDesk can help you manage your money better. Join thousands of happy users today.
              </p>
              <Link
                href="https://app.moneydesk.co/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white text-primary-600 px-10 py-5 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all hover:shadow-2xl inline-flex items-center transform hover:-translate-y-1"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}

