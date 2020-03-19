const express = require("express");

const app = express();
const port = 3300;

const jwt = require('jsonwebtoken');
const jwtSecret = "somejwttokensecret";

// Middleware

// JSON parser middleware
app.use(express.json({ type : '*/*' }));

// CORS middleware
app.use(function (req, res, next) {
  // Allow Origins
  res.header("Access-Control-Allow-Origin", "*");
  // Allow Methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  // Allow Headers
  res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization");
  // Handle preflight, it must return 200
  if (req.method === "OPTIONS") {
    // Stop the middleware chain
    return res.status(200).end();
  }
  // Next middleware 
  next();
});

// Auth middleware
app.use((req, res, next) => {
  // login does not require jwt verification
  if (req.path == '/api/login') {
    // next middleware
    console.log(req);
    return next()
  }

  // get token from request header Authorization
  const token = req.headers.authorization

  // Debug print
  console.log("")
  console.log(req.path)
  console.log("authorization:", token)

  // Token verification
  try {
    var decoded = jwt.verify(token, jwtSecret);
    console.log("decoded", decoded)
  } catch (err) {
    // Catch the JWT Expired or Invalid errors
    return res.status(401).json({ "msg": err.message })
  }

  // next middleware
  next()
});

// Routes
app.get("/api/login", (req, res) => {
  const token = jwt.sign({ "username": "sullom" }, jwtSecret, { expiresIn: 60 }) // 1 min token
  // return it back
  res.json({ "token": token , expiresIn: 60 });
});

app.get("/api/token/test", (req, res) => {
  res.json({ "msg": "testing a route" })
});

app.get("/api/test", (req, res) => {
    res.json({ "msg": "JWT protected route" })
  });

// start the Express server
app.listen(port, () => {
  console.log(`server is running on  http://localhost:${port}`);
});