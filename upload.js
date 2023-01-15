const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const { extname } = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
}).single('myImage');

const storages = multer.diskStorage({
    destination: './public/moreUploads',
    filename: function (req, files, cb) {
        cb(null, Date.now() + path.extname(files.originalname));
    }
});
const uploadfiles = multer({
    storages: storages,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
}).array('myImages', 10);

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
module.exports = upload, uploadfiles;