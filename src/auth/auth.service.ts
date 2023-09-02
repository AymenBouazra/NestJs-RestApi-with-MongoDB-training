import { BadRequestException, Injectable } from '@nestjs/common';
import { Auth } from './schemas/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { createTransport } from 'nodemailer'
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
        const transporter = createTransport({
          service: "gmail",
          auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
          }
        });
        await transporter.sendMail({
          from: '"Aymen Boauzra" <aymenbouazra994@gmail.com>', // sender address
          to: "aymenbouazra994@gmail.com", // list of receivers
          subject: "Hello ✔", // Subject line
          html: "<b>Hello world:</b>", // html body
        });
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
