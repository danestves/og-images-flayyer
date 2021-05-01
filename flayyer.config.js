// Created with create-flayyer-app@1.17.0

const { config } = require("@flayyer/flayyer-types");
require("dotenv").config();

module.exports = config({
  engine: "react-typescript",
  key: process.env.FLAYYER_KEY,
  deck: "danestves",

  // Optionals
  name: "danestves og-images service",
  description: "Created with create-flayyer-app",
});
