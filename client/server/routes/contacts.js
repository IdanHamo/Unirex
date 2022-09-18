const express = require("express");
const router = express.Router();
const { Contact, validateContact } = require("../model/contact");

router.get("/deleteContact/:id", async (req, res) => {
  const contact = await Contact.findOneAndDelete({ _id: req.params.id });
  res.status(200).send(contact);
});
router.get("/getContact/:id", async (req, res) => {
  const contact = await Contact.findOne({ _id: req.params.id });
  if (!contact) res.status(404).send("contact does not found");
  res.status(200).send(contact);
});

router.post("/", async (req, res) => {
  const { error } = validateContact(req.body);
  if (error) res.status(404).send(error.details[0].message);

  const contact = new Contact(req.body);

  await contact.save();

  res.status(200).send("Your letter has been sent successfully");
});

router.get("/getAll", async (req, res) => {
  const contacts = await Contact.find({});
  if (!contacts) res.status(200).send("There is no contacts");

  res.status(200).send(contacts);
});

module.exports = router;
