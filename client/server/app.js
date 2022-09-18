const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

const user = require("./routes/users");
const auth = require("./routes/auth");
const cards = require("./routes/cards");
const favorites = require("./routes/favorites");
const resetPassword = require("./routes/resetPassword");
const contacts = require("./routes/contacts");
const fileUpload = require("express-fileupload");
require("./routes/resetPassword");

// limit the requests
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // limit reset every 24h
  max: 500, // every 24h can send 'max' number of requests
});

mongoose
  .connect("mongodb://localhost/HackerU")
  .then(() => console.log("successful connection"))
  .catch((e) => console.log("connection failed " + e));

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

require("dotenv").config();

app.use(express.json());
app.use(morgan());
app.use(limiter);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/images", express.static("images"));

app.use("/users", user);
app.use("/auth", auth);
app.use("/cards", cards);
app.use("/favorites", favorites);
app.use("/resetPassword", resetPassword);
app.use("/contact", contacts);

const port = 3001;
app.listen(port, () => console.log("listening to port " + port));
