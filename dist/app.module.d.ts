import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { DataSource } from 'typeorm';
export declare class AppModule implements NestModule {
    private datasource;
    constructor(datasource: DataSource);
    configure(consumer: MiddlewareConsumer): void;
}
