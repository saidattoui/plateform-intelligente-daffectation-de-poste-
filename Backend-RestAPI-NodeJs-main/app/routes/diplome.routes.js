module.exports = (app) => {
    const diplomes = require('../controllers/diplome.controller.js');


    app.post('/diplomes', diplomes.create);

    
    app.get('/diplomes', diplomes.findAll);

   
    app.get('/diplomes/:diplomeId', diplomes.findOne);

    
    app.put('/diplomes/:diplomeId', diplomes.update);

    
    app.delete('/diplomes/:diplomeId', diplomes.delete);
}
