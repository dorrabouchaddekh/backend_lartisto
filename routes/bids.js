const express = require('express')
const router  = express.Router()

const BidsController = require('../controllers/BidsController')

router.get('/',BidsController.index)
router.post('/show',BidsController.show)
router.get('/',BidsController.index)
router.post('/store',BidsController.store)
router.post('/update',BidsController.update)
router.post('/delete',BidsController.destory)

module.exports=router