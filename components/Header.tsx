"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center ring-2 ring-primary-200 group-hover:ring-primary-400 transition-all">
              <Image
                src="/header-logo.png"
                alt="MoneyDesk Logo"
                width={32}
                height={32}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors hidden sm:inline">MoneyDesk</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 absolute left-1/2 transform -translate-x-1/2 z-10">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-all font-medium relative group py-2 text-sm xl:text-base whitespace-nowrap ${
                    isActive 
                      ? "text-primary-600" 
                      : "text-gray-700 hover:text-primary-500"
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
            <Link
              href="https://app.moneydesk.co/login"
              className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-all font-medium text-sm shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Sign In
            </Link>
            <Link
              href="https://calendar.app.google/BJJfoBivAGr47vUz5"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary-500 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all font-medium text-sm shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Book Demo
            </Link>
            <Link
              href="/pricing"
              className="bg-gradient-to-r from-secondary-dark to-secondary text-white px-4 py-2 rounded-lg hover:from-secondary hover:to-secondary-light transition-all font-medium text-sm shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-slide-up">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block transition-all duration-300 transform hover:translate-x-2 ${
                    isActive 
                      ? "text-primary-600 font-semibold border-l-4 border-primary-500 pl-3" 
                      : "text-gray-700 hover:text-primary-500"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 space-y-2 border-t">
              <Link
                href="https://app.moneydesk.co/login"
                className="block bg-primary-500 text-white px-6 py-2 rounded-lg text-center hover:bg-primary-600 transition-all duration-300 shadow-sm transform hover:scale-105"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="https://calendar.app.google/BJJfoBivAGr47vUz5"
                target="_blank"
                rel="noopener noreferrer"
                className="block border-2 border-primary-500 text-primary-600 px-6 py-2 rounded-lg text-center hover:bg-primary-50 transition-all duration-300 shadow-sm transform hover:scale-105"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Demo
              </Link>
              <Link
                href="/pricing"
                className="block bg-gradient-to-r from-secondary-dark to-secondary text-white px-6 py-2 rounded-lg text-center hover:from-secondary hover:to-secondary-light transition-all duration-300 shadow-sm transform hover:scale-105"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

