const db = require('../../db')
const ctrlWrapper = require('../../utils/ctrlWrapper')

const getById = async function(req, res, next) {
  if (req.body.id) {
    let data = await db.oneOrNone('SELECT * FROM users where id = $1', req.body.id);
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
    res.json(`Err: bad id: ${req.body.id}`)
  }
}

module.exports = {
  getById: ctrlWrapper(getById),
};