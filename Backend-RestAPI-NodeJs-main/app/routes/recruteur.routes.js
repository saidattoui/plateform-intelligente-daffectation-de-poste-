module.exports = (app) => {
    const recruteurs = require('../controllers/recruteur.controller.js');


    app.post('/recruteurs', recruteurs.create);

    
    app.get('/recruteurs', recruteurs.findAll);

   
    app.get('/recruteurs/:recruteurId', recruteurs.findOne);

    
    app.put('/recruteurs/:recruteurId', recruteurs.update);

    
    app.delete('/recruteurs/:recruteurId', recruteurs.delete);
}
