const dependencies = {
    Service: require('../services').PasswordRequests,
}

class PasswordRequestController {
    constructor(injection) {

        this._dependencies = Object.assign({}, injection, dependencies);
    }

    async sendRecoverLink(req, res) {
        const { Service } = this._dependencies;
        try {
            const result = await new Service().sendRecoverLink(req.body);
            console.log(result)
            if (result) return res.status(200).send({
                sent: true,
            });
        } catch (error) {
            return res.status(500).send(`We found an error: ${error}`);
        }
    }

    async readRecoverLink(req, res) {
        const { Service } = this._dependencies;
        try {
            const result = await new Service().readRecoverLink(req.params.hash, req.body.password);        
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(`We found an error: ${error}`);
        }
    }
}

module.exports = PasswordRequestController;