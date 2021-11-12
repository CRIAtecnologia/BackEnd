const dependencies = {
    mongoose: require('mongoose'),
    schema: require('../schema').passwordRequests,
    Crypto: require('crypto'),
}

class PasswordRequests {
    constructor() {
        const { mongoose, schema } = dependencies;
        this.model = mongoose.model('passwordRequests', schema);
    }

    async createHash(hash) {
        try {
            const result = await this.model.create({ hash, active: true });
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getHash(hash) {
        try {
            const result = await this.model.find({ hash, active: true });
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteHash(hash) {
        try {
            const result = await this.model.deleteOne({ hash });
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = PasswordRequests;