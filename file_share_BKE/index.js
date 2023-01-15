const express = require("express");
const dotnet = require("dotenv");
const cors = require("cors");
const { v2: cloudinary } = require("cloudinary");
const router = express.Router();

// configuraations
dotnet.config();
cloudinary.config({
  cloud_name: process.env.CLODINARY_NAME,
  api_key: process.env.CLODINARY_API_KEY,
  api_secret: process.env.CLODINARY_API_SECRET_KEY,
});

// Data base connet
const connet = require("./dbConnect");
connet();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://file-share-app.vercel.app",
      "http://file-share-app.vercel.app",
      "https://file-share-app-5h5g.vercel.app",
      "http://file-share-app-5h5g.vercel.app",
    ],
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Routes
app.use("/file", require("./routes/file"));
app.get("/home", (req, res) =>
  res.status(200).json({ message: "App is running home" })
);
app.get("/about", async (req, res) => {
  const status = await connet();
  res.status(200).json({
    message: "App is running about",
    connecyionURL: process.env.DATABASE_CONNECT_URL,
    status,
  });
});
app.use("/", async (req, res) => {
  const status = await connet();
  res.status(200).json({ message: "App is running updaed 1", status });
});

app.listen(PORT, () => {
  console.log("Server start at", PORT);
});
