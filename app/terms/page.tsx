import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="pt-16 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Terms of Service
            </h1>
          </div>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using MoneyDesk's website and services, you agree to be bound by these Terms of Service ("Terms"). 
              MoneyDesk is a child company of Novex Solutions LLC, our parent organization. These Terms govern your use of MoneyDesk's services 
              and your relationship with MoneyDesk as a child company of Novex Solutions LLC.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you disagree with any part of these terms, you may not access the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              MoneyDesk provides a personal finance management platform that allows users to track expenses, manage budgets, 
              handle loans, set savings goals, and access financial insights. Our services are provided "as is" and "as available."
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Account Creation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              To use certain features of our service, you must register for an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information as necessary</li>
              <li>Maintain the security of your password</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Account Termination</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason we deem necessary.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Acceptable Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to use the service to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit any harmful, offensive, or illegal content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Use automated systems to access the service without permission</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Financial Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You are solely responsible for the accuracy of all financial information you enter into the service. 
              MoneyDesk is not responsible for any errors or omissions in your financial data or for any decisions made based on such information.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are not a financial advisor, and the information provided through our service should not be considered as financial, 
              investment, tax, or legal advice. Always consult with qualified professionals for such matters.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Subscription and Payment</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Subscription Plans</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We offer both free and premium subscription plans. Premium plans are billed on a monthly or annual basis as selected by you.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Payment Terms</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Payment is due in advance for each billing period</li>
              <li>All fees are non-refundable except as required by law</li>
              <li>We reserve the right to change our pricing with 30 days' notice</li>
              <li>You are responsible for any taxes applicable to your subscription</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 Cancellation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may cancel your subscription at any time. Cancellation will take effect at the end of your current billing period. 
              You will continue to have access to premium features until the end of the billing period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The service and its original content, features, and functionality are owned by MoneyDesk and Novex Solutions LLC, our parent company, 
              and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              As a child company of Novex Solutions LLC, MoneyDesk operates with the authorization and under the intellectual property framework of our parent organization. 
              You may not copy, modify, distribute, sell, or lease any part of our service without our prior written consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, 
              INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not warrant that the service will be uninterrupted, secure, or error-free, or that defects will be corrected.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, MONEYDESK SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, 
              OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to defend, indemnify, and hold harmless MoneyDesk, Novex Solutions LLC (our parent company), and their respective officers, directors, employees, 
              and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorney's fees, arising out of 
              or in any way connected with your access to or use of the service or your violation of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page 
              and updating the "Last updated" date. Your continued use of the service after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, 
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-2">
                <strong>Company:</strong> MoneyDesk (a child company of Novex Solutions LLC)
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:support@moneydesk.co" className="text-primary-600 hover:text-primary-700 underline">
                  support@moneydesk.co
                </a>
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> 1111B S Governors Ave STE 26220, Dover, DE 19904, United States
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

