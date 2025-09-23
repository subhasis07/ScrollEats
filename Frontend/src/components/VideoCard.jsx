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
    <div className="w-full flex items-center justify-center bg-black snap-start relative
                h-screen sm:h-[80vh] lg:h-[90vh] max-w-xl mx-auto my-4">
        {/* Video */}
        <video
          ref={videoRef}
          src={video.video}
          className="w-full h-full object-cover rounded-md sm:rounded-lg"
          loop
          muted
          playsInline
        />

        {isVisible && (
          <>
            {/* Name & Description */}
            <div className="absolute bottom-16 sm:bottom-5 left-3 sm:left-5 text-white bg-black/40 p-3 sm:p-4 rounded-lg max-w-xs sm:max-w-sm">
              <h2 className="text-base sm:text-lg font-bold">{video.name}</h2>
              <p className="text-sm sm:text-base">{video.description}</p>
            </div>

            {/* Right-side controls */}
            <div className="absolute bottom-28 sm:bottom-28 right-3 sm:right-5 flex flex-col items-center gap-4 sm:gap-6 text-white">
              {/* Like Button */}
              <button
                onClick={onLike}
                className="flex flex-col items-center hover:scale-110 transition"
              >
                <Heart className="h-6 w-6 sm:h-8 sm:w-8" />
                <span className="text-xs sm:text-sm">{video.likeCount || 0}</span>
              </button>

              {/* Save Button */}
              <button
                onClick={onSave}
                className="flex flex-col items-center hover:scale-110 transition"
              >
                <Bookmark className="h-6 w-6 sm:h-8 sm:w-8" />
                <span className="text-xs sm:text-sm">{video.savesCount || 0}</span>
              </button>
            </div>

            {/* Visit Store */}
            {video.foodPartner && (
              <div className="absolute bottom-20 sm:bottom-20 right-3 sm:right-5">
                <Link
                  to={"/food-partner/" + video.foodPartner}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded "
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
