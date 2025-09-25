const express = require('express');
const router = express.Router();
const KitabMahasiswaController = require('../controllers/kitabMahasiswaController');

// Routes untuk kitab Mahasiswa dan Dewasa Putra
// GET /api/kitab-mahasiswa - Mendapatkan semua data
router.get('/', KitabMahasiswaController.getAll);

// GET /api/kitab-mahasiswa/:id - Mendapatkan data by ID
router.get('/:id', KitabMahasiswaController.getById);

// POST /api/kitab-mahasiswa - Menambah data baru
router.post('/', KitabMahasiswaController.create);

// PUT /api/kitab-mahasiswa/:id - Update data
router.put('/:id', KitabMahasiswaController.update);

// DELETE /api/kitab-mahasiswa/:id - Hapus data
router.delete('/:id', KitabMahasiswaController.delete);

module.exports = router;