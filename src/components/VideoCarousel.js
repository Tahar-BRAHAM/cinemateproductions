import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import "../styles/VideoCarousel.css";

const LazyVideoModal = lazy(() => import("./VideoModal")); // Lazy load the video modal for performance

const VideoCarousel = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const response = await axios.get("/api/videos", {
          cache: "force-cache",
        }); // Cache API calls for faster loading
        setVideos(response.data.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    loadVideos();
  }, []);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="video-carousel">
      <div className="video-grid">
        {videos.map((video) => (
          <VideoTile
            key={video._id}
            video={video}
            onSelect={handleVideoSelect}
          />
        ))}
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {selectedVideo && (
          <LazyVideoModal video={selectedVideo} onClose={handleCloseModal} />
        )}
      </Suspense>
    </div>
  );
};

const VideoTile = React.memo(({ video, onSelect }) => (
  <div
    className={`video-tile ${
      video.size.width > video.size.height ? "landscape" : "portrait"
    }`}
    onClick={() => onSelect(video)}
  >
    <div className="video-wrapper">
      <img
        loading="lazy" // Lazy load images
        src={video.thumbnailUrl.replace(".jpg", ".webp")} // Serve WebP thumbnails
        alt={video.title}
        width="100%"
        height="auto"
      />
    </div>
    <div className="video-info">
      <p className="video-title">{video.title}</p>
      <p className="video-description">{video.description}</p>
    </div>
  </div>
));

export default VideoCarousel;
