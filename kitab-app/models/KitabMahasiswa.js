const db = require('../config/database');

// Model untuk tabel kitab mahasiswa dan dewasa putra
class KitabMahasiswa {
  // Method untuk mendapatkan semua data
  static async getAll() {
    try {
      const [rows] = await db.query(`
        SELECT km.*, sk.nama_kitab, sk.penerbit 
        FROM kitab_mahasiswa_dewasa km
        JOIN stok_kitab sk ON km.kitab_id = sk.id
        ORDER BY km.tanggal_pembagian DESC
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Method untuk mendapatkan data by ID
  static async getById(id) {
    try {
      const [rows] = await db.query(`
        SELECT km.*, sk.nama_kitab, sk.penerbit 
        FROM kitab_mahasiswa_dewasa km
        JOIN stok_kitab sk ON km.kitab_id = sk.id
        WHERE km.id = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Method untuk menambah data pembagian kitab
  static async create(data) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Cek stok tersedia
      const [stok] = await connection.query(
        'SELECT jumlah_stok FROM stok_kitab WHERE id = ?',
        [data.kitab_id]
      );

      if (stok.length === 0) {
        throw new Error('Kitab tidak ditemukan');
      }

      if (stok[0].jumlah_stok < data.jumlah) {
        throw new Error('Stok kitab tidak mencukupi');
      }

      // Insert data pembagian kitab
      const [result] = await connection.query(
        `INSERT INTO kitab_mahasiswa_dewasa 
         (kitab_id, nama_santri, program, jumlah, tanggal_pembagian, keterangan) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [data.kitab_id, data.nama_santri, data.program, data.jumlah, data.tanggal_pembagian, data.keterangan]
      );

      // Update stok kitab
      await connection.query(
        'UPDATE stok_kitab SET jumlah_stok = jumlah_stok - ? WHERE id = ?',
        [data.jumlah, data.kitab_id]
      );

      await connection.commit();
      return result.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Method untuk update data
  static async update(id, data) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Dapatkan data lama untuk perhitungan stok
      const [oldData] = await connection.query(
        'SELECT kitab_id, jumlah FROM kitab_mahasiswa_dewasa WHERE id = ?',
        [id]
      );

      if (oldData.length === 0) {
        throw new Error('Data tidak ditemukan');
      }

      const oldKitabId = oldData[0].kitab_id;
      const oldJumlah = oldData[0].jumlah;

      // Kembalikan stok lama
      await connection.query(
        'UPDATE stok_kitab SET jumlah_stok = jumlah_stok + ? WHERE id = ?',
        [oldJumlah, oldKitabId]
      );

      // Cek stok baru tersedia
      const [stok] = await connection.query(
        'SELECT jumlah_stok FROM stok_kitab WHERE id = ?',
        [data.kitab_id]
      );

      if (stok[0].jumlah_stok < data.jumlah) {
        throw new Error('Stok kitab tidak mencukupi');
      }

      // Update data
      const [result] = await connection.query(
        `UPDATE kitab_mahasiswa_dewasa 
         SET kitab_id = ?, nama_santri = ?, program = ?, jumlah = ?, tanggal_pembagian = ?, keterangan = ?
         WHERE id = ?`,
        [data.kitab_id, data.nama_santri, data.program, data.jumlah, data.tanggal_pembagian, data.keterangan, id]
      );

      // Kurangi stok baru
      await connection.query(
        'UPDATE stok_kitab SET jumlah_stok = jumlah_stok - ? WHERE id = ?',
        [data.jumlah, data.kitab_id]
      );

      await connection.commit();
      return result.affectedRows;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Method untuk menghapus data
  static async delete(id) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Dapatkan data sebelum dihapus untuk mengembalikan stok
      const [data] = await connection.query(
        'SELECT kitab_id, jumlah FROM kitab_mahasiswa_dewasa WHERE id = ?',
        [id]
      );

      if (data.length > 0) {
        // Kembalikan stok
        await connection.query(
          'UPDATE stok_kitab SET jumlah_stok = jumlah_stok + ? WHERE id = ?',
          [data[0].jumlah, data[0].kitab_id]
        );

        // Hapus data
        const [result] = await connection.query(
          'DELETE FROM kitab_mahasiswa_dewasa WHERE id = ?',
          [id]
        );

        await connection.commit();
        return result.affectedRows;
      } else {
        throw new Error('Data tidak ditemukan');
      }
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = KitabMahasiswa;