const Competence = require('../models/competence.model.js');

// Create and Save a new competence
exports.create = (req, res) => {
    // Validate request
    if(!req.body.id_user) {
        return res.status(400).send({
            message: "competence content can not be empty"
        });
    }

    // Create a competence
    const competence = new Competence({
        id_user: req.body.id_user || "Untitled competence",
        titre: req.body.titre, 
    });

    // Save competence in the database
    competence.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the competence."
        });
    });
};

// Retrieve and return all competence from the database.
exports.findAll = (req, res) => {
    Competence.find()
    .then(competences => {
        res.send(competences);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving competences."
        });
    });
};

// Find a single competence with a competenceId
exports.findOne = (req, res) => {
    Competence.findById(req.params.competenceId)
    .then(competence => {
        if(!competence) {
            return res.status(404).send({
                message: "competence not found with id " + req.params.competenceId
            });            
        }
        res.send(competence);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "competence not found with id " + req.params.competenceId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving competence with id " + req.params.competenceId
        });
    });
};

// Update a competence identified by the competenceId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.id_user) {
        return res.status(400).send({
            message: "competence content can not be empty"
        });
    }

    // Find competence and update it with the request body
    Competence.findByIdAndUpdate(req.params.competenceId, {
        id_user: req.body.id_user || "Untitled competence",
        titre: req.body.titre, 
    }, {new: true})
    .then(competence => {
        if(!competence) {
            return res.status(404).send({
                message: "competence not found with id " + req.params.competenceId
            });
        }
        res.send(competence);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "competence not found with id " + req.params.competenceId
            });                
        }
        return res.status(500).send({
            message: "Error updating competence with id " + req.params.competenceId
        });
    });
};

// Delete a competence with the specified competenceId in the request
exports.delete = (req, res) => {
    Competence.findByIdAndRemove(req.params.competenceId)
    .then(competence => {
        if(!competence) {
            return res.status(404).send({
                message: "competence not found with id " + req.params.competenceId
            });
        }
        res.send({message: "competence deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "competence not found with id " + req.params.competenceId
            });                
        }
        return res.status(500).send({
            message: "Could not delete competence with id " + req.params.competenceId
        });
    });
};
