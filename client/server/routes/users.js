const express = require("express");
const bcrypt = require("bcrypt");
const { validateUser, User } = require("../model/users");
const router = express.Router();
const auth = require("../middleware/auth");

router.put("/premium/", auth, async (req, res) => {
  console.log(req.body);
  const user = await User.findByIdAndUpdate({ _id: req.body._id }, req.body);
  if (!user) res.status(404).send("user does not found");
  console.log(user);

  res.status(200).send(user);
});
router.put("/changeImage/:id", auth, async (req, res) => {
  try {
    const file = req.files.profile;

    const name = file.name;

    //get user from db. save url to profile image
    //save user
    file.mv("./images/" + name);
    const user = await User.findOne({ _id: req.params.id });
    if (!user) res.status(404).send("user does not found");
    user.image = `http://localhost:3001/images/${name}`;
    await user.save();
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/getAll", async (req, res) => {
  const users = await User.find();
  if (!users) res.status(200).send("no users found");
  res.status(200).send(users);
});

router.post("/createUser", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already exists");

  user = new User(req.body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.status(200).send(user);
});

router.post("/user", async (req, res) => {
  const user = await User.findOne({ _id: req.body._id });
  if (!user) return res.send("user not found");
  res.status(200).send(user);
});

router.get("/me/:id", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) return res.status(404).send("user not found");
  res.status(200).send(user);
});

module.exports = router;
