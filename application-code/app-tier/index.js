// require('dotenv').config(); // ✅ This loads variables from your .env file

// const transactionService = require('./TransactionService');
// const mysql = require('mysql');
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const os = require('os');
// const fetch = require('node-fetch');

// const app = express();
// const port = 4000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// // This is for troubleshooting to print the credentials on the terminal
// console.log('DB_HOST:', process.env.DB_HOST,);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_DATABASE:', process.env.DB_DATABASE);


// // Database client setup
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
//   });

//   db.connect((err) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       return;
//     }
//     console.log('Connected to the MySQL database.');
//   });

// // Function to create table if it doesn't exist
// function createTables() {
//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS transactions (
//         id INT NOT NULL AUTO_INCREMENT,
//         amount DECIMAL(10,2),
//         description VARCHAR(100),
//         PRIMARY KEY(id)
//       );
//     `;
  
//     db.query(createTableQuery, (err, results) => {
//       if (err) {
//         console.error('Error creating table:', err);
//         return;
//       }
//       console.log('Table "transactions" created or already exists.');
//     });
//   }



//   // Run the function to create tables
// createTables();


// // ROUTES FOR OUR API
// // =======================================================

// //Health Checking
// app.get('/health',(req,res)=>{
//     res.json("This is the health check");
// });

// // ADD TRANSACTION
// app.post('/transaction', (req,res)=>{
//     var response = "";
//     try{
//         console.log(req.body);
//         console.log(req.body.amount);
//         console.log(req.body.desc);
//         var success = transactionService.addTransaction(req.body.amount,req.body.desc);
//         if (success = 200) res.json({ message: 'added transaction successfully'});
//     }catch (err){
//         res.json({ message: 'something went wrong', error : err.message});
//     }
// });

// // GET ALL TRANSACTIONS
// // app.get('/transaction',(req,res)=>{
// //     try{
// //         var transactionList = [];
// //        transactionService.getAllTransactions(function (results) {
// //             console.log("we are in the call back:");
// //             for (const row of results) {
// //                 transactionList.push({ "id": row.id, "amount": row.amount, "description": row.description });
// //             }
// //             console.log(transactionList);
// //             res.statusCode = 200;
// //             res.json({"result":transactionList});
// //         });
// //     }catch (err){
// //         res.json({message:"could not get all transactions",error: err.message});
// //     }
// // });



// app.get('/transaction', (req, res) => {
//   transactionService.getAllTransactions((err, results) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error fetching transactions', error: err.message });
//     }
//     const transactionList = (results || []).map(r => ({
//       id: r.id,
//       amount: r.amount,
//       description: r.description
//     }));
//     res.status(200).json({ result: transactionList });
//   });
// });




// //DELETE ALL TRANSACTIONS
// app.delete('/transaction',(req,res)=>{
//     try{
//         transactionService.deleteAllTransactions(function(result){
//             res.statusCode = 200;
//             res.json({message:"delete function execution finished."})
//         })
//     }catch (err){
//         res.json({message: "Deleting all transactions may have failed.", error:err.message});
//     }
// });

// //DELETE ONE TRANSACTION
// app.delete('/transaction/id', (req,res)=>{
//     try{
//         //probably need to do some kind of parameter checking
//         transactionService.deleteTransactionById(req.body.id, function(result){
//             res.statusCode = 200;
//             res.json({message: `transaction with id ${req.body.id} seemingly deleted`});
//         })
//     } catch (err){
//         res.json({message:"error deleting transaction", error: err.message});
//     }
// });

// //GET SINGLE TRANSACTION
// app.get('/transaction/id',(req,res)=>{
//     //also probably do some kind of parameter checking here
//     try{
//         transactionService.findTransactionById(req.body.id,function(result){
//             res.statusCode = 200;
//             var id = result[0].id;
//             var amt = result[0].amount;
//             var desc= result[0].desc;
//             res.json({"id":id,"amount":amt,"desc":desc});
//         });

//     }catch(err){
//         res.json({message:"error retrieving transaction", error: err.message});
//     }
// });

//   app.listen(port, () => {
//     console.log(`AB3 backend app listening at http://localhost:${port}`)
//   })


// require('dotenv').config(); // Load env

// const transactionService = require('./TransactionService');
// const mysql = require('mysql');
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 4000;

// // Middlewares
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// // Debug env (optional)
// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_DATABASE:', process.env.DB_DATABASE);

// // DB setup
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the MySQL database.');
// });

// // Create table if not exists
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
//       console.error('Error creating table:', err);
//       return;
//     }
//     console.log('Table "transactions" created or already exists.');
//   });
// }
// createTables();

// // ----------------- ROUTES -----------------

// // Health
// app.get('/health', (req, res) => {
//   res.status(200).send('This is the health check');
// });

// // Add Transaction (uses callback style from TransactionService)
// app.post('/transaction', (req, res) => {
//   try {
//     const { amount, desc } = req.body;
//     if (!amount || !desc) {
//       return res.status(400).json({ message: 'amount and desc are required' });
//     }

