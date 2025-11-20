"use client";

import Link from "next/link";
import { Check, ArrowRight, Sparkles, TrendingUp, Shield, Zap, Target, DollarSign, Brain, Heart, Plane, Users, BarChart3, CreditCard, Calendar } from "lucide-react";
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
      originalPrice: "$14.39",
      description: "All the tools you need to take control of your money, month after month. Start with a 30-day free trial. No credit card required.",
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
      price: "$103.61",
      period: "per year",
      originalPrice: "$172.68",
      savings: "Save 40%",
      description: "Save money while you manage your money. Perfect if you're in it for the long haul. Start with a 30-day free trial. No credit card required.",
      features: [
        "Everything in Premium",
        "40% discount",
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
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 overflow-hidden">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-success/20 to-success/10 text-success-dark rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-success/30">
            <Sparkles className="w-4 h-4" />
            <span>30-day free trial • No credit card required</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Simple pricing for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600"> everyone</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your free 30-day trial today. No credit card required. Cancel anytime.
          </p>
        </div>

        {/* Billing Period Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
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
            Annual <span className="text-success-dark text-sm font-normal">(Save 40%)</span>
          </span>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto mb-20">
          <div className={`relative rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
            billingPeriod === "annual"
              ? "bg-white border border-secondary/30 shadow-2xl"
              : "bg-white border border-primary/30 shadow-2xl"
          }`}>
            {billingPeriod === "annual" && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-secondary-dark"></div>
            )}
            {billingPeriod === "monthly" && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600"></div>
            )}
            
            {billingPeriod === "annual" && (
              <div className="absolute top-6 right-6">
                <span className="bg-secondary text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                  Best Value - Save 40%
                </span>
              </div>
            )}
            
            <div className="p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {billingPeriod === "annual" ? "Annual Plan" : "Monthly Plan"}
                </h2>
                
                <div className="mb-6">
                  {billingPeriod === "annual" ? (
                    <>
                      <div className="mb-3">
                        <span className="text-6xl font-bold text-gray-900">$8.63</span>
                        <span className="text-gray-500 text-xl ml-2 font-medium">/month</span>
                      </div>
                      <div className="mb-3">
                        <span className="text-xl font-semibold text-gray-600">$103.61</span>
                        <span className="text-gray-500 ml-2 text-sm">billed annually</span>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary-dark text-sm font-semibold px-4 py-2 rounded-lg border border-secondary/20">
                        <span>Save $69 per year</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-3">
                        <span className="text-6xl font-bold text-gray-900">$11.99</span>
                        <span className="text-gray-500 text-xl ml-2 font-medium">/month</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg text-gray-400 line-through">$14.39</span>
                        <span className="bg-success/10 text-success-dark text-xs font-semibold px-2.5 py-1 rounded-md border border-success/20">
                          Discounted
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-8 mb-8 border border-gray-200/50">
                <ul className="space-y-3.5">
                  {currentPlans[0]?.features.slice(0, 6).map((feature, index) => (
                    <li key={index} className="flex items-start group">
                      <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-gray-400 text-center mb-6">
                *USD; plus tax where applicable. No credit card required.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="relative bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-dark rounded-3xl p-8 md:p-10 text-center text-white shadow-2xl overflow-hidden">
            <div className="relative z-10">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
                <span className="text-white font-semibold text-sm">Ready to Get Started?</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Start your free 30-day trial today
              </h2>
              <p className="text-lg text-white/90 mb-6 max-w-3xl mx-auto">
                No credit card required. Cancel anytime. Join thousands who are taking control of their finances.
              </p>
              <Link
                href="https://app.moneydesk.co/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white text-primary-600 px-10 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all duration-500 hover:shadow-2xl inline-flex items-center transform hover:-translate-y-1 hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Facts & Figures Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why thousands choose MoneyDesk
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how MoneyDesk can help you take control of your finances
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: DollarSign,
                stat: "30",
                label: "Days free trial",
                description: "Full access to all features, no credit card required",
                color: "text-primary-600",
                bgColor: "bg-primary-100",
              },
              {
                icon: BarChart3,
                stat: "Unlimited",
                label: "Accounts & budgets",
                description: "Track as many accounts and budgets as you need",
                color: "text-success-dark",
                bgColor: "bg-success/20",
              },
              {
                icon: Zap,
                stat: "24/7",
                label: "Available",
                description: "Access your finances anytime, anywhere",
                color: "text-secondary-dark",
                bgColor: "bg-secondary/20",
              },
              {
                icon: Shield,
                stat: "100%",
                label: "Secure & private",
                description: "Bank-level encryption for your financial data",
                color: "text-accent-dark",
                bgColor: "bg-accent/30",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 ${item.bgColor} ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{item.stat}</div>
                <div className="text-sm font-semibold text-gray-700 mb-2">{item.label}</div>
                <div className="text-xs text-gray-600">{item.description}</div>
              </div>
            ))}
          </div>

          {/* Benefits Grid */}
          <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-dark rounded-3xl p-12 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                What you can achieve with MoneyDesk
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl font-bold mb-2">Save time</div>
                <div className="text-white/80 text-sm mb-2">Track expenses in minutes instead of hours</div>
                <div className="text-xs text-white/60">Automated categorization can help reduce manual data entry time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl font-bold mb-2">Better visibility</div>
                <div className="text-white/80 text-sm mb-2">See all your finances in one place</div>
                <div className="text-xs text-white/60">Centralized view of accounts, budgets, and goals</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl font-bold mb-2">Goal tracking</div>
                <div className="text-white/80 text-sm mb-2">Set and monitor savings goals</div>
                <div className="text-xs text-white/60">Visual progress tracking may help you stay motivated</div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-xs text-white/70 text-center">
                *Individual results may vary. Savings and time benefits depend on individual usage patterns and financial situations. 
                MoneyDesk is a tool to help you manage your finances and does not guarantee specific financial outcomes.
              </p>
            </div>
          </div>
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
                q: "How does the 30-day free trial work?",
                a: "Start your free trial instantly - no credit card required! After 30 days, you can choose to continue with a subscription. You won't be charged anything during the trial period. Cancel anytime during the trial with no charge.",
              },
              {
                q: "Do I need a credit card to start?",
                a: "No credit card required! You can start your 30-day free trial completely free. After the trial ends, you can choose to continue with a subscription. No payment method needed to get started.",
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
                    <p className="text-sm text-gray-600">30-day free trial included • No credit card required</p>
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
                      <p className="text-2xl font-bold text-success-dark">$103.61<span className="text-sm font-normal text-gray-600">/year</span></p>
                      <span className="text-xs bg-success/20 text-success-dark px-2 py-1 rounded">Save 40%</span>
                    </div>
                    <p className="text-sm text-gray-600">30-day free trial included • No credit card required</p>
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

