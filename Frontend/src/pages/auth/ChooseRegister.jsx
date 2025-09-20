import React from 'react'
import { Link } from 'react-router-dom'

const ChooseRegister = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Register</h1>
          <p className="text-gray-500">Pick how you want to join the platform.</p>
        </header>

        <div className="flex flex-col gap-4">
          <Link
            to="/user/register"
            className="w-full text-center py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg border border-gray-300 hover:bg-gray-300 transition"
          >
            Register as Normal User
          </Link>

          <Link
            to="/food-partner/register"
            className="w-full text-center py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg border border-gray-300 hover:bg-gray-300 transition"
          >
            Register as Food Partner
          </Link>
        </div>

        <div className="mt-6 text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/user/login" className="text-blue-600 font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChooseRegister
