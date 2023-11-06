const Recruteur = require('../models/recruteur.model.js');

// Create and Save a new recruteur
exports.create = (req, res) => {
    // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "recruteur content can not be empty"
        });
    }

    // Create a recruteur
    const recruteur = new Recruteur({
        nom: req.body.nom || "Untitled Recruteur", 
        email : req.body.email,
        password: req.body.password,
        poste: req.body.poste,
        entreprise: req.body.entreprise,
        status: req.body.status,
        id_entreprise: req.body.id_entreprise


    }); 

    // Save recruteur in the database
    recruteur.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the recruteur."
        });
    });
};

// Retrieve and return all recruteur from the database.
exports.findAll = (req, res) => {
    Recruteur.find()
    .then(recruteurs => {
        res.send(recruteurs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving recruteurs."
        });
    });
};

// Find a single recruteur with a recruteurId
exports.findOne = (req, res) => {
    Recruteur.findById(req.params.recruteurId)
    .then(recruteur => {
        if(!recruteur) {
            return res.status(404).send({
                message: "recruteur not found with id " + req.params.recruteurId
            });            
        }
        res.send(recruteur);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "recruteur not found with id " + req.params.recruteurId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving recruteur with id " + req.params.recruteurId
        });
    });
};

// Update a recruteur identified by the recruteurId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email) {
        return res.status(400).send({
            message: "recruteur content can not be empty"
        });
    }

    // Find recruteur and update it with the request body
    Recruteur.findByIdAndUpdate(req.params.recruteurId, {
        nom: req.body.nom || "Untitled recruteur", 
        email : req.body.email,
        password: req.body.password,
        poste: req.body.poste,
        entreprise: req.body.entreprise,
        status: req.body.status,
        id_entreprise: req.body.id_entreprise



    }, {new: true})
    .then(recruteur => {
        if(!recruteur) {
            return res.status(404).send({
                message: "recruteur not found with id " + req.params.recruteurId
            });
        }
        res.send(recruteur);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "recruteur not found with id " + req.params.recruteurId
            });                
        }
        return res.status(500).send({
            message: "Error updating recruteur with id " + req.params.recruteurId
        });
    });
};

// Delete a recruteur with the specified recruteurId in the request
exports.delete = (req, res) => {
    Recruteur.findByIdAndRemove(req.params.recruteurId)
    .then(recruteur => {
        if(!recruteur) {
            return res.status(404).send({
                message: "recruteur not found with id " + req.params.recruteurId
            });
        }
        res.send({message: "recruteur deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "recruteur not found with id " + req.params.recruteurId
            });                
        }
        return res.status(500).send({
            message: "Could not delete recruteur with id " + req.params.recruteurId
        });
    });
};
