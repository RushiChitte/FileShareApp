const mongoose = require("mongoose");

const createConnection = () => {
  const DB_url = process.env.DATABASE_CONNECT_URL;
  mongoose
    .connect(DB_url, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Database connected succefully");
    })
    .catch(() => {
      console.log("Database Connection failed");
    });
};

module.exports = createConnection;
