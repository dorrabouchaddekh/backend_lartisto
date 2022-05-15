const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Publication = require('./Publication');

const commentsSchema = new Schema({
    commentaire: {
        type: String,
    },
    userdata:{
        type:mongoose.Schema.Types.ObjectId,
         ref:'User'
        },
    publicationdata:{
        type:mongoose.Schema.Types.ObjectId,
         ref:'Publication'
        },
}, { timestamps: true});

const Comments = mongoose.model('Comments', commentsSchema);
module.exports = Comments