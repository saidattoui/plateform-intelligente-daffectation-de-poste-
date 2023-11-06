const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    nom: { type: String },
    prenom: { type: String },
    ville: { type: String },
    dateNaissance: { type: String },
    niveauEducation: { type: String },
    niveauEexperience: { type: String },
    numTel: { type: String },
    travailSouhaite: { type: String },
    typeClient: { type: String },
    lieutravailSouhaite: { type: String },
    email: {
      type: String,
      unique: [true, "The email is unique"],
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
