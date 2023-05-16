const nodemailer = require("nodemailer")
const config = require("./config")

const express = require('express');
const app = express();
app.use(express.json())

const cors = require("cors");
app.use(cors());

const transporter = nodemailer.createTransport({
    host: "smtp.poczta.onet.pl",
    port: 465,
    secure: true, // Set to true if your SMTP service requires a secure connection (e.g., SSL/TLS)
    auth: {
        user: config.emailUsername,
        pass: config.emailPassword
    }
})

app.post("/contact-form", (req, res) =>{
    const { name, surname, email, message } = req.body;

    const mailOptions = {
        from: config.emailUsername,
        to: config.emailUsername,
        subject: name + " " + surname,
        text: "Email: " + email + "\nMessage:" + message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.error(error)
            res.status(500).json("Sorry, there was an error sending your message." + name + surname + email + message)
        }else{
            console.log("Message sent: " + info.response)
            res.json("Message sent successfully.")
        }
      })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});