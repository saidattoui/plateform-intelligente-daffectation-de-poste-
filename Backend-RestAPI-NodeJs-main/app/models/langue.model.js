const mongoose = require("mongoose");

const LangueSchema = mongoose.Schema(
  {
    id_user: { type: String },
    nom1: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Langue", LangueSchema);
