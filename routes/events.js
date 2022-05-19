const express = require('express')
const router  = express.Router()
const upload = require('../middleware/storage-events')
const EventsController = require('../controllers/EventsController')
//const upload = multer({ dest: "../uploads/" });

const multer = require('multer');
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req files", file);

    const userID = req.body.userId;
    // user-${userID}/
    const dir = `./uploads/users/events/`;
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
router.post('/addEvent',EventsController.addEvent)
router.get('/getAll',EventsController.getAll)
router.get('/GetVideoByUser',EventsController.GetVideoByUser)
router.post('/add',uploadfile.single('imagee'), EventsController.add)


module.exports=router