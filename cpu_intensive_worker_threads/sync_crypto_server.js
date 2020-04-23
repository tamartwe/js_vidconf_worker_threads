
const express = require('express');
const port = process.env.PORT || 3000;

const crypto = require('crypto');

const app = express();

const router = express.Router();

const hashPassword = (password) => {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
  return hash;
}


router.get('/', async (req, res) => {
  const hash = hashPassword('random_password');
  return res.json({ 'message': hash });
});


app.use('/api', router);

// Start the server
app.listen(port);
console.log('server is up ' + port);

