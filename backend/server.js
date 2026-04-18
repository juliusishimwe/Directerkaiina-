const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// In-memory storage for videos (in production, use a database)
let videos = [];

// Routes
app.get('/api/videos', (req, res) => {
  res.json(videos);
});

app.post('/api/videos', (req, res) => {
  const { title, description, thumbnail, videoUrl, category } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const video = {
    id: Date.now().toString(),
    title,
    description,
    thumbnail: thumbnail || '',
    videoUrl: videoUrl || '',
    category: category || '',
    uploadedAt: new Date().toISOString()
  };

  videos.push(video);
  res.json(video);
});

app.delete('/api/videos/:id', (req, res) => {
  const { id } = req.params;
  const index = videos.findIndex(v => v.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Video not found' });
  }

  const video = videos[index];
  // Delete file from filesystem
  fs.unlink(path.join(uploadsDir, video.filename), (err) => {
    if (err) console.error('Error deleting file:', err);
  });

  videos.splice(index, 1);
  res.json({ message: 'Video deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});