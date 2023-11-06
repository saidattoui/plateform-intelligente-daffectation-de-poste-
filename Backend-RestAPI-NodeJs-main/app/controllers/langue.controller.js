const Langue = require('../models/langue.model.js');

// Create and Save a new langue
exports.create = (req, res) => {
    // Validate request
    if(!req.body.id_user) {
        return res.status(400).send({
            message: "langue content can not be empty"
        });
    }

    // Create a langue
    const langue = new Langue({
        nom1: req.body.nom1 || "Untitled langue", 
        id_user: req.body.id_user
    });

    // Save langue in the database
    langue.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the langue."
        });
    });
};

// Retrieve and return all langue from the database.
exports.findAll = (req, res) => {
    Langue.find()
    .then(langues => {
        res.send(langues);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving langues."
        });
    });
};

// Find a single langue with a langueId
exports.findOne = (req, res) => {
    Langue.findById(req.params.langueId)
    .then(langue => {
        if(!langue) {
            return res.status(404).send({
                message: "langue not found with id " + req.params.langueId
            });            
        }
        res.send(langue);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "langue not found with id " + req.params.langueId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving langue with id " + req.params.langueId
        });
    });
};

// Update a langue identified by the langueId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.id_user) {
        return res.status(400).send({
            message: "langue content can not be empty"
        });
    }

    // Find langue and update it with the request body
    Langue.findByIdAndUpdate(req.params.langueId, {
        nom1: req.body.nom1 || "Untitled langue", 
        id_user: req.body.id_user
        
    }, {new: true})
    .then(langue => {
        if(!langue) {
            return res.status(404).send({
                message: "langue not found with id " + req.params.langueId
            });
        }
        res.send(langue);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "langue not found with id " + req.params.langueId
            });                
        }
        return res.status(500).send({
            message: "Error updating langue with id " + req.params.langueId
        });
    });
};

// Delete a langue with the specified langueId in the request
exports.delete = (req, res) => {
    Langue.findByIdAndRemove(req.params.langueId)
    .then(langue => {
        if(!langue) {
            return res.status(404).send({
                message: "langue not found with id " + req.params.langueId
            });
        }
        res.send({message: "langue deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "langue not found with id " + req.params.langueId
            });                
        }
        return res.status(500).send({
            message: "Could not delete langue with id " + req.params.langueId
        });
    });
};
