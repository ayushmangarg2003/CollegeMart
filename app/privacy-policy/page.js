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

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >{`
          This Privacy Policy describes how ${config.appName} ("we," "us," or "our") collects, uses, and protects the information you provide when using our platform.

          1. Information We Collect
          We may collect personal information such as your name, email address, phone number, and any other details you provide while using our platform. Additionally, we may collect non-personal information such as browser type, IP address, and usage patterns.

          2. How We Use Your Information
          We use your information to:
          - Provide and manage our services
          - Process and fulfill your orders
          - Improve our platform and user experience
          - Send updates, notifications, and promotional offers
          - Ensure security and prevent fraudulent activities

          3. Data Security
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the Internet is 100% secure.

          4. Third-Party Services
          We may use third-party services to analyze usage data, process payments, and improve functionality. These services have their own privacy policies, and we encourage you to review them.

          5. Cookies
          We use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, but this may limit certain functionalities of the platform.

          6. Your Rights
          You have the right to:
          - Access and update your personal information
          - Request deletion of your account and data
          - Opt-out of marketing communications

          7. Changes to This Policy
          We reserve the right to modify this Privacy Policy at any time. Changes will be communicated through the platform.

          8. Contact Us
          If you have any questions or concerns about this Privacy Policy, please contact us at support@clarkmart.com.

          By using ${config.appName}, you agree to this Privacy Policy.
        `}</pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
