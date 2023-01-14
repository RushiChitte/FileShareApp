const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  getFiles,
  uploadFile,
  getFileDataById,
  onDownloadFile,
} = require("../controllers/fileController");

const storage = multer.diskStorage({});

let upload = multer({
  storage,
});

router.get("/", getFiles);
router.post("/upload", upload.single("myFile"), uploadFile);
router.get("/:id", getFileDataById);
router.get("/:id/download", onDownloadFile);

module.exports = router;
