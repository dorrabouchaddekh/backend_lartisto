const Likes = require('../models/Likes')

//afficher
const index=(req, res, next) => 
{
    Likes.find()
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

//afficher by id
const show = (req, res, next) => {
    let likesID = req.body.likesID
     Likes.findById(likesID)
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

//ajout
const store = (req, res, next) => {

    let likes= new Likes({

    })
    likes.save()
    .then(response => {
        res.json({
            message:'likes Added Sucessfull!'
        })
    })
.catch(eroor => {
    res.json({
        message:'an error Occured!'
    })
})
}


//update an likes
const update =(req, res, next)=>
{
    let likesID=req.body.likesID
    let updateData={

    }
    Likes.findByIdAndUpdate(likesID, {$set:updateData})
    .then(()=>{
        res.json( {
            message:'Likes updated successfully!'
        })
    })
.catch(error =>{
    res.json({
        message:'an error Occured!'
    })
})
}


//delete an chair

const destory=(req,res,next) =>{
    let likesID= req.body.likesID
    Likes.findByIdAndRemove(likesID)
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