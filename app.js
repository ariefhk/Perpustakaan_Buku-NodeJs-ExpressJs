const express = require("express");
const bodyparser = require("body-parser");
const fs = require("fs"); //file system
const port = 3000; //port

// Create express app
const app = express();

// Create Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// route
const routes = require("./routes/Route.js");
app.use("/", routes);

// start server
app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
