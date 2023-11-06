module.exports = (app) => {
    const competences = require('../controllers/competence.controller.js');


    app.post('/competences', competences.create);

    
    app.get('/competences', competences.findAll);

   
    app.get('/competences/:competenceId', competences.findOne);

    
    app.put('/competences/:competenceId', competences.update);

    
    app.delete('/competences/:competenceId', competences.delete);
}
