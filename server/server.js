const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send({
    message: `Hello ${req.body.email}`,
  });
});
app.get("/login", (req, res) => {
  console.log("Login request");
  res.send("Login request");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
