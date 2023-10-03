import { Injectable } from '@nestjs/common';
import { Database } from '../db/db.js';
import { Book } from '../utilities/types/Book.js';

@Injectable()
export class BookmarkService {
    dbInstance = new Database();
    db = this.dbInstance.db;

    // Method runs a filter through all the found information.
    // In a real production environment, the db call should be done against a single id instead.
    async listBookmarks(userId: string): Promise<Book[]> {
        await this.db.read();
        const { users } = this.dbInstance.db.data;

        let filteredUser = users.filter(
            user => user.uuid == userId
        );

        return filteredUser[0].bookmarks;
    }

    async saveBookmark(userId: string, bookId: number): Promise<boolean> {
        await this.db.read();

        const { users } = this.dbInstance.db.data;
        const foundUser = users.findIndex(user => user.uuid == userId);

        if(foundUser !== -1){
            let bookmark = users[foundUser].bookmarks.findIndex(book => book.id == bookId);
            if(bookmark === -1) users[foundUser].bookmarks.push({id: bookId});

            await this.db.write();
            return true;
        }

        return false;
    }

    async removeBookmark(userId: string, bookId: number): Promise<boolean> {
        await this.db.read();

        const { users } = this.dbInstance.db.data;
        const foundUser = users.findIndex(user => user.uuid == userId);

        if(foundUser !== -1){
            let bookmark = users[foundUser].bookmarks.findIndex(bookmark => bookmark.id == bookId);

            if(bookmark !== -1) {
                users[foundUser].bookmarks.splice(bookmark, 1);
                await this.db.write();
                return true;
            }
        }

        return false;
    }
}
