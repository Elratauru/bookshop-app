import { Book } from "./Book.js";

export interface User {
    uuid: string;
    name: string;
    bookmarks: Book[];
}