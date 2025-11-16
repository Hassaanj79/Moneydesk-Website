import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  const footerLinks = {
    product: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Security", href: "#" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
    resources: [
      { label: "Documentation", href: "#" },
      { label: "Support", href: "/contact" },
      { label: "API", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/privacy#cookies" },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center ring-2 ring-primary-200 group-hover:ring-primary-400 transition-all">
                <Image
                  src="/header-logo.png"
                  alt="MoneyDesk Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">MoneyDesk</span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Personal finance management made simple.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="group text-gray-400 hover:text-primary-500 transition-all transform hover:-translate-y-1">
                <Facebook className="h-5 w-5 group-hover:scale-110" />
              </a>
              <a href="#" className="group text-gray-400 hover:text-secondary-dark transition-all transform hover:-translate-y-1">
                <Twitter className="h-5 w-5 group-hover:scale-110" />
              </a>
              <a href="#" className="group text-gray-400 hover:text-primary-500 transition-all transform hover:-translate-y-1">
                <Linkedin className="h-5 w-5 group-hover:scale-110" />
              </a>
              <a href="#" className="group text-gray-400 hover:text-accent-dark transition-all transform hover:-translate-y-1">
                <Instagram className="h-5 w-5 group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-500 transition-all font-medium relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-500 transition-all font-medium relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-500 transition-all font-medium relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-500 transition-all font-medium relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center font-medium">
            © {new Date().getFullYear()} MoneyDesk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

