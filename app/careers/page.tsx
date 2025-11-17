"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Briefcase, Users, Zap, Heart, TrendingUp, MapPin, FileText } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements?: string;
  published: boolean;
}

export default function Careers() {
  const heroAnimation = useScrollAnimation({ threshold: 0.2 });
  const benefitsSectionAnimation = useScrollAnimation({ threshold: 0.2 });
  const jobsAnimation = useScrollAnimation({ threshold: 0.2 });
  const ctaAnimation = useScrollAnimation({ threshold: 0.3 });
  const [openPositions, setOpenPositions] = useState<JobPosition[]>([]);

  useEffect(() => {
    // Load positions from localStorage
    const storedPositions = localStorage.getItem("moneydesk_job_positions");
    if (storedPositions) {
      const positions = JSON.parse(storedPositions);
      // Only show published positions
      const publishedPositions = positions.filter((job: JobPosition) => job.published);
      setOpenPositions(publishedPositions);
    }
  }, []);

  const benefits = [
    {
      icon: Zap,
      title: "Competitive Salary",
      description: "We pay well because good people deserve good compensation. Your skills and experience matter, and we'll make sure you're rewarded for them.",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Your health comes first. We offer comprehensive health, dental, and vision insurance, plus wellness programs to keep you feeling your best.",
    },
    {
      icon: Clock,
      title: "Flexible Work",
      description: "Work from wherever makes sense for you. We trust you to get your work done, whether that's at home, in an office, or somewhere in between.",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "We want you to grow. Whether that's learning new skills, taking on bigger projects, or moving into leadership, we'll support your journey.",
    },
    {
      icon: Users,
      title: "Great Team",
      description: "You'll work with smart, kind people who actually care about what we're building. No egos, no politics. Just good people doing good work.",
    },
    {
      icon: Briefcase,
      title: "Learning Budget",
      description: "Want to go to a conference? Take a course? Read some books? We'll cover it. Learning is part of the job, and we'll invest in yours.",
    },
  ];

  return (
    <div className="pt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">

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
              Help us make money management
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600"> less stressful</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're building tools that help real people take control of their finances. If you're passionate about making money management simpler and less intimidating, we'd love to talk.
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
              Why work with us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're building something that actually matters. Here's what makes working at MoneyDesk different.
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
            {openPositions.length === 0 
              ? "We don't have any positions available at the moment. Check back soon!"
              : "Explore our current job openings and find the perfect role for you"
            }
          </p>
        </div>

        {openPositions.length === 0 ? (
          <div className={`text-center py-20 transition-all duration-1000 ease-out ${
            jobsAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
              <Briefcase className="w-10 h-10 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Open Positions</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We don't have any positions available at the moment. Check back soon for new opportunities!
            </p>
            <Link
              href="mailto:support@moneydesk.co?subject=General Application"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold underline"
            >
              Send us your resume anyway
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
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
                      href={`/careers/apply/${job.id}`}
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
        )}
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
              Think you'd be a good fit?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Even if we don't have an open position right now, we're always interested in talking to talented people who share our mission.
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

