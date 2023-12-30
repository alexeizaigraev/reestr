// current user
const { ctrlWrapper } = require("../../decorators");
const getCurrent = async (req, res) => {
  const { subscription, email } = req.user;

  res.json({
    email,
    subscription,
  });
};
module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
