const mongoose = require("mongoose");
const ConnectDB = () => {
  mongoose
    .connect(process.env.URI)
    .then((data) => {
      console.log(
        `database has been connected successfully on the ${data.connection.host}`
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = ConnectDB;
