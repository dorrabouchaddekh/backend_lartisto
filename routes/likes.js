const express = require('express')
const router  = express.Router()

const LikesController = require('../controllers/LikesController')

router.get('/',LikesController.index)
router.post('/show',LikesController.show)
router.get('/',LikesController.index)
router.post('/store',LikesController.store)
router.post('/update',LikesController.update)
router.post('/delete',LikesController.destory)

module.exports=router