//jshint esversion:6

//const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const date = require(__dirname+"/date.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const items = [];
const workItems = [];

app.get("/", function (req, res) {

  const day = date.getDate();

  res.render("list", { listTitle: day, newListItem: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work")
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItem: workItems });
});

app.post("work", function (req, res) {
  const item = req.body.newItem;
  workItems.push = item;
  res.redirect("/");
});

app.get("/about",function(req,res){
  res.render("about")
})

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
