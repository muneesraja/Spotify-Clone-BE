import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        }, 
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
    };

    const mockUser = {
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (repository.create as jest.Mock).mockReturnValue(mockUser);
    (repository.save as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.create(createUserDto);
    expect(result).toEqual({
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
      isActive: true,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should throw ConflictException if user already exists', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
    };

    (repository.findOne as jest.Mock).mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(service.create(createUserDto)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw BadRequestException if user creation fails', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
    };

    (repository.create as jest.Mock).mockReturnValue(createUserDto);
    (repository.save as jest.Mock).mockRejectedValue(new Error('Failed to save'));

    await expect(service.create(createUserDto)).rejects.toThrow(BadRequestException);
  });
});
