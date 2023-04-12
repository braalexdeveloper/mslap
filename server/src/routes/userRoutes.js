const { Router } = require("express");
const { auth, thereIsUserById } = require("../utils/validators/db-validators");
const userController = require("../controllers/userController");
const router = Router();
/**
 * End-point's del modelo User
 */
// logueo de usuario
router.get("/login", auth, userController.login);
// resetear contraseña
router.put("/resetPass", thereIsUserById, userController.updatePassword);

module.exports = router;
