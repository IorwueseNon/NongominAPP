import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";
import { AuthService } from "./auth.service";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }
    async validate(apiKey: string) {
    try {
        const user = await this.authService.validateUserByApiKey(apiKey);
        if (!user) {
            throw new UnauthorizedException();
            } else {
            return user;
            }
    } catch (error) {
        console.log(`this here is api : ${error}`)
    }
    
    
   
    }
    }