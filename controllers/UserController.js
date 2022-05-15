// let User = require("../models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { response } = require("express");

// function generateUserToken(user) {
//     return jwt.sign({ user }, process.env.JWT_SECRET, {
//       expiresIn: "100000000", // in Milliseconds (3600000 = 1 hour)
//     })
//   }
// // const showall= (req,res,next)=> {
// //     let userID=req.body.userID
// //     User.find({})
// //     .then((response) => {
// //         res.json(
// //             response
// //         )
// //     })
// //     .catch(error=>{
// //         res.json({
// //             message:'An error Has Occured!'

// //         })
// //     })
// // }


// // const index=(req, res, next) => 
// // {
// //     User.find()
// //     .then(reponse =>{
// //         res.json({
// //         response
// //          })
// //     })
// //  .catch(error=>{
// //      res.json({
// //         error
// //     })
// //  })   
// // }


// exports.show = (req, res, next) => {
//     let userID = req.body._id
//      User.findById(userID)
//     .then(response => {
//         res.send({
//             response
//         })
//     })
//     .catch(error => {
//         res.json.status(401)({
//             message:'an error Occured'
//         })
//     })
// };

// // exports.showP = (req, res, next) => {
// //     let userID = req.body.userID
// //     User.findById(token.user._id)
// //     .then(reponse => {
// //         res.json({
// //             reponse
// //         })
// //     })
// //     .catch(error => {
// //         res.json({
// //             message:'an error Occured'
// //         })
// //     })
// // };




// exports.store = (req, res, next) => {

//     let user= new User({
//         firstname:req.body.firstname,
//         lastname:req.body.lastname,
//         pictureId:req.body.pictureId,
//         email:req.body.email,
//         password:req.body.password
//     })
//     user.save()
//     .then(response => {
//         res.json({
//             message:'User Added Sucessfull!'
//         })
//     })
// .catch(eroor => {
//     res.json({
//         message:'an error Occured!'
//     })
// })
// };


// // //update an utilisateur
// // const update =(req, res, next)=>
// // {
// //     let userID=req.body.userID
// //     let updateData={
// //         nom:req.body.nom,
// //         prenom:req.body.prenom,
// //         photo:req.body.photo,
// //         email:req.body.email,
// //         password:req.body.password
// //     }
// //     User.findByIdAndUpdate(userID, {$set:updateData})
// //     .then(()=>{
// //         res.json( {
// //             message:'User updated successfully!'
// //         })
// //     })
// // .catch(error =>{
// //     res.json({
// //         message:'an error Occured!'
// //     })
// // })
// // }


// // //delete an utilisateur

// // const destory=(req,res,next) =>{
// //     let userID= req.body.userID
// //     User.findByIdAndRemove(userID)
// //     .then(()=>{
// //         req.json({
// //             message: 'an error Occured!'
// //         })
// //     })
// //     .catch(error =>{
// //         res.json({
// //             message:'an error Occured!'
// //         })
// //     })
// // }

// exports.get = async (req, res) => {
//     res.send( user = await User.findById(req.params._id) );
//   };

// // exports.get = async (req, res) => {
// //     let newUser= User.findById(user=>user._id==req.params._id)
// //     if(newUser){
// //         res.send(newUser)
// //     }else{
// //         res.send("we dont have this user")
// //     }
// //   };



// // exports.getAll = async (req, res) => {
// //     res.send({ users: await User.find()});
// // };

// const add = async (req, res) => {
//     const { firstname, lastname, email, password, pictureId  } = req.body;
//     let user = await new User({
//         firstname,
//         lastname,
//         email,
//         password: await bcrypt.hash(password,10),
//         pictureId

//     }).save();
//     return res.send({ 
//         message: "User added successfully", 
//         user 
// });
//   };

//   module.exports={
//     add

// }


// //   exports.confirmation = async (req, res) => {
// //     if (req.params.token) {
// //         token = jwt.verify(req.params.token, process.env.JWT_SECRET);
// //     }
  
// //     User.findById(token.user._id, function (err, user) {
// //      if (user.isVerified) {
// //         res.json({
// //             reponse
// //         })
// //     }})
// //     };


// // module.exports={
// //     index,show,store,update,destory,showall

// // }
