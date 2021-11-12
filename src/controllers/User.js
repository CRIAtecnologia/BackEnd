const dependencies = {
    Model: require('../models').User,
    Service: require('../services').User,
}

class UserController {
    constructor(injection) {
        this._dependencies = Object.assign({}, injection, dependencies);
    }

    async signUp(req, res) {
        const { Service } = this._dependencies;
        try {
            const result = await new Service().createUser(req.body);        
            return res.status(201).send(result);
        } catch (error) {
            return res.status(500).send(`We found an error: ${error}`);
        }

    }

    async login(req, res) {
        const { Service } = this._dependencies;
        try {
            const result = await new Service().login(req.body);
            return res.send(result);
        } catch (error) {
            return res.status(500).send(`We found an error: ${error}`);
        }
    }

    async getUser(req, res) {
        const { Model } = this._dependencies;
        try {
            const { id } = req.params;
            const data = await new Model().findById(id);
            return res.status(200).send(data);
        } catch (error) {
            return res.status(500).send(`We found an error: ${error}`);
        }
    }

    async editUser(req, res) {
        const { Service } = this._dependencies;
        try {
            const result = await new Service().editUser(req.body, req.params, req.headers.authorization);
            return res.status(200).send(result)
        } catch (error) {
            return res.status(500).send(`We found an error: ${error}`);
        }
    }

    async deleteUser(req, res) {
        const { Service } = this._dependencies;
        try {
            console.log(req.headers)

            const result = await new Service().deleteUser(req.headers.authorization, req.params);
            if (result) return res.status(204).send({ deleted: true });
        } catch (error) {
            return res.status(500).send(`We found an error: ${error}`);
        }
    }

    async getUsers(req, res) {
        const { Model } = this._dependencies;
        try {
            const userModel = new Model();
            const data = await userModel.findAll({ password: 0 }, req.body);
            const total = await userModel.countAll();
            return res.status(200).send({
                data,
                total,
            });
        } catch (error) {
            return res.status(500).send(`We found an error: ${error}`);
        }
    }
}

module.exports = UserController;