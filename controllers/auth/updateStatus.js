const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../decorators");

const updateStatus = async (req, res) => {
  const { _id } = req.user;
  const { status } = req.body;
  if (!status) {
    throw HttpError(
      404,
      "At least one field (status) must be provided."
    );
  }
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  
  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json({ result });
};

module.exports = {
  updateStatus: ctrlWrapper(updateStatus),
};