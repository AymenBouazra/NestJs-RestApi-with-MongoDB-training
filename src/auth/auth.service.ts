import { BadRequestException, Injectable } from '@nestjs/common';
import { Auth } from './schemas/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly userModel: Model<Auth>,
    private readonly jwtService: JwtService,
  ) { }
  async signUp(registerDto: RegisterDto) {
    const { firstName, lastName, password, email } = registerDto;
    const hash = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      firstName,
      lastName,
      email,
      password: hash,
    });
    return user;
  }

  async signIn(loginDto: LoginDto) {
    const { password, email } = loginDto;
    const user = await this.userModel.findOne({ email: email });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password)
      if (validPassword) {
        const token = await this.jwtService.sign({ id: user._id });
        return { token };
      }
      else {
        throw new BadRequestException('Email or password incorrect');
      }
    } else {
      throw new BadRequestException('Email or password incorrect');
    }
  }
}
