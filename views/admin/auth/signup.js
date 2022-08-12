import layout from '../layout.js';
import helpers from '../../helpers.js';

const signup = ({ req, errors }) => {
    return layout({
        content: 
        `
            <div>
                Your id is: ${req.session.userId}
                <form method="POST">
                    <input name="email" placeholder="email" />
                    ${helpers.getError(errors, 'email')}
                    <input name="password" placeholder="password" />
                    ${helpers.getError(errors, 'password')}
                    <input 
                        name="passwordConfirmation" 
                        placeholder="password confirmation" />
                    ${helpers.getError(errors, 'passwordConfirmation')}
                    <button>Sign Up</button>
                </form>
            </div>
        `
    });
};

export default signup;