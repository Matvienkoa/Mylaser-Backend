const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
  'application/dxf': 'dxf'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    callback(null, Date.now() + '_' + name);
  }
})

module.exports = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if(ext !== '.dxf') {
            return callback(new Error('Only dxf are allowed'))
        }
        callback(null, true)
    }
});