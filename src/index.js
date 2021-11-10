const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

const nodemailer = require("nodemailer");

require("dotenv").config();

server.post("/sendemail", async (req, res) => {
  const { name, email, message, terms } = req.body;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: "contact@dkorr.fr", // generated ethereal user
      pass: "Rodrigo010", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter
    .sendMail({
      from: "contact@dkorr.fr", // sender address
      to: "contact@dkorr.fr", // list of receivers
      text: "Dkorr website",
      subject: `Nouvelle demande de ${name}`, // Subject line
      html: `<b>

        <table>
        
      <tr>
        <strong>Nom: </strong><p>${name}</p>
        </tr>
        <tr>
        <strong>Email: </strong><p>${email}</p>
        </tr>

        <tr><strong>Message:  </strong><p>${message}</p>
        </tr>

    <tr> <strong >Utiliser accepter les termes et conditions: </strong> <p style="color:blue;">${terms}</p></tr>
        
    
        </table>


        </b>`, // html body
    })
    .catch((error) => {
      return res.send(error);
    });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  return res.send(info.messageId);
});

let port = process.env.PORT || 3333;

server.listen(port, () => {
  console.log("Server running in port: " + port);
});
