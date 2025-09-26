import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import Header from "../../components/Header";

const API = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch food videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`https://scrolleats.onrender.com/api/food`);
        setVideos(res.data.foodItems || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Like handler
  const likeVideo = async (item) => {
    try {
      const response = await axios.post(
        `https://scrolleats.onrender.com/api/food/like`,
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                likeCount: response.data.like
                  ? v.likeCount + 1
                  : v.likeCount - 1,
              }
            : v
        )
      );
    } catch (err) {
      console.error("Error liking video:", err);
    }
  };

  // Save handler
  const saveVideo = async (item) => {
    try {
      const response = await axios.post(
        `https://scrolleats.onrender.com/api/food/save`,
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                savesCount: response.data.save
                  ? v.savesCount + 1
                  : v.savesCount - 1,
              }
            : v
        )
      );
    } catch (err) {
      console.error("Error saving video:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading videos...</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">No videos available.</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory relative">
      <Header/>

      {/* Videos */}
      {videos.map((video, index) => (
        <VideoCard
          key={video._id || index}
          video={video}
          onLike={() => likeVideo(video)}
          onSave={() => saveVideo(video)}
        />
      ))}
    </div>
  );
};

export default HomePage;
