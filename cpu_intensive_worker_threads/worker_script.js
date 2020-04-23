const crypto = require('crypto');

const {parentPort, workerData } = require('worker_threads');

const hashPassword = (password) => {
    const salt = crypto.randomBytes(128).toString('base64');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');
    return hash;
}
  
const hash = hashPassword(workerData.password);
parentPort.postMessage(hash);