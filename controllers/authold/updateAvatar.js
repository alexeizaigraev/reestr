const fs = require("fs/promises");
const Jimp = require("jimp");
const path = require("path");

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const avatarDir = path.resolve("public", "avatars");

const updateAvatar = async (req, res, next) => {
  // Check if avatar file was provided in the request
  if (!req.file) {
    throw HttpError(400, "Avatar must be provided");
  }

  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  // Resize and save the avatar using Jimp library
  await Jimp.read(tempUpload)
    .then((avatar) => {
      return avatar
        .resize(250, 250) // resize to 250x250 pixels
        .quality(100) // set JPEG quality to 100
        .write(tempUpload); // save the changes
    })
    .catch((err) => {
      throw err;
    });

  const fileName = `${_id}_${originalname}`;

  const publicUpload = path.join(avatarDir, fileName);

  // Move the uploaded file from temp directory to public avatars directory
  await fs.rename(tempUpload, publicUpload);

  const avatarUrl = path.join("avatars", fileName);

  // Update the user's avatarUrl field in the database
  await User.findByIdAndUpdate(_id, { avatarUrl });

  // Respond with the updated avatar URL
  res.json({
    avatarUrl,
  });
};

// Export the controller with ctrlWrapper decorator applied
module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
