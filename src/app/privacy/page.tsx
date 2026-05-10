import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy â Glow Log",
  description: "Learn how Glow Log handles your data, photos, and privacy. We never store your selfies on our servers.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 font-serif">
          Privacy Policy
        </h1>
        <p className="text-gray-500 mb-10">Last updated: May 10, 2026</p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              1. Introduction
            </h2>
            <p>
              Glow Log (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is an AI-powered skincare analysis tool.
              We respect your privacy and are committed to protecting your personal data.
              This policy explains how we collect, use, and safeguard your information
              when you use our website at glowlog-ai.vercel.app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Data We Collect
            </h2>
            <p className="mb-3">We collect minimal data to provide our service:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Selfie Photos:</strong> When you use our skin analysis feature,
                you upload a photo. This photo is sent directly to Google Gemini AI for
                analysis and is <strong>never stored on our servers</strong>. The photo
                is processed in real-time and discarded immediately after analysis.
              </li>
              <li>
                <strong>Skin Questionnaire Answers:</strong> Your responses about skin
                type, concerns, age range, and budget are used solely to personalize
                your analysis. These are processed in-memory and not stored on our servers.
              </li>
              <li>
                <strong>Local Storage Data:</strong> Your analysis history and routine
                tracker data are stored locally in your browser using localStorage.
                This data never leaves your device.
              </li>
              <li>
                <strong>Analytics Data:</strong> We use Google Analytics 4 to collect
                anonymous usage data such as page views, device type, and general
                location (country/city level). This helps us improve our service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. How We Use Your Data
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide personalized skincare analysis and product recommendations</li>
              <li>To improve our AI analysis accuracy and user experience</li>
              <li>To understand aggregate usage patterns through anonymous analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Third-Party Services
            </h2>
            <p className="mb-3">We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Google Gemini AI:</strong> Processes your selfie for skin analysis.
                Subject to{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 hover:text-rose-700 underline"
                >
                  Google&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Google Analytics 4:</strong> Collects anonymous usage statistics.
                Subject to{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 hover:text-rose-700 underline"
                >
                  Google&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Vercel:</strong> Hosts our website. Subject to{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 hover:text-rose-700 underline"
                >
                  Vercel&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Lemon Squeezy:</strong> Handles premium payments. Subject to{" "}
                <a
                  href="https://www.lemonsqueezy.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 hover:text-rose-700 underline"
                >
                  Lemon Squeezy&apos;s Privacy Policy
                </a>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Cookies
            </h2>
            <p>
              We use cookies through Google Analytics to understand how visitors
              interact with our website. These are anonymous analytical cookies that
              do not personally identify you. You can disable cookies in your browser
              settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Data Security
            </h2>
            <p>
              Your selfie photos are transmitted over encrypted HTTPS connections
              and are never stored on our servers. Analysis results are stored only
              in your browser&apos;s local storage, which means only you have access to
              your data. You can clear this data at any time through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. Children&apos;s Privacy
            </h2>
            <p>
              Our service is not intended for children under 13 years of age. We do
              not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              8. Your Rights
            </h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Clear your locally stored analysis history and routine data at any time</li>
              <li>Disable cookies and analytics tracking in your browser</li>
              <li>Request information about what data we process</li>
              <li>Contact us with any privacy-related questions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will
              be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us
              at{" "}
              <a
                href="mailto:glowlogcontact@gmail.com"
                className="text-rose-600 hover:text-rose-700 underline"
              >
                glowlogcontact@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
