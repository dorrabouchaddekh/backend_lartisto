const mongoose  =require('mongoose')
const Schema  =mongoose.Schema



const useSchema = new Schema({
    firstname:{
        type : String
    },

    lastname :{
        type : String,
   
    },
    email : {
        type :String

    },
    password : { 
        type :String

    },
    pictureId : {
      type :String

  },
  links: {
    default: [],
    type: Array,
  },

    isVerified: { type: Boolean },
} , {timestamps: true});


const User = mongoose.model('use',useSchema)
module.exports =User


// useSchema.methods.matchPassword = async function(motdepasseentrer){
//   return await bcrypt.compare(motdepasseentrer,this.password)
// }

// useSchema.pre('save', async function(next){
// if(!this.isModified('password')){
//     next()
// }
// const slat = await bcrypt.genSalt(10)
// this.password = await bcrypt.hash(this.password, slat)
// })




// const mongoose = require("mongoose");
// const bcrypt = require('bcryptjs')


// const UserSchema = new mongoose.Schema(
//   {   
//     firstname: { type: String },
//     lastname: { type: String },
 
//     email: { type: String },
//     password: { type: String },
//     pictureId: { type: String },
    
//   },
  
//   {
//     timestamps: { currentTime: () => Date.now() },
//   }
// );

// UserSchema.methods.matchPassword = async function(motdepasseentrer){
//   return await bcrypt.compare(motdepasseentrer,this.password)
// }

// UserSchema.pre('save', async function(next){
// if(!this.isModified('password')){
//     next()
// }
// const slat = await bcrypt.genSalt(10)
// this.password = await bcrypt.hash(this.password, slat)
// })



// module.exports = mongoose.model("User", UserSchema);
