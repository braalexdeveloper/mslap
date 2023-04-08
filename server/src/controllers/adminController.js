const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { User, Position, Project } = require("../db");

const adminController = {
  // Funciones del modelo Position
  getPositionById: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    try {
      const position = await Position.findByPk(id);

      if (!position) {
        return res.status(404).json({
          status: 0,
          message: "Cargo no encontrado",
        });
      }

      return res.status(200).json({
        status: 1,
        message: "Cargo encontrado",
        data: position,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  getAllPositions: async (req, res) => {
    try {
      const positions = await Position.findAll();

      return res.status(200).json({
        status: 1,
        message: "Cargos obtenidos",
        data: positions,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  createPosition: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    try {
      const positionCreated = await Position.create(req.body);

      return res.status(200).json({
        status: 1,
        message: "Cargo creado correctamente",
        data: positionCreated,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  updatePosition: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { id } = req.params;

    try {
      await Position.update(req.body, { where: { id } });

      const position = await Position.findByPk(id);

      return res.json({
        status: 1,
        message: "Cargo actualizado correctamente",
        data: position,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  deletePosition: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { id } = req.params;

    try {
      await Position.destroy({ where: { id } });

      return res.json({
        status: 1,
        message: `Cargo eliminado correctamente`,
        data: {},
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  // Funciones del modelo Project
  getProjectById: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    try {
      const project = await Project.findByPk(id);

      if (!project) {
        return res.status(404).json({
          status: 0,
          message: "Proyecto no encontrado",
        });
      }

      return res.status(200).json({
        status: 1,
        message: "Proyecto encontrado",
        data: project,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.findAll();

      return res.status(200).json({
        status: 1,
        message: "Proyectos obtenidos",
        data: projects,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  createProject: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    try {
      const projectCreated = await Project.create(req.body);

      return res.status(200).json({
        status: 1,
        message: "Proyecto creado correctamente",
        data: projectCreated,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  updateProject: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { id } = req.params;

    try {
      await Project.update(req.body, { where: { id } });

      const project = await Project.findByPk(id);

      return res.json({
        status: 1,
        message: "Proyecto actualizado correctamente",
        data: project,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  deleteProject: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { id } = req.params;

    try {
      await Project.destroy({ where: { id } });

      return res.json({
        status: 1,
        message: `Proyecto eliminado correctamente`,
        data: {},
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  // Funciones del modelo User
  getUserById: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    try {
      const user = await User.findByPk(id, {
        attributes: {
          exclude: ["password", "role"],
        },
      });

      if (!user) {
        return res.status(404).json({
          status: 0,
          message: "Usuario no encontrado",
        });
      }

      return res.status(200).json({
        status: 1,
        message: "Usuario encontrado",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["password", "role"],
        },
      });

      return res.status(200).json({
        status: 1,
        message: "Usuarios obtenidos",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  createUser: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { password } = req.body;
    req.body.password = bcrypt.hashSync(password, 10);

    try {
      const userCreated = await User.create(req.body);

      return res.status(200).json({
        status: 1,
        message: "Usuario creado correctamente",
        data: userCreated,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  updateUser: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { id } = req.params;

    try {
      await User.update(req.body, { where: { id } });

      const user = await User.findByPk(id);

      return res.json({
        status: 1,
        message: "Usuario actualizado correctamente",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  deleteUser: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { id } = req.params;

    try {
      await User.destroy({ where: { id } });

      return res.json({
        status: 1,
        message: `Usuario eliminado correctamente`,
        data: {},
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
};

module.exports = adminController;
