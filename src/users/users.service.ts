import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (userEmail && createUserDto.email === userEmail.email) {
      throw new BadRequestException('This Email is already registered!');
    }

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    });
    if (!newUser) {
      throw new Error('User not created');
    } else {
      const saveUser = await this.userRepository.save(newUser);
      return saveUser;
    }
  }


  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(userId: string): Promise<User> {
    const user = this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(userId: string): Promise<void> {
    const removeUser = await this.userRepository.findOne({ where: { userId} });
    if (!removeUser) {
      throw new NotFoundException('id notFound');
    } else {
      this.userRepository.remove(removeUser);
    }
  }
}
