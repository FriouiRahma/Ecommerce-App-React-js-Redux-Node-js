const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Cors

const cors = require("cors");

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();

  app.options("*", (req, res) => {
    // allowed XHR methods
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    res.send();
  });
});

// Init Middleware
app.use(express.json({ extended: false, limit: "10MB" }));
app.use("/uploads", express.static("uploads"));
// Define Routes
app.use("/api/users", require("./api/routes/users"));
app.use("/api/categories", require("./api/routes/categories"));
app.use("/api/boutiques", require("./api/routes/boutiques"));
app.use("/api/products", require("./api/routes/products"));
app.use("/api/commandes", require("./api/routes/commandes"));
app.use("/api/likes", require("./api/routes/likes"));
app.use("/api/sections", require("./api/routes/sectiontype1"));
app.use("/api/sectiontype3", require("./api/routes/sectiontype3"));
app.use("/api/sectiontype4", require("./api/routes/sectiontype4"));
app.use("/api/sectiontype5", require("./api/routes/sectiontype5"));
app.use("/api/sectiontype6", require("./api/routes/sectiontype6"));
app.use("/api/sectiontype2", require("./api/routes/sectiontype2"));
app.use("/api/globalsections", require("./api/routes/globalsections"));

app.use("/api/sliders", require("./api/routes/sliders"));
app.use("/api/settings", require("./api/routes/settings"));

app.use("/api/messages", require("./api/routes/messagescommandes"));
app.use("/api/status", require("./api/routes/status"));
app.use("/api/helpers", require("./api/routes/helpers"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
