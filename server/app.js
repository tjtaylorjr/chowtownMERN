//import express from 'express';
const express = require('express');
//import cors from 'cors';
const cors = require('cors');
const routes = require("./api/routes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", routes);
app.use("*", (req, res) => res.status(404).json({error: "not found"}));

module.exports = app;
