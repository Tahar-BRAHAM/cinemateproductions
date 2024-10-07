const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { 
  uploadVideo, 
  getVideos, 
  getVideoById, 
  deleteVideo, 
  updateVideo 
} = require('../controllers/videoController'); // Ensure all controllers are imported correctly

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Define routes, ensuring each route has a valid controller
router.post('/', protect, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), uploadVideo);
router.get('/', getVideos); // Check if getVideos is properly defined in your controller
router.get('/:id', getVideoById); // Check if getVideoById is properly defined in your controller
router.delete('/:id', protect, deleteVideo); // Check if deleteVideo is properly defined in your controller
router.put('/:id', protect, upload.fields([{ name: 'thumbnail', maxCount: 1 }]), updateVideo); // Check if updateVideo is properly defined

module.exports = router;
