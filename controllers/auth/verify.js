// verify email
const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../decorators");
const { HttpError } = require("../../helpers");
const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    
    message: `Верификация прошла успешно. Зайдите в приложение под своим логином и паролем. Логин: "${user.email}"    `
    
 
  });
};

module.exports = {
  verify: ctrlWrapper(verify),
};
