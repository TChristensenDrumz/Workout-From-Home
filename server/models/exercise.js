module.exports = function (sequelize, DataTypes) {
  const Exercise = sequelize.define(
    "Exercise",
    {
      exercise_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      equipment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Exercise;
};
