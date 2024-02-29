const app = require("./src/app");
const { conn } = require("./src/db");
const { Role } = require("./src/db");
const { port } = require("./src/utils/config/index");

//Syncing all the models at once.
conn.sync({ force: false }).then(async() => {
  //cargar los roles en la tabla Role
let roles=["admin","contratista","supervisor","operario"];
roles.forEach(async el => await Role.findOrCreate({ where: { value: el } }));

  app.listen(port, async () => {
    console.log(`Servidor escuchando en el puerto ${port}`); // eslint-disable-line no-console
  });
});


