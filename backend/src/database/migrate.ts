import 'dotenv/config'
import * as fs from 'fs'
import * as path from 'path'
import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: { rejectUnauthorized: false },
})

async function migrate() {
  const client = await pool.connect()

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        run_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)

    const migrationsDir = path.join(__dirname, 'migrations')
    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort()

    for (const file of files) {
      const { rows } = await client.query(
        'SELECT id FROM _migrations WHERE name = $1',
        [file]
      )

      if (rows.length > 0) {
        console.log(`⏭  ${file} — allaqachon bajarilgan`)
        continue
      }

      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8')

      await client.query('BEGIN')
      await client.query(sql)
      await client.query('INSERT INTO _migrations (name) VALUES ($1)', [file])
      await client.query('COMMIT')

      console.log(`✅ ${file} — bajarildi`)
    }

    console.log('Migration tugadi.')
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('❌ Migration xatosi:', err)
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

migrate()
