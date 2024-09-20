import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // 1.
  ) {}
  async create(userDTO: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt(); // 2.
    userDTO.password = await bcrypt.hash(userDTO.password, salt); // 3.
    const user = await this.userRepository.save(userDTO); // 4.
    delete user.password; // 5.
    return user; // 6.
  }
  async findOne(data: LoginDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
    throw new UnauthorizedException('Could not find user');
    }
    return user;
    }
  async findOneById(id:number):Promise<User>{
     const user = await this.userRepository.findOneBy({id:id})
     if(!user){
       throw new UnauthorizedException("could not find user")
     }
     return user
  }
  async updateSecretKey(id:number,secret:string):Promise<UpdateResult>{
      const user = await this.userRepository.update({id:id},{twoFaSecret:secret,enable2Fa:true})
      return user
  }
    
}
