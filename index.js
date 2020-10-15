const express = require("express");
const imageBoard = require("./app/imageBoard");
const cors = require("cors");
const db = require("./fileDB");
const app = express();
const port = 8000;

db.init();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/imageBoard", imageBoard);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});