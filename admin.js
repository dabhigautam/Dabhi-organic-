import {
  db,
  collection,
  addDoc,
  getDocs
} from "./firebase.js";

// =====================
// IMAGE PREVIEW
// =====================

window.previewImage = function () {

    let url = document.getElementById("pimage").value;

    let img = document.getElementById("preview");

    img.src = url;

    img.style.display = "block";

};

// =====================
// ADD PRODUCT
// =====================

window.addProduct = async function () {

    let name = document.getElementById("pname").value.trim();
    let price = document.getElementById("pprice").value.trim();
    let image = document.getElementById("pimage").value.trim();

    if (!name || !price || !image) {
        alert("Please fill all details");
        return;
    }

    try {

        await addDoc(collection(db, "products"), {
            name: name,
            price: Number(price),
            image: image
        });

        alert("✅ Product Added Successfully");

        document.getElementById("pname").value = "";
        document.getElementById("pprice").value = "";
        document.getElementById("pimage").value = "";

        document.getElementById("preview").style.display = "none";

        loadDashboard();
        loadProducts();

    } catch (error) {

        alert(error.message);

    }

};

// =====================
// DASHBOARD
// =====================

async function loadDashboard() {

    const products = await getDocs(collection(db, "products"));
    const orders = await getDocs(collection(db, "orders"));

    document.getElementById("totalProducts").innerText = products.size;
    document.getElementById("totalOrders").innerText = orders.size;

    let sales = 0;

    orders.forEach((doc) => {

        let order = doc.data();

        if (order.totalAmount) {
            sales += Number(order.totalAmount);
        }

    });

    document.getElementById("totalSales").innerText = "₹" + sales;

}

// =====================
// LOAD PRODUCTS
// =====================

async function loadProducts() {

    let list = document.getElementById("productList");

    list.innerHTML = "";

    const snapshot = await getDocs(collection(db, "products"));

    snapshot.forEach((product) => {

        let item = product.data();

        list.innerHTML += `
        <div class="card">
            <img src="${item.image}" width="120">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
        </div>
        `;

    });

}

loadDashboard();
loadProducts();
async function loadProducts() {

    let list = document.getElementById("productList");
    list.innerHTML = "";

    const snapshot = await getDocs(collection(db, "products"));

    snapshot.forEach((product) => {

        let item = product.data();

        list.innerHTML += `
        <div class="card">

            <img src="${item.image}" width="120">

            <h3>${item.name}</h3>

            <p>₹${item.price}</p>

            <button onclick="editProduct('${product.id}','${item.name}','${item.price}','${item.image}')">
                ✏️ Edit
            </button>

            <button onclick="deleteProduct('${product.id}')">
                🗑 Delete
            </button>

        </div>
        `;

    });

}
import {
  deleteDoc,
  updateDoc,
  doc
} from "./firebase.js";

// Delete Product
window.deleteProduct = async function(id){

    if(!confirm("Delete this product?")) return;

    await deleteDoc(doc(db,"products",id));

    alert("✅ Product Deleted");

    loadDashboard();
    loadProducts();

}

// Edit Product
window.editProduct = async function(id,name,price,image){

    let newName = prompt("Product Name", name);
    if(newName === null) return;

    let newPrice = prompt("Product Price", price);
    if(newPrice === null) return;

    let newImage = prompt("Image URL", image);
    if(newImage === null) return;

    await updateDoc(doc(db,"products",id),{

        name:newName,
        price:Number(newPrice),
        image:newImage

    });

    alert("✅ Product Updated");

    loadProducts();

}