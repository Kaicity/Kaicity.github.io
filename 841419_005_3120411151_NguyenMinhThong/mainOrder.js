let carts = document.querySelectorAll('.add-cart')

let products = [{
    name: 'Clothing 1',
    tag: 'clothes1',
    amount: 29,
    inCart: 0
}, {
    name: 'Clothing 2',
    tag: 'clothes2',
    amount: 39,
    inCart: 0
}, {
    name: 'Clothing 3',
    tag: 'clothes3',
    amount: 49,
    inCart: 0
}, {
    name: 'Clothing 4',
    tag: 'clothes4',
    amount: 59,
    inCart: 0
}];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}



function onLoadCartNumbers() {
    let productNumber = localStorage.getItem('cartNumbers');
    let pricecartMini = localStorage.getItem('totalCost');

    if (productNumber) {
        document.querySelector('.total-count').textContent = productNumber;
        document.querySelector('.dropdown-cart-header h5').textContent = productNumber;
        document.querySelector('.total-amount').textContent = "$" + pricecartMini;
        document.querySelector('.total-pay').textContent = "$" + pricecartMini;
    }
}

function cartNumbers(product) {
    // console.log("Okay");
    // console.log("The product clicked is ", product);
    let productNumber = localStorage.getItem('cartNumbers');

    productNumber = parseInt(productNumber);

    if (productNumber) {
        localStorage.setItem('cartNumbers', productNumber + 1);
        document.querySelector('.total-count').textContent = productNumber + 1;
        document.querySelector('.dropdown-cart-header h5').textContent = productNumber + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.total-count').textContent = 1;
        document.querySelector('.dropdown-cart-header h5').textContent = 1;
    }

    setItem(product);

}

function setItem(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }


    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    // console.log("The product price is,", product.amount);
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.amount);
    } else {
        localStorage.setItem("totalCost", product.amount);
    }
    // console.log("My cartCost is ", cartCost);
}


function renderUI() {
    // let subTotal = 0;
    // products.forEach(products => {
    //     subTotal += products.inCart * products.price
    // })
    // const total = subTotal;

    let cartItems = localStorage.getItem('productsInCart');

    let cartCost = localStorage.getItem('totalCost');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".cart-product");
    let totalSubProduct = document.querySelector("#totalPrice");

    // console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        totalSubProduct.innerHTML = '';

        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <tbody class="cart-product">
            <tr>
                <td class="image" data-title="No"><img src="images/${item.tag}.jfif" alt="#"></td>
                <td class="product-des" data-title="Description">
                    <p class="product-name"><a href="#">${item.name}</a></p>
                    <p class="product-des">Maboriosam in a tonto nesciung eget distingy magndapibus.</p>
                </td>
                <td class="price" data-title="Price"><span>$${item.amount}</span></td>
                <td class="qty" data-title="Qty">
                    <!-- Input Order -->
                    <div class="input-group">
                        <div class="button minus">
                            <button type="button" class="btn btn-primary btn-number" disabled="disabled" data-type="minus" data-field="quant[3]">
                                <i class="ti-minus"></i>
                            </button>
                        </div>
                        <input type="text" name="quant[3]" class="input-number" data-min="1" data-max="100" value="${item.inCart}">
                        <div class="button plus">
                            <button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[3]">
                                <i onclick="updateQuantity()" class="ti-plus"></i>
                            </button>
                        </div>
                    </div>
                    <!--/ End Input Order -->
                </td>
                <td class="total-amount" data-title="Total"><span>$${item.amount * item.inCart}</span></td>
                <td class="action" data-title="Remove"><a class="ti-trash remove-icon"></a></td>
            </tr>
        </tbody>`;
        });

        totalSubProduct.innerHTML += `
        <div id="totalPrice" class="right">
            <ul>
                <li>Cart Subtotal<span>$${cartCost}</span></li>
                <li>You Save<span>$20</span></li>
                <li class="last">You Pay<span>$${cartCost - 20}</span></li>
            </ul>
            <div class="button5">
                <a href="checkout.html" class="btn">Checkout</a>
                <a href="index.html" class="btn">Continue shopping</a>
            </div>
        </div>`;
    }
}

function renderCartmini() {
    let cartItems = localStorage.getItem('productsInCart');
    let cartCost = localStorage.getItem('totalCost');
    cartItems = JSON.parse(cartItems);
    let viewCartmini = document.querySelector("#viewincart");

    // console.log(cartItems);
    if (cartItems && viewCartmini) {
        // console.log("running");
        viewCartmini.innerHTML = '';


        Object.values(cartItems).map(item => {
            viewCartmini.innerHTML += `
            <ul id="viewincart" class="shopping-list">
                <li id="prod-incart">
                    <a href="#" class="remove" title="Remove this item"><i class="fa fa-remove"></i></a>
                    <a class="cart-img" href="#"><img src="images/${item.tag}.jfif" alt="#"></a>
                    <h4><a href="#">${item.name}</a></h4>
                    <p class="quantity">${item.inCart}x - <span class="amount">$${item.amount}</span></p>
                </li>
            </ul>`;
        });

    }
}


function shopping() {
    let cartCost = localStorage.getItem('totalCost');
    alert("Total is: " + cartCost);
}


renderCartmini();

renderUI();

onLoadCartNumbers();