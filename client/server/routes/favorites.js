const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { User } = require("../model/users");
const { Card } = require("../model/card");

router.post("/api/favorites", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  let favorites = user.favorites || [];

  const found = favorites.findIndex(function (favorite) {
    return favorite.url == req.body.url;
  });

  if (found >= 0) {
    favorites = favorites.filter((favorite) => {
      return favorite.url !== req.body.url;
    });
  } else {
    favorites.push(req.body);
  }

  user.favorites = favorites;
  const message = found >= 0 ? "Removed Successfully" : "Added Successfully";

  await user.save();
  res.send({ success: true, favorites: user.favorites, message });
});

router.post("/favorites/:cardid", auth, async (req, res) => {
  const { cardid: cardId } = req.params;
  const user = await User.findOne({ _id: req.user._id });
  const card = await Card.findById(cardId);

  let favorites = user.favorites || [];

  const found = favorites.findIndex(function (favorite) {
    return favorite._id.toString() === cardId;
  });

  if (found >= 0) {
    card.favoriteNumber = card.favoriteNumber - 1;
    await card.save();
    favorites = favorites.filter(
      (favorite) => favorite._id.toString() !== cardId
    );
  } else {
    card.favoriteNumber = card.favoriteNumber + 1;
    await card.save();
    favorites.push(card);
  }

  user.favorites = favorites;
  const message = found >= 0 ? "Removed Successfully" : "Added Successfully";

  await user.save();
  res.send({ success: true, favorites: user.favorites, message });
});

router.get("/favorites", auth, async (req, res) => {
  const userId = req.user._id;
  const user = await User.findOne({ _id: userId });
  res.status(200).send(user.favorites);
});

module.exports = router;
