import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { redis } from '../../database/redis'
import { registerUser } from './commands/register'
import { loginUser } from './commands/login'
import type { IRegisterDto, ILoginDTO, IJwtPayload, ITokenPair } from './dto/_auth'

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async register(dto: IRegisterDto) {
    const user = await registerUser(dto)
    const tokens = await this.generateTokens(user)
    return { user, ...tokens }
  }

  async login(dto: ILoginDTO) {
    const user = await loginUser(dto)
    const tokens = await this.generateTokens(user)
    return { user, ...tokens }
  }

  async logout(userId: string, refreshToken: string) {
    await redis.del(`refresh:${userId}:${refreshToken}`)
  }

  async refresh(userId: string, oldRefreshToken: string): Promise<ITokenPair> {
    const stored = await redis.get(`refresh:${userId}:${oldRefreshToken}`)

    if (!stored) {
      throw new Error('Refresh token yaroqsiz yoki muddati tugagan')
    }

    await redis.del(`refresh:${userId}:${oldRefreshToken}`)

    const user = JSON.parse(stored)
    return this.generateTokens(user)
  }

  private async generateTokens(user: any): Promise<ITokenPair> {
    const payload: IJwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    }

    const accessToken = this.jwt.sign(payload, {
      expiresIn: '15m',
    })

    const refreshToken = this.jwt.sign(payload, {
      expiresIn: '7d',
    })

    // Redis da 7 kun saqlash
    await redis.setex(
      `refresh:${user.id}:${refreshToken}`,
      60 * 60 * 24 * 7,
      JSON.stringify({ id: user.id, email: user.email, role: user.role })
    )

    return { accessToken, refreshToken }
  }
}