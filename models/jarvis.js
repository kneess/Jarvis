//sequelize goes here
module.exports = function(sequelize, DataTypes) {
    var hospital = sequelize.define("hospital", {
      hospital_name: DataTypes.STRING,
      procedure: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      city: DataTypes.STRING,
      state: DataTypes.STRING
    });
    return hospital;
  };