const multer = require('multer');

const uploadfiles = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now() + ['.jpg', '.png']);
    }
  })
}).single('user_file');

module.exports = uploadfiles;
