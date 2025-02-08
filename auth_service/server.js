// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require('cors'); // added this 



// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors()); // added this 

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// const registerRoutes = require("./src/routes/registerRoutes");
// app.use("/api/auth", registerRoutes);

// const connexionRoutes = require("./src/routes/connexionRoutes");
// app.use("/api/auth", connexionRoutes);

// const updatepRoutes = require("./src/routes/updatepRoutes");
// app.use("/api/update", updatepRoutes);

// const deletepRoutes = require("./src/routes/deletepRoutes");
// app.use("/api/delete", deletepRoutes);

// const updateadRoutes = require("./src/routes/updateadRoutes");
// app.use("/api/admin", updateadRoutes);

// const adminRoutes = require("./src/routes/adminRoutes");
// app.use("/api/admin", adminRoutes);

// // Start Server
// const PORT = process.env.PORT || 3000; 
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );





// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors()); // Enable CORS for all routes

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Routes
// const registerRoutes = require("./src/routes/registerRoutes");
// app.use("/api/auth/register", registerRoutes); // Separate route for registration

// const connexionRoutes = require("./src/routes/connexionRoutes");
// app.use("/api/auth/login", connexionRoutes); // Separate route for login

// const updatepRoutes = require("./src/routes/updatepRoutes");
// app.use("/api/update", updatepRoutes);

// const deletepRoutes = require("./src/routes/deletepRoutes");
// app.use("/api/delete", deletepRoutes);

// const updateadRoutes = require("./src/routes/updateadRoutes");
// app.use("/api/admin", updateadRoutes);

// const adminRoutes = require("./src/routes/adminRoutes");
// app.use("/api/admin", adminRoutes);

// // Start Server
// const PORT = process.env.PORT || 3000; 
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );















// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Routes
// const registerRoutes = require("./src/routes/registerRoutes");
// app.use("/api/auth/register", registerRoutes); // Register route for /api/auth/register

// const connexionRoutes = require("./src/routes/connexionRoutes");
// app.use("/api/auth", connexionRoutes); // Corrected to handle /api/auth route

// // Other routes
// const updatepRoutes = require("./src/routes/updatepRoutes");
// app.use("/api/update", updatepRoutes);

// const deletepRoutes = require("./src/routes/deletepRoutes");
// app.use("/api/delete", deletepRoutes);

// const updateadRoutes = require("./src/routes/updateadRoutes");
// app.use("/api/admin", updateadRoutes);

// const adminRoutes = require("./src/routes/adminRoutes");
// app.use("/api/admin", adminRoutes);

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Start Server
// const PORT = process.env.PORT || 3000; 
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );







require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MongoDB URI not found in .env");
  process.exit(1); // Exit the process if MongoDB URI is not provided
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Routes
const registerRoutes = require("./src/routes/registerRoutes");
app.use("/api/auth/register", registerRoutes);

const connexionRoutes = require("./src/routes/connexionRoutes");
app.use("/api/auth", connexionRoutes);

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
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
