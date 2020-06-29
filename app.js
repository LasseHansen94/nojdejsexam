// We require the relevant imports
const express = require("express");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// We instansiate express to use it later
const app = express();

// We read the files beforehand and then use the variable later
const fs = require('fs');
const { getMaxListeners } = require("process");
const { transcode } = require("buffer");
const mainpage = fs.readFileSync("public/mainpage/mainpage.html", "utf8");
const contact = fs.readFileSync("public/contact/contact.html", "utf8");
const about = fs.readFileSync("public/about/about.html", "utf8");
const educations = fs.readFileSync("public/educations/educations.html", "utf8");
const chat = fs.readFileSync("public/chat/chat.html", "utf8");


// To use our public folder with css we have to make it static
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const { Model } = require('objection');
const Knex = require('knex');
var Educations = require("./models/educations.js");

// Routes
// A get route for mainpage
app.get("/", (req, res) => {
    return res.send(mainpage);
});

// A get route for contact
app.get("/contact", (req, res) => {
    return res.send(contact);
});

// POST route to contact form
app.post("/contact", (req, res) => {
    // Instansiate SMTP Server
    const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'nodeexam3000@gmail.com',
            pass: 'Examnode3000'
        }
    });
    

    // Specify the email
    const mailOtps = {
        to: 'nodeexam3000@gmail.com',
        subject: 'From ' + req.body.email,
        text: req.body.message
    };

    // send the email
    transport.sendMail(mailOtps, (error, info) => {
        if (error) {
            return console.log("Error while sending mail", error);
        } else {
            console.log("Message send");
            res.send(mainpage)
        }
    });
});

// A get route for about
app.get("/about", (req, res) => {
    return res.send(about);
});

// A get route for educations
app.get("/educations", (req, res) => {
    return res.send(educations);
})

// A get route for chat
app.get("/chat",  (req, res) => {
    return res.send(chat);
})

// We assign the value 4000 to our port
const port = process.env.PORT ? process.env.PORT : 4000;

// We setup the server on port 4000
const server = app.listen(port, (error) => {
    if (error) {
        console.log("Error running the server.");
    }
    console.log("Server is running on port", server.address().port);
})

// Sockets
const io = require("socket.io")(server);
// Sockets
io.on('connection', socket => {
    socket.on('a client wrote this', (data) => {
        // emits to all clients
        io.emit("A client said", {
            thoughts: escape(data.thoughts)
        });
    });
});