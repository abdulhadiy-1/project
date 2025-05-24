import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthRole } from '../auth/enum/auth-role.enum';
import { AuthModel } from './auth.model';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel) private readonly authRepo: typeof AuthModel,
    private readonly jwtService: JwtService,
  ) {}

 
  private generateToken(user: AuthModel) {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  
  async register(dto: RegisterAuthDto) {
    const candidate = await this.authRepo.findOne({ where: { email: dto.email } });
    if (candidate) {
      throw new BadRequestException('Ushbu email allaqachon mavjud');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

 const user = await this.authRepo.create({
  email: dto.email,
  password: hashed,
  role: dto.role,
} as any);

console.log(user);

    return {
      token: this.generateToken(user),
      user: {
        email: user.dataValues.email,
        password: user.dataValues.password
      },
    };
  }


  async login(dto: LoginAuthDto) {
    console.log(dto);
    
    const user = await this.authRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new NotFoundException('Bunday foydalanuvchi topilmadi');
    }

    const isMatch = await bcrypt.compare(dto.password, user.dataValues.password);
    if (!isMatch) {
      throw new BadRequestException('Parol noto`g`ri');
    }

    return {
      token: this.generateToken(user.dataValues),
      user: {
        id: user.dataValues.id,
        email: user.dataValues.email,
        role: user.dataValues.role,
      },
    };
  }

  
  async createAdmin(dto: RegisterAuthDto) {
    const candidate = await this.authRepo.findOne({ where: { email: dto.email } });
    if (candidate) {
      throw new BadRequestException('Bunday email allaqachon mavjud');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const admin = await this.authRepo.create();

    return {
      message: 'Admin muvaffaqiyatli yaratildi',
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    };
  }


  async deleteAdmin(id: number) {
    const admin = await this.authRepo.findByPk(id);
    if (!admin) {
      throw new NotFoundException('Admin topilmadi');
    }

    if (admin.role !== AuthRole.ADMIN) {
      throw new BadRequestException('Bu foydalanuvchi admin emas');
    }

    await this.authRepo.destroy({ where: { id } });

    return { message: 'Admin muvaffaqiyatli o`chirildi' };
  }
}
