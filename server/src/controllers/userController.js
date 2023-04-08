const { validationResult } = require("express-validator");
const { User } = require("../db");

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
        attributes: {
          exclude: ["password", "role"],
        },
      });

      if (bcrypt.compareSync(req.query.password, user.password)) {
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
  // Función para actualizar clave
  updatePassword: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { id } = req.params;
    const { password } = req.body;
    req.body.password = bcrypt.hashSync(password, 10);

    try {
      await User.update(req.body, { where: { id } });

      const user = await User.findByPk(id, {
        attributes: {
          exclude: ["password", "role"],
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
