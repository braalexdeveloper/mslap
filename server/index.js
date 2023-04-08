const app = require("./src/app");
const { conn } = require("./src/db");
const { port } = require("./src/utils/config/index");

//Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  app.listen(port, async () => {
    console.log(`Servidor escuchando en el puerto ${port}`); // eslint-disable-line no-console
  });
});
