"use client";

import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import Link from "next/link";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/rejected cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    
    if (!cookieConsent) {
      // Show banner after 5 seconds
      const timer = setTimeout(() => {
        setShowBanner(true);
        // Trigger animation after a brief delay
        setTimeout(() => setIsVisible(true), 100);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white border-2 border-primary-200 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          {/* Cookie Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Cookie className="w-6 h-6 text-primary-600" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              We use cookies
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies.{" "}
              <Link href="/privacy" className="text-primary-600 hover:text-primary-700 underline font-medium">
                Privacy Policy
              </Link>
              {" "}and{" "}
              <Link href="/terms" className="text-primary-600 hover:text-primary-700 underline font-medium">
                Terms of Service
              </Link>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleReject}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
            >
              Reject All
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

