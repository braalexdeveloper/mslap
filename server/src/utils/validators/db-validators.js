const bcrypt = require("bcrypt");
const { User, Position, Project } = require("../../db");

// Middleware for routes user
const auth = async (req, res, next) => {
  if (!req.query.email || !req.query.password || !req.query.role) {
    return res.status(400).json({
      status: 0,
      message: "Login fallido, todos los campos son obligatorios",
    });
  }

  const { email } = req.query;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({
      status: 0,
      message: "Usuario no válido!!",
    });
  }

  req.params.id = user.id;

  return next();
};

const thereIsUserById = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      status: 0,
      message: "Debe enviar un id",
    });
  }

  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      status: 0,
      message: "Usuario no encontrado",
    });
  }

  return next();
};

const authPassword = async (req, res, next) => {
  if (!req.params.id || !req.body.currPassword || !req.body.newPassword) {
    return res.status(400).json({
      status: 0,
      message: "Actualización fallida, todos los campos son obligatorios",
    });
  }

  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      status: 0,
      message: "Usuario no encontrado",
    });
  }

  req.body.user = user;

  return next();
};

const validatePassword = async (req, res, next) => {
  if (!bcrypt.compareSync(req.body.currPassword, req.body.user.password)) {
    return res.status(404).json({
      status: 0,
      message: "La contraseña ingresada no corresponde con la actual",
    });
  } 
  return next();
};

// Middleware for routes position
const thereIsPositionById = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      status: 0,
      message: "Debe enviar un id",
    });
  }

  const { id } = req.params;

  const position = await Position.findByPk(id);

  if (!position) {
    return res.status(404).json({
      status: 0,
      message: "Cargo no encontrado",
    });
  }
  return next();
};

// Middleware for routes project
const thereIsProjectById = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      status: 0,
      message: "Debe enviar un id",
    });
  }

  const { id } = req.params;

  const project = await Project.findByPk(id);

  if (!project) {
    return res.status(404).json({
      status: 0,
      message: "Proyecto no encontrado",
    });
  }
  return next();
};

module.exports = {
  auth,
  thereIsUserById,
  authPassword,
  validatePassword,
  thereIsPositionById,
  thereIsProjectById,
};
