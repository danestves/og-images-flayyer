// Created with create-flayyer-app@1.17.0

const { config } = require("@flayyer/flayyer-types");
require("dotenv").config();

module.exports = config({
  deck: "danestves",
  engine: "react-typescript",
  key: process.env.FLAYYER_KEY,
  description: "Created with create-flayyer-app",
  homepage:
    "https://danestves.com/en/blog/how-to-create-awesome-ogimages-using-react-components-ckmsgs7cwqj0o0c817wvtpojn",
  license: "MIT",
  marketplace: true,
  name: "danestves og-images service",
  private: false,
  repository: "git@github.com:danestves/og-images-flayyer.git",
});
