import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Playlist } from '../playlists/playlists.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique:true}) 
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({nullable:false, type:'text',default:""})
  twoFaSecret:string

  @Column({default:false , type:'boolean'})
  enable2Fa:boolean

  @Column()
  apikey:string

  @Column()
  phone:string

  @OneToMany(() => Playlist, (playList) => playList.songs)
  playList: Playlist[];

}
