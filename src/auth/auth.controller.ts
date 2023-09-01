import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/register')
  register(@Body(new ValidationPipe()) registerDto: RegisterDto): Promise<RegisterDto> {
    return this.authService.signUp(registerDto);
  }
  @Post('/login')
  login(@Body(new ValidationPipe()) loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.signIn(loginDto);
  }
}
