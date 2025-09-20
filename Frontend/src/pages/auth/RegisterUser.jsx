import React from 'react'
import { Link } from 'react-router-dom'

const RegisterUser = () => {

  const handleSubmit=()=>{

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 md:p-8">
        {/* Header */}
        <header className="mb-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-500">Join to explore and enjoy delicious meals.</p>
        </header>

        {/* Switch navigation */}
        <nav className="text-center text-gray-600 mb-6">
          <strong className="font-semibold">Switch:</strong>{' '}
          <Link to="/user/register" className="text-blue-600 hover:underline">User</Link>{' '}
          •{' '}
          <Link to="/food-partner/register" className="text-blue-600 hover:underline">Food Partner</Link>
        </nav>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="mb-1 text-gray-700 font-medium">First Name</label>
              <input
                id="firstName"
                name="firstName"
                placeholder="Jane"
                autoComplete="given-name"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="mb-1 text-gray-700 font-medium">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                autoComplete="family-name"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-700 font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-gray-700 font-medium">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Alternate action */}
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

export default RegisterUser
