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

  // if we decide to have a login page and save the user's data
  // this is where we would use hospital.associate to show which
  // hospitals "belongTo" that user.

  // example:

  // Post.associate = function(models) {
  //   // We're saying that a Post should belong to an Author
  //   // A Post can't be created without an Author due to the foreign key constraint
  //   Post.belongsTo(models.Author, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  // return Post;