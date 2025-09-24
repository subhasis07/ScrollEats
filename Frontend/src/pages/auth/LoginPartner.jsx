import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const API = import.meta.env.VITE_API_URL;

const LoginPartner = () => {

  const[formData,setFormData]=useState({
    email:"",
    password:""
  })
  const[error,setError]=useState("");
  const[success,setSuccess]=useState("")
  const navigate=useNavigate()

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

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res=await axios.post(
        `${API}/api/auth/food-partner/login`,
        formData,
        {withCredentials:true}
      )

      if (res.data.user && res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
      }

      setSuccess("Login successful! Redirecting...");
      setFormData({ email: "", password: "" });

      setTimeout(() => {
        navigate("/create-food");
      }, 1500);

    } catch (err) {
      setError(err?.response?.data?.message || "Invalid email or password.");
    }
  }
  
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Header */}
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Partner Login</h1>
            <p className="text-gray-500">Access your dashboard and manage orders.</p>
          </header>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-gray-700 font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="business@example.com"
                autoComplete="email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-gray-700 font-medium">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                autoComplete="current-password"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition"
            >
              Sign In
            </button>
          </form>

          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          {success && <p className="mt-4 text-green-600 text-center">{success}</p>}

          {/* Alternate action */}
          <div className="mt-6 text-center text-gray-500">
            New partner?{' '}
            <Link to="/food-partner/register" className="text-blue-600 font-medium hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
  )
}

export default LoginPartner
