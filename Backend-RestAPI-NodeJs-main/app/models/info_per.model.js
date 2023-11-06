const mongoose = require('mongoose');

const Info_perSchema = mongoose.Schema({
    id_user: {type:String},

    sexe: {type: String},

    etatCivil: {type: String},

    adresse: {type: String},

    codePostal: {type: String},

    typePermis: {type: String},

    photo: {type: String}   
},
 
 {
    timestamps: true
});

module.exports = mongoose.model('Info_per', Info_perSchema);