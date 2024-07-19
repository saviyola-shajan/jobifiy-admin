const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const connectDB = require("./config/db.js");

connectDB();

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/admin",require("./routes/adminRoutes.js"))


app.listen(port, () => console.log(`server started on http://localhost:${port}`));