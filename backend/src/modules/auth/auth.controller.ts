import {
  Controller, Post, Body, Req,
  UseGuards, HttpCode, HttpStatus
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtGuard } from './guards/jwt.guard'
import type { IRegisterDto, ILoginDTO } from './dto/_auth'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: IRegisterDto) {
    return this.authService.register(dto)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: ILoginDTO) {
    return this.authService.login(dto)
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() body: { userId: string; refreshToken: string }) {
    return this.authService.refresh(body.userId, body.refreshToken)
  }

  @Post('logout')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: any,
    @Body() body: { refreshToken: string }
  ) {
    await this.authService.logout(req.user.id, body.refreshToken)
    return { message: 'Muvaffaqiyatli chiqildi' }
  }

  @Post('me')
  @UseGuards(JwtGuard)
  async me(@Req() req: any) {
    return req.user
  }
}