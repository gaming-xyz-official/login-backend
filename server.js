const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

/*
  🔐 USERS LIST
  ➕ Add as many users as you want here
*/
const users = [
  {
    username: "Admin",
    passwordHash: bcrypt.hashSync("Gaurav", 10)
  },
  {
    username: "Gaurav",
    passwordHash: bcrypt.hashSync("Gaurav@123", 10)
  },
  {
    username: "User1",
    passwordHash: bcrypt.hashSync("User1@123", 10)
  }
];

/*
  LOGIN API
*/
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  // Find user
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Compare password
  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Success
  res.json({ message: "Login successful ✅" });
});

/*
  Root → index.html
*/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/*
  Start server
*/
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🔐 Server running at http://localhost:${PORT}`);
});
