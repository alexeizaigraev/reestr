// current user
const { ctrlWrapper } = require("../../decorators");
const getCurrent = async (req, res) => {
  const { subscription, email, status, avatarUrl } = req.user;

  res.json({
    email,
    subscription,
    status, 
    avatarUrl,

  });
};
module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
