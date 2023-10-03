export interface PostUser {
    name: string
}

export interface PostBookmark {
    id: number;
}

export interface DeleteBoomarkRequest {
    id: string;
    bookId: number;
}