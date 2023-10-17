import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service.js';
import { UserController } from '../controllers/user.controller.js'
import { BookmarkService } from '../services/bookmark.service.js';
import { DatabaseModule } from './db.module.js';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, BookmarkService],
})
export class AppModule {}
