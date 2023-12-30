const { Contact } = require("../../models/contacts");
const { ctrlWrapper } = require("../../decorators");

const addContact = async (req, res) => {
  const { body } = req;
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...body, owner });
  res.status(201).json(result);
};

module.exports = {
  addContact: ctrlWrapper(addContact),
};
