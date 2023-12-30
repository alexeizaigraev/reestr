const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

module.exports = {
  getContactById: ctrlWrapper(getContactById),
};
