import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL;

const LoginUser = () => {

  const[formData, setFormData]=useState({
    email:"",
    password:""
  })

  const[error,setError]=useState("");
  const[success,setSuccess]=useState("");
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

    if(!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res=await axios.post(
        `https://scrolleats.onrender.com/api/auth/user/login`,
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
        navigate("/");
      }, 1500);


    } catch (err) {
      setError(err?.response?.data?.message || "Invalid email or password.");
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500">Sign in to continue your food journey.</p>
        </header>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
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

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-gray-700 font-medium">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
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

        <div className="mt-6 text-center text-gray-500">
          New here?{' '}
          <a href="/user/register" className="text-blue-600 font-medium hover:underline">
            Create account
          </a>
        </div>
      </div>
    </div>
  )
}

export default LoginUser
