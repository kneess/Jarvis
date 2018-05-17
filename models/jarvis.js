//sequelize goes here
module.exports = function(sequelize, DataTypes) {
    var hospital = sequelize.define("hospital", {
      hospital_name: DataTypes.STRING,
      surgery: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      zip_code: DataTypes.INTEGER
      // state: DataTypes.STRING
    });
    return hospital;
};

  