// require('dotenv').config(); // Load environment variables

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mysql = require('mysql');
// const transactionService = require('./TransactionService');

// const app = express();
// const port = process.env.PORT || 4000;

// // --- Middleware ---
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// // --- Debug env values ---
// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_DATABASE:', process.env.DB_DATABASE);

// // --- MySQL Connection with Retry ---
// const MAX_RETRIES = 10;
// const RETRY_DELAY = 5000; // 5 seconds

// let db;

// function connectToDB(retries = MAX_RETRIES) {
//   db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//   });

//   db.connect((err) => {
//     if (err) {
//       console.error('❌ Error connecting to the database:', err.message);
//       if (retries > 0) {
//         console.log(`⏳ Retrying in ${RETRY_DELAY / 1000}s... (${retries} attempts left)`);
//         setTimeout(() => connectToDB(retries - 1), RETRY_DELAY);
//       } else {
//         console.error('❌ Could not connect to the database. Exiting...');
//         process.exit(1);
//       }
//       return;
//     }
//     console.log('✅ Connected to the MySQL database.');
//     createTables();
//   });
// }

// // --- Create table if not exists ---
// function createTables() {
//   const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS transactions (
//       id INT NOT NULL AUTO_INCREMENT,
//       amount DECIMAL(10,2),
//       description VARCHAR(100),
//       PRIMARY KEY(id)
//     );
//   `;
//   db.query(createTableQuery, (err) => {
//     if (err) {
//       console.error('❌ Error creating table:', err);
//       return;
//     }
//     console.log(' Table "transactions" created or already exists.');
//   });
// }

// connectToDB(); // Start DB connection

// // --- Health check and API routes ---
// app.get('/', (req, res) => {
//   res.send(' Backend API is running! Use /transaction endpoints.');
// });

// app.get('/health', (req, res) => {
//   res.status(200).json({ message: 'This is the health check' });
// });

// // Add /transaction routes here (POST, GET, DELETE, etc.) as before

// // --- Start server ---
// app.listen(port, () => {
//   console.log(` Backend app listening at http://localhost:${port}`);
// });



const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

// ✅ Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL database");

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      amount DECIMAL(10,2),
      description VARCHAR(255)
    );
  `;
  db.query(createTableQuery, (err) => {
    if (err) console.error("❌ Failed to create table:", err);
    else console.log("✅ Table 'transactions' is ready.");
  });
});

// ✅ Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send("Backend is healthy");
});

// ✅ Get all transactions
app.get("/transaction", (req, res) => {
  db.query("SELECT * FROM transactions", (err, results) => {
    if (err) {
      console.error("❌ Error fetching transactions:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json({ result: results });
    }
  });
});

// ✅ Add a transaction
app.post("/transaction", (req, res) => {
  const { amount, desc } = req.body;
  if (!amount || !desc)
    return res.status(400).json({ error: "Missing amount or description" });

  db.query(
    "INSERT INTO transactions (amount, description) VALUES (?, ?)",
    [amount, desc],
    (err, result) => {
      if (err) {
        console.error("❌ Insert failed:", err);
        res.status(500).json({ error: "Insert failed" });
      } else {
        res.status(201).json({ success: true, id: result.insertId });
      }
    }
  );
});

// ✅ Delete all transactions
app.delete("/transaction", (req, res) => {
  db.query("DELETE FROM transactions", (err) => {
    if (err) {
      console.error("❌ Delete failed:", err);
      res.status(500).json({ error: "Delete failed" });
    } else {
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`🚀 Backend running on port ${port}`);
});
