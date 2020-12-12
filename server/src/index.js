import express from "express";
import debug from "debug";
import router from "./routes/index.js";
import "./database/index.js";

const app = express();
const logger = debug("app:server-index");

app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true, limit: "10MB" }));
app.use('/api/v1/', router);

const port = process.env.PORT || 3456;
app.listen(port, () => {
  logger(`listening on http://localhost:${port}`);
});
