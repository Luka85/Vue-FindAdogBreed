const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { check } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authRouter = express.Router();

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);

authRouter.use((req, res, next) => {
  console.log("Authentication middleware for /auth");
  next();
});

const users = [];

authRouter.post("/signup", async (req, res) => {
  // console.log("signup request");
  const { email, password } = req.body;
  const user = { email, password };

  // console.log(users);
  const userMatch = users.find((user) => {
    return user.email === email;
  });

  // console.log(userMatch);
  if (userMatch) {
    return res.status(400).json({
      errors: [
        {
          msg: "This user already exists",
        },
      ],
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
      email: email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    res.json({ accessToken: accessToken });
  }
});

app.get("/breeds", authenticateToken, (req, res) => {
  res.json(req.email);
  console.log(req.email);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token === undefined) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email) => {
    if (err) return res.sendStatus(403);
    req.email = email;

    next();
  });
}

authRouter.get("/", (req, res) => {
  res.send("auth route working");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
