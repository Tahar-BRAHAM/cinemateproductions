import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoUpload from './VideoUpload';
import Loader from './Loader';
import '../styles/AdminPage.css';

const AdminPage = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editVideoId, setEditVideoId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editThumbnailFile, setEditThumbnailFile] = useState(null); // New state for thumbnail file

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const { data } = await axios.get('/api/videos');
            setVideos(data.data);
        } catch (error) {
            setError('Error fetching videos');
            console.error('Error fetching videos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (videoId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('No token found, please log in.');
                return;
            }

            await axios.delete(`http://localhost:5000/api/videos/${videoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setVideos(videos.filter((video) => video._id !== videoId));
        } catch (error) {
            console.error('Error deleting video:', error);
            alert('Error deleting video');
        }
    };

    const handleVideoUpload = async () => {
        await fetchVideos();
    };

    const handleEditClick = (video) => {
        setEditVideoId(video._id);
        setEditTitle(video.title);
        setEditDescription(video.description);
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('No token found, please log in.');
                return;
            }

            const formData = new FormData();
            formData.append('title', editTitle);
            formData.append('description', editDescription);

            if (editThumbnailFile) {
                formData.append('thumbnail', editThumbnailFile);
            }

            await axios.put(`http://localhost:5000/api/videos/${editVideoId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            setEditVideoId(null);
            setEditTitle('');
            setEditDescription('');
            setEditThumbnailFile(null);
            await fetchVideos();
        } catch (error) {
            console.error('Error updating video:', error);
            alert('Error updating video');
        }
    };

    const handleCancelEdit = () => {
        setEditVideoId(null);
        setEditTitle('');
        setEditDescription('');
        setEditThumbnailFile(null);
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div>
                <p>Sorry, we'll be back soon!</p>
            </div>
        );
    }

    const formatFileSize = (sizeInBytes) => {
        if (sizeInBytes >= 1024 * 1024 * 1024) {
            return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
        } else if (sizeInBytes >= 1024 * 1024) {
            return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
        } else {
            return `${(sizeInBytes / 1024).toFixed(2)} KB`;
        }
    };

    return (
        <div className="admin-page">
            <VideoUpload onUpload={handleVideoUpload} />
            <div className="video-list">
                {videos && videos.length === 0 ? (
                    <p>No videos available</p>
                ) : (
                    videos.map((video, index) => (
                        <div key={video._id} className={`video-item ${index % 2 === 0 ? 'even' : 'odd'}`}>
                            <div className="video-details">
                                <img src={video.thumbnailUrl} alt={`${video.title} thumbnail`} width="150" />
                                <video width="150" height="auto" controls>
                                    <source src={video.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                {editVideoId === video._id ? (
                                    <div className="edit-form">
                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            placeholder="Title"
                                        />
                                        <textarea
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                            placeholder="Description"
                                        ></textarea>
                                        <div className="form-group">
                                            <label htmlFor="editThumbnailFile">Update Thumbnail:</label>
                                            <input
                                                type="file"
                                                id="editThumbnailFile"
                                                accept="image/*"
                                                onChange={(e) => setEditThumbnailFile(e.target.files[0])}
                                            />
                                        </div>
                                        <button onClick={handleUpdate}>Update</button>
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <div className="video-text">
                                        <p className="video-title">{video.title}</p>
                                        <p className='video-infos'>size : {formatFileSize(video.size)}</p><p className='video-infos'>format : {video.format}</p>
                                        <p className="video-description">{video.description}</p>
                                    </div>
                                )}
                            </div>
                            <div className="video-actions">
                                <button className="edit-button" onClick={() => handleEditClick(video)}>
                                    Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDelete(video._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminPage;
