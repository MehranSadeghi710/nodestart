// const multer = require('multer');
// // const {mkdirp} = require('mkdirp');
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         mkdirp('./public/uploads/images').then(made=>{
// //             cb(null, './public/uploads/images');
// //         })
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, Date.now()+'1'+'uploads'+ '.jpg');
// //     }
// // })
// // const upload = multer({ storage: storage });


const multer = require('multer');
const fs = require('fs');
const path = './public/uploads/images';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-uploads.jpg');
    }
});

const upload = multer({ storage });


module.exports = upload;
