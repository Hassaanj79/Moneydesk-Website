"use client";

import Link from "next/link";
import { ArrowRight, Check, TrendingUp, Shield, Target, CreditCard, BarChart3, Sparkles, Zap, Award, Users, Languages } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const statsAnimation = useScrollAnimation({ threshold: 0.3 });
  const featuresAnimation = useScrollAnimation({ threshold: 0.2 });
  const ctaAnimation = useScrollAnimation({ threshold: 0.3 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden">
        <div className="relative max-w-4xl mx-auto" ref={heroAnimation.ref}>
          <div className={`text-center transition-all duration-1000 ease-out ${
            heroAnimation.isVisible || isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary/10 to-secondary/5 text-secondary-dark rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-secondary/20 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
              <Zap className="w-4 h-4" />
              New: AI-powered insights
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Stop wondering where your money went.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600"> Start knowing.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Track expenses, manage budgets, and hit your savings goals. All in one simple app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link
                href="/pricing"
                className="group bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all hover:shadow-2xl hover:shadow-primary-500/50 inline-flex items-center justify-center transform hover:-translate-y-1"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="group bg-white/80 backdrop-blur-sm text-gray-900 border-2 border-primary-300 px-8 py-4 rounded-xl text-lg font-semibold hover:border-primary-500 hover:bg-white transition-all hover:shadow-xl inline-flex items-center justify-center transform hover:-translate-y-1"
              >
                View Pricing
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                Free 14-day trial
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" ref={statsAnimation.ref}>
        <div className={`relative bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-dark rounded-3xl p-12 md:p-16 overflow-hidden transition-all duration-1000 ease-out ${
          statsAnimation.isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 scale-95'
        }`}>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: Users, value: "10K+", label: "Active Users", iconColor: "text-green-300" },
              { icon: Award, value: "4.9/5", label: "User Rating", iconColor: "text-yellow-300" },
              { icon: Zap, value: "99.9%", label: "Uptime", iconColor: "text-green-300" },
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`text-center transition-all duration-700 ease-out ${
                  statsAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl mb-6 transition-all duration-500 hover:scale-110 hover:rotate-3">
                  <stat.icon className={`w-8 h-8 ${stat.iconColor} transition-transform duration-500`} />
                </div>
                <div className="text-5xl font-bold text-white mb-2 transition-all duration-500 hover:scale-105">{stat.value}</div>
                <div className="text-white/90 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="relative py-20 overflow-hidden" ref={featuresAnimation.ref}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
            featuresAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-block px-4 py-2 bg-primary-100/50 rounded-full mb-4 transition-all duration-500 hover:scale-105">
              <span className="text-primary-600 font-semibold text-sm">Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your money, simplified
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your finances, without the complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CreditCard,
                title: "Expense Tracking",
                description: "See exactly where your money goes. Add transactions in seconds and watch your spending habits become crystal clear.",
                color: "primary",
              },
              {
                icon: Target,
                title: "Budget Management",
                description: "Create budgets that actually work. Set limits and get friendly nudges before you overspend.",
                color: "secondary",
              },
              {
                icon: TrendingUp,
                title: "Financial Reports",
                description: "Beautiful charts and reports that show your spending trends and financial health at a glance.",
                color: "success",
              },
              {
                icon: Shield,
                title: "Loan Management",
                description: "Track all your loans in one place. See what you owe, when it's due, and how much interest costs.",
                color: "primary",
              },
              {
                icon: BarChart3,
                title: "Goal Tracking",
                description: "Set savings goals and watch your progress grow. It's surprisingly motivating.",
                color: "accent",
              },
              {
                icon: Sparkles,
                title: "AI Insights",
                description: "Get personalized tips on saving more, spending smarter, and reaching your goals faster.",
                color: "secondary",
              },
              {
                icon: Languages,
                title: "Multi-Language Support",
                description: "Available in English, Spanish, French, German, and more.",
                color: "primary",
              },
            ].map((feature, index) => {
              const colorClasses = {
                primary: "bg-primary-100 text-primary-600",
                secondary: "bg-secondary/20 text-secondary-dark",
                success: "bg-success/20 text-success-dark",
                accent: "bg-accent/30 text-accent-dark",
              };
              
              return (
                <div
                  key={index}
                  className={`group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary-300 transform hover:-translate-y-2 overflow-hidden ${
                    featuresAnimation.isVisible 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-accent-50/0 group-hover:from-primary-50/50 group-hover:to-accent-50/30 transition-all duration-500"></div>
                  
                  <div className="relative">
                    <div className={`w-14 h-14 ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md`}>
                      <feature.icon className="h-7 w-7 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" ref={ctaAnimation.ref}>
        <div className={`relative bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-dark rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden transition-all duration-1000 ease-out ${
          ctaAnimation.isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 scale-95'
        }`}>
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className={`inline-block px-4 py-2 bg-primary-400/30 backdrop-blur-sm rounded-full mb-6 border border-white/20 transition-all duration-700 ${
              ctaAnimation.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`} style={{ transitionDelay: '200ms' }}>
              <span className="text-white font-semibold text-sm">Get Started</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight transition-all duration-700 ${
              ctaAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`} style={{ transitionDelay: '300ms' }}>
              Ready to take control?
            </h2>
            <p className={`text-xl text-white/90 mb-10 max-w-2xl mx-auto transition-all duration-700 ${
              ctaAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`} style={{ transitionDelay: '400ms' }}>
              Start your free 14-day trial. No credit card needed.
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

