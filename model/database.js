const mongoose = require("mongoose");
main()
  .then((res) => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => console.log("error is",err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chat-box");
}

const userSchema = new mongoose.Schema({
  from: { type: String, required: true },
  message: { type: String },
  to: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// User.insertMany([
//   {
//     from: "Alice",
//     message: "Hello Bob!",
//     to: "Bob",
//   },
//   {
//     from: "Bob",
//     message: "Hi Alice!",
//     to: "Alice",
//   },
//   {
//     from: "Alice",
//     message: "How are you?",
//     to: "Bob",
//   },
//   {
//     from: "Bob",
//     message: "I'm good, thanks!",
//     to: "Alice",
//   },
// ]);
