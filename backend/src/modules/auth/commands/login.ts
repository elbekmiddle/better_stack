import { UnauthorizedException } from '@nestjs/common';
import  * as bcrypt from 'bcrypt';
import { pool } from '../../../database/pool';
import { ILoginDTO } from '../dto/_auth';

export const loginUser = async (dto: ILoginDTO) => {
	const { rows } = await pool.query(
		'SELECT id, email, password, full_name, role, is_verified FROM users WHERE email = $1',
		[dto.email.toLowerCase()]
	)
	const user  = rows[0]
		if(!user){
			throw new UnauthorizedException('Email yoki parol noto`g`ri')
		}
		if(!user.password){
			throw new UnauthorizedException('Bu email orqali ro`yxatdan o`tish amalga oshirilmagan')
		}
		const isMatch = await bcrypt.compare(dto.password, user.password)
		if(!isMatch){
			throw new UnauthorizedException('Email yoki parol noto`g`ri')
		}

		return user
	}