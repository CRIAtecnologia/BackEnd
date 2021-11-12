const dependencies = {
    userFactory: require("../utils/factoryUser"),
    userValidator: require("../utils/userValidator"),
    Model: require('../models').User,
    Crypto: require("../utils/Crypto"),
    Jwt: require("../jwt"),
    isEqual: require('lodash').isEqual,
    mongoose: require('mongoose'),
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
            const { _id, name, password } = await new Model().findByEmail(email);
            const { data } = new Crypto().encrypt(data.password);
            if (data === password) {
                const token = await new Jwt().sign(_id, email, name);
                return { _id, email, name, token };
            }
            throw new Error('Incorrect email or password');
        } catch (error) {
            throw new Error('Incorrect email or password');
        }
    }

    async createUser(data) {
        const { 
            userFactory,
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
        const model = new Model();
        const object = userFactory(data);
        const validated = userValidator(object);
        if (validated) {
            const userCreated = await model.create(validated);
            if (!userCreated) throw new Error('Error with data creation');
            const { _id, email, name } = userCreated;
            const token = await new Jwt().sign(_id, email, name);
            if (!token) throw new Error('Incorrect email or password')
            return { _id, email, name, token };
        }
    }

    async editUser(data, params, authorization) {
        const { 
            userFactory,
            userValidator,
            Model,
            Jwt,
            isEqual
        } = this._dependencies;
        const validated = userValidator(object);
        if (validated) {
            const userFromToken = new Jwt().verify(authorization);
            const userFromDatabase = await new Model().findById(params.id, { _id: 1 });
            const isEqual = isEqual(String(userFromDatabase._id), String(userFromToken._id));
            if (!isEqual) throw new Error('Usuário não tem permissão para realizar essa ação');
            const object = userFactory(data);
            return new Model().update(params.id, object);
        };
    };

    async deleteUser(authorization, params) {
        const { 
            userFactory,
            userValidator,
            Model,
            Jwt,
            isEqual,
        } = this._dependencies;
        console.log(authorization)

        const userFromToken = new Jwt().verify(authorization);
        const userFromDatabase = await new Model().findById(params.id, { _id: 1 });

        const isSameUser = isEqual(String(userFromDatabase._id), String(userFromToken._id));
        if (!isSameUser) throw new Error('Usuário não tem permissão para realizar essa ação');
        return new Model().delete(params.id);
    };
}

module.exports = User;