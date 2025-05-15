import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>

        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <div className="leading-relaxed space-y-6 text-sm" style={{ fontFamily: "sans-serif" }}>
          <p>
            This Privacy Policy describes how <strong>{config.appName}</strong> (<span>&quot;we,&quot;</span> <span>&quot;us,&quot;</span> or <span>&quot;our&quot;</span>)
            collects, uses, and protects the information you provide when using our platform.
          </p>

          <h2 className="text-xl font-bold pt-4">1. Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone number, and any
            other details you provide while using our platform. Additionally, we may collect non-personal
            information such as browser type, IP address, and usage patterns.
          </p>

          <h2 className="text-xl font-bold pt-4">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Provide and manage our services</li>
            <li>Process and fulfill your orders</li>
            <li>Improve our platform and user experience</li>
            <li>Send updates, notifications, and promotional offers</li>
            <li>Ensure security and prevent fraudulent activities</li>
          </ul>

          <h2 className="text-xl font-bold pt-4">3. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from
            unauthorized access, alteration, or disclosure. However, no method of transmission over the
            Internet is 100% secure.
          </p>

          <h2 className="text-xl font-bold pt-4">4. Third-Party Services</h2>
          <p>
            We may use third-party services to analyze usage data, process payments, and improve
            functionality. These services have their own privacy policies, and we encourage you to review
            them.
          </p>

          <h2 className="text-xl font-bold pt-4">5. Cookies</h2>
          <p>
            We use cookies to enhance your browsing experience. You can choose to disable cookies through
            your browser settings, but this may limit certain functionalities of the platform.
          </p>

          <h2 className="text-xl font-bold pt-4">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Access and update your personal information</li>
            <li>Request deletion of your account and data</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2 className="text-xl font-bold pt-4">7. Changes to This Policy</h2>
          <p>
            We reserve the right to modify this Privacy Policy at any time. Changes will be communicated
            through the platform.
          </p>

          <h2 className="text-xl font-bold pt-4">8. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
            <a href="mailto:support@CollegeMart.com" className="text-blue-500 underline">
              support@CollegeMart.com
            </a>
            .
          </p>

          <p className="pt-4">
            By using <strong>{config.appName}</strong>, you agree to this Privacy Policy.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
