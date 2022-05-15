const express = require('express')
const router  = express.Router()

const CategorieController = require('../controllers/CategorieController')

router.get('/',CategorieController.index)
router.post('/show',CategorieController.show)
router.get('/',CategorieController.index)
router.post('/store',CategorieController.store)
router.post('/update',CategorieController.update)
router.post('/delete',CategorieController.destory)

module.exports=router