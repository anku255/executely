const express = require('express');

const multer = require('multer');
const uploadToCloudinary = require('../utils/uploadToCloudinary');
const getOutputFromCode = require('../utils/getOutputFromCode');
const detectHandwritingOCR = require('../utils/detectHandwritingOCR');

const router = express.Router();
const upload = multer();

router.post('/getText', upload.single('file'), async (req, res) => {
  try {
    const textPromise = detectHandwritingOCR(req.file.buffer);

    const imagePromise = uploadToCloudinary(req.file.buffer);

    const [text, imageData] = await Promise.all([textPromise, imagePromise]);

    return res.json({ text, imageUrl: imageData.url });
  } catch (error) {
    console.error('error', error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.post('/getOutput', async (req, res) => {
  try {
    const program = {
      script: req.body.code,
      stdin: req.body.stdin ? req.body.stdin : '',
      language: req.body.lang_code,
      versionIndex: req.body.lang_ver,
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
    };

    const output = await getOutputFromCode(program);
    return res.json({ output });
  } catch (error) {
    console.error('error', error);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
});

module.exports = router;
