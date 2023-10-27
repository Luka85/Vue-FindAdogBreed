const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { check } = require("express-validator");
const authRouter = express.Router();

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

authRouter.use((req, res, next) => {
  console.log("Authentication middleware for /auth");
  next();
});

const users = [];

authRouter.post("/signup", (req, res) => {
  console.log("signup request");
  const { email, password } = req.body;
  console.log(email, password);

  const user = users.find((user) => {
    console.log(user);
    return user.email === email;
  });
  if (user) {
    res.status(400).json({
      errors: [
        {
          msg: "This user already exists",
        },
      ],
    });
  }
  res.send(user);
  console.log(user);
});
authRouter.get("/signup", (req, res) => {
  res.send(users);
});
authRouter.get("/", (req, res) => {
  res.send("auth route working");
});

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
