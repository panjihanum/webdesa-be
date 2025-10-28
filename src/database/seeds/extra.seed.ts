import { DataSource } from 'typeorm';
import { DataKeuangan } from '../../entities/data-keuangan.entity';
import { DataWilayah } from '../../entities/data-wilayah.entity';
import { DataPenduduk } from '../../entities/data-penduduk.entity';
import { SectionSetting } from '../../entities/section-setting.entity';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';

export const seedExtraData = async (ds: DataSource) => {
  console.log('Start Extra Data');
  const keuanganRepo = ds.getRepository(DataKeuangan);
  const wilayahRepo = ds.getRepository(DataWilayah);
  const pendudukRepo = ds.getRepository(DataPenduduk);
  const sectionRepo = ds.getRepository(SectionSetting);
  const userRepo = ds.getRepository(User);

  // --- SectionSetting (Upsert) ---
  let sectionSetting = await sectionRepo.findOne({ where: {} });
  if (!sectionSetting) {
    sectionSetting = sectionRepo.create({});
  }
  Object.assign(sectionSetting, {
    is_show_hero: true,
    hero_title: 'Selamat Datang di Desa Suka Maju',
    hero_subtitle: 'Pusat informasi dan pelayanan masyarakat desa',
    is_show_profile: true,
    profile_title: 'Tentang Desa Suka Maju',
    profile_subtitle: 'Kenali lebih dekat sejarah, visi, dan misi desa kami.',
    is_show_services: true,
    services_title: 'Layanan Masyarakat',
    services_subtitle: 'Berbagai layanan yang tersedia untuk kemudahan warga.',
    is_show_news: true,
    news_title: 'Berita Terkini',
    news_subtitle: 'Informasi terbaru dari warga dan pemerintah desa.',
    is_show_gallery: true,
    gallery_title: 'Galeri Foto & Video',
    gallery_subtitle: 'Dokumentasi kegiatan dan keindahan Desa Suka Maju.',
    is_show_contact: true,
    contact_title: 'Hubungi Kami',
    contact_subtitle: 'Informasi kontak dan lokasi kantor desa.',
    is_show_complaint: true,
    complaint_title: 'Layanan Pengaduan',
    complaint_subtitle:
      'Sampaikan keluhan dan masukan Anda melalui formulir ini.',
  });
  await sectionRepo.save(sectionSetting);

  // --- User Admin (Upsert) ---
  const adminEmail = 'admin@desasukamaju.id';
  let adminUser = await userRepo.findOne({ where: { email: adminEmail } });
  const passwordHash = await bcrypt.hash('admin123', 10);

  if (!adminUser) {
    adminUser = userRepo.create({
      name: 'Administrator Desa',
      email: adminEmail,
      password: passwordHash,
      role: 'admin',
    });
  } else {
    adminUser.name = 'Administrator Desa';
    adminUser.password = passwordHash;
    adminUser.role = 'admin';
  }
  await userRepo.save(adminUser);

  // --- DataKeuangan (Create if Not Exists) ---
  const existingKeuangan = await keuanganRepo.find();
  if (existingKeuangan.length === 0) {
    await keuanganRepo.save([
      {
        tahun: '2024',
        jenis_anggaran: 'Dana Desa',
        jumlah: 750000000,
        keterangan: 'Pembangunan jalan desa',
        is_show: true,
      },
      {
        tahun: '2024',
        jenis_anggaran: 'ADD',
        jumlah: 250000000,
        keterangan: 'Kegiatan operasional dan sosial',
        is_show: true,
      },
    ]);
  }

  // --- DataWilayah (Create if Not Exists) ---
  const existingWilayah = await wilayahRepo.find();
  if (existingWilayah.length === 0) {
    await wilayahRepo.save([
      {
        dusun: 'Dusun Suka Jaya',
        luas_km2: 2.5,
        batas_utara: 'Desa Harapan',
        batas_selatan: 'Sungai Maju',
        batas_timur: 'Kecamatan Sejahtera',
        batas_barat: 'Hutan Lindung',
        is_show: true,
      },
    ]);
  }

  // --- DataPenduduk (Create if Not Exists) ---
  const existingPenduduk = await pendudukRepo.find();
  if (existingPenduduk.length === 0) {
    await pendudukRepo.save([
      {
        nik: '3174040101010001',
        nama: 'Rahmat Santoso',
        jenis_kelamin: 'L',
        tanggal_lahir: '1980-03-10',
        alamat: 'Dusun Suka Jaya',
        pekerjaan: 'Kepala Desa',
        status_kawin: 'Kawin',
        is_show: true,
      },
      {
        nik: '3174040101010002',
        nama: 'Dina Lestari',
        jenis_kelamin: 'P',
        tanggal_lahir: '1985-09-22',
        alamat: 'Dusun Suka Jaya',
        pekerjaan: 'Sekretaris Desa',
        status_kawin: 'Kawin',
        is_show: true,
      },
      {
        nik: '3174040101010003',
        nama: 'Andi Pratama',
        jenis_kelamin: 'L',
        tanggal_lahir: '2001-06-11',
        alamat: 'Dusun Suka Damai',
        pekerjaan: 'Petani',
        status_kawin: 'Belum Kawin',
        is_show: true,
      },
    ]);
  }

  console.log(
    '✅ Extra data (keuangan, wilayah, penduduk, section, user) seeded successfully.',
  );
};
