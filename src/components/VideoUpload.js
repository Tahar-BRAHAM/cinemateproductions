import React, { useState } from "react";
import axios from "axios";
import "../styles/VideoUpload.css";

const VideoUpload = ({ onUpload }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!videoFile || !thumbnailFile) {
      alert("Please select both video and thumbnail files to upload");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoFile);
    formData.append("thumbnail", thumbnailFile);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found, please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/videos",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUploadSuccess(true);
        setTitle("");
        setDescription("");
        setVideoFile(null);
        setThumbnailFile(null);
        if (onUpload) onUpload();
      } else {
        alert("Failed to upload video");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUploadSuccess(false);
  };

  return (
    <div className="upload-video">
      <h2>Upload Video</h2>
      {uploadSuccess ? (
        <div className="success-message">
          <p>Video uploaded successfully!</p>
          <button onClick={handleReset}>Upload Another</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="videoFile">Upload Video:</label>
            <input
              type="file"
              id="videoFile"
              accept=".mp4,.avi,.mov"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="thumbnailFile">Upload Thumbnail:</label>
            <input
              type="file"
              id="thumbnailFile"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
              required
            />
          </div>
          <button type="submit">Upload</button>
        </form>
      )}
      {loading && <div className="loading-bar" />}
    </div>
  );
};

export default VideoUpload;
