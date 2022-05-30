const mongoose = require("mongoose");

const connect = async () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((e) => {
      console.log("Error Name: ", e.name);
      console.log("Error Message: ", e.message);
    });
};
module.exports = connect;
