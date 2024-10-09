import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './songs.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSongsDto } from './dto/create-songs-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Artist } from '../artists/artists.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}
  
  async create(songDTO: CreateSongsDto): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releaseDate = songDTO.releaseDate;

    //find all artist on the database
    const artists = await this.artistRepository.findBy(song.artists);
    //set relation with artist and song
    song.artists = artists;
    return await this.songRepository.save(song);
  }
  async findAll(): Promise<Song[]> {
    return this.songRepository.find();
  }
  async findOne(id: number): Promise<Song> {
    return await this.songRepository.findOneBy({ id });
  }
  async remove(id: number): Promise<DeleteResult>{
    return await this.songRepository.delete({ id });
  }
  async update(
    id: number,
    recordToUpdate: UpdateSongDto,
  ): Promise<UpdateResult> {
    return await this.songRepository.update(id, recordToUpdate);
  }
  async paginate(option: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releaseDate', 'DESC');
    return paginate<Song>(queryBuilder, option);
  }
}
