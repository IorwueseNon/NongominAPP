import {Injectable,UnauthorizedException} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from "bcryptjs"
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { Enable2FaType, PayloadType } from './dto/payload.type';
import * as speakeasy from "speakeasy"
import { User } from 'src/users/users.entity';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService:JwtService,private artistService:ArtistsService,private configService:ConfigService) {}
    
    async login(loginDTO: LoginDTO): Promise<{accesstoken:string}|{
        validate2FA: string;
        message:string
     }> {
    const user = await this.userService.findOne(loginDTO); // 1.
    const passwordMatched = await bcrypt.compare(
    loginDTO.password,
    user.password
    ); // 2.
    if (passwordMatched) {
    // 3.
    delete user.password; // 4.
    const payload:PayloadType ={email:user.email,userId:user.id}
    const artist = await this.artistService.findArtist(user.id); // 2
    if (artist) {
        // 3
        payload.artistId = artist.id;
        }
    if(user.enable2Fa && user.twoFaSecret)
       return{
          validate2FA:"http://localhost:3000/auth/validate-2fa",
          message:"please send the one time token from google anthentification app"
       }

    return {
        accesstoken:this.jwtService.sign(payload)
    };
    } else {
    throw new UnauthorizedException("Password does not match"); // 5.
    }
    }

    async enable2Fa(userId:number):Promise<Enable2FaType>{
          const user = await this.userService.findOneById(userId)
          if(user.enable2Fa){
            return { secret: user.twoFaSecret}
          }
          const secret = speakeasy.generateSecret()
          user.twoFaSecret = secret.base32
          user.enable2Fa = true
          console.log(secret)
          this.userService.updateSecretKey(user.id,user.twoFaSecret)
          return{secret:user.twoFaSecret}
    }
    async validate2FaToken(userId:number,token:string):Promise<{verified:boolean}>{
     const user = await this.userService.findOneById(userId)
     const verified = speakeasy.totp.verify({
        secret: user.twoFaSecret,
        token:token,
        encoding:'base32',
     })
     if(verified){
        return {verified:true}
     }else{
        return{verified:false}
     }
    }
    async validateUserByApiKey(apiKey:string){
      const user = await this.userService.findByApiKey(apiKey)
      return user
    }

    test(){
      console.log(this.configService)
      return{
         port:this.configService.get<number>("port")
      }
    }
}
