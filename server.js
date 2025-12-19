const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const MAX_SLOTS = 5;
let currentUsers = 0;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Status
app.get("/status", (req, res) => {
  res.json({
    currentUsers,
    availableSlots: Math.max(0, MAX_SLOTS - currentUsers)
  });
});

// Acquire slot on page load
app.post("/enter", (req, res) => {
  if (currentUsers >= MAX_SLOTS) {
    console.log("Site is at full capacity");
    return res.status(403).json({
      success: false,
      message: "Site is at full capacity"
    });
  }

  currentUsers++;
  console.log("User entered, current users:", currentUsers);
  res.json({ success: true });
});

// Release slot on page unload
app.post("/leave", (req, res) => {
  if (currentUsers > 0) {
    currentUsers--;
  }
  console.log("User left, current users:", currentUsers);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
