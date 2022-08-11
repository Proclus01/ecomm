import { check } from "express-validator";
import usersRepo from "../../repositories/users.js";

const validatorChain = {
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
        return true;
      }
    })
};

export default validatorChain;
