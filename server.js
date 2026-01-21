const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

/*
  🔐 USERS (YOU CONTROL THESE)
  Add / remove users here
*/
const users = [
  {
    username: "Gaurav",
    passwordHash: bcrypt.hashSync("Gaurav114451@", 10)
  },
  {
    username: "Admin",
    passwordHash: bcrypt.hashSync("Gaurav120893@", 10)
  }
];

/*
  LOGIN API
*/
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // ✅ SUCCESS → send token
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
  ⚠️ REQUIRED FOR RENDER
*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
