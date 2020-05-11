const vision = require('@google-cloud/vision');

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

module.exports = detectHandwritingOCR;
