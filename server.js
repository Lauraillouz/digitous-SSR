const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", hbs());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (_req, res) => {
  res.render("home", {});
});

app.get("/login", (req, res) => {
  res.render("login", {});
});

app.get("/signup", (req, res) => {
  res.render("signup", {});
});

app.post("/profile", (req, res) => {
  const user = req.body;
  console.log(user);
  res.render("profile", {
    username: user.username,
  });
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
