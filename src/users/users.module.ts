import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from 'src/songs/songs.entity';
import { User } from './users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Song])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
