require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");

// =========================
// Initialize App
// =========================
const app = express();

// =========================
// Database
// =========================
connectDB();

// =========================
// Middleware
// =========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging (dev only)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// CORS (only needed in development)
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: true,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
    })
  );
}

// =========================
// API Routes
// =========================
app.use("/api/products", require("./routes/products"));
app.use("/api/auth", require("./routes/auth"));

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Belanjain API is running 🚀",
    timestamp: new Date().toISOString()
  });
});

// =========================
// Serve Frontend (Vite build)
// =========================
const clientPath = path.join(__dirname, "../dist");

app.use(express.static(clientPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// =========================
// Global Error Handler
// =========================
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// =========================
// Start Server (Azure Ready)
// =========================
const PORT = process.env.PORT || 8080;
const HOST = process.env.WEBSITE_HOSTNAME || "localhost";

app.listen(PORT, () => {
  console.log("====================================");
  console.log(`🚀 Server running in ${process.env.NODE_ENV || "development"} mode`);
  console.log(`🌐 App URL : https://${HOST}`);
  console.log(`📡 API URL : https://${HOST}/api`);
  console.log(`🏥 Health  : https://${HOST}/api/health`);
  console.log("====================================");
});

