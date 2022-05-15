const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Publication = require('./Publication');


const likesSchema = new Schema({

    userdata:{
        type:mongoose.Schema.Types.ObjectId,
         ref:'User'
        },
    publicationdata:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Publication'
    },

    
    } ,{ timestamps: true});

    const Likes = mongoose.model('Likes', likesSchema);
    module.exports = Likes