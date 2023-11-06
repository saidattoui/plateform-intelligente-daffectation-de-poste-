const mongoose = require('mongoose');

const FavoriSchema = mongoose.Schema({
    nomSte: {type: String},
    localite: {type: String},
    domaine: {type: String},
    typePoste: {type: String},
    missions: {type: String},
    exigencesTravail: {type: String},
    competences: {type: String},
    tempsTravail: {type: String},
    datePub: {type: String},
    status: {type: String},
    pic: {type: String},
    id_entreprise: {type: String},
    salaire: {type: String},
    id_recruteur: {type: String},
    id_user: {type: String},
    id_offre: {
        type: String,
        unique: [true, 'The offre is unique']
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Favori', FavoriSchema);