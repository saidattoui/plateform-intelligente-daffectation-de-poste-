const Entreprise = require('../models/entreprise.model.js');

// Create and Save a new entreprise
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nom) {
        return res.status(400).send({
            message: "entreprise content can not be empty"
        });
    }

    // Create a entreprise
    const entreprise = new Entreprise({
        adresse: req.body.adresse || "Untitled Entreprise", 
        secteur : req.body.secteur,
        nom : req.body.nom,
        taille: req.body.taille,
        description : req.body.description,
        siteWeb: req.body.siteWeb,
        dateCreation : req.body.dateCreation,
        numTel : req.body.numTel,
        id_recruteur: req.body.id_recruteur
    });

    // Save entreprise in the database
    entreprise.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the entreprise."
        });
    });
};

// Retrieve and return all admin from the database.
exports.findAll = (req, res) => {
    Entreprise.find()
    .then(entreprises => {
        res.send(entreprises);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving entreprises."
        });
    });
};

// Find a single entreprise with a entrepriseId
exports.findOne = (req, res) => {
    Entreprise.findById(req.params.entrepriseId)
    .then(entreprise => {
        if(!entreprise) {
            return res.status(404).send({
                message: "entreprise not found with id " + req.params.entrepriseId
            });            
        }
        res.send(entreprise);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "entreprise not found with id " + req.params.entrepriseId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving entreprise with id " + req.params.entrepriseId
        });
    });
};

// Update a entreprise identified by the entrepriseId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.nom) {
        return res.status(400).send({
            message: "entreprise content can not be empty"
        });
    }

    // Find entreprise and update it with the request body
    Entreprise.findByIdAndUpdate(req.params.entrepriseId, {
        nom: req.body.nom || "Untitled entreprise", 
        adresse : req.body.adresse,
        siteWeb : req.body.siteWeb,
        secteur: req.body.secteur,
        taille : req.body.taille,
        description: req.body.description,
        numTel : req.body.numTel,
        dateCreation: req.body.dateCreation,
        id_recruteur: req.body.id_recruteur

        
    }, {new: true})
    .then(entreprise => {
        if(!entreprise) {
            return res.status(404).send({
                message: "entreprise not found with id " + req.params.entrepriseId
            });
        }
        res.send(entreprise);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "entreprise not found with id " + req.params.entrepriseId
            });                
        }
        return res.status(500).send({
            message: "Error updating entreprise with id " + req.params.entrepriseId
        });
    });
};

// Delete a entreprise with the specified entrepriseId in the request
exports.delete = (req, res) => {
    Entreprise.findByIdAndRemove(req.params.entrepriseId)
    .then(entreprise => {
        if(!entreprise) {
            return res.status(404).send({
                message: "entreprise not found with id " + req.params.entrepriseId
            });
        }
        res.send({message: "entreprise deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "entreprise not found with id " + req.params.entrepriseId
            });                
        }
        return res.status(500).send({
            message: "Could not delete entreprise with id " + req.params.entrepriseId
        });
    });
};
