//jshint esversion:11
import fs from 'fs';
import crypto from 'crypto';
import util from 'util';
import Repository from './repository.js';

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
    // Take the password, join it to the salt, and check the output against what's in the datastore
    async comparePasswords(saved, supplied) {
        // Saved = password saved in our database in the format of 'hashed.salt'
        // Supplied = password given to us by a user trying to sign in

        // split the hash and the salt on the period character
        const [ hashed, salt] = saved.split('.');

        const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

        // Compare the hashed password to the supplied hashed password
        return hashed === hashedSuppliedBuf.toString('hex');
    }

    // the create function will take some attributes that a user should have
    // and that record will be taken and stored inside of our data file
    async create(attrs) {
        // take email and password information and write it to users.json file

        // Create a random ID with 4 bytes in hexadecimal
        attrs.id = this.randomId();

        // generate a salt
        const salt = crypto.randomBytes(8).toString('hex');

        // Take the password, salt, set key length to 64
        const buf = await scrypt(attrs.password, salt, 64);

        // capture and store data
        const records = await this.getAll();

        // store in the hex-based hashed password and append the salt as well with a . in between
        const record = {
            ...attrs,
            password: `${buf.toString('hex')}.${salt}`
        };

        // push the encrypted data into the datastore
        records.push(record);

        // write the updated 'records' array back to users.json
        await this.writeAll(records);

        return attrs;
    }
}

// Export only the instance of this class and not the class itself
// This lets us keep only ONE copy of the users repo
export default new UsersRepository('users.json');
// This lets us do something like const repo = require('./users');
// and then we can call methods from the class instance