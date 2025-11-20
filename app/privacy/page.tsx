import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
          </div>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to MoneyDesk ("we," "our," or "us"). MoneyDesk is a child company of Novex Solutions LLC, our parent organization. 
              We are committed to protecting your personal information and your right to privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              As a child company of Novex Solutions LLC, MoneyDesk operates independently while maintaining compliance with our parent company's standards and policies. 
              Your data is handled in accordance with this Privacy Policy and applicable data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Register for an account</li>
              <li>Use our financial management services</li>
              <li>Contact us for support</li>
              <li>Subscribe to our newsletter</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              This information may include: name, email address, phone number, payment information, financial data, and other information you choose to provide.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages you visit and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section id="cookies" className="mb-8 scroll-mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. 
              Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, 
              you may not be able to use some portions of our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information. 
              However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>With Novex Solutions LLC, our parent company, and affiliated companies for business operations, compliance, and service improvement purposes</li>
              <li>With service providers who assist us in operating our website and conducting our business</li>
              <li>When required by law or to respond to legal process</li>
              <li>To protect our rights, privacy, safety, or property, or that of Novex Solutions LLC</li>
              <li>In connection with a business transfer or merger</li>
              <li>With your consent or at your direction</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              When we share information with Novex Solutions LLC or its affiliates, we ensure that such sharing is done in accordance with this Privacy Policy 
              and applicable data protection laws. Novex Solutions LLC and its affiliates are bound by the same privacy standards and commitments.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>The right to access your personal information</li>
              <li>The right to rectify inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to object to processing of your information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              To exercise these rights, please contact us at{" "}
              <a href="mailto:support@moneydesk.co" className="text-primary-600 hover:text-primary-700 underline">
                support@moneydesk.co
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our services are not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. 
              If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
              and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Google API Services User Data Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              MoneyDesk uses Google API Services to provide certain features, including Google Calendar integration. 
              This section describes how we access, use, store, and share Google user data in compliance with the 
              Google API Services User Data Policy and Google APIs Terms of Service.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">10.1 Data Accessed</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you choose to use Google Calendar integration, MoneyDesk accesses the following types of Google user data:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Calendar Events:</strong> We access your Google Calendar events to sync financial events, bill reminders, and payment due dates</li>
              <li><strong>Calendar Metadata:</strong> We access calendar metadata including event titles, descriptions, dates, times, and recurrence patterns</li>
              <li><strong>Basic Profile Information:</strong> We access your basic Google account information (email address and name) to associate calendar events with your MoneyDesk account</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              We only access Google user data that is necessary to provide the Google Calendar integration feature. 
              We request the minimum scopes required for this functionality.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">10.2 Data Usage</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              MoneyDesk uses the Google user data we access solely for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Calendar Synchronization:</strong> To create, read, update, and delete calendar events related to your financial activities, including bill payment reminders, recurring transaction dates, and financial goal milestones</li>
              <li><strong>Service Functionality:</strong> To provide you with the ability to view and manage your financial events within your Google Calendar</li>
              <li><strong>User Experience:</strong> To ensure that calendar events are properly associated with your MoneyDesk account and displayed correctly</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not use Google user data for any other purposes, including advertising, marketing, or any other commercial purposes beyond providing the core functionality of the Google Calendar integration feature.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">10.3 Data Sharing</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              MoneyDesk does not sell, trade, or rent your Google user data to third parties. We may share Google user data only in the following limited circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>With Novex Solutions LLC:</strong> As a child company of Novex Solutions LLC, we may share Google user data with our parent company for business operations, compliance, and service improvement purposes, in accordance with this Privacy Policy</li>
              <li><strong>With Service Providers:</strong> We may share Google user data with trusted service providers who assist us in operating our services (such as cloud hosting providers), provided they are bound by strict confidentiality obligations and use the data solely for the purpose of providing services to us</li>
              <li><strong>Legal Requirements:</strong> We may disclose Google user data when required by law, legal process, or to respond to valid requests by public authorities</li>
              <li><strong>Protection of Rights:</strong> We may share Google user data to protect our rights, privacy, safety, or property, or that of our users or others</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not allow humans to read your Google user data unless:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>You have given us explicit permission to do so (for example, when you contact our support team and request assistance with a calendar-related issue)</li>
              <li>It is necessary for security purposes (such as investigating potential abuse or violations of our terms)</li>
              <li>It is required by law</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">10.4 Data Storage & Protection</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              MoneyDesk implements industry-standard security measures to protect your Google user data:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Encryption:</strong> All Google user data is encrypted in transit using TLS/SSL protocols and encrypted at rest using industry-standard encryption algorithms</li>
              <li><strong>Access Controls:</strong> We implement strict access controls and authentication mechanisms to ensure that only authorized personnel can access Google user data, and only when necessary for service operations</li>
              <li><strong>Secure Storage:</strong> Google user data is stored on secure servers with appropriate physical and technical safeguards</li>
              <li><strong>Regular Security Audits:</strong> We conduct regular security audits and assessments to identify and address potential vulnerabilities</li>
              <li><strong>Token Management:</strong> We securely store and manage OAuth tokens using industry best practices, including token encryption and secure token refresh mechanisms</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              While we implement robust security measures, no method of transmission over the Internet or electronic storage is 100% secure. 
              We cannot guarantee absolute security but are committed to protecting your data to the best of our ability.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">10.5 Data Retention & Deletion</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Data Retention:</strong> We retain Google user data only for as long as necessary to provide you with the Google Calendar integration service and fulfill the purposes outlined in this Privacy Policy. Specifically:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Calendar event data is retained while your Google Calendar integration is active and for a reasonable period thereafter to ensure service continuity</li>
              <li>OAuth tokens and authentication data are retained while your account is active and for up to 90 days after you disconnect the integration or delete your account</li>
              <li>We may retain certain data for longer periods if required by law or for legitimate business purposes (such as fraud prevention or dispute resolution)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Data Deletion:</strong> You have the right to request deletion of your Google user data at any time. You can do this by:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Disconnecting the Integration:</strong> You can disconnect your Google Calendar integration at any time through your MoneyDesk account settings. This will immediately stop any further access to your Google Calendar data</li>
              <li><strong>Deleting Your Account:</strong> You can delete your MoneyDesk account, which will result in the deletion of all associated Google user data within 30 days</li>
              <li><strong>Requesting Deletion:</strong> You can contact us directly at{" "}
                <a href="mailto:support@moneydesk.co" className="text-primary-600 hover:text-primary-700 underline">
                  support@moneydesk.co
                </a>{" "}
                to request deletion of your Google user data. We will process your request within 30 days
              </li>
              <li><strong>Google's Data Controls:</strong> You can also revoke MoneyDesk's access to your Google data at any time through your Google Account settings at{" "}
                <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">
                  myaccount.google.com/permissions
                </a>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Upon deletion, we will permanently delete your Google user data from our systems, except where we are required to retain it by law or for legitimate business purposes. 
              Any data that must be retained will be anonymized to the extent possible.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">10.6 Your Rights Regarding Google User Data</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              In addition to the rights described in Section 7 of this Privacy Policy, you have specific rights regarding your Google user data:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Right to Access:</strong> You can view what Google user data we have accessed through your MoneyDesk account settings</li>
              <li><strong>Right to Revoke Access:</strong> You can revoke MoneyDesk's access to your Google data at any time through your Google Account settings or by disconnecting the integration in MoneyDesk</li>
              <li><strong>Right to Export:</strong> You can export your calendar data at any time through Google Calendar's export functionality</li>
              <li><strong>Right to Deletion:</strong> As described above, you can request deletion of your Google user data at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us:
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

