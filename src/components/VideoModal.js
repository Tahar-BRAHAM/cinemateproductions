import React from "react";
// import './VideoModal.css';

const VideoModal = ({ video, onClose }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <video width="100%" controls autoPlay>
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p>{video.title}</p>
      </div>
    </div>
  );
};

export default VideoModal;
