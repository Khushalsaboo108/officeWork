const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const router = require("./app/index");

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

mongoose.connect("mongodb://127.0.0.1:27017/Inv_server")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB...", err));

app.listen(9000, () => {
    console.log("Server is connected");
});
