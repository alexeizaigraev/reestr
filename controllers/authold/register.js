const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");
const path = require("path");
const fs = require("fs/promises");
const gravatar = require("gravatar");

const { SECRET_KEY } = process.env;
const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    subscription,
    avatarUrl,
  });

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
    avatarUrl: result.avatarUrl,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
