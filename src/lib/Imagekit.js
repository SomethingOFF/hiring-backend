const ImageKit = require("imagekit");
require("dotenv").config();



const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_SECRET_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

module.exports = imagekit;
