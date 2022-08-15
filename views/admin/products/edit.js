import layout from '../layout.js';

const productsEditTemplate = ({ product }) => {
    return layout({
        content: `
            <form method="POST">
                <input name="title" value="${product.title}" />
                <input name="title" value="${product.price}" />
                <button>Submit</button>
            </form>
        `
    });
};

export default productsEditTemplate;