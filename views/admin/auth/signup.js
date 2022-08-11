import layout from '../layout.js';

const getError = (errors, prop) => {
    // prop === 'email' || 'password' || 'password_confirmation'
    try {
        return errors.mapped()[prop].msg;
    } catch (err) {
        return '';
    }
}

const signup = ({ req, errors }) => {
    return layout({
        content: 
        `
            <div>
                Your id is: ${req.session.userId}
                <form method="POST">
                    <input name="email" placeholder="email" />
                    ${getError(errors, 'email')}
                    <input name="password" placeholder="password" />
                    ${getError(errors, 'password')}
                    <input 
                        name="passwordConfirmation" 
                        placeholder="password confirmation" />
                    ${getError(errors, 'passwordConfirmation')}
                    <button>Sign Up</button>
                </form>
            </div>
        `
    });
};

export default signup;