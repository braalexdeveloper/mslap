const { Certificate, User,Role } = require("../db");
const { Op } = require("sequelize");
const nodemailer = require('nodemailer');

const certificateController = {
  getObservation: async (req, res) => {
    try {
      const { id } = req.params;

      const responseObservation = await Certificate.findOne({ where: { id } });

      res.status(200).json(responseObservation)
    } catch (err) {
      res.status(500).json({ err });
      console.log(err)
    }

  },
  addObservation: async (req, res) => {
    try {
      const { id } = req.params;
      const { observation } = req.body;

      await Certificate.update({ observation }, {
        where: {
          id
        }
      });

      //Obteniendo los correos de usuarios admin y contratistas
      const usuersByRole=await Role.findAll({
        where:{
          [Op.or]:[
            {value:"admin"},
            {value:"contratista"}
          ]
        },
        include:User
      });

      let emails=usuersByRole.map(element => {
        return element.users.map(el=>{
          return el.email
        })
      });
   
      
     const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user:process.env.EMAIL_NODEMAILER,
          pass:process.env.PASSWORD
        }
      });
      
      const mailOptions = {
        from:process.env.EMAIL_NODEMAILER,
        to: emails.toString(),
        subject: 'Notificación de Observación en MSPN',
        html: "<h2>Notificación Nueva</h2><p>Hola, tienes una nueva observación en algun certificado de un operario</p><a href='http://localhost:3000/' target='_blank'>Inicia sesión para revisar</a>"
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.status(200).json({
        status: 1,
        message: "Observación Agregada",
        })
    } catch (err) {
      res.status(500).json({ err });
      console.log(err)
    }

  }
}

module.exports = certificateController;