// const crypto = require('crypto');

// const generateJwtSecretKey = () => {
//   const secretKey = crypto.randomBytes(32).toString('hex');
//   console.log(secretKey);
// };

// // Call the function to generate the 256-bit JWT secret key
// generateJwtSecretKey();

const crypto = require('crypto');

const generateJwtSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('base64');
  console.log(secretKey);
};

// Call the function to generate the JWT secret key
generateJwtSecretKey();
