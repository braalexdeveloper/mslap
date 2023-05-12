const multer = require("multer");
const fs = require("fs");
const dir = "src/uploads/";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});
const upload = multer({ storage });

module.exports = upload;