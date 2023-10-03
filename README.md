# Bookshop App

This app is an example of an Application that pulls information externally and implements it's own wrapper on top of it to extend the features available on the original service.

It uses [Gutendex](https://github.com/garethbjohnson/gutendex) as it's main data source.

The application lets you browse through a Books list and bookmark individual books, based on user preference. The information is then later stored server-side for further usage.

## Repository and Instalation.

The repository is built with Turborepo as a Monorepo. To start, install the dependencies by running `npm install` at the project root.

Then, you can run `npm run dev` to simultaneously run both services. The API will run on `localhost:4000` while the UI uses `localhost:3000`.

To build, the command `npm run build` is also available at project root. It's important to note that you can also run each service separatedly by traversing to their own folder inside `/apps`.

## Services available

### UI

The UI is built on top of Next.js, using Material UI and React-Query for pulling dynamic information.

The main purpose, is to be able to pull the external information and sync up with the API Service, sending only the required information that's required to be stored. It also handles the pagination and events, along a simple implementation of the NextJS new App Router for different pages.

User Information is stored on localstorage, and sent at the same time over to the API Service for server-side storage. 

#### Available Pages

- `/` - The homepage. It lets you browse through Gutendex API and pages, and if the user is logged, it will let it add Books to their Bookmarks.
- `/createUser` - A Page that communicates with the API to create an user based off a name. The user will be stored locally through a hash that you can see on the top and will be sync up with data from the server afterwards.

### API

The API uses NestJS along with lowdb to handle the backs and forths of data. 

#### Available Endpoints

- `/users, POST` - Create a new User. For this, the payload must contain a name.
- `/users, GET` - Get all users available.
- `/users/:id, GET` - Get a single user based on it's uuid.
- `/users/:id/bookmarks, GET` - Get all bookmarks for an user.
- `/users/:id/bookmarks, POST` - Add a new bookmark for an user.
- `/users/:id/bookmarks/:bookId, DELETE` - Delete a bookmark for an user based on it's book id.

On `test/Bookshop.postman_collection.json` you can find a collection with examples on these endpoints for testing single endpoints. It's worth noting that the UI already hits all of them based on the different actions.

## Notes

Be aware that the API doesn't has any kind of authentication or validation against it's local storage, meaning that if data is removed from the lowdb json database, it can be off-sync with the frontend UI.

Also, each time the Application is built, either through a `npm run dev` command or by doing a build, the lowdb json database is replaced with a initial copy from `src\db\db.json` in `dist\db\db.json`

This means that users are stored only for the time the API is running and overwriten afterwards. To avoid unsync information, clear out the localStorage by either hitting logout on the UI or by manually removing the keys stored by the aplication.

This limitation could be avoided by storing the database somewhere else (as in, not in the dist/src folder) or by implementing a more robust database service. Lowdb has been implemented as to have something to work with and it's sure no replace for a full-fledged database system.

## Author

Made by [Alfonso Carvallo](https://github.com/Elratauru), 2023.
