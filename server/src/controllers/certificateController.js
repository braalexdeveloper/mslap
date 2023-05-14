const { Certificate, User,Role,Project } = require("../db");
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

      const userProjectCertificate=await Certificate.findAll({
        where:{id},
        include:[
        {
          model:User,
          include:{
           model:Project,
           }
        }
          ]
        
      });

const nameOperario=userProjectCertificate[0].user.name+" "+userProjectCertificate[0].user.lastName;
      const nameProjectOperario=userProjectCertificate[0].user.projects[0].name;

      //Obteniendo los correos de usuarios admin y contratistas
      const userAdminByRole=await Role.findAll({
        where:{
              value:"admin"
            },
        include:User
               
      });

let emailAdmin=userAdminByRole[0].users[0].email;

     const usuersByRole=await Role.findAll({
        where:{
              value:"contratista"
            },
        include:[
        {
           model:User,
           include:{
           model:Project,
           }
        },
        
        ]
      });
console.log(usuersByRole)

      let emailsContratistas=usuersByRole[0].users.map(el=>{
          if(el.projects.map(ele=>ele.name).includes(nameProjectOperario)){
            return el.email
           }
                           
        })

      let emailRefactor=emailsContratistas.filter(element=>element!=null);

      let emails=[...emailRefactor,emailAdmin];
      
   
     
     const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user:process.env.EMAIL_NODEMAILER,
          pass:process.env.PASSWORD
        }
      });
      
     let plantillaHtml=`
        <img src='https://media.istockphoto.com/id/1214180883/es/vector/socios-estrechando-la-mano-ilustraci%C3%B3n-vectorial-plana.jpg?s=612x612&w=0&k=20&c=N4sDRetxxdimlm8PT2odo63bL3gi9kT11611SRhHMY8=' />    
        <h2>Notificación de Observación en MSLAPS</h2>
        <p>Hola, tienes una nueva observación en algun certificado del operario <b>${nameOperario}</b></p>
        <a href='http://localhost:3000/' target='_blank'>Iniciar Sesión</a>
`;

      const mailOptions = {
        from:process.env.EMAIL_NODEMAILER,
        to: emails.toString(),
        subject: 'Notificación de Observación en MSLAPS',
        html:plantillaHtml 
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
        message: "Observación Agregada"
                
        })
    } catch (err) {
      res.status(500).json({ err });
      console.log(err)
    }

  }
}

module.exports = certificateController;