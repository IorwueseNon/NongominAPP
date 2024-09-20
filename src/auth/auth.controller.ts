import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { Enable2FaType } from './dto/payload.type';
import { ValidateTokenDto } from './dto/validate-token.dto';


@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService, private authService:AuthService) {}
  @Post('signUp')
  signUp(
    @Body()
    userDTO: CreateUserDTO,
  ): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Post("login")
  login( 
    @Body() 
    loginDTO:LoginDTO){
        return this.authService.login(loginDTO)
  }

  @Get('enable-2fa')
  @UseGuards(JwtAuthGuard)
  async enable2Fa( @Request() req): Promise<Enable2FaType>{
      console.log(req.user)
      return await this.authService.enable2Fa(req.user.userId)
  }
  @Post("validate-2fa")
    @UseGuards(JwtAuthGuard)
    validate2Fa(@Request() req, @Body() validateTokenDto:ValidateTokenDto):Promise<{verified:boolean}>{
    return this.authService.validate2FaToken( req.user.userId,validateTokenDto.token)
    }

}
