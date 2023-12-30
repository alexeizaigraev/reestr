const db = require('../db')
const ctrlWrapper = require('../../utils/ctrlWrapper')

const getByEmail = async function(req, res, next) {
  if (req.body.email) {
    let data = await db.oneOrNone('SELECT * FROM users where email = $1', req.body.email);
    if (data && data.id) {
      res.status(200).json({
        data,
        status: "success",
        message: "user ok"
      })
    } else {
      res.status(400).json({
        data,
        status: "success",
        message: "no user"
      })
    }    
  } else {
    res.json(`Err: bad email: ${req.body.email}`)
  }
}

module.exports = {
  getByEmail: ctrlWrapper(getByEmail),
};