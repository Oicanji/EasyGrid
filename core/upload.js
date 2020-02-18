const multer = require('multer')

const storage = multer.diskStorage({
 destination: function(req, file, callback) {
     callback(null, "./public/images/uploads/");
 },
 filename: function(req, file, callback) {
     fileName = Date.now() + "_" + file.originalname
     callback(null, fileName);
     req.pathFile = fileName;
 }
});

const path = require('path');

module.exports = app => {

    const uploadImg = multer({
        storage: storage,
        fileFilter: function (req, file, callback, next) {
            var ext = path.extname(file.originalname);
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                req.extensao = file.mimetype.replace(/image\//gm, '')
                return callback('error: extname',true)
            }
            callback(null, true)
        },
        limits:{
            fileSize: 1024 * 1024 * 1024
        }
    })

    return { uploadImg }
}
