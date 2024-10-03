"use strict";

const express = require("express");
const app = express();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
const subscriberController = require("./controllers/subscriberController");
const subscriber = require("./models/subscriber");

mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// const MongoDB = require("mongodb").MongoClient;
// const dbURL = "mongodb://0.0.0.0:27017";
// const dbName = "recipe_db";

// MongoDB.connect(dbURL, (error, client) => {
//   if (error) throw error;
//   let db = client.db(dbName);
//   db.collection("contacts")
//   .insert({
//     name: "Test2",
//     email: "2024-september-09@gmail.com"
//   }, (error, db) => {
//     if (error) throw error;
//     console.log(db);
//   });
//   db.collection("contacts")
//     .find()
//     .toArray((error, data) => {
//       if (error) throw error;
//       console.log(data);
//     });
// });

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

// let subscriber1 = new subscriber({
//   name: "Mihcael",
//   email: "michael@gmail.com",
// });

// subscriber1.save((err, savedDoc) => {
//   if (err) console.log(err);
//   console.log(savedDoc);
// });

// subscriber.create(
//   {
//     name: "Michael",
//     email: "michael@gmail.com",
//   },
//   function (error, savedDocument) {
//     if (error) console.log(error);
//     console.log(savedDocument);
//   }
// );

// //query
// let myQuery = subscriber.findOne({
//   name: "Michael",
// }).where("email", /michael/);
// myQuery.exec((error, data) => {
//   if (data) console.log(data.name);
// });

//CREATE & SAVE MODELS IN MAIN.JS
//Option2
// Subscriber.create({
//   name: "Michael van den Berg",
//   email: "michael@gmail.com",
// })
//   .then((savedDocument) => {
//     console.log(savedDocument);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//RUNNING A QUERY
const query = Subscriber.find({ name: "Michael van den Berg" }).exec();
query
  .then((docs) => {
    console.log(docs); // Handle the results
  })
  .catch((err) => {
    console.error(err); // Handle errors
  });

app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.get(
  "/subscribers",
  subscriberController.getAllSubscribers,
  (req, res, next) => {
    console.log(req.data);
    res.send(req.data);
  }
);

app.get("/contact", subscribersController.getSubscriptionPage);

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
