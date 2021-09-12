const { omitBy, isNil } = require('lodash');

module.exports = (data) => {
    const {
        name,
        description,
        image,
        instagram,
        email,
        phone,
        pix,
        password,
    } = data
    const object = omitBy({
        name,
        description,
        image,
        instagram,
        email,
        phone,
        pix,
        password,
        active: true,
    }, isNil)
    return object;
}