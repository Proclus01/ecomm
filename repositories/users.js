//jshint esversion:11
import fs from 'fs';
import crypto from 'crypto';

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

        // Create a random ID with 4 bytes in hexadecimal
        attrs.id = this.randomId();

        // capture and store data
        const records = await this.getAll();
        records.push(attrs);

        // write the updated 'records' array back to users.json
        await this.writeAll(records);
    }

    // writeAll is a helper function for writing all user information to the repository
    async writeAll(records) {
        // stringify params: input = records; evaluation function = null; indentation = 2
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }

    // creates a random user ID using an RNG algo
    randomId() {
        return crypto.randomBytes(4).toString('hex');
    }

    // find one record by ID
    async getOne(id) {
        const records = await this.getAll();

        return records.find(record => record.id === id);
    }

    // delete one by ID
    async delete(id) {
        // get all our records
        const records = await this.getAll();

        // create a new array without the ID
        const filteredRecords = records.filter(record =>  record.id !== id);

        // rewrite to our data store
        await this.writeAll(filteredRecords);
    }

    // update one record by ID and attributes
    async update (id, attrs) {
        const records = await this.getAll();

        const record = records.find(record => record.id === id);

        if (!record) {
            throw new Error(`Record with id ${id} not found.`);
        }

        // take all the properties of attrs and assign it to the copy of record
        // e.g.:
        // record == {email: 'test@test.com'};
        // attrs = {password: 'mypassword'};
        Object.assign(record, attrs);
        // record === {email: 'test@test.com', password: 'mypassword'};
        await this.writeAll(records);
    }
}

const test = async () => {
    const repo = new UsersRepository('./repositories/users.json');

    await repo.create({email: 'test@test.com'});
};

// Make a users.json file with an empty array inside of it
const repo = new UsersRepository('./repositories/users.json');

test();