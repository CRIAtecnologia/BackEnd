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
            return res.send(result);
        } catch (error) {
            return res.status(500).send(`We found an ${error}`);
        }

    }

    async login(req, res) {
        const { Service } = this._dependencies;
        try {
            const result = await new Service().login(req.body);
            return res.send(result);
        } catch (error) {
            return res.status(500).send(`We found an ${error}`);
        }
    }

    async getUser(req, res) {
        const { Model } = this._dependencies;
        try {
            const { id } = req.params;
            const data = await new Model().findById(id);
            return res.status(200).send(data);
        } catch (error) {
            return res.status(500).send(`We found an ${error}`);
        }
    }

    async getUsers(req, res) {
        const { Model } = this._dependencies;
        try {
            const data = await new Model().findAll();
            return res.status(200).send(data);
        } catch (error) {
            return res.status(500).send(`We found an ${error}`);
        }    
    }
}

module.exports = UserController;