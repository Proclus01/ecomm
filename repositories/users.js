//jshint esversion:11
import fs from 'fs';

// ******************************************************************************** //
//                                                                                  //           
//          APP DESCR:                                                              //
//          The purpose of 'users.js' is to create a data store                     //
//          and use it as a database to store user data.                            //
//          The data store supports all CRUD operations + some SQL analogues        //
//                                                                                  //
// ******************************************************************************** //

class UsersRepository {
    constructor(filename) {
        // 
        if (!filename) {
            throw new Error('Creating a repository requires a filename');
        }

        // Store input as an instance variable
        this.filename = filename; 

        // Check to see if the file exists
        // and make a new file if it doesn't
        try {
            // Use accessSync in constructor since async doesn't work here
            fs.accessSync(this.filename);
        } catch (err) {
            // Add empty array to new file
            fs.writeFileSync(this.filename, '[]'); // Same for writeFileSync
        }
    } // end constructor

    // getAll is a READ function for our data store
    async getAll() { 
        // Open the users repository, get every user, return JSON object of data
        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
    }

    // the create function will take some attributes that a user should have
    // and that record will be taken and stored inside of our data file
    async create(attrs) {
        // take email and password information and write it to users.json file

        // capture and store data
        const records = await this.getAll();
        records.push(attrs);

        // write the updated 'records' array back to users.json
        await fs.promises.writeFile(this.filename, JSON.stringify(records));
    }
}

const test = async () => {
    const repo = new UsersRepository('users.json');

    await repo.create({email: 'test@test.com', password: 'password'});

    const users = await repo.getAll();

    console.log(users);
};

// Make a users.json file with an empty array inside of it
const repo = new UsersRepository('users.json');

test();