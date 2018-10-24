require("dotenv").config();
import express from "express";
import path from "path";
import morgan from "morgan";
import indexRouter from "./controllers/index";

const app = express();

// View engine config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Logs
app.use(morgan("dev"));

// Url params middleware
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use("/static", express.static("public"));
app.use(express.static(__dirname + '/public'))

// Controllers
app.use("/", indexRouter);

// Start app on port APP_PORT
export const server = app.listen(process.env.APP_PORT || 3000, () =>
  console.log(`App listening on port ${process.env.APP_PORT}!`)
);

export default app;
