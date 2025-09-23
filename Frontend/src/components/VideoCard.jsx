import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Bookmark } from "lucide-react"; 

const VideoCard = ({ video, onLike, onSave }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = videoRef.current;
          if (!el) return;

          if (entry.isIntersecting) {
            setIsVisible(true);

            // Pause all other videos
            document.querySelectorAll("video").forEach((v) => {
              if (v !== el && !v.paused) v.pause();
            });

            if (el.paused) {
              el.play().catch((err) => {
                if (err.name !== "AbortError") console.error("Play error:", err);
              });
            }
          } else {
            setIsVisible(false);
            if (!el.paused) el.pause();
          }
        });
      },
      { threshold: 0.7 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black snap-start relative">
      {/* Video */}
      <video
        ref={videoRef}
        src={video.video}
        className="h-full w-full object-cover"
        loop
        muted
        playsInline
      />

      {isVisible && (
        <>
          {/* Name & Description */}
          <div className="absolute bottom-15 left-5 text-white bg-black/40 p-4 rounded-lg max-w-sm">
            <h2 className="text-lg font-bold">{video.name}</h2>
            <p>{video.description}</p>
          </div>

          {/* Right-side controls */}
          <div className="absolute bottom-30 right-5 flex flex-col items-center gap-6 text-white">
            {/* Like Button */}
            <button
              onClick={onLike}
              className="flex flex-col items-center hover:scale-110 transition"
            >
              <Heart className="h-8 w-8" />
              <span className="text-sm">{video.likeCount || 0}</span>
            </button>

            {/* Save Button */}
            <button
              onClick={onSave}
              className="flex flex-col items-center hover:scale-110 transition"
            >
              <Bookmark className="h-8 w-8" />
              <span className="text-sm">{video.savesCount || 0}</span>
            </button>
          </div>

          {/* Visit Store */}
          {video.foodPartner && (
            <div className="absolute bottom-20 right-5">
              <Link
                to={"/food-partner/" + video.foodPartner}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded "
              >
                Visit Store
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoCard;
