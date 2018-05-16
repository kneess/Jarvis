module.exports = function(sequelize, DataTypes) {
    var clients = sequelize.define("clients", {
      client_userID: DataTypes.STRING,
      passcode: DataTypes.STRING,
      zip_code: DataTypes.INTEGER
    });
    return clients;
  };