import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConstants } from "./auth.constants";
import { PayloadType } from "./dto/payload.type";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
     constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpirationDate:false,
            secretOrKey:authConstants.secret
        })
     }
     async validate(payload:PayloadType){
         return{userId:payload.userId, email:payload.email,artistId:payload.artistId}
     }

     
}