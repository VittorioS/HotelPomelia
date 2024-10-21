const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const transporter = nodemailer.createTransport({
  host: "smtp.freesmtpservers.com",
  port: 25,
  secure: false, // upgrade later with STARTTLS
  //   auth: {
  //     user: "username",
  //     pass: "password",
  //   },
});

app.use(express.static("public"));

app.post("/send/mail", urlencodedParser, (req, res) => {
  console.log("Body", req.body);
  const mailOptions = {
    from: "test@mail.com",
    to: req.body.email,
    subject: "Sending Email using Node.js",
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
    res.redirect("/index.html");
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
