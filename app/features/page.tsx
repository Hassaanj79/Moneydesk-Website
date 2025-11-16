"use client";

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
          description: "Record and categorize all your income and expenses with ease. Support for multiple accounts and currencies.",
        },
        {
          icon: Calendar,
          title: "Recurring Transactions",
          description: "Set up automatic recurring transactions for subscriptions, bills, and regular income.",
        },
        {
          icon: Bell,
          title: "Smart Notifications",
          description: "Get alerts for upcoming bills, budget limits, and important financial milestones.",
        },
      ],
    },
    {
      category: "Budgeting & Planning",
      items: [
        {
          icon: Target,
          title: "Budget Creation",
          description: "Create custom budgets for different categories and time periods. Track your spending against your limits.",
        },
        {
          icon: TrendingUp,
          title: "Spending Analysis",
          description: "Analyze your spending patterns with detailed reports and visualizations to identify areas for improvement.",
        },
        {
          icon: BarChart3,
          title: "Financial Reports",
          description: "Generate comprehensive reports on your income, expenses, and financial health over time.",
        },
      ],
    },
    {
      category: "Advanced Features",
      items: [
        {
          icon: Shield,
          title: "Loan Management",
          description: "Track loans, calculate interest (fixed or percentage), manage installments, and monitor repayment schedules.",
        },
        {
          icon: Target,
          title: "Savings Goals",
          description: "Set and track savings goals with automatic progress monitoring and milestone celebrations.",
        },
        {
          icon: Sparkles,
          title: "AI-Powered Insights",
          description: "Get personalized financial advice and insights powered by artificial intelligence to optimize your finances.",
        },
        {
          icon: Globe,
          title: "Multi-Currency Support",
          description: "Manage finances in multiple currencies with automatic conversion and exchange rate tracking.",
        },
        {
          icon: Languages,
          title: "Multi-Language Support",
          description: "Use MoneyDesk in your preferred language. Available in English, Spanish, French, German, and more.",
        },
      ],
    },
  ];

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-primary-50 via-white to-secondary/5 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-pulse-slow animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl animate-pulse-slow delay-1000" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-100/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className={`relative text-center mb-16 transition-all duration-1000 ease-out ${
          heroAnimation.isVisible || isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`} ref={heroAnimation.ref}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/30 to-success/20 text-success-dark rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-success/30 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
            Comprehensive Financial Management
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Powerful features for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600"> better finances</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to take control of your money, all in one intuitive platform.
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
                      className={`group relative bg-white/80 backdrop-blur-sm border-2 ${colorScheme.border} rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                        categoryAnimation.isVisible || isVisible 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 translate-y-8 scale-95'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
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
              Ready to experience these features?
            </h2>
            <p className={`text-xl text-white/90 mb-10 max-w-2xl mx-auto transition-all duration-700 ${
              ctaAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`} style={{ transitionDelay: '400ms' }}>
              Start your free trial today and see how MoneyDesk can transform your financial management.
            </p>
            <a
              href="https://app.moneydesk.co/signup"
              className={`group bg-white text-primary-600 px-10 py-5 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all duration-500 hover:shadow-2xl inline-flex items-center transform hover:-translate-y-1 hover:scale-105 ${
                ctaAnimation.isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

