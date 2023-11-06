const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    prenom: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "The email is unique"],
    },
    password: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", AdminSchema);
