const WorkerPool = require('./worker_pool.js');
const os = require('os');

const pool = new WorkerPool(os.cpus().length);


const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

const router = express.Router();

let finished = 0;


router.get('/', async (req, res) => {
  pool.runTask('random_password', (err, result) => {
    return res.json({ 'message': result });
  });
});


app.use('/api', router);

// Start the server
app.listen(port);
console.log('server is up ' + port);

