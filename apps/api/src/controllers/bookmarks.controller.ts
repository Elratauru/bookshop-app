import { Controller, Get } from '@nestjs/common';
import { BookmarkService } from '../services/bookmark.service.js';
import { Book } from 'src/utilities/types/Book.js';

@Controller('bookmarks')
export class UserController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get('/bookmarks')
  async listBookmarks(): Promise<Book[]> {
    return this.bookmarkService.listBookmarks();
  }
}
