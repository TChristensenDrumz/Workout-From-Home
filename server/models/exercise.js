module.exports = function (sequelize, DataTypes) {
  const Exercise = sequelize.define("Exercise", {
    exercise_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Exercise;
};
