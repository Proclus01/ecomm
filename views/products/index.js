const productsTemplate = ({ products }) => {
    const renderedProducts = products.map(product => {
        return `
            <li>${product.title} - ${product.price}</li>
        `;
    }).join('');

    return `
        <ul>
            ${renderedProducts}
        </ul>
    `;
};