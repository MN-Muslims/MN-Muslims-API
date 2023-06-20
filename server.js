require('dotenv').config()
const mongoose = require('mongoose')

const businessRoutes = require('./routes/businesses')
const masjidRoutes = require('./routes/masjids')
const carouselRoutes = require('./routes/carousels')
const usersRoutes = require('./routes/adminusers')

const express = require('express')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

// Configure multer storage for the first image uploader
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

let cors = require("cors");
app.use(cors());

// routes
app.use('/api/businesses', businessRoutes)

// masjid routes
app.use('/api/masjids', masjidRoutes)

// carousel routes
app.use('/api/carousel', carouselRoutes)

// Users Routes
app.use('/api/users', usersRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// Define the first image schema
const imageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  filename: String,
  imageUrl: String,
});

const Image = mongoose.model('Image', imageSchema);



// Define the route for the first image upload
app.post('/uploads', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file received');
    }

    const { filename } = req.file;
    const imageUrl = `https://mnmuslims-api.onrender.com/uploads/${filename}`;

    const image = new Image({ _id: new mongoose.Types.ObjectId(), filename, imageUrl });
    await image.save();

    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Add a route to fetch all images from the first uploader
app.get('/uploads', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Add a route to serve individual image files from the first uploader
app.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);
  res.sendFile(filePath);
});


// Delete an image by ID from the first uploader
app.delete('/uploads/:id', async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete the image file from the folder
    const imagePath = path.join(__dirname, '/uploads', image.filename);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to delete image file' });
      }
      res.json({ message: 'Image deleted successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

