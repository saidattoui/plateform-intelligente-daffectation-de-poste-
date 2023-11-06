const mongoose = require('mongoose');

const EntrepriseSchema = mongoose.Schema({
    nom: String,
    adresse: String,
    siteWeb: String,
    secteur: String,
    taille:  String,
    description: String,
    numTel: String,
    dateCreation: String,
    id_recruteur: {
        type: String,
        unique: [true, 'The id_recruteur is unique']
    }
},
{
    timestamps: true,
} 
);

module.exports = mongoose.model('Entreprise', EntrepriseSchema);