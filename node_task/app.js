"use strict";

import express from "express";
import mongodb from "mongodb";
import tasks from "./src/routes/tasksRoutes.js";
import AuthRoute from "./src/routes/authenticationRoutes.js";
import "dotenv/config";
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
const mongoURI = "mongodb://127.0.0.1:27017/appdb";
const dbName = "appdb";

const client = new mongodb.MongoClient(mongoURI);
client
  .connect(mongoURI, {}, (err, client) => {
    if (err) {
      console.error("MongoDB connection error:", err);
      return;
    }
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.locals.db = client.db(dbName);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
const attachDbToRequest = (req, res, next) => {
  req.db = req.app.locals.db; // Attach the database connection to the request object
  next(); // Continue to the next middleware or route handler
};

app.use(attachDbToRequest);
app.use(tasks);
app.use(AuthRoute);
