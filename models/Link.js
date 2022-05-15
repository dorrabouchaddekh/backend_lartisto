const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const linkSchema = new Schema({
    title: {
        type: String,
    },
    url:{
       type: String,
        },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
          },

}, { timestamps: true});

module.exports = mongoose.model("Link", linkSchema)