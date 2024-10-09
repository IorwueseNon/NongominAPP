import { EntityManager } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { User } from "src/users/users.entity";
import { faker } from "@faker-js/faker";
import {v4 as uuid4} from "uuid"
import { Artist } from "src/artists/artists.entity";
import { Playlist } from "src/playlists/playlists.entity";

export  const seedData =async (manager:EntityManager):Promise<void>=>{
  await seedUser()
  await seedArtist()
  await seedPlayList()

  async function seedUser(){
     const salt = await bcrypt.genSalt()
     const encryptPassword = await  bcrypt.hash("1234",salt)

     const user = new User()
     user.firstName = faker.person.firstName()
     user.lastName = faker.person.lastName()
     user.email = faker.internet.email()
     user.password = encryptPassword
     user.apikey  = uuid4()
     user.phone = faker.phone.number()

     await manager.getRepository(User).save(user)
  }

  async function seedArtist(){
    const salt = await bcrypt.genSalt()
    const encryptPassword = await  bcrypt.hash("1234",salt)

    const user = new User()
    user.firstName = faker.person.firstName()
    user.lastName = faker.person.lastName()
    user.email = faker.internet.email()
    user.password = encryptPassword
    user.apikey  = uuid4()
    user.phone = faker.phone.number()
    
    const artist = new Artist()
    artist.user = user 
    await manager.getRepository(User).save(user)
    await manager.getRepository(Artist).save(artist)

  }
  async function seedPlayList() {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash("123456", salt);
    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apikey = uuid4();
    user.phone = faker.phone.number()
    const playList = new Playlist();
    playList.name = faker.music.genre();
    playList.user = user;
    await manager.getRepository(User).save(user);
    await manager.getRepository(Playlist).save(playList);
    }
    
   
}