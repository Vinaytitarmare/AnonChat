const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secret = process.env.ENCRYPTION_SECRET || "ThisIsASecretKey123456789012"; // Must be 32 bytes
const iv = crypto.randomBytes(16); // Initialization vector

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secret), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text) {
  const [ivHex, encryptedData] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encryptedText = Buffer.from(encryptedData, "hex");

  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secret), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

module.exports = { encrypt, decrypt };
