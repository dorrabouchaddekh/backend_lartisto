const Categorie = require('../models/Categorie')

const index=(req, res, next) => 
{
    Categorie.find()
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
    let categorieID = req.body.chaiseID
     Categorie.findById(categorieID)
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

    let categorie= new Categorie({
        title:req.body.title,
    })
    categorie.save()
    .then(response => {
        res.json({
            message:'categorie Added Sucessfull!'
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
    let categorieID=req.body.categorieID
    let updateData={
        title:req.body.title,
    }
    Categorie.findByIdAndUpdate(categorieID, {$set:updateData})
    .then(()=>{
        res.json( {
            message:'categorie updated successfully!'
        })
    })
.catch(error =>{
    res.json({
        message:'an error Occured!'
    })
})
}

const destory=(req,res,next) =>{
    let categorieID= req.body.categorieID
    Categorie.findByIdAndRemove(categorieID)
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