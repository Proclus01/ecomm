import helpers from '../../helpers.js';
import layout from '../layout.js';

const productsEditTemplate = ({ product, errors }) => {
    return layout({
        content: `
            <form method="POST">
                <input name="title" value="${product.title}" />
                ${helpers.getError(errors, 'title')}
                <input name="price" value="${product.price}" />
                ${helpers.getError(errors, 'price')}
                <input name="image" type="file" />
                <button>Submit</button>
            </form>
        `
    });
};

export default productsEditTemplate;