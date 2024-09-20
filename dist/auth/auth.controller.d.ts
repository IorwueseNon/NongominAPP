import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Enable2FaType } from './dto/payload.type';
import { ValidateTokenDto } from './dto/validate-token.dto';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    signUp(userDTO: CreateUserDTO): Promise<User>;
    login(loginDTO: LoginDTO): Promise<{
        accesstoken: string;
    }>;
    enable2Fa(req: any): Promise<Enable2FaType>;
    validate2Fa(req: any, validateTokenDto: ValidateTokenDto): Promise<{
        verified: boolean;
    }>;
}
