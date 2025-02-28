var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const match = require('./routes/MathRoute');
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

const port = 7000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', match);

app.listen(port, () => {
  console.log("server is running on port 7000");
});

module.exports = app;