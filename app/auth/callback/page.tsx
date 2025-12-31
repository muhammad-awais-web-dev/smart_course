'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

function CallbackContent() {

    const { setToken,clearToken } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      // Handle error
      console.error('Authentication error:', error);
      alert(`Authentication failed: ${error.replace(/_/g, ' ')}`);
      router.push('/login');
      return;
    }

    if (token) {
      // Save token to localStorage
      setToken(token);
      
      // Redirect to dashboard or home
      router.push('/dashboard');
    } else {
      // No token found
      router.push('/login');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Completing Sign In...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we authenticate you
        </p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
