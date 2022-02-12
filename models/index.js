const dbConConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {}

const sequelize = new Sequelize(dbConConfig.DB, dbConConfig.USER, dbConConfig.PASSWORD, {
  host: dbConConfig.HOST,
  dialect: dbConConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConConfig.pool.max,
    min: dbConConfig.pool.min,
    acquire: dbConConfig.pool.acquire,
    idle: dbConConfig.pool.idle
  }
});

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    //const model = sequelize['import'](path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user=require("./user")(sequelize, Sequelize.DataTypes)

db.message=require("./message")(sequelize, Sequelize.DataTypes)


db.user.hasMany(db.message,{foreignKey:'user_id'})
db.message.belongsTo(db.user,{foreignKey:"user_id"})

module.exports = db;