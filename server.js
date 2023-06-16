require('dotenv').config()
const mongoose = require('mongoose')
const businessRoutes = require('./routes/businesses')
const masjidRoutes = require('./routes/masjids')
const carouselRoutes = require('./routes/carousels')
const express = require('express');
const multer = require('multer');
const path = require('path');

// ...

// Configure multer storage for the first image uploader
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// Configure multer storage for the second image uploader
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads2/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload2 = multer({ storage: storage2 });

// ...

// Define the Multer middleware function to handle uploads and errors
function uploadMiddleware(field, modelName, imageUrlProperty) {
  return function (req, res, next) {
    const uploadInstance = field === 'image' ? upload : upload2;

    uploadInstance.single(field)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred during upload
        console.error(err);
        return res.status(500).json({ message: 'Upload error' });
      } else if (err) {
        // An unknown error occurred during upload
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      // File upload was successful
      if (!req.file) {
        // No file was received
        return res.status(400).json({ message: 'No file received' });
      }

      // Save the file details to the respective model
      const { filename } = req.file;
      const imageUrl = `https://mnmuslims-api.onrender.com/uploads${field === 'image' ? '' : '2'}/${filename}`;

      const ImageModel = field === 'image' ? Image : Image2;
      const image = new ImageModel({ _id: new mongoose.Types.ObjectId(), filename, [imageUrlProperty]: imageUrl });

      image.save()
        .then(() => {
          res.json(image);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        });
    });
  };
}

// Define the route for the first image upload
app.post('/uploads', uploadMiddleware('image', 'Image', 'imageUrl'));

// Define the route for the second image upload
app.post('/uploads2', uploadMiddleware('image', 'Image2', 'imageUrl2'));

// ...

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

// Add a route to fetch all images from the second uploader
app.get('/uploads2', async (req, res) => {
  try {
    const images = await Image2.find();
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

// Add a route to serve individual image files from the second uploader
app.get('/uploads2/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads2', filename);
  res.sendFile(filePath);
});

// Delete an image by ID from the first uploader
app.delete('/uploads/:id', async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete an image by ID from the second uploader
app.delete('/uploads2/:id', async (req, res) => {
  try {
    const image = await Image2.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
