import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../services/user.service.js'
import { BookmarkService } from '../services/bookmark.service.js';
import { DeleteBoomarkRequest, PostBookmark, PostUser } from 'src/utilities/types/Request.js';
import { Book } from 'src/utilities/types/Book.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly bookmarkService: BookmarkService) {}

  @Post()
  async postUser(@Body() body: PostUser): Promise<string> {
    return JSON.stringify(await this.userService.createUser(body.name));
  }

  @Get()
  async listUsers(): Promise<string> {
    return JSON.stringify(await this.userService.listUsers());
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<string> {
    return JSON.stringify(await this.userService.getUser(id));
  }

  @Get(':id/bookmarks')
  async getBookmarks(@Param('id') id: string): Promise<string> {
    return JSON.stringify(await this.bookmarkService.listBookmarks(id));
  }

  @Post(':id/bookmarks')
  async saveBookmark(@Param('id') id: string, @Body() body: PostBookmark): Promise<string> {
    await this.bookmarkService.saveBookmark(id, body.id);
    return JSON.stringify(await this.userService.getUser(id));
  }

  @Delete(':id/bookmarks/:bookId')
  async deleteBookmark(@Param() params: DeleteBoomarkRequest): Promise<string> {
    await this.bookmarkService.removeBookmark(params.id, params.bookId);
    return JSON.stringify(await this.userService.getUser(params.id));
  }
}
