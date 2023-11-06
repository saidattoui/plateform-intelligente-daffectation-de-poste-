module.exports = (app) => {
    const centres_interets = require('../controllers/centres_interet.controller.js');


    app.post('/centres_interets', centres_interets.create);

    
    app.get('/centres_interets', centres_interets.findAll);

   
    app.get('/centres_interets/:centres_interetId', centres_interets.findOne);

    
    app.put('/centres_interets/:centres_interetId', centres_interets.update);

    
    app.delete('/centres_interets/:centres_interetId', centres_interets.delete);
}
