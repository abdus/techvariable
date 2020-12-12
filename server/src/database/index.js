import debug from "debug";
import Sequelize from "sequelize";
import "../config/env.js";
import sequelizeError from "../errors/sequelizeError.js";
import dish from "./dish.schema.js";

const logger = debug("app:database");
const sequelize = new Sequelize(process.env.DATABASE, {
  logging: (m) => logger(m),
});
const DishSchema = dish(sequelize);

sequelize
  .authenticate()
  .then(() => logger(`sequelize connected to postgresql instance`))
  .catch(sequelizeError);

export default sequelize;
export { DishSchema };
