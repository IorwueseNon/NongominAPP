import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { Enable2FaType } from './dto/payload.type';
export declare class AuthService {
    private userService;
    private jwtService;
    private artistService;
    constructor(userService: UsersService, jwtService: JwtService, artistService: ArtistsService);
    login(loginDTO: LoginDTO): Promise<{
        accesstoken: string;
    }>;
    enable2Fa(userId: number): Promise<Enable2FaType>;
    validate2FaToken(userId: number, token: string): Promise<{
        verified: boolean;
    }>;
}
