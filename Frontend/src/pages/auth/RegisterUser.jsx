import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const RegisterUser = () => {

  const[formData, setFormData]=useState({
    fullName:"",
    email:"",
    password:""
  })

  const[error, setError]=useState("");
  const[success,setSuccess]=useState("");
  const navigate=useNavigate();

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const res=await axios.post(
        "http://localhost:3000/api/auth/user/register",
        formData,
        {withCredentials: true}
      );


      //save user + localStorage
      localStorage.setItem("user",JSON.stringify(res.data.user));
      // localStorage.setItem("token", res.data.token || ""); 

      setSuccess("Registration Success")
      setFormData({
        fullName:"",
        email:"",
        password:""
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
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
          {/* Full Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="fullName" className="mb-1 text-gray-700 font-medium">Name</label>
              <input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
                autoComplete="name"
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
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

        {error && <p className='mt-4 text-red-500 text-center'>{error}</p>}
        {success && <p className="mt-4 text-green-600 text-center">{success}</p>}

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
