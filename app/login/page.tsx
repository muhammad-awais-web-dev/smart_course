"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function LoginPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4"></div>
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

  return (
    <div className="min-h-screen h-fit flex-col lg:flex-row lg:p-10 flex text-center gap-5 items-center justify-between lg:justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-white/10 dark:to-black">
      <div className="w-8/12 relative h-full gap-2 flex-col p-20 flex justify-center items-center">
        <Image
          src="/WhiteSmartCourse.svg"
          width={75}
          height={75}
          alt="Smart Course"
        />
        <span className=" text-2xl font-bold relative z-10">
          Unlock Your Potential
        </span>
        <span className=" text-lg text-gray-600 relative z-10 dark:text-gray-400">
          Personalized course recommendations <br /> await based on your goals.
        </span>
        <Image
          src="/Login.svg"
          width={750}
          height={750}
          alt="Login Animation"
          className=" -mt-[10%] relative z-0 hidden lg:block"
        />
        <div className="text-white absolute bottom-32 left-[calc(50%-250px)] gap-3 flex flex-col w-[500px] rounded-md p-4 bg-black/50 backdrop-blur-[25px] border ">
          <div className=" flex justify-start w-full gap-4 items-center ">
            <img
              src="https://i.pravatar.cc/100?img=10"
              alt="Image"
              className=" h-[50px] rounded-full "
            />
            <div className=" flex flex-col justify-center items-start ">
              <span className=" text-white leading-tight text-2xl font-extrabold">
                Jenace
              </span>
              <span className=" text-white leading-tight font-light text-xs ">
                Data Scientist
              </span>
            </div>
            <div className=" bg-white px-1 text-black rounded-md">4.5</div>
          </div>
          <p className=" w-full text-left ">
            "SmartCourse helped me change careers in just the span of 6 months. The
            recommendations were spot on!"
          </p>
        </div>
        {/* <div className=" w-2/3 h-2/3  flex justify-center items-center aspect-square ">
          <Player autoplay loop src="/LoginAnimation.json" />
        </div> */}
      </div>
      <div className=" w-full lg:w-4/12 h-full flex flex-col text-center items-center justify-center space-y-8 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Smart Course
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Sign in to discover personalized course recommendations
        </p>
        {/* Login Buttons */}
        <div className="space-y-4 mt-8">
          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg group"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              Continue with Google
            </span>
          </button>

          {/* GitHub Sign In */}
          <button
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 dark:bg-gray-700 border-2 border-gray-900 dark:border-gray-600 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg group"
          >
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="text-white font-medium">Continue with GitHub</span>
          </button>
        </div>
        {/* Divider */}
        <div className="relative w-full my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Secure OAuth Authentication
            </span>
          </div>
        </div>
        {/* Footer */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
