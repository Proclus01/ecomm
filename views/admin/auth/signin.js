import layout from '../layout.js';
import helpers from '../../helpers.js';

const signin = ( { req, errors }) => {
    return layout({ 
        content: 
        `
            <div>
                <form method="POST">
                    <input name="email" placeholder="email" />
                    ${helpers.getError(errors, 'email')}
                    <input name="password" placeholder="password" />
                    <button>Sign In</button>
                    ${helpers.getError(errors, 'password')}
                </form>
            </div>
        `
    });
};

export default signin;