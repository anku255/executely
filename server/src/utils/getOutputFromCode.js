const axios = require('axios');

function getOutputFromCode(program) {
  return new Promise(async (resolve, reject) => {
    axios
      .post('https://api.jdoodle.com/execute', program)
      .then(output => resolve(output.data))
      .catch(err => reject(err));
  });
}

module.exports = getOutputFromCode;
