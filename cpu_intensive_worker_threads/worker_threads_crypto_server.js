const {
  Worker, parentPort, workerData
} = require('worker_threads');


const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

const router = express.Router();


router.get('/', async (req, res) => {
  const worker = new Worker('./worker_script.js', 
      { workerData: { password: 'random_password' }});
  // Listen for messages from the worker and print them.
  worker.on('message', (msg) => { 
    return res.json({ 'message': msg });
   });
});


app.use('/api', router);

// Start the server
app.listen(port);
console.log('server is up ' + port);

