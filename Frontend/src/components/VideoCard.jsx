import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); // track if this video is currently in view

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
                if (err.name !== "AbortError") {
                  console.error("Play error:", err);
                }
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black snap-start relative">
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
          {/* Name & Description - left bottom */}
          <div className="absolute bottom-10 left-5 text-white bg-black/40 p-4 rounded-lg max-w-sm">
            <h2 className="text-lg font-bold">{video.name}</h2>
            <p>{video.description}</p>
          </div>

          {/* Visit Store Button - right bottom */}
          {video.foodPartner && (
            <div className="absolute bottom-10 right-5">
              <Link
                to={"/food-partner/" + video.foodPartner}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
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
