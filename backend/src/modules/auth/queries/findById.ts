import { pool } from '../../../database/pool'
export const findUserById = async (id: string) => {
		const { rows } = await pool.query(
			`SELECT id, email, full_name, role, is_verified, provider, created_at FROM users WHERE id = $1`,
			[id]
		)
		return rows[0] || null
}