const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

/*
  USERS (for learning only)
*/
const users = [
  {
    username: "Admin",
    passwordHash: bcrypt.hashSync("Gaurav12510799@", 10)
  },
  {
    username: "Gaurav",
    passwordHash: bcrypt.hashSync("Gaurav@123", 10)
  }
];

/*
  LOGIN API
*/
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password required"
    });
  }

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  res.json({
    message: "Login successful",
    token: "logged_in"
  });
});

/*
  HEALTH CHECK
*/
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

/*
  REQUIRED FOR RAILWAY
*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
