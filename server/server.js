require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { check } = require("express-validator");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const history = require("connect-history-api-fallback");
const app = express();
const port = 8080;

app.use(express.json());
app.use(
  history({
    verbose: true,
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.use((req, res, next) => {
    res
      .status(200)
      .sendFile(path.join(__dirname + "../client/dist/index.html"));
  });
}
// app.use("/", express.static(path.join(__dirname, "client/dist")));
app.use(cors());
app.use("/auth", authRouter);

authRouter.use((req, res, next) => {
  console.log("Authentication middleware for /auth");

  next();
});

const users = [];
let accessTokens = [];
let refreshTokens = [];
authRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = { email, password };

  const userMatch = users.find((user) => {
    return user.email === email;
  });

  if (userMatch) {
    return res.status(400).json({
      errors: {
        msg: "This user already exists. Please go to Login",
      },
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({
      email: email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
    console.log("Successfully signed in");
    // accessTokens.push(accessToken);

    return res.json({ accessToken: accessToken });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userMatch = users.find((user) => {
    return user.email === email;
  });
  console.log(userMatch);
  if (!userMatch) {
    return res.status(400).json({
      errors: {
        msg: "Invalid Credentials",
      },
    });
  } else {
    const isMatchedPassword = await bcrypt.compare(
      password,
      userMatch.password
    );
    console.log(isMatchedPassword);
    if (!isMatchedPassword) {
      return res.status(400).json({
        errors: {
          msg: "Invalid Credentials",
        },
      });
    } else {
      console.log("Successfully logged in");
      const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "45s",
      });
      const refreshToken = jwt.sign(
        { email },
        process.env.REFRESH_TOKEN_SECRET
      );
      accessTokens.push(accessToken);
      console.log(accessToken);
      return res.json({ accessToken: accessToken, refreshToken: refreshToken });
    }
  }
});

authRouter.post("/logout", (req, res) => {
  console.log("logout");
  const { accessToken } = req.body.accessToken;
  console.log({ accessToken });
  console.log(accessTokens);
  accessTokens = accessTokens.filter((token) => {
    if (token !== accessToken) {
      console.log("accessTokens", accessTokens);
    }
  });
  return res.json({
    accessTokens: accessTokens,
    message: "Logout sucessfully",
  });
});

// app.get("/refresh", authenticateToken, (req, res) => {
//   return res.json(accessTokens);
// });

app.get("/breeds", authenticateToken, (req, res) => {
  console.log();
  return res.json({ email: req.email });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  const token = authHeader && authHeader.split(" ")[1];

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
