import { Module } from '@nestjs/common';
import { databaseProviders } from './../db/db.js';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders]
})
export class DatabaseModule { }