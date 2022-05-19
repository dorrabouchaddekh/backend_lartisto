let Comment = require("../models/Comments")
const Post = require("../models/Publication")

const recupererCommentParPost = async (req, res) => {
  res.send({
    comment: await Comment.find({
      post: req.body.post,
    }).populate("user post"),
  })
}

const recupererComment = async (req, res) => {
  res.send({ comment: await Comment.findById(req.body._id) })
}

const addComment = async (req, res) => {
  console.log(req.body)
  const { description, user, post } = req.body

  const nouveauComment = new Comment()
  nouveauComment.description = description
  nouveauComment.user = user
  nouveauComment.post = post

  await Post.findOneAndUpdate(
    { _id: post },
    {
      $push: {
        comments: [nouveauComment._id],
      },
    }
  )

  await User.findOneAndUpdate(
    { _id: user },
    {
      $push: {
        comments: [nouveauComment._id],
      },
    }
  )

  nouveauComment.save()

  res.status(200).send({ message: "success", comment: nouveauComment })
}

const editComment = async (req, res) => {
  const { _id, description } = req.body

  let comment = await Comment.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        description: description,
      },
    }
  )
  res.status(200).send({ message: "success", comment: comment })
}
const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.body._id).remove()
  res.status(200).send({ message: "success", comment: comment })
}

const deleteAllComment = async (req, res) => {
  Comment.remove({}, function (err, comment) {
    if (err) {
      return handleError(res, err)
    }
    return res.status(204).send({ message: "Aucun element" })
  })
}


module.exports={
    recupererCommentParPost,recupererComment,addComment,editComment,deleteComment,deleteAllComment

}



// const Comments = require('../models/Comments')

// const index=(req, res, next) => 
// {
//     Comments.find()
//     .then(response => {

//         res.json(
//             response
//         )
//     })
//  .catch(error=>{
//      res.json({
//         message:'an error Occured'
//     })
//  })   
// }

// const show = (req, res, next) => {
//     let commentsID = req.body.commentsID
//      Comments.findById(commentsID)
//     .then(response => {
//         res.json({
//             response
//         })
//     })
//     .catch(error => {
//         res.json({
//             message:'an error Occured'
//         })
//     })
// }

// const store = (req, res, next) => {

//     let comments= new Comments({
//         commentaire:req.body.commentaire,
//     })
//     comments.save()
//     .then(response => {
//         res.json({
//             message:'comments Added Sucessfull!'
//         })
//     })
// .catch(error => {
//     res.json({
//         message:'an error Occured!'
//     })
// })
// }

// const update =(req, res, next)=>
// {
//     let commentsID=req.body.commentsID
//     let updateData={
//         commentaire:req.body.commentaire,
//     }
//     Comments.findByIdAndUpdate(commentsID, {$set:updateData})
//     .then(()=>{
//         res.json( {
//             message:'comments updated successfully!'
//         })
//     })
// .catch(error =>{
//     res.json({
//         message:'an error Occured!'
//     })
// })
// }

// const destory=(req,res,next) =>{
//     let commentsID= req.body.commentsID
//     Comments.findByIdAndRemove(commentsID)
//     .then(()=>{
//         req.json({
//             message: 'an error Occured!'
//         })
//     })
//     .catch(error =>{
//         res.json({
//             message:'an error Occured!'
//         })
//     })
// }

// module.exports={
//     index,show,store,update,destory

// }