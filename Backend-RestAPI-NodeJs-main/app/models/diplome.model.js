const mongoose = require('mongoose');

const DiplomeSchema = mongoose.Schema({
    id_user: {type:String},
    nEtude:{type:String},
    diplomeObtenu: {type: String},
    etablissement: {type: String},
    dateDeb: {type: String},
    dateFin: {type: String},
    statut: {type: String}, 
    mention: {type: String},
    cv:{type: String},
   
}, 
 {
    timestamps: true
});

module.exports = mongoose.model('Diplome', DiplomeSchema);