import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { CheckCircle, XCircle, Loader } from 'lucide-react'
import { Button } from '../../components/ui/button'

export default function VerifyEmail() {
  const { verifyEmail, error, isLoading, user } = useAuth()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [verificationStatus, setVerificationStatus] = useState<
    'pending' | 'success' | 'error'
  >('pending')

  useEffect(() => {
    const verify = async () => {
      if (token) {
        try {
          await verifyEmail({ token })
          setVerificationStatus('success')
        } catch (error) {
          setVerificationStatus('error')
        }
      }
    }

    verify()
  }, [token, verifyEmail])

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verify your email
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              We've sent a verification link to{' '}
              <span className="font-medium">{user?.email}</span>. Please check your
              email and click the link to verify your account.
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/dashboard"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Skip for now
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {isLoading && (
          <div className="text-center">
            <Loader className="h-12 w-12 mx-auto text-indigo-600 animate-spin" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Verifying your email...
            </h2>
          </div>
        )}

        {!isLoading && verificationStatus === 'success' && (
          <div className="text-center">
            <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Email verified successfully!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Your email has been verified. You can now access all features of your
              account.
            </p>
            <div className="mt-6">
              <Button
                className="w-full"
                onClick={() => window.location.href = '/dashboard'}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}

        {!isLoading && verificationStatus === 'error' && (
          <div className="text-center">
            <XCircle className="h-12 w-12 mx-auto text-red-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Verification failed
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {error || 'The verification link is invalid or has expired.'}
            </p>
            <div className="mt-6">
              <Button
                className="w-full"
                onClick={() => window.location.href = '/login'}
              >
                Return to Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 