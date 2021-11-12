const nodemailer = require('nodemailer');
const { resolve } = require('path/posix');
const htmlMounter = require('./htmlMounter');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ACCOUNT, 
        pass: process.env.EMAIL_PASSWORD, 
    },
});

module.exports = (mailTo, username, hash) => {
    const html = htmlMounter(username, hash);
    const mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to: mailTo,
        subject: 'Recuperação de senha',
        html,
    }
    return transporter.sendMail(mailOptions);
};