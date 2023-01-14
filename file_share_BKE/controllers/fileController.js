const SharedFile = require("../model/SharedFile");
const { v2: cloudinary } = require("cloudinary");
const { v4: uuidv4 } = require("uuid");
const https = require("https");

const getFiles = async (req, res) => {
  const data = await SharedFile.find();
  res.send(data);
};

//
const uploadFile = async (req, res) => {
  try {
    console.log("data", req.file);
    if (!req.file) {
      res.status(400).json({ message: "File not here" });
    }

    let uploadedFile = await cloudinary.uploader.upload(req.file.path, {
      folder: "shareFiles",
      resource_type: "auto",
    });

    const { originalname } = req.file;
    const { secure_url, bytes, format } = uploadedFile;

    const data = {
      id: uuidv4(),
      fileName: originalname,
      sizeInBytes: bytes,
      secureUrl: secure_url,
      format,
      uploadDate: new Date(),
    };
    const newFile = await SharedFile.create(data);

    newFile.save();

    res.status(200).json({ message: "We got your file", data });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const getFileDataById = async (req, res) => {
  const id = req?.params?.id;
  try {
    const file = await SharedFile.find({ id });
    if (!file) {
      return res.status(400).json({ message: "File does not exist!" });
    }

    const { fileName, format, sizeInBytes } = file[0];

    return res.status(200).json({
      fileName,
      format,
      sizeInMB: sizeInBytes / 1024 / 1024,
      id,
    });
  } catch (err) {
    return res.status(500).json({ message: "Serer Error :(" });
  }
};

const onDownloadFile = async (req, res) => {
  const id = req?.params?.id;
  try {
    const file = await SharedFile.find({ id });
    if (!file) {
      return res.status(400).json({ message: "File does not exist!" });
    }
    https.get(file[0].secureUrl, (fileStreeam) => fileStreeam.pipe(res));
  } catch (err) {
    return res.status(500).json({ message: "Serer Error :(" });
  }
};

module.exports = { getFiles, uploadFile, getFileDataById, onDownloadFile };
