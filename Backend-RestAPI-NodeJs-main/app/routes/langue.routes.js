module.exports = (app) => {
    const langues = require('../controllers/langue.controller.js');


    app.post('/langues', langues.create);

    
    app.get('/langues', langues.findAll);

   
    app.get('/langues/:langueId', langues.findOne);

    
    app.put('/langues/:langueId', langues.update);

    
    app.delete('/langues/:langueId', langues.delete);
}
