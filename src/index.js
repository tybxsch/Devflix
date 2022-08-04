import express  from "express";
import cors from "cors";
import { series } from "./controller/series-controller.js";
import { bdS } from "./infra/bdSQLite-series.js";

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
series(app, bdS);
app.listen(port, () => console.log(`http://localhost:${port}`));

