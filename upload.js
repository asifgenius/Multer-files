const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const { extname } = require('path');
const fileUpload = (destination) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destination)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

    return multer({
        storage: storage,
        limits: { fileSize: 1000000 },
        fileFilter: function (req, file, cb) {
            checkFileType(file, cb)
        }
    });
};

function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error Images Only !');
    }
}

module.exports = { fileUpload };