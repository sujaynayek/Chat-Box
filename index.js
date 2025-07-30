const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const chatBox = require("./model/database.js");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let PORT = 3000;
app.listen(3000, () => {
  console.log("Server is running on port:", PORT);
});
app.get("/", async(req, res) => {
  let chats=await chatBox.find()
  res.render("main.ejs", { chats});
});
app.get("/add-chat",(req, res) => {
  res.render("add-chat.ejs");
});
app.post("/add-chat", async(req, res) => {
  const chat = new chatBox({
    from: req.body.from,
    to: req.body.to,
    message: req.body.message,
  });
chat.save()
  .then(() => {
    res.redirect("/");
  })
  .catch((err) => {
    console.log("Error saving data", err);
  });
});

app.get("/chat/:id/edit",async(req, res) => {
  let chatid= req.params.id;
  let editchat=await chatBox.findById(chatid);
  res.render("edit-chat.ejs", { editchat });
  
});

app.put("/chat/:id",(req, res) => {
  let chatid= req.params.id;
  let newmessage = req.body.message;
  let editchat=chatBox.findByIdAndUpdate(chatid,{message: newmessage}, {new:true})
  .then(() => {
    res.redirect("/"); 
  })
  .catch((err) => {
    console.log("Error updating data", err);
  });
});

app.delete("/chat/:id/delete",async(req, res) => {
  let chatid= req.params.id;
  let editchat=await chatBox.findByIdAndDelete(chatid);
  res.redirect("/"); 
});