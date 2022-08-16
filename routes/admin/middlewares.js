import { validationResult } from 'express-validator';

const middleware = {
    handleErrors(templateFunc, dataCallback) {
        return async (req, res, next) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {

                let data;

                // capture product data
                if (dataCallback) {
                    data = await dataCallback(req);
                }

                // send product data to html template containing errors and product data
                return res.send(templateFunc({ errors, ...data }));
            }

            next();
        };
    },
    requireAuth(req, res, next) {
        if (!req.session.userId) {
            return res.redirect('/signin');
        }

        next();
    }
};

export default middleware;