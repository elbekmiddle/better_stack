import 'dotenv/config'
import { Pool } from 'pg'

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: { rejectUnauthorized: false },
})

pool.on('connect', () => console.log('✅ PostgreSQL connected'))
pool.on('error', (err) => console.error('❌ PostgreSQL error:', err))