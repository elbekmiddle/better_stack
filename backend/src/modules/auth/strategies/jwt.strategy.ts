import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from 'src/modules/auth/dto/_auth';
import { findUserById } from '../queries/findById';
import { ignoreElements } from 'rxjs'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				ignoreElements: false,
			secretOrKey: process.env.JWT_SECRET || 'default-secret',
		})
	}
	async validate(payload: IJwtPayload){
		const user = await findUserById(payload.sub)

		if(!user){
			throw new UnauthorizedException('Foydalanuvchi topilmadi')
		}
		return user
	}
}

