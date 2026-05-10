"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function LoginPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"login" | "register">("login");

  // Register state
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  
  // Login state
  const [loginEmail, setLoginEmail] = useState<string>("")
  const [loginPassword, setLoginPassword] = useState<string>("")
  
  // Common state
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState(false)





  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        // Verify token is valid before redirecting
        try {
          const response = await fetch("http://localhost:5328/api/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            router.push("/dashboard");
            return;
          } else {
            // Invalid token, remove it
            localStorage.removeItem("auth_token");
          }
        } catch (err) {
          console.error("Token validation failed:", err);
          localStorage.removeItem("auth_token");
        }
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900 dark:border-white mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  const handleGoogleLogin = () => {
    // Redirect to Flask backend Google OAuth endpoint
    window.location.href = "http://localhost:5328/api/auth/google";
  };

  const handleGithubLogin = () => {
    // Redirect to Flask backend GitHub OAuth endpoint
    window.location.href = "http://localhost:5328/api/auth/github";
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5328/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      // Store token and redirect
      localStorage.setItem("auth_token", data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5328/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Store token and redirect
      localStorage.setItem("auth_token", data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-fit flex-col lg:flex-row lg:p-10 flex text-center gap-5 items-center justify-between lg:justify-center bg-white dark:bg-black">
      <div className="w-8/12 relative h-full gap-2 flex-col p-20 flex justify-center items-center">
        <Image
          src="/WhiteSmartCourse.svg"
          width={75}
          height={75}
          alt="Smart Course"
        />
        <span className="text-2xl font-bold relative z-10 text-black dark:text-white">
          Unlock Your Potential
        </span>
        <span className="text-lg text-gray-600 relative z-10 dark:text-gray-400">
          Personalized course recommendations await
        </span>
        <Image
          src="/Login.svg"
          width={750}
          height={750}
          alt="Login Animation"
          className="-mt-[10%] relative z-0 hidden lg:block"
        />
        <div className="text-black dark:text-white absolute bottom-32 left-[calc(50%-250px)] gap-3 flex flex-col w-[500px] rounded-xl p-4 bg-gray-100 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700">
          <div className="flex justify-start w-full gap-4 items-center">
            <img
              src="https://i.pravatar.cc/100?img=10"
              alt="Image"
              className="h-[50px] rounded-full border-2 border-gray-300 dark:border-gray-700"
            />
            <div className="flex flex-col justify-center items-start">
              <span className="leading-tight text-2xl font-extrabold text-black dark:text-white">
                Jenace
              </span>
              <span className="leading-tight font-light text-xs text-gray-600 dark:text-gray-400">
                Data Scientist
              </span>
            </div>
            <div className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 rounded-lg font-semibold text-sm border border-gray-300 dark:border-gray-700">
              4.5
            </div>
          </div>
          <p className="w-full text-left text-gray-700 dark:text-gray-300">
            "SmartCourse helped me change careers in just 6 months. The recommendations were spot on!"
          </p>
        </div>
      </div>
      <div className="w-full lg:w-4/12 h-full flex flex-col text-center items-center justify-center space-y-6 p-8 bg-white dark:bg-black rounded-2xl border-2 border-gray-200 dark:border-gray-800">
        {/* Header */}
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#111318] to-[#111318]/70 dark:from-white dark:to-white/60 mb-2">
          Smart Course
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Sign in to discover personalized course recommendations
        </p>

        {/* Login/Register Tabs */}
        <div className="w-full flex border-b-2 border-gray-200 dark:border-gray-800">
          <div
            className={`w-1/2 flex flex-col items-end cursor-pointer transition-colors duration-300 select-none pb-3 ${
              selectedTab === "login"
                ? "font-bold text-black dark:text-white border-b-2 border-black dark:border-white"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setSelectedTab("login")}
          >
            <span className="w-full text-center">Login</span>
          </div>
          <div
            className={`w-1/2 flex flex-col items-start cursor-pointer transition-colors duration-300 select-none pb-3 ${
              selectedTab === "register"
                ? "font-bold text-black dark:text-white border-b-2 border-black dark:border-white"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setSelectedTab("register")}
          >
            <span className="w-full text-center">Register</span>
          </div>
        </div>

        <div className={`w-full flex gap-8 overflow-hidden`}>
          <div
            className={`min-w-[200%] flex gap-8 transition-transform duration-500 ${
              selectedTab === "login"
                ? "transform translate-x-0"
                : "transform -translate-x-1/2"
            }`}
          >
            {/* Login Form */}
            <div className="space-y-4 w-1/2">
              <form className="flex flex-col gap-4" onSubmit={handlePasswordLogin}>
                <input
                  placeholder="Email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors hover:shadow-md"
                />
                <input
                  placeholder="Password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors hover:shadow-md"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg border-2 border-gray-300 dark:border-gray-700 hover:shadow-md disabled:opacity-50 transition-all duration-200"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              {/* Divider */}
              <div className="relative w-full my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-black text-gray-600 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* OAuth Buttons */}
              <button
                onClick={handleGoogleLogin}
                type="button"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 hover:shadow-md hover:border-black dark:hover:border-white transition-all disabled:opacity-50"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-gray-700 dark:text-gray-200 font-medium hidden sm:inline">Google</span>
              </button>

              <button
                onClick={handleGithubLogin}
                type="button"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 hover:shadow-md hover:border-black dark:hover:border-white transition-all disabled:opacity-50"
              >
                <svg className="w-6 h-6 fill-black dark:fill-white" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="text-gray-700 dark:text-gray-200 font-medium hidden sm:inline">GitHub</span>
              </button>
            </div>

            {/* Register Form */}
            <div className="space-y-4 w-1/2">
              <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                <input
                  placeholder="Full Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors hover:shadow-md"
                />
                <input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors hover:shadow-md"
                />
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors hover:shadow-md"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg border-2 border-gray-300 dark:border-gray-700 hover:shadow-md disabled:opacity-50 transition-all duration-200"
                >
                  {loading ? "Creating account..." : "Register"}
                </button>
              </form>

              {/* Divider */}
              <div className="relative w-full my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-black text-gray-600 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* OAuth Icons */}
              <div className="flex w-full gap-3">
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 hover:shadow-md hover:border-black dark:hover:border-white transition-all disabled:opacity-50"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </button>

                <button
                  onClick={handleGithubLogin}
                  type="button"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 hover:shadow-md hover:border-black dark:hover:border-white transition-all disabled:opacity-50"
                >
                  <svg className="w-6 h-6 fill-black dark:fill-white" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full bg-red-50 dark:bg-red-950 border-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
            <span className="block sm:inline text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
