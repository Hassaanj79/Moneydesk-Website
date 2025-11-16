"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Clock, Briefcase, Users, Zap, Heart, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Careers() {
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const benefitsSectionAnimation = useScrollAnimation({ threshold: 0.2 });
  const jobsAnimation = useScrollAnimation({ threshold: 0.2 });
  const ctaAnimation = useScrollAnimation({ threshold: 0.3 });

  const benefits = [
    {
      icon: Zap,
      title: "Competitive Salary",
      description: "We offer competitive compensation packages that reflect your skills and experience.",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, dental, vision, and wellness programs.",
    },
    {
      icon: Clock,
      title: "Flexible Work",
      description: "Remote work options and flexible hours to support work-life balance.",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Opportunities for professional development and career advancement.",
    },
    {
      icon: Users,
      title: "Great Team",
      description: "Work with talented, passionate people who care about your success.",
    },
    {
      icon: Briefcase,
      title: "Learning Budget",
      description: "Annual budget for conferences, courses, and professional development.",
    },
  ];

  const openPositions = [
    {
      id: 1,
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      description: "We're looking for an experienced full-stack developer to help build and scale our financial management platform.",
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      location: "Remote / San Francisco",
      type: "Full-time",
      description: "Join our design team to create beautiful, intuitive user experiences for our financial management tools.",
    },
    {
      id: 3,
      title: "Marketing Manager",
      department: "Marketing",
      location: "Remote / San Francisco",
      type: "Full-time",
      description: "Lead our marketing efforts to grow our user base and increase brand awareness.",
    },
    {
      id: 4,
      title: "Customer Success Specialist",
      department: "Support",
      location: "Remote",
      type: "Full-time",
      description: "Help our users succeed with MoneyDesk by providing exceptional support and guidance.",
    },
  ];

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-pulse-slow animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl animate-pulse-slow delay-1000" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative text-center mb-12" ref={heroAnimation.ref}>
          <div className={`transition-all duration-1000 ease-out ${
            heroAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <Link
              href="/"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Join the MoneyDesk Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Help us build the future of personal finance management. We're looking for talented individuals who are passionate about making financial management accessible to everyone.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100/50 rounded-full">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
              <span className="text-primary-600 font-semibold text-sm">We're Hiring!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" ref={benefitsSectionAnimation.ref}>
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ease-out ${
            benefitsSectionAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Work at MoneyDesk?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer a supportive environment where you can grow your career while making a real impact
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary-300 transform hover:-translate-y-2 ${
                benefitsSectionAnimation.isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <benefit.icon className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" ref={jobsAnimation.ref}>
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          jobsAnimation.isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Open Positions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our current job openings and find the perfect role for you
          </p>
        </div>

        <div className="space-y-6">
          {openPositions.map((job, index) => (
            <div
              key={job.id}
              className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary-300 transform hover:-translate-y-1 ${
                jobsAnimation.isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {job.title}
                    </h3>
                    <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
                      {job.department}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                </div>
                <div className="md:ml-6">
                  <Link
                    href={`/careers/${job.id}`}
                    className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Open Positions Message */}
        <div className="text-center mt-16 p-8 bg-gray-50 rounded-2xl">
          <p className="text-gray-600 mb-4">
            Don't see a position that matches your skills?
          </p>
          <Link
            href="mailto:support@moneydesk.co?subject=General Application"
            className="text-primary-600 hover:text-primary-700 font-semibold underline"
          >
            Send us your resume anyway
          </Link>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Our Team?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              We're always looking for talented individuals who share our passion for financial empowerment
            </p>
            <Link
              href="mailto:support@moneydesk.co?subject=Career Inquiry"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-10 py-5 rounded-xl text-lg font-bold hover:bg-gray-50 transition-all hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

