const { Router } = require("express");
const multer = require("multer");
// const upload = multer({ dest: "../uploads/" });
const {
  auth,
  validateFile,
  authPassword,
  validatePassword,
} = require("../utils/validators/db-validators");
const userController = require("../controllers/userController");
const { check } = require("express-validator");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/"); // Carpeta de destino para guardar las imágenes
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName); // El nombre del archivo será el original
  },
});

const upload = multer({ storage });

// logueo de usuario
router.get("/login", auth, userController.login);
// cambiar imagen de perfil
router.put(
  "/changeImage/:id",
  [
    upload.single("image"),
    check("image", "Selecione una imagen"),
    validateFile,
  ],
  userController.changeImage
);
// resetear contraseña
router.put(
  "/resetPass/:id",
  [authPassword, validatePassword],
  userController.updatePassword
);

module.exports = router;
