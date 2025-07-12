const express = require("express"); // Import the Express.js module
const cors = require("cors");
const mysql = require("mysql2"); //Import the MySQL2 module to connect to the MySQL database

const app = express(); // Create an Express app

const port = 3000; // Choose a port number for the server to run on (usually 3000 for local dev)

app.use(express.json()); // Allow the app to read incoming JSON data from requests (e.g. POST body)
app.use(cors()); //This allows all origins by default
// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: "localhost", // The database server address (localhost means your own computer)
  user: "root", // Your MySQL username (change this if different)
  password: "dereck11", // Your MySQL password (put your actual password here)
  database: "mechanical_engineering_formulas", // The name of your database
});

// Connect to the database and handle any errors
db.connect((err) => {
  if (err) {
    console.error("❌ Failed to connect to database:", err); // Show error in console
    return;
  }
  console.log("✅ Connected to MySQL database successfully."); // Success message
});

// Set up a basic route for the home page (http://localhost:3000/)
app.get("/", (req, res) => {
  res.send("Welcome! you reached the Home route");
});

app.get("/categories", (req, res) => {
  const query = "SELECT * FROM categories";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error: ", err.message);
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

app.get("/formulas", (req, res) => {
  const query = "SELECT * FROM formulas";
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Query Error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get("/variables", (req, res) => {
  const query = "SELECT * FROM variables";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error: ", err.message);
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
});

// Start the server and listen for incoming requests on the selected port
app.listen(port, () => {
  console.log(`✅ Server is listening on http://localhost:${port}`);
});
