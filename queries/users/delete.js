const db = require('../db')
const ctrlWrapper = require('../../utils/ctrlWrapper')

const deleteUser = async function(req, res, next) {
  const { id } = req.params
  //const inData = [req.body.email, req.body.fio, id]
  try {
    if (id) {
        let data = await db.none(`DELETE FROM Users
          WHERE id = $1`, id);
        res.status(200).json({
          data,
          status: "success",
          message: "delete user"
        })
      } else {
        res.status(400).json({
          status: "success",
          message: "cant delete user"
        })
      }
    if (!id) {
        res.status(400).json({
          status: "success",
          message: "cant delete user, wrong data"
        })
      }

  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "server error, cant delete user"
    })
  }
}




module.exports = {
  deleteUser: ctrlWrapper(deleteUser),
  //deleteUser: deleteUser,
};