import { ConflictException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { pool } from '../../../database/pool'
import type { IRegisterDto } from '../dto/_auth'

export const registerUser = async (dto: IRegisterDto) => {
  const existing = await pool.query(
    'SELECT id FROM users WHERE email = $1',
    [dto.email.toLowerCase()]
  )

  if (existing.rows[0]) {
    throw new ConflictException('Bu email allaqachon ro\'yxatdan o\'tgan')
  }

  const hash = await bcrypt.hash(dto.password, 10)

  const { rows } = await pool.query(
    `INSERT INTO users (email, password, full_name)
     VALUES ($1, $2, $3)
     RETURNING id, email, full_name, role, is_verified, created_at`,
    [dto.email.toLowerCase(), hash, dto.fullName || null]
  )

  return rows[0]
}