const db = require('../../db')
const ctrlWrapper = require('../../utils/ctrlWrapper')


const getTest = async function(req, res, next) {
  res.status(200).json({
    status: "success",
    message: "ALL USERS"
  })
}

module.exports = {
  getTest: ctrlWrapper(getTest),
};