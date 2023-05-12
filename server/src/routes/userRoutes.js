const { Router } = require("express");
const {
  auth,
  validateFile,
  authPassword,
  validatePassword,
} = require("../utils/validators/db-validators");
const userController = require("../controllers/userController");
const { check } = require("express-validator");
const router = Router();
const upload = require("../utils/common");

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
