// const dbcreds = require('./DbConfig');
// const mysql = require('mysql');

// const con = mysql.createConnection({
//     host: dbcreds.DB_HOST,
//     user: dbcreds.DB_USER,
//     password: dbcreds.DB_PASSWORD,
//     database: dbcreds.DB_DATABASE
// });

// function addTransaction(amount,desc){
//     var mysql = `INSERT INTO \`transactions\` (\`amount\`, \`description\`) VALUES ('${amount}','${desc}')`;
//     con.query(mysql, function(err,result){
//         if (err) throw err;
//         console.log("Adding to the table should have worked");
//     }) 
//     return 200;
// }

// function getAllTransactions(callback){
//     var mysql = "SELECT * FROM transactions";
//     con.query(mysql, function(err,result){
//         if (err) throw err;
//         console.log("Getting all transactions...");
//         return(callback(result));
//     });
// }

// function findTransactionById(id,callback){
//     var mysql = `SELECT * FROM transactions WHERE id = ${id}`;
//     con.query(mysql, function(err,result){
//         if (err) throw err;
//         console.log(`retrieving transactions with id ${id}`);
//         return(callback(result));
//     }) 
// }

// function deleteAllTransactions(callback){
//     var mysql = "DELETE FROM transactions";
//     con.query(mysql, function(err,result){
//         if (err) throw err;
//         console.log("Deleting all transactions...");
//         return(callback(result));
//     }) 
// }

// function deleteTransactionById(id, callback){
//     var mysql = `DELETE FROM transactions WHERE id = ${id}`;
//     con.query(mysql, function(err,result){
//         if (err) throw err;
//         console.log(`Deleting transactions with id ${id}`);
//         return(callback(result));
//     }) 
// }


// module.exports = {addTransaction ,getAllTransactions, deleteAllTransactions, deleteAllTransactions, findTransactionById, deleteTransactionById};





require('dotenv').config(); // Ensure env vars are loaded
const mysql = require('mysql');

// Create connection
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

con.connect((err) => {
  if (err) {
    console.error('❌ Error connecting in TransactionService:', err);
  } else {
    console.log('✅ TransactionService connected to MySQL.');
  }
});

// --- Add Transaction ---
function addTransaction(amount, desc, callback) {
  const query = 'INSERT INTO transactions (amount, description) VALUES (?, ?)';
  con.query(query, [amount, desc], (err, result) => {
    if (err) {
      console.error('❌ Error adding transaction:', err);
      return callback(err);
    }
    console.log('✅ Added new transaction.');
    callback(null, result);
  });
}

// --- Get All Transactions ---
function getAllTransactions(callback) {
  const query = 'SELECT * FROM transactions';
  con.query(query, (err, result) => {
    if (err) {
      console.error('❌ Error fetching transactions:', err);
      return callback(err);
    }
    console.log('✅ Retrieved all transactions.');
    callback(null, result);
  });
}

// --- Find Transaction by ID ---
function findTransactionById(id, callback) {
  const query = 'SELECT * FROM transactions WHERE id = ?';
  con.query(query, [id], (err, result) => {
    if (err) {
      console.error('❌ Error finding transaction by ID:', err);
      return callback(err);
    }
    console.log(`✅ Retrieved transaction with ID ${id}.`);
    callback(null, result);
  });
}

// --- Delete All Transactions ---
function deleteAllTransactions(callback) {
  const query = 'DELETE FROM transactions';
  con.query(query, (err, result) => {
    if (err) {
      console.error('❌ Error deleting all transactions:', err);
      return callback(err);
    }
    console.log('✅ Deleted all transactions.');
    callback(null, result);
  });
}

// --- Delete Transaction by ID ---
function deleteTransactionById(id, callback) {
  const query = 'DELETE FROM transactions WHERE id = ?';
  con.query(query, [id], (err, result) => {
    if (err) {
      console.error(`❌ Error deleting transaction ${id}:`, err);
      return callback(err);
    }
    console.log(`✅ Deleted transaction with ID ${id}.`);
    callback(null, result);
  });
}

// --- Export all functions ---
module.exports = {
  addTransaction,
  getAllTransactions,
  findTransactionById,
  deleteAllTransactions,
  deleteTransactionById
};


