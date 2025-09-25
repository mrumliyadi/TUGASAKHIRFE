const KitabMahasiswa = require('../models/KitabMahasiswa');

// Controller untuk menangani request kitab Mahasiswa dan Dewasa Putra
class KitabMahasiswaController {
  // Get all data
  static async getAll(req, res, next) {
    try {
      const data = await KitabMahasiswa.getAll();
      res.json({
        success: true,
        data: data,
        message: 'Data kitab Mahasiswa berhasil diambil'
      });
    } catch (error) {
      next(error);
    }
  }

  // Get data by ID
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await KitabMahasiswa.getById(id);
      
      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Data tidak ditemukan'
        });
      }

      res.json({
        success: true,
        data: data,
        message: 'Data berhasil diambil'
      });
    } catch (error) {
      next(error);
    }
  }

  // Create new data
  static async create(req, res, next) {
    try {
      const { kitab_id, nama_santri, program, jumlah, tanggal_pembagian, keterangan } = req.body;

      // Validasi input
      if (!kitab_id || !nama_santri || !program || !jumlah || !tanggal_pembagian) {
        return res.status(400).json({
          success: false,
          message: 'Semua field wajib diisi'
        });
      }

      const newId = await KitabMahasiswa.create({
        kitab_id,
        nama_santri,
        program,
        jumlah,
        tanggal_pembagian,
        keterangan: keterangan || ''
      });

      res.status(201).json({
        success: true,
        data: { id: newId },
        message: 'Data pembagian kitab berhasil ditambahkan'
      });
    } catch (error) {
      next(error);
    }
  }

  // Update data
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { kitab_id, nama_santri, program, jumlah, tanggal_pembagian, keterangan } = req.body;

      // Validasi input
      if (!kitab_id || !nama_santri || !program || !jumlah || !tanggal_pembagian) {
        return res.status(400).json({
          success: false,
          message: 'Semua field wajib diisi'
        });
      }

      const affectedRows = await KitabMahasiswa.update(id, {
        kitab_id,
        nama_santri,
        program,
        jumlah,
        tanggal_pembagian,
        keterangan: keterangan || ''
      });

      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Data tidak ditemukan'
        });
      }

      res.json({
        success: true,
        message: 'Data berhasil diupdate'
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete data
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const affectedRows = await KitabMahasiswa.delete(id);

      if (affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Data tidak ditemukan'
        });
      }

      res.json({
        success: true,
        message: 'Data berhasil dihapus'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = KitabMahasiswaController;