const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("morgan");
dotenv.config();

const setHeader = require("./utils/middleware/setHeader");
const errorHandler = require("./utils/middleware/errorHandler");

const app = express();
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const certificateRoutes = require("./routes/certificateRoutes");

app.name = "API";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cors({ origin: "https://mslap.consulfinhn.tech" }));
app.use(cookieParser());
app.use(logger("dev"));

app.use(setHeader);

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/certificate", certificateRoutes);

app.use(errorHandler);

module.exports = app;
