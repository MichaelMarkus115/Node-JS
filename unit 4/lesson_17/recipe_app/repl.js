const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");

mongoose.connect("mongodb://0.0.0.0:27017/recipe_db", {
  useNewUrlParser: true,
});

mongoose.Promise = global.Promise;

Subscriber.create({
  name: "Michael van den Berg",
  email: "Michael@gmail.com",
  zipCode: "12346",
})
  .then((subscriber) => console.log(subscriber))
  .catch((error) => console.log(error.message));

let subscriber;

Subscriber.findOne({
  name: "Michael van den Berg",
}).then((result) => {
  subscriber = result;
  console.log(subscriber.getInfo());
});
