const crypto = require('crypto');
const SECRET_KEY = 'yourSecretKey1234567890';
const ALGORITHM = 'aes-256-ctr';
const DIGEST = 'sha256';

const createEncryptionKey = (secretKey) => {
  return crypto.createHash(DIGEST).update(secretKey).digest();
};

const encryptPassword = (password) => {
  const key = createEncryptionKey(SECRET_KEY);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encryptedPassword = cipher.update(password, 'utf8', 'hex');
  encryptedPassword += cipher.final('hex');

  return `${iv.toString('hex')}:${encryptedPassword}`;
};

const decryptPassword = (encryptedPassword) => {
  const key = createEncryptionKey(SECRET_KEY);
  const [ivHex, encryptedText] = encryptedPassword.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  let decryptedPassword = decipher.update(encryptedText, 'hex', 'utf8');
  decryptedPassword += decipher.final('utf8');
  return decryptedPassword;
};

module.exports = {
    encryptPassword,
    decryptPassword
}
