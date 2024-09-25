import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from 'src/auth/dto/login.dto';
import {v4 as uuid4} from "uuid"


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // 1.
  ) {}
  async create(userDTO: CreateUserDTO): Promise<User> {
    const user = new User()
    user.firstName = userDTO.firstName
    user.lastName = userDTO.lastName
    user.email = userDTO.email
    user.apikey= uuid4()
    const salt = await bcrypt.genSalt(); // 2.
    userDTO.password = await bcrypt.hash(userDTO.password, salt); // 3.
    user.password = userDTO.password
    const savedUser = await this.userRepository.save(user); // 4.
    delete savedUser.password; // 5.
    return savedUser; // 6.
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
  async disable2Fa(userId:number){
    return this.userRepository.update({id:userId},{enable2Fa:false,twoFaSecret:""})
}
async findByApiKey(apikey: string): Promise<User> {
  try {
    return this.userRepository.findOneBy({apikey});
  } catch (error) {
    console.log(`this is in user services:${error}`)
  }
  
  }
}