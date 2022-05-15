const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorieSchema = new Schema({
    title: {
        type: String,
    },
}, { timestamps: true});

const Categorie = mongoose.model('Categorie', categorieSchema);
module.exports = Categorie