const db = require('../config/database');

// Model untuk tabel stok kitab (tabel utama)
class StokKitab {
  // Method untuk mendapatkan semua data stok kitab
  static async getAll() {
    try {
      const [rows] = await db.query(`
        SELECT * FROM stok_kitab 
        ORDER BY nama_kitab ASC
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Method untuk mendapatkan stok kitab by ID
  static async getById(id) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM stok_kitab WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Method untuk menambah stok kitab baru
  static async create(data) {
    try {
      const { nama_kitab, penerbit, jumlah_stok, keterangan } = data;
      const [result] = await db.query(
        `INSERT INTO stok_kitab (nama_kitab, penerbit, jumlah_stok, keterangan) 
         VALUES (?, ?, ?, ?)`,
        [nama_kitab, penerbit, jumlah_stok, keterangan]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Method untuk update stok kitab
  static async update(id, data) {
    try {
      const { nama_kitab, penerbit, jumlah_stok, keterangan } = data;
      const [result] = await db.query(
        `UPDATE stok_kitab SET nama_kitab = ?, penerbit = ?, jumlah_stok = ?, keterangan = ? 
         WHERE id = ?`,
        [nama_kitab, penerbit, jumlah_stok, keterangan, id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Method untuk menghapus stok kitab
  static async delete(id) {
    try {
      const [result] = await db.query(
        'DELETE FROM stok_kitab WHERE id = ?',
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  // Method untuk update jumlah stok (digunakan ketika ada pembagian kitab)
  static async updateStok(id, jumlahKeluar) {
    try {
      const [result] = await db.query(
        'UPDATE stok_kitab SET jumlah_stok = jumlah_stok - ? WHERE id = ? AND jumlah_stok >= ?',
        [jumlahKeluar, id, jumlahKeluar]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StokKitab;