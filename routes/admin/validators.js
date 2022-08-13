import { check } from "express-validator";
import usersRepo from "../../repositories/users.js";

const validatorChain = {
  requireTitle: check('title')
    .trim()
    .isLength({ min: 5, max: 40 }),

  requirePrice: check('price')
    .trim()
    .toFloat()
    .isFloat({ min: 1 }), // converts even erroneous values (char) to a float anyways (to 1)

  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email) => {
      // custom validator
      const existingUser = await usersRepo.getOneBy({ email });

      if (existingUser) {
        throw new Error("Email in use");
      }
    }),

  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters long"),
    
  requirePasswordConfirmation: check('passwordConfirmation')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters long")
    .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error("Passwords must match");
      } else {
        return true; // otherwise we get 'Invalid value' when passwords match
      }
    }), 

    requireEmailExists: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must provide a valid email')
        .custom( async (email) => {
            const user = await usersRepo.getOneBy({ email });

            if (!user) {
                throw new Error('Email not found!');
            }
        }),

    requireValidPasswordForUser: check('password')
        .trim()
        .custom( async (password, { req }) => {
            const user = await usersRepo.getOneBy({ email: req.body.email });

            if (!user) {
                throw new Error('Invalid password!');
            }

            const validPassword = await usersRepo.comparePasswords(
                user.password,
                password
            );
        
            if (!validPassword) {
                throw new Error('Invalid password');
            }
        })
};

export default validatorChain;
