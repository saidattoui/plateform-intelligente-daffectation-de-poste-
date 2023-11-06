const mongoose = require('mongoose');

const ProjetSchema = mongoose.Schema({
    id_user: {type:String},
    description1: {type: String}
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Projet', ProjetSchema); 