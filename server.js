const path = require("path");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./routes/html")(app, path);
require("./routes/api")(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  seNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
