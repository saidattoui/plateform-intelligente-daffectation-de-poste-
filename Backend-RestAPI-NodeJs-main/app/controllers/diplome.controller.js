const Diplome = require('../models/diplome.model.js');

// Create and Save a new diplome
exports.create = (req, res) => {
    // Validate request
    if(!req.body.id_user) {
        return res.status(400).send({
            message: "diplome content can not be empty"
        });
    }

    // Create a diplome
    const diplome = new Diplome({
        diplomeObtenu: req.body.diplomeObtenu || "Untitled diplome",
        etablissement: req.body.etablissement,
        dateDeb: req.body.dateDeb,
        dateFin:req.body. dateFin,   
        statut: req.body.statut,
        mention: req.body.mention,
        nEtude: req.body.nEtude,
        id_user: req.body.id_user,
        cv:req.body.cv 
 
    });

    // Save diplome in the database
    diplome.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the diplome."
        });
    });
};

// Retrieve and return all diplome from the database.
exports.findAll = (req, res) => {
    Diplome.find()
    .then(diplomes => {
        res.send(diplomes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving diplomes."
        });
    });
};

// Find a single diplome with a diplomeId
exports.findOne = (req, res) => {
    Diplome.findById(req.params.diplomeId)
    .then(diplome => {
        if(!diplome) {
            return res.status(404).send({
                message: "diplome not found with id " + req.params.diplomeId
            });            
        }
        res.send(diplome);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "diplome not found with id " + req.params.diplomeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving diplome with id " + req.params.diplomeId
        });
    });
};

// Update a diplome identified by the diplomeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.id_user) {
        return res.status(400).send({
            message: "diplome content can not be empty"
        });
    }

    // Find diplome and update it with the request body
    Diplome.findByIdAndUpdate(req.params.diplomeId, {
        diplomeObtenu: req.body.diplomeObtenu || "Untitled diplome",
        etablissement: req.body.etablissement,
        dateDeb: req.body.dateDeb,
        dateFin:req.body. dateFin,   
        statut: req.body.statut,
        mention: req.body.mention,
        nEtude: req.body.nEtude,
        id_user: req.body.id_user,
        cv:req.body.cv 

    }, {new: true})
    .then(diplome => {
        if(!diplome) {
            return res.status(404).send({
                message: "diplome not found with id " + req.params.diplomeId
            });
        }
        res.send(diplome);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "diplome not found with id " + req.params.diplomeId
            });                
        }
        return res.status(500).send({
            message: "Error updating diplome with id " + req.params.diplomeId
        });
    });
};

// Delete a diplome with the specified diplomeId in the request
exports.delete = (req, res) => {
    Diplome.findByIdAndRemove(req.params.diplomeId)
    .then(diplome => {
        if(!diplome) {
            return res.status(404).send({
                message: "diplome not found with id " + req.params.diplomeId
            });
        }
        res.send({message: "diplome deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "diplome not found with id " + req.params.diplomeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete diplome with id " + req.params.diplomeId
        });
    });
};
