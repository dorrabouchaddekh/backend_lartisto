const Bids = require('../models/Bids')

const index=(req, res, next) => 
{
    Bids.find()
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
    let bidsID = req.body.bidsID
     Bids.findById(bidsID)
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

    let bids= new Bids({
        prix:req.body.prix,
    })
    bids.save()
    .then(response => {
        res.json({
            message:'bids Added Sucessfull!'
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
    let bidsID=req.body.bidsID
    let updateData={
        prix:req.body.prix,
    }
    Bids.findByIdAndUpdate(bidsID, {$set:updateData})
    .then(()=>{
        res.json( {
            message:'bids updated successfully!'
        })
    })
.catch(error =>{
    res.json({
        message:'an error Occured!'
    })
})
}

const destory=(req,res,next) =>{
    let bidsID= req.body.bidsID
    Bids.findByIdAndRemove(bidsID)
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