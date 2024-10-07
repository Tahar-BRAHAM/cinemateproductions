const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const connectDB = require('./src/db');
const errorHandler = require('./src/middleware/errorHandler');
const emailRoutes = require('./src/routes/email'); // Import the email routes

dotenv.config();

const app = express();
app.use(cors({
    origin: 'https://www.cinemate-productions.com/',
    // origin:'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json());

// Use the error handler
app.use(errorHandler);

// Email routes
app.use('/api/contact', emailRoutes); // Use the email routes

// Set security headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", "http://localhost:5000/api/videos", "http://localhost:5000/api/auth/login"],
      frameSrc: ["'self'"],
      objectSrc: ["'none'"],
    },
  })
);

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/videos', require('./src/routes/video'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
