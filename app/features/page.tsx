"use client";

import Link from "next/link";
import { Check, CreditCard, Target, TrendingUp, Shield, BarChart3, Sparkles, Calendar, Bell, Globe, ArrowRight, Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const expenseManagementAnimation = useScrollAnimation({ threshold: 0.2 });
  const budgetingAnimation = useScrollAnimation({ threshold: 0.2 });
  const advancedFeaturesAnimation = useScrollAnimation({ threshold: 0.2 });
  const ctaAnimation = useScrollAnimation({ threshold: 0.3 });

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const features = [
    {
      category: "Expense Management",
      items: [
        {
          icon: CreditCard,
          title: "Transaction Tracking",
          description: "Log every transaction in seconds. Whether it's a coffee, a paycheck, or that impulse buy, MoneyDesk helps you categorize it automatically so you always know where your money's going.",
        },
        {
          icon: Calendar,
          title: "Recurring Transactions",
          description: "Stop manually entering the same bills every month. Set up recurring transactions for Netflix, rent, utilities, or anything that repeats. One setup, done forever.",
        },
        {
          icon: Bell,
          title: "Smart Notifications",
          description: "Get helpful reminders before bills are due, when you're close to budget limits, or when you hit a savings milestone. We'll keep you informed without being annoying.",
        },
      ],
    },
    {
      category: "Budgeting & Planning",
      items: [
        {
          icon: Target,
          title: "Budget Creation",
          description: "Build budgets that match how you actually spend. Create separate budgets for groceries, entertainment, or whatever makes sense for your life. Then watch how you're doing in real-time.",
        },
        {
          icon: TrendingUp,
          title: "Spending Analysis",
          description: "See the big picture with beautiful charts and reports. Spot trends, find problem areas, and discover where you can save more. No finance degree required.",
        },
        {
          icon: BarChart3,
          title: "Financial Reports",
          description: "Generate detailed reports on your income, expenses, and overall financial health. Perfect for tax season, financial planning, or just understanding your money better.",
        },
      ],
    },
    {
      category: "Advanced Features",
      items: [
        {
          icon: Shield,
          title: "Loan Management",
          description: "Keep all your loans organized in one place. Track student loans, car payments, credit cards. See what you owe, when it's due, and how much interest is really costing you.",
        },
        {
          icon: Target,
          title: "Savings Goals",
          description: "Set goals for anything: emergency fund, vacation, down payment, or that thing you've been dreaming about. Watch your progress grow and celebrate the wins along the way.",
        },
        {
          icon: Sparkles,
          title: "AI-Powered Insights",
          description: "Our AI analyzes your spending patterns and gives you personalized tips. Maybe you're spending too much on takeout, or you could save more by adjusting a few habits. We'll help you see it.",
        },
        {
          icon: Globe,
          title: "Multi-Currency Support",
          description: "Traveling or living abroad? Manage money in multiple currencies with automatic conversion. See everything in your preferred currency, even if you're spending in others.",
        },
        {
          icon: Languages,
          title: "Multi-Language Support",
          description: "MoneyDesk works in your language. Whether you speak English, Spanish, French, German, or more, we've got you covered. Financial management shouldn't have language barriers.",
        },
        {
          icon: Calendar,
          title: "Google Calendar Integration",
          description: "Never miss a bill payment again. Sync your financial events, bill reminders, and payment due dates directly with your Google Calendar so everything's in one place.",
          upcoming: true,
        },
      ],
    },
  ];

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        
        <div className={`relative text-center mb-16 transition-all duration-1000 ease-out ${
          heroAnimation.isVisible || isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`} ref={heroAnimation.ref}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/30 to-success/20 text-success-dark rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-success/30 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
            Everything you need, nothing you don't
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Features that make managing money
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600"> actually easy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've packed MoneyDesk with everything you need to master your finances, without the complexity. Here's what you get.
          </p>
        </div>

        {/* Features List */}
        {features.map((category, categoryIndex) => {
          const categoryColors = [
            { bg: "bg-primary-100", text: "text-primary-600", border: "border-primary-200" },
            { bg: "bg-secondary/20", text: "text-secondary-dark", border: "border-secondary/30" },
            { bg: "bg-accent/30", text: "text-success-dark", border: "border-accent/40" },
          ];
          const colorScheme = categoryColors[categoryIndex % categoryColors.length];
          
          // Get the appropriate animation hook for each category
          const categoryAnimation = categoryIndex === 0 
            ? expenseManagementAnimation 
            : categoryIndex === 1 
            ? budgetingAnimation 
            : advancedFeaturesAnimation;
          
          return (
            <div 
              key={categoryIndex} 
              className="mb-20"
              ref={categoryAnimation.ref}
            >
              <div className={`inline-block px-6 py-2 ${colorScheme.bg} ${colorScheme.text} rounded-full mb-8 mx-auto shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-1000 ease-out ${
                categoryAnimation.isVisible || isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-5 scale-95'
              }`}>
                <h2 className="text-3xl font-bold text-center">
                  {category.category}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((feature, index) => {
                  const iconColors = [
                    "bg-primary-100 text-primary-600",
                    "bg-secondary/20 text-secondary-dark",
                    "bg-success/20 text-success-dark",
                    "bg-accent/30 text-accent-dark",
                  ];
                  const iconColor = iconColors[index % iconColors.length];
                  
                  return (
                    <div
                      key={index}
                      className={`group relative bg-white/80 backdrop-blur-sm border-2 ${colorScheme.border} rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                        categoryAnimation.isVisible || isVisible 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 translate-y-8 scale-95'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms`, overflow: "visible" }}
                    >
                      {/* Upcoming Badge */}
                      {"upcoming" in feature && feature.upcoming && (
                        <div className="absolute -top-3 right-4 z-20">
                          <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg whitespace-nowrap">
                            Upcoming
                          </span>
                        </div>
                      )}
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 via-accent-50/0 to-success-50/0 group-hover:from-primary-50/30 group-hover:via-accent-50/20 group-hover:to-success-50/30 rounded-2xl transition-all duration-500"></div>
                      
                      <div className="relative">
                        <div className={`w-14 h-14 ${iconColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md`}>
                          <feature.icon className="h-7 w-7 transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* CTA Section */}
        <div 
          className={`relative bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-dark rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden transition-all duration-1000 ease-out ${
            ctaAnimation.isVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-10 scale-95'
          }`}
          ref={ctaAnimation.ref}
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className={`inline-block px-4 py-2 bg-primary-400/30 backdrop-blur-sm rounded-full mb-6 border border-white/20 transition-all duration-700 ${
              ctaAnimation.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`} style={{ transitionDelay: '200ms' }}>
              <span className="text-white font-semibold text-sm">Get Started</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight transition-all duration-700 ${
              ctaAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`} style={{ transitionDelay: '300ms' }}>
              Ready to try it yourself?
            </h2>
            <p className={`text-xl text-white/90 mb-10 max-w-2xl mx-auto transition-all duration-700 ${
              ctaAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`} style={{ transitionDelay: '400ms' }}>
              See why thousands of people trust MoneyDesk to manage their money. Start your free 14-day trial and unlock powerful financial insights.
            </p>
            <Link
              href="/pricing"
              className={`group bg-white text-primary-600 px-10 py-5 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all duration-500 hover:shadow-2xl inline-flex items-center transform hover:-translate-y-1 hover:scale-105 ${
                ctaAnimation.isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

