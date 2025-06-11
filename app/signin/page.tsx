'use client';

import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // <--- CHANGE THIS LINE

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/send-mail'); // redirect after login
    }
  }, [status, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      <button
        onClick={() => signIn('google')}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600"
      >
        Sign in with Google
      </button>
      <button
        onClick={() => signIn('azure_ad')}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sign in with Microsoft
      </button>
    </div>
  );
}