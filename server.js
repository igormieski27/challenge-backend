const express = require("express");
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/studentsRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/students", studentRoutes);
app.use("/users", userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
