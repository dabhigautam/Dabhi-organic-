import {
  db,
  collection,
  addDoc
} from "./firebase.js";

window.placeOrder = async function () {

    let name = document.getElementById("name").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let address = document.getElementById("address").value.trim();
    let city = document.getElementById("city").value.trim();
    let pincode = document.getElementById("pincode").value.trim();

    if (!name || !mobile || !address || !city || !pincode) {
        alert("Please fill all details");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += Number(item.price);
    });

    try {

        await addDoc(collection(db, "orders"), {

            customerName: name,
            mobile: mobile,
            address: address,
            city: city,
            pincode: pincode,

            paymentMethod: "Cash on Delivery",

            products: cart,

            totalAmount: total,

            status: "Pending",

            orderDate: new Date().toISOString()

        });

        localStorage.removeItem("cart");

        alert("🎉 Order Placed Successfully!");

        window.location.href = "orders.html";

    } catch (error) {

        console.error(error);

        alert("Order Failed : " + error.message);

    }

}