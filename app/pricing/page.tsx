"use client";

import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual" | "lifetime">("monthly");
  const [hoveredFaqIndex, setHoveredFaqIndex] = useState<number | null>(null);

  const monthlyPlans = [
    {
      name: "Premium",
      price: "$11.99",
      period: "per month",
      description: "All the tools you need to take control of your money, month after month",
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
    },
  ];

  const annualPlans = [
    {
      name: "Premium Annual",
      price: "$115.10",
      period: "per year",
      originalPrice: "$143.88",
      savings: "Save 20%",
      description: "Save money while you manage your money. Perfect if you're in it for the long haul",
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
      popular: false,
    },
  ];

  const lifetimePlans = [
    {
      name: "Lifetime",
      price: "$499",
      period: "one-time",
      originalPrice: "$1,438.80",
      savings: "Save 65%",
      description: "Tired of monthly fees? One-time payment for lifetime access to the portal",
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
        "Lifetime access",
        "No recurring fees",
        "All future features included",
      ],
      cta: "Get Started",
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
      case "lifetime":
        return lifetimePlans;
      default:
        return monthlyPlans;
    }
  };

  const currentPlans = getCurrentPlans();

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        
        <div className="relative text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-success/20 to-success/10 text-success-dark rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-success/30 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
            No hidden fees • Cancel anytime • 14-day free trial
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Pricing that makes sense
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600"> for real people</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Pick what works for you. Monthly, yearly, or pay once and you're done. No tricks, no surprises. Just straightforward pricing.
          </p>

          {/* Billing Period Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                billingPeriod === "monthly"
                  ? "bg-primary-500 text-white shadow-lg scale-105"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 border-2 border-gray-200 hover:border-primary-300"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                billingPeriod === "annual"
                  ? "bg-primary-500 text-white shadow-lg scale-105"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 border-2 border-gray-200 hover:border-primary-300"
              }`}
            >
              Annual
            </button>
            <button
              onClick={() => setBillingPeriod("lifetime")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                billingPeriod === "lifetime"
                  ? "bg-primary-500 text-white shadow-lg scale-105"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 border-2 border-gray-200 hover:border-primary-300"
              }`}
            >
              Lifetime
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className={`relative grid gap-8 mb-12 transition-all duration-500 ${
          billingPeriod === "lifetime" 
            ? "md:grid-cols-1 lg:grid-cols-1 max-w-md mx-auto" 
            : "md:grid-cols-1 lg:grid-cols-1 max-w-md mx-auto"
        }`}>
          {currentPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group ${
                plan.popular
                  ? billingPeriod === "lifetime"
                    ? "bg-gradient-to-br from-white to-success-50/40 border-2 border-success/40 shadow-xl hover:border-success/60"
                    : billingPeriod === "annual"
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
                    billingPeriod === "lifetime" || billingPeriod === "annual"
                      ? "bg-success/30 text-success-dark border border-success/40"
                      : "bg-gradient-to-r from-primary-500 to-secondary-dark text-white"
                  }`}>
                    {billingPeriod === "lifetime" ? "Best Value" : "Most Popular"}
                  </span>
                </div>
              )}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                plan.popular
                  ? billingPeriod === "lifetime" || billingPeriod === "annual"
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
                      {plan.period === "one-time" ? "" : "/"}{plan.period}
                    </span>
                  </div>
                  {("originalPrice" in plan && plan.originalPrice) ? (
                    <p className="text-sm text-gray-500 line-through mb-1">
                      {plan.period === "one-time" 
                        ? `${String(plan.originalPrice)} (vs 10 years monthly)`
                        : `${String(plan.originalPrice)} per year`
                      }
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
                <Link
                  href={plan.ctaLink}
                  className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg transform hover:-translate-y-0.5 ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {plan.cta}
                </Link>
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
                q: "Can I switch plans later?",
                a: "Absolutely. Upgrade, downgrade, or switch between monthly and annual anytime. We'll prorate the difference, so you only pay for what you use.",
              },
              {
                q: "How do I pay?",
                a: "We accept all major credit and debit cards. Everything's processed securely through Stripe, so your payment info stays safe.",
              },
              {
                q: "Do I need a credit card to start?",
                a: "Nope. Start your 14-day free trial without entering any payment info. We'll only ask when you're ready to continue after the trial.",
              },
              {
                q: "What if I want to cancel?",
                a: "No problem at all. Cancel anytime from your account settings. You'll keep access until the end of your billing period. No questions asked.",
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
                Join thousands of people who've taken control of their finances. Start your free 14-day trial. No credit card needed.
              </p>
              <Link
                href="https://app.moneydesk.co/signup"
                className="group bg-white text-primary-600 px-10 py-5 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all hover:shadow-2xl inline-flex items-center transform hover:-translate-y-1"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

