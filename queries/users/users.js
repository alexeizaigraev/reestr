const db = require('../,,/db')

const getAllUsers = async function(req, res, next) {
  let data = await db.any('SELECT * FROM users');
  
  await db.any(`SELECT * FROM users`)
    .then(data => {
      res.status(200).json({
        data,
        status: "success",
        message: "ALL USERS"
      })
    })
    .catch(error => {
      res.status(400).json({
        message: error 
      })
      next(err)
    })  
}

const isEmailExists = async function(req, res, next) {
  const rezult = await db.oneOrNone(`SELECT * FROM users
  WHERE email = $1`, req.body.email)
    .then(data => {
      console.log(data, '#')
      if (data) {
        return true
      } else {
          return false
        }
    })
}

const createUser0 = async function(req, res, next) {
  await db.one(`INSERT INTO users(
    email, password, fio)
    VALUES($1, $2, $3) 
    RETURNING email`, [req.body.email, req.body.password, req.body.fio])
    .then(data => {
      res.status(200).json({
        id: data,
        status: "success",
        message: "ALL USERS"
      })
    })
    .catch(error => {
      res.status(400).json({
        message: error,
        text: "qu-=qu"
      })
      next(error)
    })  
}

async function getInsertUserId(data) {
  return db.task('getInsertUserId', async t => {
      const userId = await t.oneOrNone('SELECT id FROM Users WHERE email = $1', data[0], u => u && u.id);
      return userId || await t.one('INSERT INTO Users(email, password, fio) VALUES($1, $2, $3) RETURNING id', data, u => u.id);
  });
}

const createUser = async function(req, res, next) {
  //isEmailExists(req, res, next)
    
  const id = await getInsertUserId([req.body.email, req.body.password, req.body.fio])
  try {
    res.status(200).json({
      id,
      status: "success",
      message: `create user, id: $(id)` 
    })
  } catch (error) {
    res.status(400).json({
      message: error,
      text: "qu-=qu"
    })
    next(error)
  }  
}

module.exports = {
  getAllUsers,
  createUser,
}
