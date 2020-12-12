import debug from "debug";
import sequelizeError from "../errors/sequelizeError.js";
import { DishSchema } from "../database/index.js";

const logger = debug("app:controller-addDish.js");

const getDishes = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (id) {
      // get a document by id
      await DishSchema.sync();
      const resp = await DishSchema.findAll({
        where: {
          id,
        },
      });

      return res.status(200).json({ success: true, data: resp[0] });
    } else {
      await DishSchema.sync();
      const resp = await DishSchema.findAll();
      return res.status(200).json({ success: true, data: resp });
    }
  } catch (err) {
    const errorStatus = sequelizeError(err);
    return res
      .status(errorStatus[0])
      .json({ success: false, message: errorStatus[1] });
  }
};

export { getDishes };
