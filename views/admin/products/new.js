import layout from '../layout.js';
import helpers from '../../helpers.js';


const productsNewTemplate = ({ errors }) => {
    return layout({
        content: `
            <form method="POST" enctype="multipart/form-data">
                <input placeholder="Title" name="title" />
                ${helpers.getError(errors, 'title')}
                <input placeholder="Price" name="price" />
                ${helpers.getError(errors, 'price')}
                <input type="file" name="image" />
                ${helpers.getError(errors, 'image')}
                <button>Submit</button>
            </form>
        `
    });
};

export default productsNewTemplate;