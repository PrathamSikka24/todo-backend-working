const express = require("express");
const router = require("./routes");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/todos", router);
app.use((error, req, res, next) => {
  res.status(400).json({
    code: 400,
    message: error.stack,
  });
});

app.listen(8000, () => {
  console.log("App listening on port 8000!");
});

module.exports = app;
