var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true });
var userSchema = mongoose.Schema({
  username: String,
  password: String
});
var User = mongoose.model("User", userSchema);
var user1 = new User({
  username: "admin",
  password: "admin@123"
});
user1.save();
exports.authenticateUser = (username, password, callback) => {
  User.find({ username: username, password: password }, (err, users) => {
    if (err || !users) {
      console.log("Not authorized user");
      return callback(err);
    } else if (users.length == 0) {
      console.log("Not a valid user");
      return callback(err);
    } else {
      console.log("Authorized user");
      return callback(null, "success");
    }
  });
};
