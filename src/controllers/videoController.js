const mongoose = require('mongoose');
const Video = require('../models/Video');

exports.uploadVideo = async (req, res) => {
    const { title, description } = req.body;
    const videoUrl = `/uploads/${req.files.video[0].filename}`; // Save the video file path
    const thumbnailUrl = `/uploads/${req.files.thumbnail[0].filename}`; // Save the thumbnail file path
    const format = req.files.video[0].mimetype; // Get the video format
    const size = req.files.video[0].size; // Get the video size in bytes

    try {
        const video = await Video.create({
            title,
            description,
            videoUrl,
            thumbnailUrl, // Save the thumbnail URL
            format,
            size,
            uploadedBy: req.user.id,
        });

        res.status(201).json({ success: true, data: video });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate('uploadedBy', 'email');
        res.status(200).json({ success: true, data: videos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }
        res.status(200).json({ success: true, data: video });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ success: false, message: 'Video not found' });
        }

        await Video.deleteOne({ _id: req.params.id });

        // Delete the file from the filesystem
        const fs = require('fs');
        const path = require('path');
        const filePath = path.join(__dirname, '..', '..', video.videoUrl);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Failed to delete file:', err);
                return res.status(500).json({ success: false, error: 'Failed to delete file' });
            }
            res.status(200).json({ success: true, message: 'Video deleted successfully' });
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateVideo = async (req, res) => {
    const { title, description } = req.body;
    const updateFields = { title, description };

    // Check if a new thumbnail file is uploaded
    if (req.files && req.files.thumbnail) {
        updateFields.thumbnailUrl = `/uploads/${req.files.thumbnail[0].filename}`;
    }

    try {
        const video = await Video.findByIdAndUpdate(req.params.id, updateFields, { new: true });

        if (!video) {
            return res.status(404).json({ success: false, error: 'Video not found' });
        }

        res.status(200).json({ success: true, data: video });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

