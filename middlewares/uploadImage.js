// import multer from 'multer';
// import path from 'path';
const multer = require('multer');
const path = require('path');
const { HttpError } = require("../helpers");
// import { HttpError } from '../helpers/index.js';
// import { allowedImagesMimeTypes } from '../constans/index.js';
const { allowedImagesMimeTypes } = require("../constans");
const tempDirPath = path.join(process.cwd(), 'temp');

const storage = multer.diskStorage({
    destination: tempDirPath,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    const isAllowed = allowedImagesMimeTypes.includes(file.mimetype);

    if (!isAllowed) return cb(HttpError(400, 'Invalid file type.'));

    cb(null, true);
};

const uploadImage = multer({ storage, fileFilter });
module.exports = uploadImage;
// export default uploadImage;
