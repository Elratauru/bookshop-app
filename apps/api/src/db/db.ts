import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import { Data } from 'src/utilities/types/Data.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = join(__dirname, 'db.json')
const adapter = new JSONFile<Data>(file);
const defaultData: Data = { users: [] };

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<Low<Data>> => {
            try {
                return new Low<Data>(adapter, defaultData);
            } catch (error) {
                throw error;
            }
        }
    }
]