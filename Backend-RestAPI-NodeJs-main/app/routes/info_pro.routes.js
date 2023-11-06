module.exports = (app) => {
    const info_pros = require('../controllers/info_pro.controller.js');


    app.post('/info_pros', info_pros.create);

    
    app.get('/info_pros', info_pros.findAll);

   
    app.get('/info_pros/:info_proId', info_pros.findOne);

    
    app.put('/info_pros/:info_proId', info_pros.update);

    
    app.delete('/info_pros/:info_proId', info_pros.delete);
}
