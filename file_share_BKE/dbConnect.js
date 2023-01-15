const mongoose = require("mongoose");

const createConnection = async () => {
  const DB_url = process.env.DATABASE_CONNECT_URL;
  let status = "";
  const data = await mongoose
    .connect(DB_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      status = "Database connected succefully";
      console.log("Database connected succefully");
      return status;
    })
    .catch(() => {
      status = "Database Connection failed";
      console.log("Database Connection failed");
      return status;
    });
  return status;
};

module.exports = createConnection;
