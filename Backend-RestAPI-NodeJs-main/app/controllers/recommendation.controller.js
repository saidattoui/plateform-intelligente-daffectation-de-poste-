const Recommendation = require('../models/recommendation.model.js');

// Create and Save a new recommendation
exports.create = (req, res) => {
    // Validate request
    if(!req.body.typePoste) {
        return res.status(400).send({
            message: "recommendation content can not be empty"
        });
    }

    // Create a recommendation
    const recommendation = new Recommendation({
        nomSte : req.body.nomSte|| "Untitled Recommendation", 
        localite: req.body.localite ,
        domaine: req.body.domaine,
        typePoste: req.body.typePoste,
        missions: req.body.missions,
        exigencesTravail: req.body.exigencesTravail,
        competences: req.body.competences,
        tempsTravail: req.body.tempsTravail,
        datePub: req.body.datePub,
        pic: req.body.pic,
        id_entreprise: req.body.id_entreprise,
        salaire: req.body.salaire,
        id_recruteur: req.body.id_recruteur,
        iduser: req.body.iduser,
        offreId: req.body.offreId


    });

    // Save recommendation in the database
    recommendation.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the recommendation."
        });
    });
};

// Retrieve and return all recommendation from the database.
exports.findAll = (req, res) => {
    Recommendation.find()
    .then(recommendations => {
        res.send(recommendations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving recommendations."
        });
    });
};

// Find a single recommendation with a recommendationId
exports.findOne = (req, res) => {
    Recommendation.findById(req.params.recommendationId)
    .then(recommendation => {
        if(!recommendation) {
            return res.status(404).send({
                message: "recommendation not found with id " + req.params.recommendationId
            });            
        }
        res.send(recommendation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "recommendation not found with id " + req.params.recommendationId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving recommendation with id " + req.params.recommendationId
        });
    });
};

// Update a recommendation identified by the recommendationId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.typePoste) {
        return res.status(400).send({
            message: "recommendation content can not be empty"
        });
    }

    // Find recommendation and update it with the request body
    Recommendation.findByIdAndUpdate(req.params.recommendationId, {
        nomSte : req.body.nomSte|| "Untitled Recommendation", 
        localite: req.body.localite ,
        domaine: req.body.domaine,
        typePoste: req.body.typePoste,
        missions: req.body.missions,
        exigencesTravail: req.body.exigencesTravail,
        competences: req.body.competences,
        tempsTravail: req.body.tempsTravail,
        datePub: req.body.datePub,
        pic: req.body.pic,
        id_entreprise: req.body.id_entreprise,
        salaire: req.body.salaire,
        id_recruteur: req.body.id_recruteur,
        iduser: req.body.iduser,
        offreId: req.body.offreId


    }, {new: true})
    .then(recommendation => {
        if(!recommendation) {
            return res.status(404).send({
                message: "recommendation not found with id " + req.params.recommendationId
            });
        }
        res.send(recommendation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "recommendation not found with id " + req.params.recommendationId
            });                
        }
        return res.status(500).send({
            message: "Error updating recommendation with id " + req.params.recommendationId
        });
    });
};

// Delete a recommendation with the specified recommendationId in the request
exports.delete = (req, res) => {
    Recommendation.findByIdAndRemove(req.params.recommendationId)
    .then(recommendation => {
        if(!recommendation) {
            return res.status(404).send({
                message: "recommendation not found with id " + req.params.recommendationId
            });
        }
        res.send({message: "recommendation deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "recommendation not found with id " + req.params.recommendationId
            });                
        }
        return res.status(500).send({
            message: "Could not delete recommendation with id " + req.params.recommendationId
        });
    });
};
