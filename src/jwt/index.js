const dependencies = { 
    jwt: require('jsonwebtoken'),
    key: process.env.SECRET,
}

class Jwt {

    sign(_id, name) {
        const { jwt, key } = dependencies;
        const userData = {
            _id,
            name,
        }
        return jwt.sign(userData, key);
    }
    verify() {
        const { jwt, key, token } = dependencies;
        return jwt.verify(token, key);
    }
};

module.exports = Jwt;