const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports.subscribe =
    async function (email) {
        const transporter = nodemailer.createTransport({
            host: "mail.aquamobnola.com",
            port: process.env.PORT,
            secure: true,
            auth: {
                user: 'subscribe@aquamobnola.com',
                pass: process.env.PASS_USER_SUBSCRIBE
            },
        });

        const html = `
    <h1>Welcome to Email Notifications</h1>
    <h3>from Aquamob NOLA</h3>
    <p>Your email address has been saved as: ${email}</p>    
`;

        let info = await transporter.sendMail({
            from: `'"Subscription Notification" <subscribe@aquamobnola.com>'`,
            to: `${email}`,
            bcc: `subscribe@aquamobnola.com`,
            subject: "You have successfully subscribed!",
            html: html,
        });

        console.log("Message sent: " + info.messageId);
    }


module.exports.info =
    async function (body) {
        const transporter = nodemailer.createTransport({
            host: "mail.aquamobnola.com",
            port: process.env.PORT,
            secure: true,
            auth: {
                user: 'info@aquamobnola.com',
                pass: process.env.PASS_USER_INFO
            },
        });

        const html = `
    <h1>New Message Received</h1>
    <h3>from: ${body.fullName}</h3>
    <p>email: ${body.email}</p>  
    <p>message: ${body.message}</p>
`;

        let info = await transporter.sendMail({
            from: `'"Message Notification" <info@aquamobnola.com>'`,
            to: "info@aquamobnola.com",
            subject: "New Message from User",
            html: html,
        });

        console.log("Message sent: " + info.messageId);
    }
