
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require("./api/routes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);
app.use("*", (req, res) => res.status(404).json({error: "not found"}));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

module.exports = app;
