const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));

var connectionString =
  "mongodb+srv://yoda:starwars1234@cluster0.wghhp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    // ...
    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection("quotes");
    // app.use(/* ... */);

    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch(console.error);
