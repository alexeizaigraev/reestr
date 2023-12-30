const { Contact } = require("../../models/contacts");
const { ctrlWrapper } = require("../../decorators");

const getAllContacts = async (req, res) => {
  
  const { _id: owner, status: status, email } = req.user;
  
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;


  let result;

  if (status === 'admin') {
    // Если статус пользователя - admin, получаем все записи
    result = await Contact.find(
      
      {
        skip,
        limit: Number(limit),
      }
    ).populate("owner", "email subscription");
  } else {
    // Если статус пользователя не admin, получаем записи, где email соответствует email пользователя
    result = await Contact.find(
      {
        
        email: email,
        // ...(favorite ? { favorite } : {}),
      },
      "-createdAt -updatedAt",
      {
        skip,
        limit: Number(limit),
      }
    );
  }

  res.json(result);
};

// Model.find({}, (error, results) => {
//   if (error) {
//       console.log('Ошибка:', error);
//   } else {
//       console.log('Результаты поиска:', results);
//   }
// });

//   const result = await Contact.find(
//     favorite ? { owner, favorite } : { owner },
//     "-createdAt -updatedAt",
//     {
//       skip,
//       limit: Number(limit),
//     }
//   ).populate("owner", "email subscription");

//   res.json(result);
// };

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
};
