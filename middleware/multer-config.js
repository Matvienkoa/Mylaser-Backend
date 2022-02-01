const multer = require('multer');

const MIME_TYPES = {
  'application/dxf': 'dxf'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, callback) => {
    const name = file.originalname;
    // const extension = MIME_TYPES[file.mimetype];
    callback(null, name);
  }
})

module.exports = multer({storage: storage});