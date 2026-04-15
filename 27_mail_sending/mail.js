const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your email address",
        pass: "your app password",
    }});

const sendEmail = async(to, subject, text) => {
    try {
        const mailOptions = {
            from: "your email address",
            to: to,
            subject: subject,
            text: text
        };
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendEmail;