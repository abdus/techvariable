import express from "express";
import { addDish } from "../controllers/addDish.js";
import { getDishes } from "../controllers/getDishes.js";
import { updateDish } from "../controllers/updateDish.js";
import { deleteDish } from "../controllers/deleteDish.js";

const router = express.Router();
export default router;

router.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
router.get("/dish/all", getDishes);
router.route("/dish/:id").get(getDishes).put(updateDish).delete(deleteDish);
router.post("/dish", addDish);
