const Offre = require('../models/offre.model.js');

// Create and Save a new offre
exports.create = (req, res) => {
    // Validate request
    if(!req.body.typePoste) {
        return res.status(400).send({
            message: "offre content can not be empty"
        });
    }

    // Create a offre
    const offre = new Offre({
        nomSte : req.body.nomSte|| "Untitled Offre", 
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
        id_recruteur: req.body.id_recruteur


    });

    // Save offre in the database
    offre.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the offre."
        });
    });
};

// Retrieve and return all offre from the database.
exports.findAll = (req, res) => {
    Offre.find()
    .then(offres => {
        res.send(offres);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving offres."
        });
    });
};

// Find a single offre with a offreId
exports.findOne = (req, res) => {
    Offre.findById(req.params.offreId)
    .then(offre => {
        if(!offre) {
            return res.status(404).send({
                message: "offre not found with id " + req.params.offreId
            });            
        }
        res.send(offre);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "offre not found with id " + req.params.offreId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving offre with id " + req.params.offreId
        });
    });
};

// Update a offre identified by the offreId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.typePoste) {
        return res.status(400).send({
            message: "offre content can not be empty"
        });
    }

    // Find offre and update it with the request body
    Offre.findByIdAndUpdate(req.params.offreId, {
        nomSte : req.body.nomSte|| "Untitled Offre", 
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
        id_recruteur: req.body.id_recruteur


    }, {new: true})
    .then(offre => {
        if(!offre) {
            return res.status(404).send({
                message: "offre not found with id " + req.params.offreId
            });
        }
        res.send(offre);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "offre not found with id " + req.params.offreId
            });                
        }
        return res.status(500).send({
            message: "Error updating offre with id " + req.params.offreId
        });
    });
};

// Delete a offre with the specified offreId in the request
exports.delete = (req, res) => {
    Offre.findByIdAndRemove(req.params.offreId)
    .then(offre => {
        if(!offre) {
            return res.status(404).send({
                message: "offre not found with id " + req.params.offreId
            });
        }
        res.send({message: "offre deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "offre not found with id " + req.params.offreId
            });                
        }
        return res.status(500).send({
            message: "Could not delete offre with id " + req.params.offreId
        });
    });
};