//     // Expecting transactionService.addTransaction(amount, desc, callback)
//     transactionService.addTransaction(amount, desc, (err, success) => {
//       if (err) {
//         return res.status(500).json({ message: 'Failed to add transaction', error: err.message || err });
//       }
//       res.status(200).json({ message: 'Transaction added successfully' });
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Something went wrong', error: err.message });
//   }
// });

// // Get all transactions
// app.get('/transaction', (req, res) => {
//   try {
//     transactionService.getAllTransactions((results) => {
//       const transactionList = (results || []).map((row) => ({
//         id: row.id,
//         amount: row.amount,
//         description: row.description,
//       }));
//       res.status(200).json({ result: transactionList });
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Could not get all transactions', error: err.message });
//   }
// });

// // Delete all transactions
// app.delete('/transaction', (req, res) => {
//   try {
//     transactionService.deleteAllTransactions(() => {
//       res.status(200).json({ message: 'All transactions deleted successfully.' });
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Deleting all transactions may have failed.', error: err.message });
//   }
// });

// // Delete one transaction (by id param)
// app.delete('/transaction/:id', (req, res) => {
//   try {
//     const id = req.params.id;
//     transactionService.deleteTransactionById(id, () => {
//       res.status(200).json({ message: `Transaction with id ${id} deleted.` });
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting transaction', error: err.message });
//   }
// });

// // Get single transaction (by id param)
// app.get('/transaction/:id', (req, res) => {
//   try {
//     const id = req.params.id;
//     transactionService.findTransactionById(id, (result) => {
//       if (!result || result.length === 0) {
//         return res.status(404).json({ message: 'Transaction not found' });
//       }
//       const { id: txnId, amount, description } = result[0];
//       res.status(200).json({ id: txnId, amount, description });
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Error retrieving transaction', error: err.message });
//   }
// });

// // --------- Alias routes for frontend that calls /transactions (plural) ---------
// // These simply forward the plural routes to the singular ones above.

// app.get('/transactions', (req, res) => {
//   // GET /transactions -> same as GET /transaction
//   res.redirect('/transaction');
// });

// app.post('/transactions', (req, res) => {
//   // Use 307 to preserve method and body when redirecting
//   res.redirect(307, '/transaction');
// });

// app.delete('/transactions', (req, res) => {
//   // 307 preserves DELETE method
//   res.redirect(307, '/transaction');
// });

// // Start server
// app.listen(port, () => {
//   console.log(`AB3 backend app listening at http://localhost:${port}`);
// });


require('dotenv').config(); // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const transactionService = require('./TransactionService');

const app = express();
const port = 4000;

// --- Middleware ---
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// --- Debug env values ---
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);

// --- MySQL Connection ---
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to the database:', err);
    return;
  }
  console.log('✅ Connected to the MySQL database.');
  createTables();
});

// --- Create table if not exists ---
function createTables() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS transactions (
      id INT NOT NULL AUTO_INCREMENT,
      amount DECIMAL(10,2),
      description VARCHAR(100),
      PRIMARY KEY(id)
    );
  `;
  db.query(createTableQuery, (err) => {
    if (err) {
      console.error('❌ Error creating table:', err);
      return;
    }
    console.log('✅ Table "transactions" created or already exists.');
  });
}

// --- Health Check ---
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'This is the health check' });
});

// --- Root Route for browser ---
app.get('/', (req, res) => {
  res.send('🚀 Backend API is running! Use /transaction endpoints.');
});

// --- Add Transaction ---
app.post('/transaction', (req, res) => {
  const { amount, desc } = req.body;

  if (!amount || !desc) {
    return res.status(400).json({ message: 'amount and desc are required' });
  }

  transactionService.addTransaction(amount, desc, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to add transaction', error: err.message });
    }
    res.status(200).json({ message: 'Transaction added successfully' });
  });
});

// --- Get All Transactions ---
app.get('/transaction', (req, res) => {
  transactionService.getAllTransactions((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching transactions', error: err.message });
    }

    const transactionList = (results || []).map((r) => ({
      id: r.id,
      amount: r.amount,
      description: r.description,
    }));

    res.status(200).json({ result: transactionList });
  });
});

// --- Delete All Transactions ---
app.delete('/transaction', (req, res) => {
  transactionService.deleteAllTransactions((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete transactions', error: err.message });
    }
    res.status(200).json({ message: 'All transactions deleted successfully.' });
  });
});

// --- Get Single Transaction by ID ---
app.get('/transaction/:id', (req, res) => {
  const id = req.params.id;

  transactionService.findTransactionById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving transaction', error: err.message });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const { id: txnId, amount, description } = result[0];
    res.status(200).json({ id: txnId, amount, description });
  });
});

// --- Delete Transaction by ID ---
app.delete('/transaction/:id', (req, res) => {
  const id = req.params.id;

  transactionService.deleteTransactionById(id, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting transaction', error: err.message });
    }
    res.status(200).json({ message: `Transaction with id ${id} deleted.` });
  });
});

// --- Start server ---
app.listen(port, () => {
  console.log(`🚀 AB3 backend app listening at http://localhost:${port}`);
});
