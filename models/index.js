const Sequelize = require('sequelize');
const env = process.env.NODE_ENV||'development';
const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize,Sequelize);
db.History = require('./history')(sequelize,Sequelize);
db.Favorite = require('./favorite')(sequelize,Sequelize);
db.Board = require('./board')(sequelize,Sequelize);

db.User.hasMany(db.History);
db.History.belongsTo(db.User);

db.User.hasMany(db.Favorite);
db.Favorite.belongsTo(db.User);

db.User.hasMany(db.Board,{foreignKey:'id'});
db.Board.belongsTo(db.User,{foreignKey:'userId'});

module.exports = db;