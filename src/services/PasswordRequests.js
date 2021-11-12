const dependencies = {
    HashModel: require('../models').PasswordRequests,
    UserModel: require('../models').User,
    mailSender: require('../utils/mailSender'),
    mongoose: require('mongoose'),
    Crypto: require('../utils/Crypto'),
}

class PasswordRequest {
    async sendRecoverLink(data) {
        const { HashModel, UserModel, mailSender, Crypto } = dependencies;
        const { email } = data;
        const userModel = new UserModel();
        const hashModel = new HashModel(); 
        const { _id, name } = await userModel.findByEmail(email);
        if (!_id) throw new Error('User does not exists');
        const hash = new Crypto().encrypt(String(_id));
        return hashModel.createHash(hash).then(
            () => mailSender(email, name, hash))
            .catch((err) => {
            throw new Error('Error sending email: ', err);
        });
    };
    async readRecoverLink(hash, password) {
        const { HashModel, UserModel, mongoose, Crypto } = dependencies;
        const hashModel = new HashModel();
        const userModel = new UserModel();
        const crypto = new Crypto();
        const hashExists = await hashModel.getHash(hash);
        if (!hashExists) throw new Error('Invalid link');
        console.log(hash)
        const decryptedHash = crypto.decrypt(hash);
        const id = mongoose.Types.ObjectId(decryptedHash);
        if (!id) throw new Error('Invalid link');
        const newPassword = crypto.encrypt(password);
        return userModel.update(id, { $set: { password: newPassword, active: false }});
    };
};

module.exports = PasswordRequest;