"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
var hbs = require("express-hbs");

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine(
  "hbs",
  hbs.express4({
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

const router = express.Router();
router.get("/", (req, res) => {
  res.render("Home", {
    message: "Greetings from express server from Aditya",
  });
});
router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
router.post("/", (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));
app.use("/another", (req, res) =>
  res.sendFile(path.join(__dirname, "../another.html"))
);

module.exports = app;
module.exports.handler = serverless(app);
