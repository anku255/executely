const express = require('express');
const vision = require('@google-cloud/vision');
const multer = require('multer');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;

const router = express.Router();
const upload = multer();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function detectHandwritingOCR(fileBuffer) {
  return new Promise((resolve, reject) => {
    const client = new vision.ImageAnnotatorClient();

    const request = {
      image: {
        content: fileBuffer,
      },
      feature: {
        languageHints: ['en-t-i0-handwrit'],
      },
    };
    client
      .documentTextDetection(request)
      .then(results => {
        const { fullTextAnnotation } = results[0];
        resolve(fullTextAnnotation.text);
      })
      .catch(err => {
        console.error('ERROR:', err);
        reject(err);
      });
  });
}

function getOutput(program) {
  return new Promise(async (resolve, reject) => {
    axios
      .post('https://api.jdoodle.com/execute', program)
      .then(output => resolve(output.data))
      .catch(err => reject(err));
  });
}

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

router.post('/getText', upload.single('file'), async (req, res) => {
  try {
    // TODO: Validations
    const text = await detectHandwritingOCR(req.file.buffer);

    const imageData = await uploadToCloudinary(req.file.buffer);

    return res.json({ text, imageUrl: imageData.url });
  } catch (error) {
    console.error('error', error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.post('/getOutput', async (req, res) => {
  try {
    // TODO: Validations

    const program = {
      script: req.body.code,
      stdin: req.body.stdin ? req.body.stdin : '',
      language: req.body.lang_code,
      versionIndex: req.body.lang_ver,
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
    };

    console.log("program", program);

    const output = await getOutput(program);
    return res.json({ output });
  } catch (error) {
    console.error('error', error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;
