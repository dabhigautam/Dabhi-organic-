let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartBox = document.getElementById("cartItems");
let totalPrice = document.getElementById("totalPrice");

function loadCart() {

    cartBox.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartBox.innerHTML = "<h2>Your Cart is Empty</h2>";
        totalPrice.innerText = "0";
        return;
    }

    cart.forEach((item, index) => {

        total += Number(item.price);

        cartBox.innerHTML += `
        <div class="card">

            <img src="${item.image}" alt="${item.name}">

            <h3>${item.name}</h3>

            <p>₹${item.price}</p>

            <button onclick="removeCart(${index})">
                🗑 Remove
            </button>

        </div>
        `;

    });

    totalPrice.innerText = total;

}

window.removeCart = function(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    loadCart();

}

loadCart();