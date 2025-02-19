"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/libs/supabase/client";
import toast from "react-hot-toast";
import config from "@/config";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";

export default function Login() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e, options) => {
    e?.preventDefault();

    if (!email.includes("@clarku.edu")) {
      setError("Only Clark University emails are allowed.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const { type, provider } = options;
      const redirectURL = window.location.origin + "/api/auth/callback";

      if (type === "oauth") {
        await supabase.auth.signInWithOAuth({
          provider,
          options: { redirectTo: redirectURL },
        });
      } else if (type === "magic_link") {
        await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: redirectURL },
        });
        toast.success("Check your emails!");
        setIsDisabled(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="p-4">
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo/Brand Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Welcome to {config.appName}
            </h1>
            <p className="mt-2 text-gray-600">
              Sign in with your Clark University email
            </p>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-gray-500 bg-gray-50">
                CLARKMART
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form 
            className="mt-8 space-y-6"
            onSubmit={(e) => handleSignup(e, { type: "magic_link" })}
          >
            <div className="space-y-2">
              <div className="relative">
                <input
                  required
                  type="email"
                  value={email}
                  autoComplete="email"
                  placeholder="tom@clarku.edu"
                  className={`
                    w-full px-4 py-3 bg-white border shadow-sm 
                    placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent
                    transition-all duration-200
                    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}
                  `}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              
              {error && (
                <p className="text-sm text-center text-red-600 mt-1">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || isDisabled}
              className={`
                w-full py-3 px-4 flex items-center justify-center
                text-white bg-[#cc0000] hover:bg-[#b30000]
                focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:ring-offset-2
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Mail className="w-5 h-5 mr-2" />
                  Send Magic Link
                </>
              )}
            </button>

            {isDisabled && (
              <p className="text-sm text-center text-gray-600 mt-4">
                Check your email for the magic link
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}