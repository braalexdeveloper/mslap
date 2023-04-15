const { Router } = require("express");
const {
  auth,
  authPassword,
  validatePassword,
} = require("../utils/validators/db-validators");
const userController = require("../controllers/userController");
const router = Router();
/**
 * End-point's del modelo User
 */
// logueo de usuario
router.get("/login", auth, userController.login);
// resetear contraseña
router.put(
  "/resetPass/:id",
  [authPassword, validatePassword],
  userController.updatePassword
);

module.exports = router;
