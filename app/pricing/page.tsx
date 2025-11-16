"use client";

import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with personal finance management",
      features: [
        "Up to 5 accounts",
        "Basic expense tracking",
        "Simple budget creation",
        "Transaction history",
        "Basic reports",
        "Mobile app access",
      ],
      cta: "Get Started",
      ctaLink: "https://app.moneydesk.co/signup",
      popular: false,
    },
    {
      name: "Premium",
      price: "$11.99",
      period: "per month",
      description: "Everything you need for comprehensive financial management",
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

  const annualPlan = {
    name: "Premium Annual",
    price: "$115.10",
    period: "per year",
    originalPrice: "$143.88",
    savings: "Save 20%",
    description: "Best value for long-term financial planning",
    features: [
      "Everything in Premium",
      "20% discount",
      "Billed annually",
      "Cancel anytime",
    ],
    cta: "Start Free Trial",
    ctaLink: "https://app.moneydesk.co/signup",
    popular: false,
  };

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-primary-50/50 via-white to-accent-50/30 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-success/20 to-success/10 text-success-dark rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-success/30 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
            No hidden fees • Cancel anytime
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, transparent
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600"> pricing</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for you. Start free, upgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Free Plan */}
          <div 
            className="relative bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary-300 group"
            onMouseEnter={() => setHoveredPlan(0)}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br from-gray-50/0 to-primary-50/0 group-hover:from-gray-50/50 group-hover:to-primary-50/30 rounded-2xl transition-all duration-300`}></div>
            <div className="relative">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plans[0].name}
                </h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-gray-900">
                    {plans[0].price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{plans[0].period}
                  </span>
                </div>
                <p className="text-gray-600">{plans[0].description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plans[0].features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plans[0].ctaLink}
                className="block w-full bg-gray-900 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {plans[0].cta}
              </Link>
            </div>
          </div>

          {/* Premium Monthly Plan */}
          <div 
            className="relative bg-gradient-to-br from-white to-primary-50/30 border-2 border-primary-500 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 group"
            onMouseEnter={() => setHoveredPlan(1)}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            {plans[1].popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-primary-500 to-secondary-dark text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                  Most Popular
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100/0 to-accent-100/0 group-hover:from-primary-100/30 group-hover:to-accent-100/20 rounded-2xl transition-all duration-300"></div>
            <div className="relative">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plans[1].name}
                </h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-gray-900">
                    {plans[1].price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{plans[1].period}
                  </span>
                </div>
                <p className="text-gray-600">{plans[1].description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plans[1].features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plans[1].ctaLink}
                className="block w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {plans[1].cta}
              </Link>
            </div>
          </div>

          {/* Premium Annual Plan */}
          <div 
            className="relative bg-gradient-to-br from-white to-accent-50/40 border-2 border-success/40 rounded-2xl p-8 transition-all duration-300 hover:border-success/60 hover:shadow-2xl hover:-translate-y-2 group"
            onMouseEnter={() => setHoveredPlan(2)}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-success-50/0 to-accent-50/0 group-hover:from-success-50/40 group-hover:to-accent-50/30 rounded-2xl transition-all duration-300"></div>
            <div className="relative">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {annualPlan.name}
                  </h3>
                  <span className="bg-success/20 text-success-dark text-xs font-semibold px-2 py-1 rounded">
                    {annualPlan.savings}
                  </span>
                </div>
                <div className="flex items-baseline mb-2">
                  <span className="text-5xl font-bold text-gray-900">
                    {annualPlan.price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{annualPlan.period}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-through mb-1">
                  {annualPlan.originalPrice} per year
                </p>
                <p className="text-gray-600">{annualPlan.description}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {annualPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={annualPlan.ctaLink}
                className="block w-full bg-gray-900 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {annualPlan.cta}
              </Link>
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
                q: "Can I change plans anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards and debit cards. All payments are processed securely through Stripe.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes! All plans come with a 14-day free trial. No credit card required to start.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
              },
            ].map((faq, index) => (
              <div 
                key={index} 
                className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors flex items-center gap-2">
                  <span className="text-primary-500">•</span>
                  {faq.q}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
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
                Ready to experience these features?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Start your free trial today and see how MoneyDesk can transform your financial management.
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

