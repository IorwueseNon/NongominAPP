import { Injectable } from '@nestjs/common';
import { seedData } from 'db/seed/data-seed';
import { DataSource } from 'typeorm';

@Injectable()
export class SeedService {
    constructor(private connection:DataSource){}

    async seed(){
       const queryRunner = this.connection.createQueryRunner()
       queryRunner.connect()
       queryRunner.startTransaction()
       try{
        const manager = queryRunner.manager
         await seedData(manager)
         await queryRunner.commitTransaction()
       }catch(e){
           console.log("error during database seeding",e)
           await queryRunner.rollbackTransaction()
       }finally{
           await queryRunner.release()
       }
    }
    
}
