






require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3001', // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const registerRoutes = require("./src/routes/registerRoutes");
app.use("/api/auth", registerRoutes);

const connexionRoutes = require("./src/routes/connexionRoutes");
app.use("/api/auth", connexionRoutes);

const userRoutes = require("./src/routes/userRoutes");
app.use("/api/auth", userRoutes);



const updatepRoutes = require("./src/routes/updatepRoutes");
app.use("/api/update", updatepRoutes);

const deletepRoutes = require("./src/routes/deletepRoutes");
app.use("/api/delete", deletepRoutes);

const updateadRoutes = require("./src/routes/updateadRoutes");
app.use("/api/admin", updateadRoutes);

const adminRoutes = require("./src/routes/adminRoutes");
app.use("/api/admin", adminRoutes);

// Start Server
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);




// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors()); // Enable CORS for all routes

// // MongoDB connection
// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//   console.error("❌ MongoDB URI not found in .env");
//   process.exit(1); // Exit the process if MongoDB URI is not provided
// }

// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1); // Exit if MongoDB connection fails
//   });

// // Routes
// const registerRoutes = require("./src/routes/registerRoutes"); // Register route for signup
// const connexionRoutes = require("./src/routes/connexionRoutes"); // Login route for signin

// // Define register route
// app.use("/api/auth/register", registerRoutes);

// // Define login route
// app.post("/api/auth/login", connexionRoutes); // Explicitly use .post for login

// // Additional routes for update, delete, admin, etc.
// const updatepRoutes = require("./src/routes/updatepRoutes");
// app.use("/api/update", updatepRoutes);

// const deletepRoutes = require("./src/routes/deletepRoutes");
// app.use("/api/delete", deletepRoutes);

// const updateadRoutes = require("./src/routes/updateadRoutes");
// app.use("/api/admin", updateadRoutes);

// const adminRoutes = require("./src/routes/adminRoutes");
// app.use("/api/admin", adminRoutes);

// // Add the root route for testing
// app.get("/", (req, res) => {
//   res.send("Backend is working");
// });

// // Start Server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
