const { Certificate, User, Role, Project } = require("../db");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");

const certificateController = {
  getObservation: async (req, res) => {
    try {
      const { id } = req.params;

      const responseObservation = await Certificate.findOne({ where: { id } });

      res.status(200).json(responseObservation);
    } catch (err) {
      res.status(500).json({ err });
      console.log(err);
    }
  },
  addObservation: async (req, res) => {
    try {
      const { id } = req.params;
      const { observation } = req.body;

      await Certificate.update(
        { observation },
        {
          where: {
            id,
          },
        }
      );

      const userProjectCertificate = await Certificate.findAll({
        where: { id },
        include: [
          {
            model: User,
            include: {
              model: Project,
            },
          },
        ],
      });

      const nameOperario =
        userProjectCertificate[0].user.name +
        " " +
        userProjectCertificate[0].user.lastName;
      const nameProjectOperario =
        userProjectCertificate[0].user.projects[0].name;

      //Obteniendo los correos de usuarios admin y contratistas
      const userAdminByRole = await Role.findAll({
        where: {
          value: "admin",
        },
        include: User,
      });

      let emailAdmin = userAdminByRole[0].users[0].email;

      const usuersByRole = await Role.findAll({
        where: {
          value: "contratista",
        },
        include: [
          {
            model: User,
            include: {
              model: Project,
            },
          },
        ],
      });
      console.log(usuersByRole);

      let emailsContratistas = usuersByRole[0].users.map((el) => {
        if (el.projects.map((ele) => ele.name).includes(nameProjectOperario)) {
          return el.email;
        }
      });

      let emailRefactor = emailsContratistas.filter(
        (element) => element != null
      );

      let emails = [...emailRefactor, emailAdmin];

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.EMAIL_NODEMAILER,
          pass: process.env.PASSWORD,
        },
      });

      let plantillaHtml = `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  <style type="text/css">
    body {

      margin: 0px;
      padding: 0px;
      background-color: rgb(194, 193, 193);
      font-family: Arial, Helvetica, sans-serif;

    }

    .container {
      background-color: rgb(255, 255, 255);
      width: 60%;
      margin: 0 auto;
      text-align: center;
      padding-bottom: 1rem;
    }

    .btnIniciarSesion {
      background-color: rgb(21, 52, 138);
      color: azure;
      padding: 0.5rem;
      border-radius: 0.2rem;
      text-decoration: none;
    }

    .btnIniciarSesion:hover {
      background-color: rgb(7, 28, 85);
      color: azure
    }
  </style>
</head>

<body>
  <div class="container">
    <img
      src='https://res.cloudinary.com/dwmrbilbo/image/upload/v1684120167/image-5_rrmaj0.png' />
    <div>
      <h2>Notificación de Observación en MSLAPS</h2>
      <p>Hola, tienes una nueva observación en el operario <b>${nameOperario} con DNI: ${userProjectCertificate[0].user.dni}</b></p>
      <a href='http://localhost:3000/' class="btnIniciarSesion" target='_blank'>Iniciar Sesión</a>
    </div>
  </div>
</body>
</html>
`;

      const mailOptions = {
        from: process.env.EMAIL_NODEMAILER,
        to: emails.toString(),
        subject: "Notificación de Observación en MSLAPS",
        html: plantillaHtml,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.status(200).json({
        status: 1,
        message: "Observación Agregada",
      });
    } catch (err) {
      res.status(500).json({ err });
      console.log(err);
    }
  },
};

module.exports = certificateController;
