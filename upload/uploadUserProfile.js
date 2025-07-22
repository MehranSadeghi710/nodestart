const multer = require('multer');
const mkdir = require('mkdirp');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        mkdir('./public/uploads/images').then(made=>{
            cb(null, './public/uploads/images');
        })
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'.'+'uploads');
    }
})
const upload = multer({ storage: storage });

module.exports = upload;
