const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: id, owner }, body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

module.exports = {
  updateContact: ctrlWrapper(updateContact),
};
