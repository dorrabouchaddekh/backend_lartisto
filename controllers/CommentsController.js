const Comments = require('../models/Comments')

const index=(req, res, next) => 
{
    Comments.find()
    .then(response => {

        res.json(
            response
        )
    })
 .catch(error=>{
     res.json({
        message:'an error Occured'
    })
 })   
}

const show = (req, res, next) => {
    let commentsID = req.body.commentsID
     Comments.findById(commentsID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message:'an error Occured'
        })
    })
}

const store = (req, res, next) => {

    let comments= new Comments({
        commentaire:req.body.commentaire,
    })
    comments.save()
    .then(response => {
        res.json({
            message:'comments Added Sucessfull!'
        })
    })
.catch(error => {
    res.json({
        message:'an error Occured!'
    })
})
}

const update =(req, res, next)=>
{
    let commentsID=req.body.commentsID
    let updateData={
        commentaire:req.body.commentaire,
    }
    Comments.findByIdAndUpdate(commentsID, {$set:updateData})
    .then(()=>{
        res.json( {
            message:'comments updated successfully!'
        })
    })
.catch(error =>{
    res.json({
        message:'an error Occured!'
    })
})
}

const destory=(req,res,next) =>{
    let commentsID= req.body.commentsID
    Comments.findByIdAndRemove(commentsID)
    .then(()=>{
        req.json({
            message: 'an error Occured!'
        })
    })
    .catch(error =>{
        res.json({
            message:'an error Occured!'
        })
    })
}

module.exports={
    index,show,store,update,destory

}