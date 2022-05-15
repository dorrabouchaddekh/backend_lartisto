const Enchere = require('../models/Enchere')
const index=(req, res, next) => 
{
    Enchere.find()
    .then(response =>{
        res.json({
        response
         })
    })
 .catch(error=>{
     res.json({
        error
    })
 })   
}

const show = (req, res, next) => {
    let enchereID = req.body.enchereID
    Enchere.findById(enchereID)
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

    let enchere= new Enchere({
        prixDepart:req.body.prixDepart,
        dateFin:req.body.dateFin,
    })
    enchere.save()
    .then(response => {
        res.json({
            message:'enchere Added Sucessfull!'
        })
    })
.catch(error => {
    res.json({
        message:'an error Occured!'
    })
})
}


//update an mat
const update =(req, res, next)=>
{
    let enchereID=req.body.enchereID
    let updateData={
        prixDepart:req.body.prixDepart,
        dateFin:req.body.dateFin,
    }
    Enchere.findByIdAndUpdate(enchereID, {$set:updateData})
    .then(()=>{
        res.json( {
            message:'enchere updated successfully!'
        })
    })
.catch(error =>{
    res.json({
        message:'an error Occured!'
    })
})
}


//delete an enchere

const destory=(req,res,next) =>{
    let enchereID= req.body.enchereID
    Enchere.findByIdAndRemove(enchereID)
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