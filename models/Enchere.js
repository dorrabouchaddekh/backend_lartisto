const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Publication = require('./Publication');



const enchereSchema = new Schema({

    publicationdata:{
        type:mongoose.Schema.Types.ObjectId,
         ref:'Publication'
        },
    prixDepart:{
            type: Number,
        },
        dateFin:{
            type: Date,
        },
    
    } ,{ timestamps: true});

    const Enchere = mongoose.model('Enchere', enchereSchema);
    module.exports = Enchere