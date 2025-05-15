import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
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
          Terms and Conditions for {config.appName}
        </h1>

        <div className="leading-relaxed space-y-6 text-sm" style={{ fontFamily: "sans-serif" }}>
          <p>
            These Terms and Conditions (<span>&quot;Terms&quot;</span>) govern your use of{" "}
            <strong>{config.appName}</strong> (<span>&quot;we,&quot;</span>{" "}
            <span>&quot;us,&quot;</span> or <span>&quot;our&quot;</span>) and the services we provide. By
            accessing or using our platform, you agree to comply with these Terms.
          </p>

          <h2 className="text-xl font-bold pt-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>{config.appName}</strong>, you agree to be bound by these Terms.
            If you do not agree with any part of the Terms, you may not access or use the platform.
          </p>

          <h2 className="text-xl font-bold pt-4">2. Use of Our Services</h2>
          <p>You agree to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Use the platform only for lawful purposes</li>
            <li>Provide accurate and complete information</li>
            <li>Refrain from violating any applicable laws or regulations</li>
          </ul>

          <h2 className="text-xl font-bold pt-4">3. User Accounts</h2>
          <p>
            To access certain features, you may need to create an account. You are responsible for
            maintaining the confidentiality of your account information and ensuring that your account is
            used only by you.
          </p>

          <h2 className="text-xl font-bold pt-4">4. Prohibited Activities</h2>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Engage in any unauthorized use of the platform</li>
            <li>Upload harmful content, viruses, or malicious code</li>
            <li>Attempt to gain unauthorized access to the platform</li>
          </ul>

          <h2 className="text-xl font-bold pt-4">5. Intellectual Property</h2>
          <p>
            All content, trademarks, and intellectual property on <strong>{config.appName}</strong> are
            the property of their respective owners. You agree not to copy, reproduce, or distribute any
            content without prior consent.
          </p>

          <h2 className="text-xl font-bold pt-4">6. Termination of Use</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to the platform if you
            violate these Terms or engage in any unauthorized activities.
          </p>

          <h2 className="text-xl font-bold pt-4">7. Limitation of Liability</h2>
          <p>
            We are not liable for any indirect, incidental, or consequential damages resulting from the
            use of <strong>{config.appName}</strong>. Your use of the platform is at your own risk.
          </p>

          <h2 className="text-xl font-bold pt-4">8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be communicated through
            the platform. Your continued use of <strong>{config.appName}</strong> after changes constitute
            acceptance of the modified Terms.
          </p>

          <h2 className="text-xl font-bold pt-4">9. Governing Law</h2>
          <p>
            These Terms are governed by and interpreted in accordance with the laws of India. Any disputes
            arising from these Terms will be subject to the jurisdiction of the courts of India.
          </p>

          <h2 className="text-xl font-bold pt-4">10. Contact Us</h2>
          <p>
            If you have any questions or concerns about these Terms, please contact us at{" "}
            <a href="mailto:support@CollegeMart.com" className="text-blue-500 underline">
              support@CollegeMart.com
            </a>
            .
          </p>

          <p className="pt-4">
            By using <strong>{config.appName}</strong>, you agree to these Terms and Conditions.
          </p>
        </div>
      </div>
    </main>
  );
};

export default TOS;
