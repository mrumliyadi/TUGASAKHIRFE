const express = require('express');
const router = express.Router();
const KitabMtsMaPutraController = require('../controllers/kitabMtsMaPutraController');

// Routes untuk kitab MTs MA Putra
// GET /api/kitab-mts-ma-putra - Mendapatkan semua data
router.get('/', KitabMtsMaPutraController.getAll);

// GET /api/kitab-mts-ma-putra/:id - Mendapatkan data by ID
router.get('/:id', KitabMtsMaPutraController.getById);

// POST /api/kitab-mts-ma-putra - Menambah data baru
router.post('/', KitabMtsMaPutraController.create);

// PUT /api/kitab-mts-ma-putra/:id - Update data
router.put('/:id', KitabMtsMaPutraController.update);

// DELETE /api/kitab-mts-ma-putra/:id - Hapus data
router.delete('/:id', KitabMtsMaPutraController.delete);

module.exports = router;