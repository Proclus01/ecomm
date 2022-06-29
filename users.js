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
            fs.writeFileSync(this.filename, '[]'); // Same for writeFileSync
        }
        
    }
}