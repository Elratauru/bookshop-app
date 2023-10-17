import { Inject, Injectable } from '@nestjs/common';
import { Book } from '../utilities/types/Book.js';

@Injectable()
export class BookmarkService {
    constructor(@Inject('DATABASE_CONNECTION') private db) { }

    // List all bookmarks for all users, non-paginated.
    async listBookmarks(): Promise<Book[]> {
        return this.db.data.users.flatMap(
            user => user.bookmarks
        );
    }

    // In a real production environment, the db call should be done
    // against a single id instead of loading all users.
    async listUserBookmarks(userId: string): Promise<Book[]> {
        let foundUser = this.db.data.users.find(
            user => user.uuid == userId
        );

        return foundUser.bookmarks;
    }

    async saveBookmark(userId: string, bookId: number): Promise<boolean> {
        const foundUser = this.db.data.users.findIndex(user => user.uuid == userId);

        if(foundUser !== -1){
            let bookmark = this.db.data.users[foundUser].bookmarks.findIndex(book => book.id == bookId);
            if(bookmark === -1) this.db.data.users[foundUser].bookmarks.push({id: bookId});

            await this.db.write();
            return true;
        }

        return false;
    }

    async removeBookmark(userId: string, bookId: number): Promise<boolean> {
        const foundUser =  this.db.data.users.findIndex(user => user.uuid == userId);

        if(foundUser !== -1){
            let bookmark =  this.db.data.users[foundUser].bookmarks.findIndex(bookmark => bookmark.id == bookId);

            if(bookmark !== -1) {
                this.db.data.users[foundUser].bookmarks.splice(bookmark, 1);
                await this.db.write();
                return true;
            }
        }

        return false;
    }
}
