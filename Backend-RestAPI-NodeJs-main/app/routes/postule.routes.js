module.exports = (app) => {
    const postules = require('../controllers/postule.controller.js');


    app.post('/postules', postules.create);

    
    app.get('/postules', postules.findAll);

   
    app.get('/postules/:postuleId', postules.findOne);

    
    app.put('/postules/:postuleId', postules.update);

    
    app.delete('/postules/:postulesId', postules.delete);
}
