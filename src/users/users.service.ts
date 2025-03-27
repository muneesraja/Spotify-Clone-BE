import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({
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
      const user = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      // Save the user to the database
      const savedUser = await this.usersRepository.save(user);
      
      // Return user without password
      const { password, ...result } = savedUser;
      return result;
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
} 