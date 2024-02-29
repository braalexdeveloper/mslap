const app = require("./src/app");
const { conn } = require("./src/db");
const { Role,User } = require("./src/db");
const { port } = require("./src/utils/config/index");
const bcrypt=require("bcrypt");

//Syncing all the models at once.
conn.sync({ force:false }).then(async() => {
  //cargar los roles en la tabla Role
let roles=["admin","contratista","supervisor","operario"];
roles.forEach(async el => await Role.findOrCreate({ where: { value: el } }));

let role=await Role.findOne({where:{value:"admin"}});

const pass = bcrypt.hashSync("admin", 10);
let user=await User.findOne({where:{email:"admin@gmail.com"}});
if(!user){
  const userCreated = await User.create({
    name: "admin",
    password: pass,
    email: "admin@gmail.com",
    roleId: role.id,
    dni:"46972096",
    lastName:"qrqrqr"
  
  });
}
  

  app.listen(port, async () => {
    console.log(`Servidor escuchando en el puerto ${port}`); // eslint-disable-line no-console
  });
});


