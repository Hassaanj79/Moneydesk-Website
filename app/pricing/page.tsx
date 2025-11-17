"use client";

import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

// Stripe Price IDs - Replace these with your actual Stripe Price IDs from Stripe Dashboard
// You can find these in: Stripe Dashboard > Products > [Your Product] > Pricing
const STRIPE_PRICE_IDS = {
  monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY || "price_monthly_placeholder",
  annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL || "price_annual_placeholder",
};

export default function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [hoveredFaqIndex, setHoveredFaqIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [showPlanModal, setShowPlanModal] = useState(false);

  const handleGetStarted = (e?: React.MouseEvent) => {
    // Prevent any default behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Show modal to choose plan
    setShowPlanModal(true);
  };

  const handlePlanSelection = (planType: "monthly" | "annual") => {
    // Set the billing period and redirect to signup with plan info
    const signupUrl = `https://app.moneydesk.co/signup?plan=${planType}&billing=${planType}`;
    window.location.href = signupUrl;
  };

  const handleCheckout = async (planType: "monthly" | "annual") => {
    try {
      setLoading(planType);
      
      const priceId = planType === "monthly" 
        ? STRIPE_PRICE_IDS.monthly 
        : STRIPE_PRICE_IDS.annual;

      // Validate price ID is set
      if (!priceId || priceId.includes("placeholder")) {
        alert("Stripe is not configured. Please contact support or check your environment variables.");
        setLoading(null);
        return;
      }

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          billingPeriod: planType,
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Server returned non-JSON response. Status: ${response.status}. Please check server logs.`);
      }

      const data = await response.json();

      if (data.success && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        // If checkout fails, log error and show user-friendly message
        console.error("Checkout failed:", data);
        const errorMsg = data.error || "Failed to create checkout session";
        
        // If it's a configuration error, suggest checking environment variables
        if (errorMsg.includes("not configured") || errorMsg.includes("Price ID")) {
          alert(`Checkout Error: ${errorMsg}\n\nPlease ensure Stripe is properly configured.`);
        } else {
          alert(`Error: ${errorMsg}`);
        }
        setLoading(null);
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      // Check if it's a JSON parse error (might mean server returned HTML error page)
      if (error.message && error.message.includes("JSON")) {
        alert("Server error: Please check that Stripe environment variables are set correctly in Vercel.");
      } else {
        alert(`Error: ${error.message || "Failed to start checkout. Please try again."}`);
      }
      setLoading(null);
    }
  };

  const monthlyPlans = [
    {
      name: "Premium",
      price: "$11.99",
      period: "per month",
      description: "All the tools you need to take control of your money, month after month. Start with a 14-day free trial.",
      features: [
        "Unlimited accounts",
        "Advanced expense tracking",
        "Multiple budgets & categories",
        "Loan management",
        "Savings goals tracker",
        "AI-powered insights",
        "Advanced reports & analytics",
        "Recurring transactions",
        "Multi-currency support",
        "Priority support",
        "Export data (CSV, PDF)",
        "Custom categories",
      ],
      cta: "Start Free Trial",
      ctaLink: "https://app.moneydesk.co/signup",
      popular: true,
      priceId: STRIPE_PRICE_IDS.monthly,
    },
  ];

  const annualPlans = [
    {
      name: "Premium Annual",
      price: "$115.10",
      period: "per year",
      originalPrice: "$143.88",
      savings: "Save 20%",
      description: "Save money while you manage your money. Perfect if you're in it for the long haul. Start with a 14-day free trial.",
      features: [
        "Everything in Premium",
        "20% discount",
        "Billed annually",
        "Cancel anytime",
        "Unlimited accounts",
        "Advanced expense tracking",
        "Multiple budgets & categories",
        "Loan management",
        "Savings goals tracker",
        "AI-powered insights",
        "Advanced reports & analytics",
        "Recurring transactions",
        "Multi-currency support",
        "Priority support",
        "Export data (CSV, PDF)",
        "Custom categories",
      ],
      cta: "Start Free Trial",
      ctaLink: "https://app.moneydesk.co/signup",
      popular: true,
    },
  ];

  const getCurrentPlans = () => {
    switch (billingPeriod) {
      case "monthly":
        return monthlyPlans;
      case "annual":
        return annualPlans;
      default:
        return monthlyPlans;
    }
  };

  const currentPlans = getCurrentPlans();

  // Check for cancel parameters in URL (success redirects to signup page)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("canceled")) {
        // Handle canceled payment
        console.log("Payment canceled");
        // Optionally show a message
      }
    }
  }, []);

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        
        <div className="relative text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-success/20 to-success/10 text-success-dark rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-success/30 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
            No hidden fees • Cancel anytime • <strong>14-day free trial</strong> • No charge until trial ends
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Pricing that makes sense
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600"> for real people</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Pick what works for you. Monthly or yearly billing. No tricks, no surprises. Just straightforward pricing.
          </p>

          {/* Billing Period Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-base font-medium transition-colors ${
              billingPeriod === "monthly" ? "text-gray-900" : "text-gray-500"
            }`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
              className="relative inline-flex h-11 w-20 items-center rounded-full bg-primary-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer"
              role="switch"
              aria-checked={billingPeriod === "annual"}
              aria-label="Toggle billing period"
            >
              <span
                className={`inline-block h-9 w-9 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
                  billingPeriod === "annual" ? "translate-x-10" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-base font-medium transition-colors ${
              billingPeriod === "annual" ? "text-gray-900" : "text-gray-500"
            }`}>
              Annually <span className="text-success-dark text-sm font-normal">(-20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="relative grid gap-8 mb-12 transition-all duration-500 md:grid-cols-1 lg:grid-cols-1 max-w-md mx-auto">
          {currentPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group ${
                plan.popular
                  ? billingPeriod === "annual"
                    ? "bg-gradient-to-br from-white to-success-50/40 border-2 border-success/40 shadow-xl hover:border-success/60"
                    : "bg-gradient-to-br from-white to-primary-50/30 border-2 border-primary-500 shadow-xl hover:scale-105"
                  : "bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-primary-300"
              }`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold shadow-lg animate-pulse ${
                    billingPeriod === "annual"
                      ? "bg-success/30 text-success-dark border border-success/40"
                      : "bg-gradient-to-r from-primary-500 to-secondary-dark text-white"
                  }`}>
                    {billingPeriod === "annual" ? "Best Value" : "Most Popular"}
                  </span>
                </div>
              )}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                plan.popular
                  ? billingPeriod === "annual"
                    ? "bg-gradient-to-br from-success-50/0 to-accent-50/0 group-hover:from-success-50/40 group-hover:to-accent-50/30"
                    : "bg-gradient-to-br from-primary-100/0 to-accent-100/0 group-hover:from-primary-100/30 group-hover:to-accent-100/20"
                  : "bg-gradient-to-br from-gray-50/0 to-primary-50/0 group-hover:from-gray-50/50 group-hover:to-primary-50/30"
              }`}></div>
              <div className="relative">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {plan.name}
                    </h3>
                    {("savings" in plan && plan.savings) ? (
                      <span className="bg-success/20 text-success-dark text-xs font-semibold px-2 py-1 rounded">
                        {String(plan.savings)}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex items-baseline mb-2">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{plan.period}
                    </span>
                  </div>
                  {("originalPrice" in plan && plan.originalPrice) ? (
                    <p className="text-sm text-gray-500 line-through mb-1">
                      {String(plan.originalPrice)} per year
                    </p>
                  ) : null}
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleCheckout(billingPeriod)}
                  disabled={loading === billingPeriod}
                  className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {loading === billingPeriod ? "Processing..." : plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="relative max-w-3xl mx-auto mt-20">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary-100/50 rounded-full mb-4">
              <span className="text-primary-600 font-semibold text-sm">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "How does the 14-day free trial work?",
                a: "Start your free trial by entering your card details (no charge). After 14 days, your subscription automatically begins and you'll be charged. Your card will be charged automatically at the end of the trial period. You can cancel anytime during the trial with no charge.",
              },
              {
                q: "Do I need a credit card to start?",
                a: "Yes, we require a valid payment method (credit or debit card) to start your trial. This allows us to automatically activate your subscription after the 14-day trial ends. You won't be charged until after the trial period. You can cancel anytime during the trial.",
              },
              {
                q: "Can I switch plans later?",
                a: "Absolutely. Upgrade, downgrade, or switch between monthly and annual anytime. We'll prorate the difference, so you only pay for what you use.",
              },
              {
                q: "How do I pay?",
                a: "We accept all major credit and debit cards. Everything's processed securely through Stripe, so your payment info stays safe.",
              },
              {
                q: "What if I want to cancel?",
                a: "No problem at all. Cancel anytime from your account settings or during the trial period. You'll keep access until the end of your billing period (or trial). No questions asked.",
              },
            ].map((faq, index) => {
              const isHovered = hoveredFaqIndex === index;
              
              return (
                <div 
                  key={index} 
                  className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl overflow-hidden hover:border-primary-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredFaqIndex(index)}
                  onMouseLeave={() => setHoveredFaqIndex(null)}
                >
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors flex items-center gap-2">
                      <span className="text-primary-500">•</span>
                      {faq.q}
                    </h3>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        isHovered ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
                Ready to get started?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join thousands of people who've taken control of their finances. Start your <strong>14-day free trial</strong>. You won't be charged until after the trial ends.
              </p>
              <button
                type="button"
                onClick={(e) => handleGetStarted(e)}
                className="group bg-white text-primary-600 px-10 py-5 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all hover:shadow-2xl inline-flex items-center transform hover:-translate-y-1"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Selection Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowPlanModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h3>
              <p className="text-gray-600">Select a billing period to continue</p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => handlePlanSelection("monthly")}
                className="w-full p-6 rounded-xl border-2 border-primary-500 bg-gradient-to-br from-white to-primary-50/30 hover:from-primary-50 hover:to-primary-100 transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Monthly Plan</h4>
                    <p className="text-2xl font-bold text-primary-600 mb-1">$11.99<span className="text-sm font-normal text-gray-600">/month</span></p>
                    <p className="text-sm text-gray-600">14-day free trial included</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-primary-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => handlePlanSelection("annual")}
                className="w-full p-6 rounded-xl border-2 border-success/40 bg-gradient-to-br from-white to-success-50/40 hover:from-success-50 hover:to-success-100 transition-all text-left group relative"
              >
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-success/30 text-success-dark text-xs font-semibold px-3 py-1 rounded-full border border-success/40">
                    Best Value
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Annual Plan</h4>
                    <div className="flex items-baseline gap-2 mb-1">
                      <p className="text-2xl font-bold text-success-dark">$115.10<span className="text-sm font-normal text-gray-600">/year</span></p>
                      <span className="text-xs bg-success/20 text-success-dark px-2 py-1 rounded">Save 20%</span>
                    </div>
                    <p className="text-sm text-gray-600">14-day free trial included</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-success-dark group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowPlanModal(false)}
              className="w-full mt-6 py-3 text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

