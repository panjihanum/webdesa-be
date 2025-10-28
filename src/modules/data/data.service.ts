import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataKeuangan } from 'src/entities/data-keuangan.entity';
import { DataPenduduk } from 'src/entities/data-penduduk.entity';
import { DataWilayah } from 'src/entities/data-wilayah.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(DataKeuangan)
    private keuanganRepo: Repository<DataKeuangan>,

    @InjectRepository(DataPenduduk)
    private pendudukRepo: Repository<DataPenduduk>,

    @InjectRepository(DataWilayah)
    private wilayahRepo: Repository<DataWilayah>,
  ) {}

  async getAllKeuangan() {
    return await this.keuanganRepo.find({
      where: { is_show: true },
      order: { tahun: 'DESC' },
    });
  }

  async getAllPenduduk() {
    return await this.pendudukRepo.find({
      where: { is_show: true },
      order: { nama: 'ASC' },
    });
  }

  /**
   * 🔹 Hitung distribusi usia otomatis dari data_penduduk
   */
  async getDataUsia() {
    const penduduk = await this.pendudukRepo.find({ where: { is_show: true } });
    const now = new Date();

    // Buat kategori usia umum
    const kategoriUsia = [
      { range: '0-5', min: 0, max: 5 },
      { range: '6-12', min: 6, max: 12 },
      { range: '13-17', min: 13, max: 17 },
      { range: '18-25', min: 18, max: 25 },
      { range: '26-35', min: 26, max: 35 },
      { range: '36-45', min: 36, max: 45 },
      { range: '46-60', min: 46, max: 60 },
      { range: '61+', min: 61, max: 200 },
    ];

    // Hitung jumlah tiap rentang
    const hasil = kategoriUsia.map((k) => {
      const jumlah = penduduk.filter((p) => {
        const umur =
          now.getFullYear() -
          new Date(p.tanggal_lahir).getFullYear() -
          (now <
          new Date(
            now.getFullYear(),
            new Date(p.tanggal_lahir).getMonth(),
            new Date(p.tanggal_lahir).getDate(),
          )
            ? 1
            : 0);
        return umur >= k.min && umur <= k.max;
      }).length;
      return { rentang_usia: k.range, jumlah };
    });

    const total = hasil.reduce((a, b) => a + b.jumlah, 0);
    const withPersentase = hasil.map((h) => ({
      ...h,
      persentase: total > 0 ? ((h.jumlah / total) * 100).toFixed(2) : '0.00',
    }));

    return withPersentase;
  }

  /**
   * 🔹 Hitung data wilayah otomatis dari data_penduduk
   *    (jumlah KK, Laki-laki, Perempuan per alamat/dusun)
   */
  async getDataWilayah() {
    const penduduk = await this.pendudukRepo.find({ where: { is_show: true } });

    // Group by alamat (atau bisa pakai dusun, kalau ada field dusun di entity)
    const wilayahMap = new Map<
      string,
      { jumlahPenduduk: number; laki: number; perempuan: number }
    >();

    for (const p of penduduk) {
      const key = p.alamat.trim();
      if (!wilayahMap.has(key)) {
        wilayahMap.set(key, { jumlahPenduduk: 0, laki: 0, perempuan: 0 });
      }

      const item = wilayahMap.get(key)!;
      item.jumlahPenduduk += 1;
      if (p.jenis_kelamin === 'L') item.laki += 1;
      else item.perempuan += 1;
    }

    return Array.from(wilayahMap.entries()).map(([alamat, data]) => ({
      wilayah: alamat,
      total: data.jumlahPenduduk,
      laki_laki: data.laki,
      perempuan: data.perempuan,
    }));
  }
}
