const db = require('../../db')
const ctrlWrapper = require('../../utils/ctrlWrapper')

const updateUser = async function(req, res, next) {
  const { id } = req.params
  const inData = [req.body.email, req.body.fio, id]
  try {
    if (id
      &&req.body.email
      && req.body.fio ) {
        let data = await db.any(`UPDATE Users
          SET
          email = $1
          fio = $2
          WHERE id = $3`, inData);
        res.status(200).json({
          data,
          status: "success",
          message: "update user"
        })
      } else {
        res.status(400).json({
          indata: inData,
          status: "success",
          message: "cant update user"
        })
      }
    if (!(req.body.email
      && req.body.password
      && req.body.fio )) {
        res.status(400).json({
          indata: inData,
          status: "success",
          message: "cant update user, wrong data"
        })
      }

  } catch (err) {
    res.status(400).json({
      indata: inData,
      status: "error",
      message: "server error, cant update user"
    })
  }
}




module.exports = {
  updateUser: ctrlWrapper(updateUser),
};