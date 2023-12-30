const db = require('../../db')
const ctrlWrapper = require('../../utils/ctrlWrapper')

const registerUser = async function(req, res, next) {
  const inData = [req.body.email, req.body.password, req.body.fio]
  try {
    if (req.body.email
      && req.body.password
      && req.body.fio ) {
        let data = await db.none(`INSERT INTO Users(
          email, password, fio) VALUES($1, $2, $3)`, inData);
        res.status(200).json({
          data,
          status: "success",
          message: "add user"
        })
      } else {
        res.status(400).json({
          indata: inData,
          status: "success",
          message: "cant add user"
        })
      }
    if (!(req.body.email
      && req.body.password
      && req.body.fio )) {
        res.status(400).json({
          indata: inData,
          status: "success",
          message: "cant add user, wrong data"
        })
      }

  } catch (err) {
    res.status(400).json({
      indata: inData,
      status: "error",
      message: "server error, cant add user"
    })
  }
}




module.exports = {
  registerUser: ctrlWrapper(registerUser),
};