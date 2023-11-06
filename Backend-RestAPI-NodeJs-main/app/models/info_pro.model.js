const mongoose = require('mongoose');

const Info_proSchema = mongoose.Schema({
    id_user: {type:String},
    nomEnt: {type:String},
    titreProfessionnel: {type: String},
    mission: {type:String},
    situationPro: {type: String},
    typePoste: {type: String},
    occupation: {type: String}
}, 
 
{ 
    timestamps: true
});

module.exports = mongoose.model('Info_pro', Info_proSchema);