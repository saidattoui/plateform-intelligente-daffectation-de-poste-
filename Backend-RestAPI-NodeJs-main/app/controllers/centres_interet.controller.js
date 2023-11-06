const Centres_interet = require('../models/centres_interet.model.js');

// Create and Save a new centres_interet
exports.create = (req, res) => {
    // Validate request
    if(!req.body.id_user) {
        return res.status(400).send({
            message: "centres_interet content can not be empty"
        });
    }

    // Create a centres_interet
    const centres_interet = new Centres_interet({
        id_user: req.body.id_user || "Untitled Centres_interet", 
        descri: req.body.descri,
        pointsForts: req.body.pointsForts
    });

    // Save centres_interet in the database
    centres_interet.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the centres_interet."
        });
    });
};

// Retrieve and return all centres_interet from the database.
exports.findAll = (req, res) => {
    Centres_interet.find()
    .then(centres_interets => {
        res.send(centres_interets);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving centres_interets."
        });
    });
};

// Find a single centres_interet with a centres_interetId
exports.findOne = (req, res) => {
    Centres_interet.findById(req.params.centres_interetId)
    .then(centres_interet => {
        if(!centres_interet) {
            return res.status(404).send({
                message: "centres_interet not found with id " + req.params.centres_interetId
            });            
        }
        res.send(centres_interet);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "centres_interet not found with id " + req.params.centres_interetId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving centres_interet with id " + req.params.centres_interetId
        });
    });
};

// Update a centres_interet identified by the centres_interetId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.id_user) {
        return res.status(400).send({
            message: "centres_interet content can not be empty"
        });
    }

    // Find centres_interet and update it with the request body
    Centres_interet.findByIdAndUpdate(req.params.centres_interetId, {
        id_user: req.body.id_user || "Untitled Centres_interet", 
        descri: req.body.descri,
        pointsForts: req.body.pointsForts
    }, {new: true})
    .then(centres_interet => {
        if(!centres_interet) {
            return res.status(404).send({
                message: "centres_interet not found with id " + req.params.centres_interetId
            });
        }
        res.send(centres_interet);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "centres_interet not found with id " + req.params.centres_interetId
            });                
        }
        return res.status(500).send({
            message: "Error updating centres_interet with id " + req.params.centres_interetId
        });
    });
};

// Delete a centres_interet with the specified centres_interetId in the request
exports.delete = (req, res) => {
    Centres_interet.findByIdAndRemove(req.params.centres_interetId)
    .then(centres_interet => {
        if(!centres_interet) {
            return res.status(404).send({
                message: "centres_interet not found with id " + req.params.centres_interetId
            });
        }
        res.send({message: "centres_interet deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "centres_interet not found with id " + req.params.centres_interetId
            });                
        }
        return res.status(500).send({
            message: "Could not delete centres_interet with id " + req.params.centres_interetId
        });
    });
};
