import { Inject, Injectable } from '@nestjs/common';
import { User } from '../utilities/types/User.js';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(@Inject('DATABASE_CONNECTION') private db) { }

    async listUsers(): Promise<User[]> {  
        console.log(this.db);
        return this.db.data.users;
    }

    // Method runs a filter through all the found information.
    // In a real production environment, the db call should be done against a single id instead.
    async getUser(userUUID: string): Promise<User> {
        return this.db.data.users.find(
            user => user.uuid == userUUID
        );
    }

    // Create a single user based on the name, the generated UUID will act as a primary key.
    async createUser(name: string): Promise<User> {
        let newUserUUID = v4();
        let newUser:User = {
            uuid: newUserUUID,
            name,
            bookmarks: []
        };

        this.db.data.users.push(newUser);
        await this.db.write();
        return newUser;
    }
}
