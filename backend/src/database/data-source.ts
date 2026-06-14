import 'dotenv/config'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || "5432", 10),
	username: process.env.DB_USERNAME || 'better_stack_user',
	password: process.env.DB_PASSWORD || 'password123',
	database: process.env.DB_DATABASE || 'postgres',
	entities: ['dist/**/*.entity.js'],
	migrations: ['dist/migrations/*.js'],
	synchronize: false,
	logging: process.env.NODE_ENV === 'development' ? true : false,
})

AppDataSource.initialize()
  .then(() => {
		process.env.NODE_ENV === 'development' && console.log('✅ Databaza ulandi');
  })
  .catch((err) => {
		console.error('❌ xato:', err);
  });