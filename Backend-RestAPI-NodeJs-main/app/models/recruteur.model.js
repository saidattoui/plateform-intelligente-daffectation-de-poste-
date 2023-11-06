const mongoose = require('mongoose');

const RecruteurSchema = mongoose.Schema({
    nom: {
            type: String,
           
    },

    email: {
            type: String,
            unique: [true, 'The email is unique'],
           
    },
    password: {
        type: String,
        
       
    },

    poste: {
        type: String,
       
    },

    entreprise: {
        type: String,
       
    },
 
    status: {
        type: String,
       
    },
    id_entreprise: {
        type: String,
       
    } 
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Recruteur', RecruteurSchema);