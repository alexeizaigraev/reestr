const { Contact } = require("../../models/contacts");
const { ctrlWrapper } = require("../../decorators");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { status: status1 } = req.user;
  console.log ("status1====", status1 , 'req.user==' , req.user);
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "email subscription");

  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
};
