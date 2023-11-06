const Favori = require('../models/favori.model.js');

// Create and Save a new favori
exports.create = (req, res) => {
    // Validate request
    if(!req.body.typePoste) {
        return res.status(400).send({
            message: "favori content can not be empty"
        });
    }

    // Create a favori
    const favori = new Favori({
        nomSte : req.body.nomSte|| "Untitled favori", 
        localite: req.body.localite,
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
        id_user: req.body.id_user,
        id_offre: req.body.id_offre


    });

    // Save favori in the database
    favori.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the favori."
        });
    });
};

// Retrieve and return all favori from the database.
exports.findAll = (req, res) => {
    Favori.find()
    .then(favoris => {
        res.send(favoris);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving favoris."
        });
    });
};

// Find a single favori with a favoriId
exports.findOne = (req, res) => {
    Favori.findById(req.params.favoriId)
    .then(favori => {
        if(!favori) {
            return res.status(404).send({
                message: "favori not found with id " + req.params.favoriId
            });            
        }
        res.send(favori);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "favori not found with id " + req.params.favoriId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving favori with id " + req.params.favoriId
        });
    });
};

// Update a favori identified by the favoriId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.typePoste) {
        return res.status(400).send({
            message: "favori content can not be empty"
        });
    }

    // Find favori and update it with the request body
    Favori.findByIdAndUpdate(req.params.favoriId, {
        nomSte : req.body.nomSte|| "Untitled favori", 
        localite: req.body.localite,
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
        id_user: req.body.id_user,
        id_offre: req.body.id_offre


    }, {new: true})
    .then(favori => {
        if(!favori) {
            return res.status(404).send({
                message: "favori not found with id " + req.params.favoriId
            });
        }
        res.send(favori);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "favori not found with id " + req.params.favoriId
            });                
        }
        return res.status(500).send({
            message: "Error updating favori with id " + req.params.favoriId
        });
    });
};

// Delete a favori with the specified favoriId in the request
exports.delete = (req, res) => {
    Favori.findByIdAndRemove(req.params.favoriId)
    .then(favori => {
        if(!favori) {
            return res.status(404).send({
                message: "favori not found with id " + req.params.favoriId
            });
        }
        res.send({message: "favori deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "favori not found with id " + req.params.favoriId
            });                
        }
        return res.status(500).send({
            message: "Could not delete favori with id " + req.params.favoriId
        });
    });
};
