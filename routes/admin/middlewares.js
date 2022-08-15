import { validationResult } from 'express-validator';

const middleware = {
    handleErrors(templateFunc) {
        return (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.send(templateFunc({ errors }));
            }

            next();
        };
    }
};

export default middleware;