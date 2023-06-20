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



const storage3 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads3/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload3 = multer({ storage: storage3 });


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

// Define the second image schema
const imageSchema2 = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  filename: String,
  imageUrl2: String,
});

const Image2 = mongoose.model('Image2', imageSchema2);



const imageSchema3 = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  filename: String,
  imageUrl3: String,
});

const Image3 = mongoose.model('Image3', imageSchema3);


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

// Define the route for the second image upload
app.post('/uploads2', upload2.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file received');
    }

    const { filename } = req.file;
    const imageUrl2 = `https://mnmuslims-api.onrender.com/uploads2/${filename}`;

    const image = new Image2({ _id: new mongoose.Types.ObjectId(), filename, imageUrl2 });
    await image.save();

    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Define the route for the second image upload
app.post('/uploads3', upload3.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file received');
    }

    const { filename } = req.file;
    const imageUrl3 = `https://mnmuslims-api.onrender.com/uploads3/${filename}`;

    const image = new Image3({ _id: new mongoose.Types.ObjectId(), filename, imageUrl3 });
    await image.save();

    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Add a route to fetch all images from the first uploader
app.get('https://mnmuslims-api.onrender.com/uploads', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a route to fetch all images from the second uploader
app.get('https://mnmuslims-api.onrender.com/uploads2', async (req, res) => {
  try {
    const images = await Image2.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a route to fetch all images from the second uploader
app.get('https://mnmuslims-api.onrender.com/uploads3', async (req, res) => {
  try {
    const images = await Image3.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Add a route to serve individual image files from the first uploader
app.get('https://mnmuslims-api.onrender.com/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);
  res.sendFile(filePath);
});

// Add a route to serve individual image files from the second uploader
app.get('https://mnmuslims-api.onrender.com/uploads2/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads2', filename);
  res.sendFile(filePath);
});

// Add a route to serve individual image files from the second uploader
app.get('https://mnmuslims-api.onrender.com/uploads3/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads3', filename);
  res.sendFile(filePath);
});


// Delete an image by ID from the first uploader
app.delete('https://mnmuslims-api.onrender.com/uploads/:id', async (req, res) => {
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

// Delete an image by ID from the second uploader
app.delete('https://mnmuslims-api.onrender.com/uploads2/:id', async (req, res) => {
  try {
    const image = await Image2.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete the image file from the folder
    const imagePath = path.join(__dirname, '/uploads2', image.filename);
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


// Delete an image by ID from the second uploader
app.delete('https://mnmuslims-api.onrender.com/uploads3/:id', async (req, res) => {
  try {
    const image = await Image3.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete the image file from the folder
    const imagePath = path.join(__dirname, '/uploads3', image.filename);
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
