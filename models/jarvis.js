//sequelize goes here
module.exports = function(sequelize, DataTypes) {
    var hospital = sequelize.define("hospital", {
      hospital_name: DataTypes.STRING,
      surgery: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      address: DataTypes.TEXT,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip_code: DataTypes.INTEGER,

    }, {timestamps: false});

    return hospital;
};

  