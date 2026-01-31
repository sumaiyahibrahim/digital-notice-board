require("dotenv").config();
console.log("ENV TEST:", process.env.MONGO_URI);
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
console.log("connectDB type:", typeof connectDB);

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notices", require("./routes/noticeRoutes"));

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
