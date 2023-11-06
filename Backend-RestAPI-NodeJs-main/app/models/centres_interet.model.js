const mongoose = require('mongoose');

const Centres_interetSchema = mongoose.Schema({
    id_user: {type:String},
    descri: {type: String},
    pointsForts: {type: String}
    
},

{
    timestamps: true
});

module.exports = mongoose.model('Centres_interet', Centres_interetSchema);