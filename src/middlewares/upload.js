const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'linkedin-posts',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
