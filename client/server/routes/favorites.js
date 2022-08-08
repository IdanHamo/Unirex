const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User } = require("../model/users");
const { Card } = require("../model/card");

router.post("/favorites/:cardid", auth, async (req, res) => {
  const { cardId } = req.params;
  const user = await User.findOne({ _id: req.user._id });
  let favorites = user.favorites;
  if (favorites.indexOf(cardId) >= 0) {
    favorites = favorites.filter((favorite) => favorite !== cardId);
  } else {
    favorites.push(cardId);
  }
  user.favorites = favorites;

  await user.save();
  res.send({ success: true, favorites: user.favorites });
});

router.get("/favorites", auth, async (req, res) => {
  const userId = req.user._id;

  const user = await User.findOne({ _id: userId });
  // arr of card ids

  console.log(user);
  // const cards = await Card.find({
  //   id: favs,
  // });
  let cards = await Card.find({ _id: { $in: user.favorites } });
  if (!cards) return res.status(404).send("no results");
  res.status(200).send(cards);
});
module.exports = router;
