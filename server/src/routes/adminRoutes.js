const { Router } = require("express");
const { check } = require("express-validator");
const {
  thereIsUserById,
  thereIsPositionById,
  thereIsProjectById,
} = require("../utils/validators/db-validators");
const adminController = require("../controllers/adminController");
const router = Router();
/**
 * End-point's del modelo Position
 */
// crear cargo
router.post(
  "/position",
  [check("name", "Ingrese nombres").not().isEmpty()],
  adminController.createPosition
);
// actualizar cargo
router.put(
  "/position/:id",
  thereIsPositionById,
  adminController.updatePosition
);
// borrado cargo
router.delete(
  "/position/:id",
  thereIsPositionById,
  adminController.deletePosition
);
// consultar cargo por id
router.get("/position/:id", adminController.getPositionById);
// consultar todos los cargos
router.get("/positions", adminController.getAllPositions);
/**
 * End-point's del modelo Project
 */
// crear proyecto
router.post(
  "/project",
  [
    check("name", "Ingrese nombre").not().isEmpty(),
    check("dateStart", "Seleccione fecha de inicio").not().isEmpty(),
    check("dateEnd", "Seleccione fecha de finalización").not().isEmpty(),
    check("totalCertificates", "Ingrese número de certificados")
      .not()
      .isEmpty(),
    check("location", "Ingrese ubicación").not().isEmpty(),
  ],
  adminController.createProject
);
// actualizar proyecto
router.put("/project/:id", thereIsProjectById, adminController.updateProject);
// borrado proyecto
router.delete(
  "/project/:id",
  thereIsProjectById,
  adminController.deleteProject
);
// consultar proyecto por id
router.get("/project/:id", adminController.getProjectById);
// consultar todos los proyectos
router.get("/projects", adminController.getAllProjects);
/**
 * End-point's del modelo User
 */
// crear usuario
router.post(
  "/user",
  [
    check("dni", "Ingrese dni").not().isEmpty(),
    check("dni", "Mínimo permito 6 digitos").isLength({ min: 6 }),
    check("name", "Ingrese nombres").not().isEmpty(),
    check("lastName", "Ingrese apellidos").not().isEmpty(),
    check("phone", "Ingrese teléfono").not().isEmpty(),
    check("phone", "Mínimo permito 7 digitos").isLength({ min: 7 }),
    check("contactEmergency", "Ingrese contacto de emergencia").not().isEmpty(),
    check("phoneEmergency", "Ingrese teléfono de emergencia").not().isEmpty(),
    check("phoneEmergency", "Mínimo permito 7 digitos").isLength({ min: 7 }),
    check("email", "Ingrese correo electrónico").not().isEmpty(),
    check("typeBlood", "Ingrese tipo de sangre").not().isEmpty(),
  ],
  adminController.createUser
);
// actualizar usuario
router.put("/user/:id", thereIsUserById, adminController.updateUser);
// borrado usuario
router.delete("/user/:id", thereIsUserById, adminController.deleteUser);
// consultar usuario por id
router.get("/user/:id", adminController.getUserById);
// consultar todos los usuarios
router.get("/users", adminController.getAllUsers);

module.exports = router;
