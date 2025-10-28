import { AppDataSource } from '../data-source';
import { seedData } from './data.seed';
import { seedExtraData } from './extra.seed';

async function runSeeder() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('🚀 Database connected.');
    }

    await seedData(AppDataSource);
    console.log('🌱 Base data seeded successfully.');

    await seedExtraData(AppDataSource);
    console.log(
      '🌿 Extra data (users, penduduk, keuangan, wilayah, section) seeded successfully.',
    );

    console.log('✅ Seeder finished successfully.');
    await AppDataSource.destroy();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeder failed:', err);
    process.exit(1);
  }
}

runSeeder();
