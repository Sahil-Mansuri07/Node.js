const express = require('express');
const sendEmail = require('./mail');
const ejs = require('ejs');

const app = express();
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs" );
app.set("views", "./views" );

app.get('/', (req, res) => {
    res.render('mail');
});

app.post('/send', async (req, res) => {
    const { to, subject, message } = req.body;
    try {
        await sendEmail(to, subject, message);
        res.send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});