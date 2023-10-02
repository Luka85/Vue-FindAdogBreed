const express = require("express");
const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
//   console.log("Hello World");
// });
// app.use((req, res) => {
//   console.log("We got a new request");
//   res.send("Luka was here, response");
// });

app.get("/login", (req, res) => {
  console.log("Login request");
  res.send("Login response");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
