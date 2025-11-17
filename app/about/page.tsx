"use client";

import Link from "next/link";
import { ArrowRight, Heart, Target, Users, Zap, Shield, Globe, Award, TrendingUp, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const missionAnimation = useScrollAnimation({ threshold: 0.3 });
  const storyAnimation = useScrollAnimation({ threshold: 0.2 });
  const valuesAnimation = useScrollAnimation({ threshold: 0.2 });
  const ctaAnimation = useScrollAnimation({ threshold: 0.3 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: Heart,
      title: "User-Centric",
      description: "Everything we build starts with understanding your needs and making your financial life easier.",
      color: "primary",
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Your financial data is encrypted and protected. We take privacy and security seriously.",
      color: "success",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We're constantly improving and adding new features based on user feedback and latest technology.",
      color: "secondary",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Financial management should be available to everyone, regardless of location or background.",
      color: "accent",
    },
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Active Users", color: "text-primary-600" },
    { icon: TrendingUp, value: "99.9%", label: "Uptime", color: "text-success-dark" },
    { icon: Award, value: "4.9/5", label: "User Rating", color: "text-secondary-dark" },
    { icon: Globe, value: "50+", label: "Countries", color: "text-accent-dark" },
  ];

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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 text-primary-600 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-primary/20 shadow-lg">
              <Heart className="w-4 h-4" />
              About MoneyDesk
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              We're here to help you
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600"> take control</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              MoneyDesk was born from a simple idea: managing your money shouldn't be complicated, stressful, or expensive.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" ref={missionAnimation.ref}>
        <div className={`relative bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-dark rounded-3xl p-12 md:p-16 overflow-hidden transition-all duration-1000 ease-out ${
          missionAnimation.isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 scale-95'
        }`}>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center transition-all duration-700 ease-out ${
                  missionAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl mb-6 transition-all duration-500 hover:scale-110">
                  <stat.icon className={`w-8 h-8 text-white transition-transform duration-500`} />
                </div>
                <div className="text-5xl font-bold text-white mb-2 transition-all duration-500">{stat.value}</div>
                <div className="text-white/90 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="relative py-20 overflow-hidden" ref={missionAnimation.ref}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
            missionAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-block px-4 py-2 bg-primary-100/50 rounded-full mb-4">
              <span className="text-primary-600 font-semibold text-sm">Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Making financial management simple
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We believe everyone deserves to understand and control their finances, without the complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ease-out ${
              missionAnimation.isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-10'
            }`}>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
                <Target className="w-12 h-12 text-primary-600 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To empower individuals and families to take complete control of their financial lives through intuitive, accessible, and powerful tools.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We're not just building software—we're building confidence, clarity, and financial freedom for everyone.
                </p>
              </div>
            </div>

            <div className={`transition-all duration-1000 ease-out ${
              missionAnimation.isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-10'
            }`} style={{ transitionDelay: '200ms' }}>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
                <Zap className="w-12 h-12 text-secondary-dark mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  A world where financial stress is a thing of the past, and everyone has the tools and knowledge to achieve their financial goals.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We envision a future where managing money is as natural and stress-free as checking the weather.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative py-20 overflow-hidden" ref={storyAnimation.ref}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
            storyAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-block px-4 py-2 bg-primary-100/50 rounded-full mb-4">
              <span className="text-primary-600 font-semibold text-sm">Our Story</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why MoneyDesk exists
            </h2>
          </div>

          <div className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${
            storyAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                MoneyDesk started when we realized that managing personal finances shouldn't require a finance degree or expensive software. 
                We saw people struggling with spreadsheets, forgetting bills, and feeling overwhelmed by their financial situation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We set out to create something different—a tool that's powerful enough for serious financial management, 
                but simple enough that anyone can use it. No confusing jargon, no hidden fees, no complicated setup.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, MoneyDesk helps thousands of people around the world take control of their finances. 
                We're constantly improving based on your feedback, because your success is our success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="relative py-20 overflow-hidden" ref={valuesAnimation.ref}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
            valuesAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-block px-4 py-2 bg-primary-100/50 rounded-full mb-4">
              <span className="text-primary-600 font-semibold text-sm">Our Values</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What drives us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
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
                    valuesAnimation.isVisible 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`w-14 h-14 ${colorClasses[value.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md`}>
                    <value.icon className="h-7 w-7 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose MoneyDesk */}
      <section className="relative py-20 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary-100/50 rounded-full mb-4">
              <span className="text-primary-600 font-semibold text-sm">Why MoneyDesk</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built for you, by people who care
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              "Simple, intuitive interface that anyone can use",
              "Powerful features without the complexity",
              "Your data is encrypted and secure",
              "No hidden fees or surprise charges",
              "Works on all your devices",
              "Constantly improving based on your feedback",
              "Available in multiple languages",
              "Dedicated support when you need it",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
              >
                <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to take control of your finances?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of users who are already managing their money better with MoneyDesk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://app.moneydesk.co/signup"
                className="group bg-white text-primary-600 px-10 py-5 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all duration-500 hover:shadow-2xl inline-flex items-center justify-center transform hover:-translate-y-1 hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/contact"
                className="group bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-5 rounded-xl text-lg font-bold hover:bg-white/20 transition-all duration-500 inline-flex items-center justify-center transform hover:-translate-y-1"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

