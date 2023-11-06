const Postule = require('../models/postule.model.js');

// Create and Save a new postule
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nom) {
        return res.status(400).send({
            message: "postule content can not be empty"
        });
    }

    // Create a admin
    const postule = new Postule({
        nom: req.body.nom || "Untitled Postule", 
        prenom : req.body.prenom,
        id_offre : req.body.id_offre,
        id_user : req.body.id_user,
        niveauEducation: req.body.niveauEducation,
        niveauEexperience: req.body.niveauEexperience,
        typeClient: req.body.typeClient,
        email: req.body.email,
        nomSte : req.body.nomSte, 
        localite: req.body.localite ,
        domaine: req.body.domaine,
        typePoste: req.body.typePoste,
        missions: req.body.missions,
        exigencesTravail: req.body.exigencesTravail,
        competences: req.body.competences,
        tempsTravail: req.body.tempsTravail,
        datePub: req.body.datePub,
        pic: req.body.pic,
        salaire: req.body.salaire 

    
    });

    // Save postule in the database
    postule.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the postule."
        });
    });
};

// Retrieve and return all postule from the database.
exports.findAll = (req, res) => {
    Postule.find()
    .then(postules => {
        res.send(postules);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving postules."
        });
    });
};

// Find a single postule with a postuleId
exports.findOne = (req, res) => {
    Postule.findById(req.params.postuleId)
    .then(postule => {
        if(!postule) {
            return res.status(404).send({
                message: "postule not found with id " + req.params.postuleId
            });            
        }
        res.send(postule);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "postule not found with id " + req.params.postuleId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving postule with id " + req.params.postuleId
        });
    });
};

// Update a postule identified by the postuleId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.nom) {
        return res.status(400).send({
            message: "postule content can not be empty"
        });
    }

    // Find postule and update it with the request body
    Postule.findByIdAndUpdate(req.params.postuleId, {
        nom: req.body.nom || "Untitled Postule", 
        prenom : req.body.prenom,
        id_offre : req.body.id_offre,
        id_user : req.body.id_user,
        niveauEducation: req.body.niveauEducation,
        niveauEexperience: req.body.niveauEexperience,
        typeClient: req.body.typeClient,
        email: req.body.email,
        nomSte : req.body.nomSte, 
        localite: req.body.localite ,
        domaine: req.body.domaine,
        typePoste: req.body.typePoste,
        missions: req.body.missions,
        exigencesTravail: req.body.exigencesTravail,
        competences: req.body.competences,
        tempsTravail: req.body.tempsTravail,
        datePub: req.body.datePub,
        pic: req.body.pic,
        salaire: req.body.salaire

    }, {new: true})
    .then(postule => {
        if(!postule) {
            return res.status(404).send({
                message: "postule not found with id " + req.params.postuleId
            });
        }
        res.send(postule);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "postule not found with id " + req.params.postuleId
            });                
        }
        return res.status(500).send({
            message: "Error updating postule with id " + req.params.postuleId
        });
    });
};

// Delete a postule with the specified postuleId in the request
exports.delete = (req, res) => {
    Postule.findByIdAndRemove(req.params.postuleId)
    .then(postule => {
        if(!postule) {
            return res.status(404).send({
                message: "postule not found with id " + req.params.postuleId
            });
        }
        res.send({message: "postule deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "postule not found with id " + req.params.postuleId
            });                
        }
        return res.status(500).send({
            message: "Could not delete postule with id " + req.params.postuleId
        });
    });
};
