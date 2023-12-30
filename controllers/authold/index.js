const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { getCurrent } = require("./getCurrent");
const { updateSubscription } = require("./updateSubscription");
const { updateAvatar } = require("./updateAvatar");

module.exports = {
  login,
  logout,
  register,
  getCurrent,
  updateSubscription,
  updateAvatar,
};
