const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSharedSchema = Schema({
  id: {
    type: String,
    require: true,
  },
  fileName: {
    type: String,
    require: true,
  },
  sizeInBytes: {
    type: Number,
    require: true,
  },
  secureUrl: {
    type: String,
  },
  format: {
    type: String,
  },
  uploadDate: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("ShaaaredFile", FileSharedSchema);
