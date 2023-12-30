const db = require('../../db')
const ctrlWrapper = require('../../utils/ctrlWrapper')


const getAllUsers = async function(req, res, next) {
  const data = await db.any('SELECT * FROM users');
  res.status(200).json({
    data,
    status: "success",
    message: "ALL USERS"
  })
}

module.exports = {
  getAllUsers: ctrlWrapper(getAllUsers),
};