import layout from '../layout.js';

const productsNewTemplate = ({ errors }) => {
    return layout({
        content: `
            <form method="POST" enctype="multipart/form-data">
                <input placeholder="Title" name="title" />
                <input placeholder="Price" name="price" />
                <input type="file" name="image" />
                <button>Submit</button>
            </form>
        `
    });
};

export default productsNewTemplate;