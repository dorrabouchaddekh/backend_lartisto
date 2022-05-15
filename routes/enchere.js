const express = require('express')
const router  = express.Router()

const EnchereController = require('../controllers/EnchereController')

router.get('/',EnchereController.index)
router.post('/show',EnchereController.show)
router.get('/',EnchereController.index)
router.post('/store',EnchereController.store)
router.post('/update',EnchereController.update)
router.post('/delete',EnchereController.destory)

module.exports=router