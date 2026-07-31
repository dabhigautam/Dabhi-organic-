import {
  db,
  collection,
  getDocs
} from "./firebase.js";

// =====================
// CART COUNT
// =====================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cartCount");

if (cartCount) {
    cartCount.innerText = cart.length;
}

// =====================
// LOAD PRODUCTS
// =====================

async function loadProducts() {

    const box = document.getElementById("dynamicProducts");

    if (!box) return;

    box.innerHTML = "";

    try {

        const snapshot = await getDocs(collection(db, "products"));

        snapshot.forEach((product) => {

            let item = product.data();

            box.innerHTML += `
            <div class="card">

                <img src="${item.image}" alt="${item.name}">

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

                <button onclick="addToCart('${item.name}',${item.price},'${item.image}')">
                Add to Cart
                </button>

                <button onclick="buyNow('${item.name}',${item.price},'${item.image}')">
                Buy Now
                </button>

            </div>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

loadProducts();
// =======================
// ADD TO CART
// =======================

window.addToCart = function(name, price, image) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price,
        image: image
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById("cartCount").innerText = cart.length;

    alert("✅ Product Added to Cart");

};

// =======================
// BUY NOW
// =======================

window.buyNow = function(name, price, image) {

    let cart = [{
        name: name,
        price: price,
        image: image
    }];

    localStorage.setItem("cart", JSON.stringify(cart));

    window.location.href = "checkout.html";

};

// =======================
// SEARCH PRODUCT
// =======================

window.searchProduct = function() {

    let input = document.getElementById("search").value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach((card) => {

        let title = card.querySelector("h3").innerText.toLowerCase();

        if (title.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

};

// =======================
// BANNER SLIDER
// =======================

const banner = document.getElementById("banner");

if (banner) {

    const banners = [
        "images/banner1.jpg",
        "images/banner2.jpg",
        "images/banner3.jpg"
    ];

    let current = 0;

    setInterval(() => {

        current++;

        if (current >= banners.length) {
            current = 0;
        }

        banner.src = banners[current];

    }, 3000);

}