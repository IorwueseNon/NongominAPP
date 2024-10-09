import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongsDto } from './dto/create-songs-dto';
import { Song } from './songs.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from 'src/auth/artist-jwt-guard';

@Controller('songs')
export class SongsController {
  constructor(@Inject('food') private readonly songsService: SongsService) {}
  @Post('')
  @UseGuards(ArtistJwtGuard)
  async create(@Body() createSongsDto: CreateSongsDto,
               @Request() req): Promise<Song> {
    console.log(`${req.user}`)
    return await this.songsService.create(createSongsDto);
  }
  @Get('')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({
      page,
      limit,
    });
  }
  @Get('together')
  async together(): Promise<Song[]> {
    return await this.songsService.findAll();
  }
  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.FORBIDDEN }),
    )
    id: number,
  ): Promise<Song> {
    return await this.songsService.findOne(id);
  }
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<UpdateResult> {
    return await this.songsService.update(id, updateSongDto);
  
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songsService.remove(id);
  }
}
