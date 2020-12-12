import debug from "debug";
import sequelizeError from "../errors/sequelizeError.js";
import { DishSchema } from "../database/index.js";

const logger = debug("app:controller-addDish.js");

const addDish = async (req, res, next) => {
  logger(req.body);
  try {
    logger(req.body);
    await DishSchema.sync();
    const resp = await DishSchema.create(req.body);
    return res.status(200).json({ success: true, data: resp });
  } catch (err) {
    const errorStatus = sequelizeError(err);
    return res
      .status(errorStatus[0])
      .json({ success: false, message: errorStatus[1] });
  }
};

export { addDish };
