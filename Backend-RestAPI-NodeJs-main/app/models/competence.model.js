const mongoose = require('mongoose');

const CompetenceSchema = mongoose.Schema({
    id_user: {type:String},
    titre: {type: String}
  
},

{
    timestamps: true
});

module.exports = mongoose.model('Competence', CompetenceSchema);