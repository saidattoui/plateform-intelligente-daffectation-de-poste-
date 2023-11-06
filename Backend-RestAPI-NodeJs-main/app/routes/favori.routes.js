module.exports = (app) => {
    const favoris = require('../controllers/favori.controller.js');


    app.post('/favoris', favoris.create);

    
    app.get('/favoris', favoris.findAll);

   
    app.get('/favoris/:favoriId', favoris.findOne);

    
    app.put('/favoris/:favoriId', favoris.update);

    
    app.delete('/favoris/:favoriId', favoris.delete);
}
