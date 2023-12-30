const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");
const { SECRET_KEY } = process.env;
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw HttpError(400, "Email or password is missing");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token: token,
    user: {
      name: user.name,
      email: user.email,
      subscription: user.subscription,
      status: user.status, 
      avatarUrl: user.avatarUrl,
    },
  });
};
module.exports = {
  login: ctrlWrapper(login),
};
