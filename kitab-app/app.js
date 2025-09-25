const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const stokKitabRoutes = require('./routes/stokKitabRoutes');
const kitabMtsMaPutraRoutes = require('./routes/kitabMtsMaPutraRoutes');
// Import routes lainnya...

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/stok-kitab', stokKitabRoutes);
app.use('/api/kitab-mts-ma-putra', kitabMtsMaPutraRoutes);
// Use routes lainnya...

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'API Aplikasi Catatan Pembagian Kitab Santri',
    version: '1.0.0',
    endpoints: {
      stokKitab: '/api/stok-kitab',
      kitabMtsMaPutra: '/api/kitab-mts-ma-putra'
      // Tambahkan endpoint lainnya...
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server',
    error: process.env.NODE_ENV === 'development' ? error.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});

module.exports = app;