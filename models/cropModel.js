const mongoose = require("mongoose");
const config = require("../configs/config");
// const validator=require('validator')

mongoose
  .connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(conn => {
    console.log("crops DB connected");
    // console.log(conn)
  });

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  photo: {
    // sir se puchna h
    type: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  description: {
    type: String
  },
  uploaded_date: {
    type: Date,
    default: Date.now
  },
  phone: {
    type: Number,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel"
  }
});

const cropModel = mongoose.model("cropModel", cropSchema);
module.exports = cropModel;
