import layout from "../layout.js";

const cartShowTemplate = ({ items }) => {
  const renderedItems = items
    .map((item) => {
      return `
        <div class="cart-item message">
          <h3 class="subtitle">${item.product.title}</h3>
          <div class="cart-right">
            <div>
              $${item.product.price}  X  ${item.quantity} = 
            </div>
            <div class="price is-size-4">
              $${item.product.price * item.quantity}
            </div>
            <div class="remove">
              <form method="POST">
                <button class="button is-danger">                  
                  <span class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  return layout({
    content: `
        <div id="cart" class="container">
          <div class="columns">
            <div class="column"></div>
            <div class="column is-four-fifths">
              <h3 class="subtitle"><b>Shopping Cart</b></h3>
              <div>
                ${renderedItems}
              </div>
              <div class="total message is-info">
                <div class="message-header">
                  Total
                </div>
                <h1 class="title">$</h1>
                <button class="button is-primary">Buy</button>
              </div>
            </div>
            <div class="column"></div>
          </div>
        </div>
      `,
  });
};

export default cartShowTemplate;
