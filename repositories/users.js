import fs from 'fs';

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
        
    }
}

// Make a users.json file with an empty array inside of it
const repo = new UsersRepository('users.json');