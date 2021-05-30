"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(message) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
    console.log(message);
    // create reusable transporter object using google service
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mahdisouilmi95@gmail.com',
            pass: '026434380baba' // naturally, replace both with your real credentials or an application-specific password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"crypto 👻" <foo@example.com>', // sender address
        to: "mahdisouilmi95@gmail.com", // list of receivers
        subject: "Crypto Market", // Subject line
        text: message, // plain text body
        html: "<b>" + message + "</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
module.exports = {
    main
}