const dependencies = {
    mongoose: require('mongoose'),
    schema: require('../schema').user,
}

class User {
    constructor() {
        const { mongoose, schema } = dependencies;
        this.model = mongoose.model('users', schema);
    }

    create(data) {
        return this.model.create(data).then(result => result).catch(err => {
            throw new Error(err)
        })
    }

    findById(id, fields = { password: 0 }) {
        return this.model.findOne({ _id: id, active: true }, fields);
    }

    findByEmail(email) {
        return this.model.findOne({ email });
    }

    findAll(fields = { password: 0 }, options = { skip: 0, limit: 100 }) {
        const { limit, skip } = options;
        return this.model.find({ active: true }, fields).skip(skip).limit(limit);
    }

    countAll() {
        return this.model.countDocuments({ active: true });
    }

    update(_id, data) {
        return this.model.updateOne(
            { _id, active: true },
            data,
            { upsert: true },
        );
    }

    delete(_id) {
        return this.model.updateOne(
            { _id },
            { active: false },
            { upsert: true }
        )
    }

}

module.exports = User;