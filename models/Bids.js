const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Publication = require('./Publication');

const bidsSchema = new Schema({
    prix: {
        type: Number,
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

const Bids = mongoose.model('Bids', bidsSchema);
module.exports = Bids