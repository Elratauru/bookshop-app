import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service.js'
import { BookmarkService } from '../services/bookmark.service.js';
import { DeleteBoomarkRequest, PostBookmark, PostUser } from 'src/utilities/types/Request.js';
import { User } from 'src/utilities/types/User.js';
import { Book } from 'src/utilities/types/Book.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly bookmarkService: BookmarkService) {}

  @Post()
  async postUser(@Body() body: PostUser): Promise<User> {
    return this.userService.createUser(body.name);
  }

  @Get()
  async listUsers(): Promise<User[]> {
    return this.userService.listUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Get(':id/bookmarks')
  async getBookmarks(@Param('id') id: string): Promise<Book[]> {
    return this.bookmarkService.listUserBookmarks(id);
  }

  @Post(':id/bookmarks')
  async saveBookmark(@Param('id') id: string, @Body() body: PostBookmark): Promise<User> {
    await this.bookmarkService.saveBookmark(id, body.id);
    return this.userService.getUser(id);
  }

  @Delete(':id/bookmarks/:bookId')
  async deleteBookmark(@Param() params: DeleteBoomarkRequest): Promise<User> {
    await this.bookmarkService.removeBookmark(params.id, params.bookId);
    return this.userService.getUser(params.id);
  }
}
