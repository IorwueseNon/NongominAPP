import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from './users.entity';
import { LoginDTO } from 'src/auth/dto/login.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(userDTO: CreateUserDTO): Promise<User>;
    findOne(data: LoginDTO): Promise<User>;
    findOneById(id: number): Promise<User>;
    updateSecretKey(id: number, secret: string): Promise<UpdateResult>;
}
