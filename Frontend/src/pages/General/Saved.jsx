import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../../components/VideoCard";

const API = import.meta.env.VITE_API_URL;

const Saved = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const response = await axios.get(
          `https://scrolleats.onrender.com/api/food/save`,
          { withCredentials: true }
        );

        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          name: item.food.name,
          likeCount: item.food.likeCount,
          savesCount: item.food.savesCount,
          commentsCount: item.food.commentsCount,
          foodPartner: item.food.foodPartner,
        }));

        setVideos(savedFoods);
      } catch (err) {
        console.error("Error fetching saved videos:", err);
      }
    };

    fetchSaved();
  }, []);

  const removeSaved = async (item) => {
    try {
      await axios.post(
        `https://scrolleats.onrender.com/api/food/save`,
        { foodId: item._id },
        { withCredentials: true }
      );

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) }
            : v
        )
      );
    } catch (err) {
      console.error("Error unsaving video:", err);
    }
  };

  return (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-gray-50 flex flex-col items-center">
      {videos.length > 0 ? (
        videos.map((video) => (
          <VideoCard
            key={video._id}
            video={video}
            onSave={() => removeSaved(video)}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <svg
            className="w-16 h-16 mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"
            />
          </svg>
          <p className="text-lg font-medium">No saved videos yet.</p>
          <p className="text-sm">Save a video to see it appear here.</p>
        </div>
      )}
    </div>
  );
};

export default Saved;
