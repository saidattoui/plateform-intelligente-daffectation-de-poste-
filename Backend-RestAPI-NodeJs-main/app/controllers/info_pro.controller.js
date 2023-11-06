const Info_pro = require('../models/info_pro.model.js');

// Create and Save a new info_pro
exports.create = (req, res) => {
    // Validate request
    if(!req.body.id_user) {
        return res.status(400).send({
            message: "info_pro content can not be empty"
        });
    }

    // Create a info_pro
    const info_pro = new Info_pro({
        titreProfessionnel: req.body.titreProfessionnel || "Untitled Info_pro",
        typePoste: req.body.typePoste,
        occupation: req.body.occupation,
        nomEnt: req.body.nomEnt,
        mission: req.body.mission,
        situationPro: req.body.situationPro,
        id_user: req.body.id_user,
 
    
    });

    // Save info_pro in the database
    info_pro.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the info_pro."
        });
    });
};

// Retrieve and return all info_pro from the database.
exports.findAll = (req, res) => {
    Info_pro.find()
    .then(info_pros => {
        res.send(info_pros);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving info_pros."
        });
    });
};

// Find a single info_pro with a info_proId
exports.findOne = (req, res) => {
    Info_pro.findById(req.params.info_proId)
    .then(info_pro => {
        if(!info_pro) {
            return res.status(404).send({
                message: "info_pro not found with id " + req.params.info_proId
            });            
        }
        res.send(info_pro);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "info_pro not found with id " + req.params.info_proId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving info_pro with id " + req.params.info_proId
        });
    });
};

// Update a info_pro identified by the info_proId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.id_user) {
        return res.status(400).send({
            message: "info_pro content can not be empty"
        });
    }

    // Find info_pro and update it with the request body
    Info_pro.findByIdAndUpdate(req.params.info_proId, {
        titreProfessionnel: req.body.titreProfessionnel || "Untitled Info_pro",
        typePoste: req.body.typePoste,
        occupation: req.body.occupation,
        nomEnt: req.body.nomEnt,
        mission: req.body.mission,
        situationPro: req.body.situationPro,
        id_user: req.body.id_user,
 
    }, {new: true})
    .then(info_pro => {
        if(!info_pro) {
            return res.status(404).send({
                message: "info_pro not found with id " + req.params.info_proId
            });
        }
        res.send(info_pro);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "info_pro not found with id " + req.params.info_proId
            });                
        }
        return res.status(500).send({
            message: "Error updating info_pro with id " + req.params.info_proId
        });
    });
};

// Delete a info_pro with the specified info_proId in the request
exports.delete = (req, res) => {
    Info_pro.findByIdAndRemove(req.params.info_proId)
    .then(info_pro => {
        if(!info_pro) {
            return res.status(404).send({
                message: "info_pro not found with id " + req.params.info_proId
            });
        }
        res.send({message: "info_pro deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "info_pro not found with id " + req.params.info_proId
            });                
        }
        return res.status(500).send({
            message: "Could not delete info_pro with id " + req.params.info_proId
        });
    });
};
