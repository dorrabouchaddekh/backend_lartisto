


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Categorie = require('./Categorie');


const PostSchema = new mongoose.Schema(
  {
    // title: { type: String },
    description: { type: String },
    date: { type: Date, default: Date.now },
    pictureId: { type: String },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)

module.exports = mongoose.model("Post", PostSchema)





// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const User = require('./User');
// const Categorie = require('./Categorie');


// const publicationSchema = new Schema({

//     userdata:{
//         type:mongoose.Schema.Types.ObjectId,
//          ref:'User'
//         },

//     title: {
//             type: String,
//         },
//     description: {
//             type: String,
//         },
//     categoriedata: {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:'Categorie'
//         },
//     photo: {
//             type: String,
//     },
//     nbrPhotos : {
//             type: Number,
//         },
//     video : {
//             type: String,
//         },
//     audio : {
//             type: String,
//         },
//     enchere : {
//             type: Number,
//         },
    
//     } ,{ timestamps: true});


//     const Publication = mongoose.model('Publication', publicationSchema);
//     module.exports = Publication