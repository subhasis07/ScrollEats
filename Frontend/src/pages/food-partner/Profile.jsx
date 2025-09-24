import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/api/food-partner/${id}`, { withCredentials: true })
      .then((response) => {
        setProfile(response.data.foodPartner)
        setVideos(response.data.foodPartner.foodItems || [])
      })
      .catch((err) => console.error(err))
  }, [id])

  return (
    <main className="max-w-5xl mx-auto p-6">
      {/* Profile Header */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
        <div className="flex items-center gap-6">
          <img
            className="w-24 h-24 rounded-full object-cover border border-gray-300"
            src="https://images.unsplash.com/photo-1750535135733-4ade39b4d487?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={profile?.businessName}
          />

          <div>
            <h1 className="text-2xl font-bold">{profile?.businessName}</h1>
            <p className="text-gray-600">{profile?.address}</p>
          </div>
        </div>

        <div className="flex gap-10">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500">Total meals</span>
            <span className="text-lg font-semibold">{videos.length || 0}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500">Customers served</span>
            <span className="text-lg font-semibold">{profile?.customersServed || 0}</span>
          </div>
        </div>
      </section>

      <hr className="my-6 border-gray-200" />

      {/* Video Grid */}
      <section>
        {videos.length === 0 ? (
          <p className="text-center text-gray-500">No videos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {videos.map((v, idx) => (
              <div
                key={idx}
                className="relative bg-black rounded-lg overflow-hidden group"
              >
                <video
                  src={v.video}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-64 object-cover cursor-pointer"
                  onMouseEnter={(e) => e.target.play().catch(() => {})}
                  onMouseLeave={(e) => e.target.pause()}
                  onClick={(e) => {
                    const video = e.target;
                    if (video.paused) {
                      video.play().catch(() => {});
                    } else {
                      video.pause();
                    }
                  }}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>
              </div>
            ))}
          </div>
        )}
      </section>

    </main>
  )
}

export default Profile
