import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artists.entity';
import { Repository } from 'typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Artist])],
  providers: [ArtistsService],
  exports:[ArtistsService]
})
export class ArtistsModule {  constructor(
    @InjectRepository(Artist)
    private artistRepo: Repository<Artist>
    ) {}
    findArtist(userId: number): Promise<Artist> {
    return this.artistRepo.findOneBy({ user: { id: userId } });
    }
}
