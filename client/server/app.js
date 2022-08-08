const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

const user = require("./routes/users");
const auth = require("./routes/auth");
const cards = require("./routes/cards");
const favorites = require("./routes/favorites");

const session = require("express-session");
const passport = require("passport");
const passportAuth = require("./routes/passport");
require("./passport/passport");

mongoose
  .connect("mongodb://localhost/HackerU")
  .then(() => console.log("successful connection"))
  .catch((e) => console.log("connection failed " + e));

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(express.json());
app.use(morgan());

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", user);
app.use("/auth", auth);
app.use("/cards", cards);
app.use("/favorites", favorites);
app.use("/passportAuth", passportAuth);

const port = 3001;
app.listen(port, () => console.log("listening to port " + port));
