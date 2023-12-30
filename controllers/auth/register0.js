const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");
const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");
const path = require("path");
const fs = require("fs/promises");
const gravatar = require("gravatar");
// import "dotenv/config";

const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
console.log("req.body======",req.body)
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const verificationToken = randomUUID();

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
    subscription,
    avatarUrl,
  });
  console.log(BASE_URL, verificationToken);
  const verifyEmail = {
    to: email,
    subject: "Сonfirm your registration",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Вас приветствует ТОВ Довира.  Click to confirm your registration</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
    avatarUrl: result.avatarUrl,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
