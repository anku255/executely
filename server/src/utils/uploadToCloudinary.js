const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadToCloudinary(fileBuffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: process.env.CLOUDINARY_FOLDER, resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      )
      .end(fileBuffer);
  });
}

module.exports = uploadToCloudinary;
