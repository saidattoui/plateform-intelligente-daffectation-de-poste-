const mongoose = require('mongoose');

const PostuleSchema = mongoose.Schema({
    nom: {
            type: String,
           
    },
    prenom: {
        type: String,
       
    },
    id_offre:{
        type: String,
        unique: [true, 'The offre is unique']  
},
    id_user: {type:String},
    niveauEducation: {type:String},
    niveauEexperience: {type:String},
    typeClient: {type:String},
    email: {type:String},
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
    salaire: {type: String},


}, 
{
    timestamps: true
});

module.exports = mongoose.model('Postule', PostuleSchema);