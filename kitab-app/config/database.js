// Konfigurasi koneksi database MySQL
const mysql = require('mysql2');
require('dotenv').config();

// Membuat koneksi pool untuk efisiensi koneksi database
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'kitab_santri_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Mengubah pool menjadi promise-based untuk async/await
const promisePool = pool.promise();

module.exports = promisePool;