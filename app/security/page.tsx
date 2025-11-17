import Link from "next/link";
import { Shield, ArrowLeft, Lock, Database, Server, Eye, AlertCircle, CheckCircle } from "lucide-react";

export default function Security() {
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
              <Shield className="w-6 h-6 text-primary-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Security
            </h1>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            We take security seriously. Your financial data is protected with industry-leading security measures and best practices.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last Modified: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Intro Section */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 mb-12 border border-primary-100">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                We take security seriously
              </h2>
              <p className="text-gray-700 leading-relaxed">
                While we like to keep things friendly and approachable, security is one area where we don't compromise. 
                Your financial data is protected with multiple layers of security, encryption, and industry best practices.
              </p>
            </div>
          </div>
        </div>

        {/* Access Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Access & Authentication</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Access</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The MoneyDesk team does not access or interact with customers' data as part of normal operations. 
                There are cases where a customer requests that we access their information, or where required by law. 
                All data access is access-controlled, requires customer approval when applicable, and is documented with 
                the reason for access and timestamps.
              </p>
              <p className="text-gray-600 text-sm">
                (See our <Link href="/privacy" className="text-primary-600 hover:text-primary-700 underline">Privacy Policy</Link> for details on how we might use aggregate data for internal business purposes.)
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Password Security</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your MoneyDesk account password is one-way salted and hashed using multiple iterations of a key derivation 
                function for passwords. Even if someone were to gain unauthorized access to our password database, they would 
                not know your password and would be forced to guess every possible password combination (which is computationally 
                infeasible with modern security standards).
              </p>
              <div className="flex items-start gap-2 mt-4">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  We prevent brute force password attacks and help you choose stronger passwords by ensuring they meet 
                  security requirements for length and complexity.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Deletion</h3>
              <p className="text-gray-700 leading-relaxed">
                Should you choose to delete your MoneyDesk account, all of your financial data is completely and 
                irreversibly removed from our database. We do not simply mark your account as inactive. We completely 
                destroy all account data. (To be clear, you explicitly request this deletion. If you happen to let 
                your account lapse accidentally, we don't assume you mean to delete all your data.)
              </p>
            </div>
          </div>
        </section>

        {/* Data Retention */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Data Retention</h2>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain account data for a period of time after an account expires, whether through trial expiration 
              or subscription expiration, unless you delete your account as described above. This allows you to reactivate 
              your account and recover your data if needed.
            </p>
            <p className="text-gray-600 text-sm">
              More information on data retention can be viewed in our <Link href="/privacy" className="text-primary-600 hover:text-primary-700 underline">Privacy Policy</Link>.
            </p>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Server className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Infrastructure</h2>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              Our infrastructure is built on modern cloud platforms that implement industry-leading security measures. 
              We use secure, scalable infrastructure providers that undergo regular security assessments and maintain 
              high standards for data protection.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are committed to maintaining the highest security standards and are continuously working towards 
              obtaining industry certifications and compliance standards. Our security practices are regularly reviewed 
              and updated to ensure your data remains protected.
            </p>
            <div className="bg-primary-50 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> We are actively working towards obtaining industry certifications and compliance 
                standards. Our security measures are implemented following industry best practices, even as we pursue 
                formal certifications.
              </p>
            </div>
          </div>
        </section>

        {/* Payment Security */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Payment Security</h2>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              We use PCI-DSS certified payment providers to process credit card transactions. Your payment details are 
              sent directly to our certified payment processor's systems rather than ours, ensuring that your sensitive 
              payment information never touches our servers.
            </p>
            <div className="flex items-start gap-2 mt-4">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">
                We never store your full credit card information on our servers. All payment processing is handled 
                by our secure, certified payment partners.
              </p>
            </div>
          </div>
        </section>

        {/* Encryption */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Encryption</h2>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              All data sent between your computer and MoneyDesk uses bank-grade encryption. We force your browser 
              to use an encrypted connection (HTTPS/TLS) and won't let your computer communicate with our servers 
              unless that connection is secure.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Encryption in Transit</h4>
                <p className="text-sm text-gray-600">
                  All data transmitted between your device and our servers is encrypted using TLS 1.2 or higher, 
                  the same encryption standard used by banks.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Encryption at Rest</h4>
                <p className="text-sm text-gray-600">
                  All stored data is encrypted at rest using industry-standard encryption algorithms to protect 
                  your information even when it's stored on our servers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Engineering Security */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Social Engineering Security</h2>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              All the technical security measures in the world are useless if someone cons you into handing them your 
              username and password.
            </p>
            <div className="space-y-4 mt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">No MoneyDesk team member will ever ask for your password</p>
                  <p className="text-gray-700 text-sm">
                    If someone asks you for your username or password, it's not us. Only provide your credentials 
                    when logging into MoneyDesk directly.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Always verify the domain</p>
                  <p className="text-gray-700 text-sm">
                    MoneyDesk will always use <strong>app.moneydesk.co</strong> or <strong>moneydesk.co</strong> as the domain name. 
                    Always look for this when logging into MoneyDesk, or following any link from a bookmark or email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reporting Security Issues */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Report Security Issues</h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              If you discover a security vulnerability or have concerns about our security practices, please report it to us immediately. 
              We take all security reports seriously and will investigate promptly.
            </p>
            <a
              href="mailto:security@moneydesk.co?subject=Security Issue Report"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Report Security Issue
            </a>
          </div>
        </section>

        {/* Further Reading */}
        <section className="mb-12">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Further Reading</h3>
            <div className="space-y-2">
              <p className="text-gray-700">
                To learn more about how we protect your data from a legal standpoint, see our{" "}
                <Link href="/privacy" className="text-primary-600 hover:text-primary-700 underline font-medium">
                  Privacy Policy
                </Link>.
              </p>
              <p className="text-gray-700">
                For our terms of service, please review our{" "}
                <Link href="/terms" className="text-primary-600 hover:text-primary-700 underline font-medium">
                  Terms of Service
                </Link>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

