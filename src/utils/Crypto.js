const dependencies = {
    crypto: require('crypto'),
    key: process.env.KEY,
};

class Crypto {
    encrypt(password) {
        const {
            crypto,
            key,
        } = dependencies;
        const hmac = crypto.createHmac('sha256', key);
        hmac.update(password);
        return hmac.digest('base64');
    }

    verifier(hashedPassword) {

    }
};

module.exports = Crypto;