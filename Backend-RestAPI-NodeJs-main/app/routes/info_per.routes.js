module.exports = (app) => {
    const info_pers = require('../controllers/info_per.controller.js');


    app.post('/info_pers', info_pers.create);

    
    app.get('/info_pers', info_pers.findAll);

   
    app.get('/info_pers/:info_perId', info_pers.findOne);

    
    app.put('/info_pers/:info_perId', info_pers.update);

    
    app.delete('/info_pers/:info_perId', info_pers.delete);
}
