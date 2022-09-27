require('dotenv').config() // Get Env variables to webpack
const UploadPlugin = require("sedoo-static-upload-plugin");
const url = "https://api.sedoo.fr/aeris-cdn-rest/blockrepo/v1_0/upload/"
module.exports = {
  
  plugins: [
    new UploadPlugin({
      url: url,
      includeFileNameArg:false,
      files: JSON.parse(process.env.VUE_APP_RESSOURCES),
    }),
  ],
};
