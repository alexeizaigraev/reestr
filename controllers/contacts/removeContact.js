const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndRemove({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = {
  removeContact: ctrlWrapper(removeContact),
};
