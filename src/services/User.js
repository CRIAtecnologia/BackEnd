const dependencies = {
    makeUserObject: require("../utils/makeUserObject"),
    userValidator: require("../utils/userValidator"),
    Model: require('../models').User,
    Crypto: require("../utils/Crypto"),
    Jwt: require("../jwt"),
}

class User {
    constructor(injection) {
        this._dependencies = Object.assign({}, injection, dependencies);
    }

    async login(data) {
        try {
            const { 
                Model,
                Crypto,
                Jwt
            } = this._dependencies;
            const { email } = data;
            const { _id, password } = await new Model().findByEmail(email);
            const encryptedPassword = new Crypto().encrypt(data.password);
            if (encryptedPassword === password) {
                const token = await new Jwt().sign(_id, email);
                return { token };
            }
            throw new Error('Incorrect email or password');
        } catch (error) {
            throw new Error('Incorrect email or password');
        }
    }

    async createUser(data) {
        const { 
            makeUserObject,
            userValidator,
            Model,
            Crypto,
            Jwt
        } = this._dependencies;
        const { password } = data;
        if (!password) {
            throw new Error('Password was not provided');
        }
        data.password = new Crypto().encrypt(data.password);
        const object = makeUserObject(data);
        const validated = userValidator(object);
        if (validated) {
            const userCreated = await new Model().create(validated);
            if (!userCreated) throw new Error('Error with data creation');
            const { _id, name } = userCreated;
            const token = await new Jwt().sign(_id, name);
            if (!token) throw new Error('Incorrect email or password')
            return { token };
        }
    }
}

module.exports = User;