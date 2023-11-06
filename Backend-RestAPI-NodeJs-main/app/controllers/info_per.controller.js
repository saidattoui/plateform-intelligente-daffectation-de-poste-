const Info_per = require('../models/info_per.model.js');

// Create and Save a new info_per
exports.create = (req, res) => {
    // Validate request
    if(!req.body.id_user) {
        return res.status(400).send({
            message: "info_per content can not be empty"
        });
    }

    // Create a info_per
    const info_per = new Info_per({
        
        sexe: req.body.sexe || "Untitled Info_per",

        etatCivil: req.body.etatCivil,

        adresse: req.body.adresse,

        codePostal: req.body.codePostal,

        typePermis: req.body.typePermis,

        photo:req.body.photo,

        id_user: req.body.id_user
        
    });

    // Save info_per in the database
    info_per.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the info_per."
        });
    });
};

// Retrieve and return all info_per from the database.
exports.findAll = (req, res) => {
    Info_per.find()
    .then(info_pers => {
        res.send(info_pers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving info_pers."
        });
    });
};

// Find a single info_per with a info_perId
exports.findOne = (req, res) => {
    Info_per.findById(req.params.info_perId)
    .then(info_per => {
        if(!info_per) {
            return res.status(404).send({
                message: "info_per not found with id " + req.params.info_perId
            });            
        }
        res.send(info_per);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "info_per not found with id " + req.params.info_perId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.info_perId
        });
    });
};

// Update a info_per identified by the info_perId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.id_user) {
        return res.status(400).send({
            message: "info_per content can not be empty"
        });
    }

    // Find info_per and update it with the request body
    Info_per.findByIdAndUpdate(req.params.info_perId, {

        sexe: req.body.sexe || "Untitled Info_per",

        etatCivil: req.body.etatCivil,

        adresse: req.body.adresse,

        codePostal: req.body.codePostal,

        typePermis: req.body.typePermis,

        photo:req.body.photo,

        id_user: req.body.id_user
       
    }, {new: true})
    .then(info_per => {
        if(!info_per) {
            return res.status(404).send({
                message: "info_per not found with id " + req.params.info_perId
            });
        }
        res.send(info_per);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "info_per not found with id " + req.params.info_perId
            });                
        }
        return res.status(500).send({
            message: "Error updating info_per with id " + req.params.info_perId
        });
    });
};

// Delete a info_per with the specified info_perId in the request
exports.delete = (req, res) => {
    Info_per.findByIdAndRemove(req.params.info_perId)
    .then(info_per => {
        if(!info_per) {
            return res.status(404).send({
                message: "info_per not found with id " + req.params.info_perId
            });
        }
        res.send({message: "info_per deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "info_per not found with id " + req.params.info_perId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.info_perId
        });
    });
};
