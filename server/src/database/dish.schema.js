import sequelize from "sequelize";

const { DataTypes } = sequelize;

const Dish = (sequelizeConnection) => {
  return sequelizeConnection.define("Dish", {
    name: { type: DataTypes.STRING, allowNull: false },
    format: { type: DataTypes.STRING, allowNull: true }, // no idea what it is
    price: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    occasion: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
  });
};

export default Dish;
