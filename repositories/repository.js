//jshint esversion:11
import fs from 'fs';
import crypto from 'crypto';
import util from 'util';

const scrypt = util.promisify(crypto.scrypt);

class Repository {
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

    async create(attrs) {

        attrs.id = this.randomId();

        const records = await this.getAll();

        records.push(attrs);

        await this.writeAll(records);

        return attrs;
    }

    // getAll is a READ function for our data store
    async getAll() { 
        // Open the users repository, get every user, return JSON object of data
        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
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
        Object.assign(record, attrs);

        // rewrite to our data store
        await this.writeAll(records);
    }

    // getOneBy accepts a "filters object" {id: 123, email: 'foo@bar.com'} 
    // containing what you want to filter for
    // and then getOneBy returns the result of the search based on the filter
    async getOneBy(filters) {
        //
        const records = await this.getAll();

        // iterate over records and if they are not the same then update found to FALSE
        for (let record of records) { // for ... of iterates through array
            // temporary variable
            let found = true;

            // first iterate over all the key-value pairs of the filters object
            for (let key in filters) { // for ... in iterates through object
                // if there are no matches, set found to false
                if (record[key] !== filters[key]) {
                    found = false;
                }
            }

            if (found) {
                return record;
            }
        }
    }
}

export default Repository;