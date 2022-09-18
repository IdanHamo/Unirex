const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const Joi = require("joi");
const { User } = require("../model/users");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");

require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

router.post("/", async (req, res) => {
  const { error } = validateForgetPassword(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("invalid email");
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    config.get("jwtKey")
  );

  user.reset_token = token;
  await user.save();

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  async function sendMail(userEmail) {
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "unirexcontact@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      const mailOptions = {
        from: "unirexcontact@gmail.com",
        to: userEmail,
        subject: "hello",
        text: "success",
        html: `<a href='http://localhost:3000/resetPassword/${token}'>reset link</a>`,
      };

      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
  sendMail(req.body.email)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

function validateForgetPassword(email) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(400).email().required(),
  });

  return schema.validate(email);
}

router.put("/confirmPassword/:token", async (req, res) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  const { _id, email } = jwt.verify(req.params.token, config.get("jwtKey"));
  console.log(_id);
  console.log(email);

  const user = await User.findOne({ _id: _id });

  user.password = password;

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.status(200).send("password changed successfully");
});

// router.post("/", async (req, res) => {
//   console.log(req.body);
//   const { email } = req.body;
// });
module.exports = router;
