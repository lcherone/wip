// const debug = require('debug')('app:lib:encryption');

const crypto = require('crypto');

/**
 * Encryption helper
 * Usage:
 * ``` javascript

const Encryption = require('../../lib/encryption');

const privateKey = Encryption.hash('sha256', process.env.ENCRYPTION_KEY);

// encrypt object into buffer
let enc = Encryption.encrypt({
  foo: 'some value',
  bar: 'value xyz'
}, privateKey);

// optional encode buffer into hex, for decryption
let buf = Buffer.from(enc.toString('hex'), "hex")

// decrypt the encrypted buffer
var dec = Encryption.decrypt(buf, privateKey);

debug("key: ", privateKey);
debug("encrypt: ", enc.toString('hex'));
debug("encrypt length: ", enc.length);
debug("decrypted: " + dec.foo);
```
 *
 */

let Encryption = {};

/**
 * Create a random hex string using crypto.randomBytes
 * - Encryption.hash('sha256', 'data to hash');
 *
 * @return {Buffer}
 */
Encryption.randomString = function (length) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      if (err) return reject(err);

      resolve(buffer.toString('hex'));
    });
  });
};

/**
 * Create a hash
 * - Encryption.hash('sha256', 'data to hash');
 *
 * @return {Buffer}
 */
Encryption.hash = function (algo, data) {
  return crypto.createHash(algo).update(data).digest();
};

/**
 * Decrypt data
 * - Encryption.decrypt(<Buffer>, 'secret key');
 *
 * @return {Object}
 */
Encryption.decrypt = function (data, key) {
  let cipher = crypto.createDecipher("aes-256-cbc", key);
  let decrypted = Buffer.concat([cipher.update(data), cipher.final()]);

  return JSON.parse(decrypted.toString());
};

/**
 * Encrypt data
 * - Encryption.encrypt(<Object>, 'secret key');
 *
 * @return {Buffer}
 */
Encryption.encrypt = function (data, key) {
  let cipher = crypto.createCipher('aes-256-cbc', key);

  return Buffer.concat([cipher.update(Buffer.from(JSON.stringify(data), "utf8")), cipher.final()]);
};

module.exports = Encryption;
