const dependencies = {
    crypto: require('crypto'),
    key: process.env.KEY,
    iv: process.env.IV,
};

class Crypto {
    encrypt(text) {
        const { key, crypto, iv } = dependencies;
        const cipher = 
           crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(text);

        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return encrypted.toString('hex');
    }
    decrypt(text) {
        const { key, crypto, iv } = dependencies;
        const encryptedText =
           Buffer.from(text, 'hex');
         
        const decipher = crypto.createDecipheriv(
               'aes-256-cbc', Buffer.from(key), iv);
        
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
         
        return decrypted.toString();
       }
};

module.exports = Crypto;