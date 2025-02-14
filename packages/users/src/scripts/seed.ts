import { DataSource } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { hashPassword } from '../utils/hash';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.USERS_DB || 'users',
  entities: [UserEntity],
  synchronize: false,
});

const seedAdminUser = async () => {
  console.log('Seeding admin user...');

  const userRepository = AppDataSource.getRepository(UserEntity);

  const existingAdmin = await userRepository.findOne({
    where: { isAdmin: true },
  });

  if (existingAdmin) {
    console.log('Admin user already exists. Skipping seeding.');
    return;
  }

  const { hash: passwordHash, salt } = await hashPassword('admin');

  const adminUser = userRepository.create({
    username: 'admin',
    passwordHash,
    salt,
    isAdmin: true,
  });

  await userRepository.save(adminUser);

  console.log('Admin user created successfully.');
};

const main = async () => {
  try {
    console.log('Connecting to database...');
    await AppDataSource.initialize();

    await seedAdminUser();
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    console.log('Disconnecting from database...');
    await AppDataSource.destroy();
  }
};

main();
