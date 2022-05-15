const express = require('express')
const router  = express.Router()
const upload = require('../middleware/storage-videos')
const PublicationController = require('../controllers/PublicationController')
//const upload = multer({ dest: "../uploads/" });
const multer = require('multer');
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req files", file);

    const userID = req.body.userId;
    // user-${userID}/
    const dir = `./uploads/users/posts/`;
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      return cb(null, dir);
    });
  },
  filename: function (req, file, cb) {
    var filename = new Date() + file.originalname ;
    filename = filename.replaceAll(' ','');
    cb(null, filename);
  },
  //limits: { fileSize: maxsize },
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    var filetypes = filetype;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype) {
      return cb(null, true);
    }
    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },
});

var uploadfile = multer({ storage: storage })
//========================================
router.get('/',PublicationController.index)
router.post('/show',PublicationController.show)
router.get('/',PublicationController.index)
router.post('/store',PublicationController.store)
router.post('/update',PublicationController.update)
router.post('/delete',PublicationController.destory)
router.post('/search',PublicationController.searchUser)
router.post('/add',uploadfile.single('imagee'), PublicationController.add)
router.post('/addPub',PublicationController.addPub)
router.get('/getAll',PublicationController.getAll)
router.get('/getMy',PublicationController.getMy)
router.post('/GetVideoByUser',PublicationController.GetVideoByUser)
router.get('/showFirstFive',PublicationController.showFirstFive)


module.exports=router