"use strict";
const mongoose = require("mongoose");

//schema creation
const subscriberSchema = mongoose.Schema({
  //schema properties
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  zipCode: {
    type: Number,
    min: [10000, "Zip code must be 5 digits long"],
    max: 99999, //zip code must be 5 digits long
  },
});

//returns sub info
subscriberSchema.methods.getInfo = function () {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

//finds sub by Zip Code
subscriberSchema.methods.findLocalSubscribers = function () {
  return this.model("Subscriber").find({ zipCode: this.zipCode }).exec();
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
