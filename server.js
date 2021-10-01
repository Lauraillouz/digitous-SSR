const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
const dotenv = require("dotenv");
dotenv.config({
  path: "config.env",
});
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", hbs());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.render("home", {});
});

app.post("/", (req, res) => {
  const user = req.body;
  res.render("home", {});
});

app.get("/login", (req, res) => {
  res.render("login", {});
});

app.get("/signup", (req, res) => {
  res.render("signup", {});
});

app.post("/profile", async (req, res) => {
  const userInfo = req.body;

  try {
    // check if user exists
    const user = await Postgres.query("SELECT * FROM users WHERE email=$1", [
      userInfo.email,
    ]);

    if (user.rows.length === 0) {
      const hashedPassword = await bcrypt.hash(userInfo.password, 12);
      await Postgres.query(
        "INSERT INTO users(username, email, password) VALUES($1, $2, $3)",
        [userInfo.username, userInfo.email, hashedPassword]
      );

      res.render("profile", {
        username: userInfo.username,
      });
    } else {
      alert("This email has already been used.");
    }
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
});

app.get("/users", (req, res) => {
  res.render("/users");
});

app.get("products", (req, res) => {
  res.render("/products");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
