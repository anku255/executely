// const mongoose = require('mongoose');
const path = require('path');

// import environment variables
require('dotenv').config({ path: 'variables.env' });

// connect to the database
// mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
// mongoose.Promise = global.Promise;
// mongoose.connection.on('error', err => {
//   console.log(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
// });

// Set Google Cloud env variable
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
  __dirname,
  '..',
  process.env.GOOGLE_CLOUD_JSON
);

// require models here

// start the app
const app = require('./app');

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running ➡ PORT ${server.address().port} `);
});
