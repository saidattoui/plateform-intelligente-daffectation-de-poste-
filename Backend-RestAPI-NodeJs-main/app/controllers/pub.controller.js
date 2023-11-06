const Pub = require('../models/pub.model.js');

// Create and Save a new pub
exports.create = (req, res) => {
    // Validate request
    if(!req.body.typePoste) {
        return res.status(400).send({
            message: "pub content can not be empty"
        });
    }

    // Create a pub
    const pub = new Pub({
        nom : req.body.nom|| "Untitled Pub", 
        desc: req.body.desc,
        img: req.body.img,
        link: req.body.link

    });

    // Save pub in the database
    pub.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the pub."
        });
    });
};

// Retrieve and return all pub from the database.
exports.findAll = (req, res) => {
    Pub.find()
    .then(pubs => {
        res.send(pubs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving pubs."
        });
    });
};

// Find a single pub with a pubId
exports.findOne = (req, res) => {
    Pub.findById(req.params.pubId)
    .then(pub => {
        if(!pub) {
            return res.status(404).send({
                message: "pub not found with id " + req.params.pubId
            });            
        }
        res.send(pub);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "pub not found with id " + req.params.pubId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving pub with id " + req.params.pubId
        });
    });
};

// Update a pub identified by the pubId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.typePoste) {
        return res.status(400).send({
            message: "pub content can not be empty"
        });
    }

    // Find pub and update it with the request body
    Pub.findByIdAndUpdate(req.params.pubId, {  
        nom : req.body.nom|| "Untitled Pub", 
        desc: req.body.desc,
        img: req.body.img,
        link: req.body.link


    }, {new: true})
    .then(pub => {
        if(!pub) {
            return res.status(404).send({
                message: "pub not found with id " + req.params.pubId
            });
        }
        res.send(pub);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "pub not found with id " + req.params.pubId
            });                
        }
        return res.status(500).send({
            message: "Error updating pub with id " + req.params.pubId
        });
    });
};

// Delete a pub with the specified pubId in the request
exports.delete = (req, res) => {
    Pub.findByIdAndRemove(req.params.pubId)
    .then(pub => {
        if(!pub) {
            return res.status(404).send({
                message: "pub not found with id " + req.params.pubId
            });
        }
        res.send({message: "pub deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "pub not found with id " + req.params.pubId
            });                
        }
        return res.status(500).send({
            message: "Could not delete pub with id " + req.params.pubId
        });
    });
};
