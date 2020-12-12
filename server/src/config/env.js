import debug from "debug";
import fs from "fs";
import dotenv from "dotenv";

const logger = debug("app:config-env.js");

if (!fs.existsSync(".env")) {
  logger(`file .env does not exists. server may not work as expected`);
}

if (!fs.existsSync(".env.example")) {
  logger(`.env.example is missing.`);
}

dotenv.config({ path: ".env" });
