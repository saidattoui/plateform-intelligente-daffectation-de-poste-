const mongoose = require('mongoose');

const PubSchema = mongoose.Schema({
    nom: {type: String},
    desc: {type: String},
    img: {type: String},
    link: {type: String}
    
}, 
{
    timestamps: true
});

module.exports = mongoose.model('Pub', PubSchema);