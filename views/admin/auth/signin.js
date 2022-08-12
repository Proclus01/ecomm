import layout from '../layout.js';

const getError = (errors, prop) => {
    // prop === 'email' || 'password' || 'password_confirmation'
    try {
        return errors.mapped()[prop].msg;
    } catch (err) {
        return '';
    }
};

const signin = ( { req, errors }) => {
    return layout({ 
        content: 
        `
            <div>
                <form method="POST">
                    <input name="email" placeholder="email" />
                    ${getError(errors, 'email')}
                    <input name="password" placeholder="password" />
                    <button>Sign In</button>
                    ${getError(errors, 'password')}
                </form>
            </div>
        `
    });
};

export default signin;