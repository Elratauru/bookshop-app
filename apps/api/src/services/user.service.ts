import { Injectable } from '@nestjs/common';
import { Database } from '../db/db.js';
import { User } from '../utilities/types/User.js';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
    dbInstance = new Database();
    db = this.dbInstance.db;

    async listUsers(): Promise<User[]> {
        await this.db.read();
        const { users } = this.dbInstance.db.data;    
        return users;
    }

    // Method runs a filter through all the found information.
    // In a real production environment, the db call should be done against a single id instead.
    async getUser(userUUID: string): Promise<User> {
        await this.db.read();
        const { users } = this.dbInstance.db.data;
        let filteredUsers = users.filter(
            user => user.uuid == userUUID
        );

        return filteredUsers[0];
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
