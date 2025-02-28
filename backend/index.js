const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const match = require('./routes/MathRoute');
const connectDB = require('./config/db');
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use("/", match);

app.listen(7000, () => {
    console.log("Server is running on port 7000");
})

module.exports = app;
