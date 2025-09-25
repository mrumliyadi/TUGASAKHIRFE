const express = require('express');
const router = express.Router();
const KitabMahasiswiController = require('../controllers/kitabMahasiswiController');

// Routes untuk kitab Mahasiswi dan Dewasa Putri
// GET /api/kitab-mahasiswi - Mendapatkan semua data
router.get('/', KitabMahasiswiController.getAll);

// GET /api/kitab-mahasiswi/:id - Mendapatkan data by ID
router.get('/:id', KitabMahasiswiController.getById);

// POST /api/kitab-mahasiswi - Menambah data baru
router.post('/', KitabMahasiswiController.create);

// PUT /api/kitab-mahasiswi/:id - Update data
router.put('/:id', KitabMahasiswiController.update);

// DELETE /api/kitab-mahasiswi/:id - Hapus data
router.delete('/:id', KitabMahasiswiController.delete);

module.exports = router;