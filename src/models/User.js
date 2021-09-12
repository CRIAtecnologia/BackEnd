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

    findById(id) {
        return this.model.findOne({ _id: id, active: true }, { password: 0 });
    }

    findByEmail(email) {
        return this.model.findOne({ email });
    }

    findAll() {
        return this.model.find({ active: true }, { password: 0 });
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