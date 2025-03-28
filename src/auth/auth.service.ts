import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// DTOs
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
// Entities
import { User } from './entities/user.entity';
// TypeORM
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
// We need to implement JWT to while creating the user similar to login
  async create(createUserDto: CreateUserDto): Promise<{ user: Omit<User, 'password'>, access_token: string }> {
    // Check if user already exists
    const existingUser = await this.authRepository.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with this email or username already exists',
      );
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // Create new user
      const user = this.authRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      // Save the user to the database
      const savedUser = await this.authRepository.save(user);
      
      // Return user without password
      const { password, ...result } = savedUser;

      const payload = {
        sub: result.id,
        email: result.email,
        username: result.username,
      };
      return { user: result, access_token: this.jwtService.sign(payload) };
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.authRepository.findOne({ where: { email } });
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const { password: _, ...result } = user;
    return result;
  }
} 