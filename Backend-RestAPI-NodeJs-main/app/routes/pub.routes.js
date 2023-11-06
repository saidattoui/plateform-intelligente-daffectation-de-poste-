module.exports = (app) => {
    const pubs = require('../controllers/pub.controller.js');


    app.post('/pubs', pubs.create);

    
    app.get('/pubs', pubs.findAll);

   
    app.get('/pubs/:pubId', pubs.findOne);

    
    app.put('/pubs/:pubId', pubs.update);

    
    app.delete('/pubs/:pubId', pubs.delete);
}