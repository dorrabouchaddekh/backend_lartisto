const express = require("express")
const router = express.Router()
const CommentController = require("../controllers/CommentsController")


router.post('/add',CommentController.addComment)
router.put('/edit',CommentController.editComment)
router.delete('/delete',CommentController.deleteComment)



router.post("/par-post", CommentController.recupererCommentParPost)

router.delete("/deleteAll", CommentController.deleteAllComment)

module.exports = router

// const express = require('express')
// const router  = express.Router()

// const CommentsController = require('../controllers/CommentsController')

// router.get('/',CommentsController.index)
// router.post('/show',CommentsController.show)
// router.get('/',CommentsController.index)
// router.post('/store',CommentsController.store)
// router.post('/update',CommentsController.update)
// router.post('/delete',CommentsController.destory)

// module.exports=router