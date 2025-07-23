const multer = require('multer');
const {mkdirp} = require('mkdirp');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        mkdirp('./public/uploads/images').then(made=>{
            cb(null, './public/uploads/images');
        })
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'1'+'uploads'+ '.jpg');
    }
})
const upload = multer({ storage: storage });

module.exports = upload;
