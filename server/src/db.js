require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { dbUser, dbPassword, dbHost, dbName, dbPort } = require("./utils/config/index");

const sequelize = new Sequelize(
  `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
// verificacion de la conexion
sequelize
  .authenticate()
  .then(() => {
    console.log("Connectado a la base de datos");
  })
  .catch((error) => {
    console.log(error);
  });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Destructuring del array de los modelos
const { User, Position, Project, Role } = sequelize.models;

// Relaciones de los modelos
Position.hasOne(User);
User.belongsTo(Position);

User.belongsToMany(Project, { through: 'usersprojects' });
Project.belongsToMany(User, { through: 'usersprojects' });

Role.hasMany(User);
User.belongsTo(Role);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Op,
};
