const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema(
  {
    description: { type: String },
    date: {
      type: Date,
      default: Date.now
    },
    user : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "User"
    },
    post : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Post"
    },

  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)
module.exports = mongoose.model("Comment", CommentSchema)


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const User = require('./User');
// const Publication = require('./Publication');

// const commentsSchema = new Schema({
//     commentaire: {
//         type: String,
//     },
//     userdata:{
//         type:mongoose.Schema.Types.ObjectId,
//          ref:'User'
//         },
//     publicationdata:{
//         type:mongoose.Schema.Types.ObjectId,
//          ref:'Publication'
//         },
// }, { timestamps: true});

// const Comments = mongoose.model('Comments', commentsSchema);
// module.exports = Comments