// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const prihod = sequelizeClient.define('prihod', {
    prihod_iznos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    prihod_vrsta: {
      type: DataTypes.STRING,
      allowNull: false
    },

  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  prihod.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return prihod;
};
