import { SiteConfig } from '../../entities/site-config.entity';
import { SeoConfig } from '../../entities/seo-config.entity';
import { Profile } from '../../entities/profile.entity';
import { Service } from '../../entities/service.entity';
import { News } from '../../entities/news.entity';
import { Gallery } from '../../entities/gallery.entity';
import { SectionSetting } from '../../entities/section-setting.entity';
import { PerangkatDesa } from '../../entities/perangkat-desa.entity';
import { DataSource } from 'typeorm';

export const seedData = async (ds: DataSource) => {
  await ds.query('SET FOREIGN_KEY_CHECKS=0');
  const tables = [
    'site_config',
    'seo_config',
    'profile',
    'services',
    'news',
    'gallery',
    'complaint',
    'section_setting',
    'perangkat_desa',
  ];
  for (const t of tables) {
    await ds.query(`TRUNCATE TABLE ${t}`);
  }
  await ds.query('SET FOREIGN_KEY_CHECKS=1');

  const siteConfigRepo = ds.getRepository(SiteConfig);
  const seoConfigRepo = ds.getRepository(SeoConfig);
  const profileRepo = ds.getRepository(Profile);
  const perangkatRepo = ds.getRepository(PerangkatDesa);
  const serviceRepo = ds.getRepository(Service);
  const newsRepo = ds.getRepository(News);
  const galleryRepo = ds.getRepository(Gallery);
  const sectionRepo = ds.getRepository(SectionSetting);

  await siteConfigRepo.save({
    site_name: 'Desa Suka Maju',
    description:
      'Website resmi Desa Suka Maju — pusat informasi, pelayanan masyarakat, dan berita terbaru desa.',
    contact_email: 'desa@desasukamaju.id',
    contact_phone: '0812-3456-7890',
    address: 'Jl. Merdeka No. 10, Kecamatan Harapan, Kabupaten Sejahtera',
    facebook_url: 'https://facebook.com/desasukamaju',
    instagram_url: 'https://instagram.com/desasukamaju',
    author: 'Pemerintah Desa Suka Maju',
  });

  await seoConfigRepo.save([
    {
      path: '/',
      title: 'Desa Suka Maju - Portal Resmi Desa',
      description: 'Pusat informasi dan pelayanan publik desa Suka Maju.',
      keywords: 'desa suka maju, berita desa, pelayanan masyarakat',
      og_title: 'Desa Suka Maju',
      og_description: 'Website resmi Desa Suka Maju.',
      og_url: 'http://localhost:3001/',
      og_image: '/images/og-image.jpg',
      og_locale: 'id_ID',
      og_type: 'website',
    },
    {
      path: '/profil',
      title: 'Profil Desa Suka Maju',
      description: 'Sejarah, visi misi, dan struktur pemerintahan desa.',
      keywords: 'profil desa suka maju, kepala desa, perangkat desa',
      og_title: 'Profil Desa Suka Maju',
      og_description: 'Mengenal lebih dekat pemerintahan Desa Suka Maju.',
      og_url: 'http://localhost:3001/profil',
      og_image: '/images/og-image.jpg',
      og_locale: 'id_ID',
      og_type: 'website',
    },
    {
      path: '/berita',
      title: 'Berita Terkini Desa Suka Maju',
      description: 'Informasi dan kegiatan terbaru dari warga desa.',
      keywords: 'berita desa suka maju, kegiatan warga, info desa',
      og_title: 'Berita Desa Suka Maju',
      og_description: 'Kumpulan berita dan kegiatan terkini Desa Suka Maju.',
      og_url: 'http://localhost:3001/berita',
      og_image: '/images/og-image.jpg',
      og_locale: 'id_ID',
      og_type: 'website',
    },
  ]);

  const profile = await profileRepo.save({
    nama_desa: 'Desa Suka Maju',
    kepala_desa: 'Bapak Rahmat Santoso',
    sejarah:
      'Desa Suka Maju berdiri sejak tahun 1978. Awalnya merupakan pemukiman kecil yang berkembang berkat semangat gotong royong masyarakat.',
    visi: 'Mewujudkan Desa Suka Maju yang Sejahtera, Mandiri, dan Berbudaya.',
    misi: [
      'Meningkatkan pelayanan publik berbasis digital.',
      'Mengembangkan potensi ekonomi lokal melalui pertanian dan UMKM.',
      'Menjaga kelestarian lingkungan dan budaya lokal.',
      'Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan.',
    ],
  });

  await perangkatRepo.save([
    { jabatan: 'Kepala Desa', nama: 'Rahmat Santoso', profile },
    { jabatan: 'Sekretaris Desa', nama: 'Dina Lestari', profile },
    { jabatan: 'Kaur Keuangan', nama: 'Rudi Hartono', profile },
    { jabatan: 'Kaur Perencanaan', nama: 'Siti Marlina', profile },
  ]);

  await serviceRepo.save([
    {
      title: 'Surat Keterangan Domisili',
      description: 'Pengajuan surat tempat tinggal resmi bagi warga.',
      icon: '🏠',
      slug: 'surat-domisili',
    },
    {
      title: 'Surat Keterangan Usaha',
      description: 'Permohonan surat usaha bagi pelaku UMKM lokal.',
      icon: '💼',
      slug: 'surat-usaha',
    },
    {
      title: 'Surat Pengantar Nikah',
      description: 'Pengajuan surat pengantar pernikahan administratif.',
      icon: '💍',
      slug: 'surat-nikah',
    },
  ]);

  await newsRepo.save([
    {
      title: 'Gotong Royong Bersihkan Saluran Air',
      slug: 'gotong-royong-bersihkan-saluran-air',
      image: '/images/news/gotong-royong.jpg',
      date: new Date('2025-10-01'),
      excerpt:
        'Warga melaksanakan kegiatan gotong royong membersihkan saluran air untuk mencegah banjir saat musim hujan.',
    },
    {
      title: 'Pelatihan Digital untuk UMKM Desa',
      slug: 'pelatihan-digital-umkm',
      image: '/images/news/pelatihan-umkm.jpg',
      date: new Date('2025-09-20'),
      excerpt:
        'Pemerintah desa bekerja sama dengan Dinas Kominfo mengadakan pelatihan digital marketing bagi pelaku UMKM lokal.',
    },
  ]);

  await galleryRepo.save([
    {
      title: 'Panen Raya Padi 2025',
      image: '/images/gallery/panen-raya.jpg',
      category: 'Pertanian',
    },
    {
      title: 'Festival Desa Sejahtera',
      image: '/images/gallery/festival.jpg',
      category: 'Budaya',
    },
  ]);

  await sectionRepo.save({
    hero_title: 'Selamat Datang di Desa Suka Maju',
    hero_subtitle:
      'Website resmi Desa Suka Maju — pusat informasi dan pelayanan masyarakat.',
    profile_title: 'Profil Desa',
    profile_subtitle: 'Mengenal lebih dekat Desa Suka Maju',
    services_title: 'Layanan Desa',
    services_subtitle:
      'Kemudahan layanan publik untuk seluruh warga Desa Suka Maju.',
    news_title: 'Berita Terkini',
    news_subtitle: 'Informasi dan kegiatan terbaru dari Desa Suka Maju.',
    gallery_title: 'Galeri Desa',
    gallery_subtitle: 'Dokumentasi kegiatan dan momen berharga desa.',
    contact_title: 'Hubungi Kami',
    contact_subtitle: 'Kami siap melayani Anda di Desa Suka Maju.',
    complaint_title: 'Formulir Pengaduan',
    complaint_subtitle:
      'Sampaikan keluhan atau saran Anda untuk kemajuan desa.',
  });

  console.log('✅ Seeding completed.');
};
