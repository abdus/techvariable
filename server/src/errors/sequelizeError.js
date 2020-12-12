import debug from "debug";
import statusCode from "http-status-codes";

const logger = debug("app:error-sequelizeError.js");

const sequelizeError = (err) => {
  if (err.name === "SequelizeValidationError") {
    logger(err.message);
    return [statusCode.UNPROCESSABLE_ENTITY, err.message];
  } else if (err.name === "SequelizeDatabaseError") {
    logger(err.message);
    return [statusCode.BAD_GATEWAY, "bad gateway"];
  } else if (err.name === "SequelizeConnectionError") {
    logger("failed to connect to postgres instance");
    return [statusCode.INTERNAL_SERVER_ERROR, "internal server error"];
  }
  // just to be safe
  logger(err.stack || err.message);
  return [500, "internal server error"];
};

export default sequelizeError;
