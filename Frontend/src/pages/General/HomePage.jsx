import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../../components/VideoCard";


const HomePage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Fetch food videos from backend
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/food", {
          withCredentials: true,
        });
        setVideos(res.data.foodItems);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {videos.map((video, index) => (
        <VideoCard key={index} video={video} />
      ))}
    </div>
  );
};

export default HomePage;



