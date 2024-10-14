import { Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';
import { ArtistsModule } from 'src/artists/artists.module';
import { UsersService } from 'src/users/users.service';
import { ApiKeyStrategy } from './apikey.strategy';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [UsersModule, JwtModule.registerAsync({imports:[JwtModule],
                                                  useFactory:async(configservice:ConfigService)=>({
                                                  secret:configservice.get<string>('secret'),
                                                  signOptions:{expiresIn:"1d"},
                                                  }),
                                                inject:[ConfigService]}), ArtistsModule],
                                                  
  providers: [AuthService,JwtStrategy,ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {
  
}
