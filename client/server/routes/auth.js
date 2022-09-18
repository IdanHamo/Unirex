const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../model/users");

router.post("/google", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    const token = user.generateAuthToken();
    return res
      .status(200)
      .send({ token: token, message: "logged in successfully" });
  }
  user = new User(req.body);
  await user.save();
  const token = user.generateAuthToken();
  res
    .status(200)
    .send({ token: token, message: "account created successfully" });
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send("user does not exist");
  }
  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatePassword) {
    return res.status(400).send("invalid email or password");
  }

  const token = user.generateAuthToken();
  res.status(200).send(token);
});

function loginValidation(user) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(400).email().required(),
    password: Joi.string().max(1024).min(8).required(),
  });
  return schema.validate(user);
}

module.exports = router;
