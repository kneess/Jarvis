//sequelize goes here
module.exports = function(sequelize, DataTypes) {
    var hospitals = sequelize.define("hospitals", {
      hospital_name: DataTypes.STRING,
      surgery: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      address: DataTypes.TEXT,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip_code: DataTypes.STRING(5),

    },
     {timestamps: false},
     {freezeTableName: true}
    
    );

    return hospitals;
};

  