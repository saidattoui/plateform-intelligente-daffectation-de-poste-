module.exports = (app) => {
    const recommendations = require('../controllers/recommendation.controller.js');


    app.post('/recommendations', recommendations.create);

    
    app.get('/recommendations', recommendations.findAll);

   
    app.get('/recommendations/:recommendationId', recommendations.findOne);

    
    app.put('/recommendations/:recommendationId', recommendations.update);

    
    app.delete('/recommendations/:recommendationId', recommendations.delete);
}
