const bcrypt = require("bcrypt");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const { validationResult } = require("express-validator");
const { User, Role,Project } = require("../db");

const userController = {
  // Función de login
  login: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { id } = req.params;

    try {
      const user = await User.findByPk(id, {
        include: [
          {
            model:Role
          },
          {
            model: Project,
            through: {
              attributes: [],
            }
          }
          ],
        
      });

      if (req.query.role !== user.role.value) {
        return res.status(401).json({
          status: 0,
          message: "Rol de usuario incorrecto",
        });
      }

      if (bcrypt.compareSync(req.query.password, user.password)) {
        delete user.password;
        return res.status(200).json({
          status: 1,
          message: "Usuario logueado correctamente",
          data: user,
        });
      } else {
        return res.status(401).json({
          status: 0,
          message: "Contraseña incorrecta",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  // Función para cambiar imagen de perfil
  changeImage: async (req, res) => {
    const { filename: image } = req.file;
    const { id } = req.params;
    
    try {
      await User.update({ image }, { where: { id } });

      const user = await User.findByPk(id, { attributes: ["image"] });

      return res.status(202).json({
        status: 1,
        message: "Imagen cambiada correctamente",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
  // Función para actualizar clave
  updatePassword: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { id } = req.params;
    const password = bcrypt.hashSync(req.body.newPassword, 10);

    try {
      await User.update({ password }, { where: { id } });

      const user = await User.findByPk(id, {
        attributes: {
          exclude: ["password"],
        },
      });

      return res.json({
        status: 1,
        message: "Contraseña actualizada correctamente",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: "No se pudo realizar la operación",
      });
    }
  },
};

module.exports = userController;
