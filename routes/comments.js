const express = require('express')
const router  = express.Router()

const CommentsController = require('../controllers/CommentsController')

router.get('/',CommentsController.index)
router.post('/show',CommentsController.show)
router.get('/',CommentsController.index)
router.post('/store',CommentsController.store)
router.post('/update',CommentsController.update)
router.post('/delete',CommentsController.destory)

module.exports=router