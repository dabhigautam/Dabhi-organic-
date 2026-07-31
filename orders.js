import {
  db,
  collection,
  getDocs,
  deleteDoc,
  doc
} from "./firebase.js";

const ordersBox = document.getElementById("ordersList");

async function loadOrders() {

    ordersBox.innerHTML = "<h3>Loading...</h3>";

    try {

        const snapshot = await getDocs(collection(db, "orders"));

        ordersBox.innerHTML = "";

        if (snapshot.empty) {
            ordersBox.innerHTML = "<h2>No Orders Found</h2>";
            return;
        }

        snapshot.forEach((orderDoc) => {

            let order = orderDoc.data();

            let productsHTML = "";

            order.products.forEach((item) => {

                productsHTML += `
                <div class="card">

                    <img src="${item.image}" alt="${item.name}">

                    <h3>${item.name}</h3>

                    <p>₹${item.price}</p>

                </div>
                `;

            });

            ordersBox.innerHTML += `
            <div class="card">

                <h3>👤 ${order.customerName}</h3>

                <p><b>📞 Mobile:</b> ${order.mobile}</p>

                <p><b>📍 Address:</b> ${order.address}</p>

                <p><b>🏙 City:</b> ${order.city}</p>

                <p><b>💳 Payment:</b> ${order.paymentMethod}</p>

                <p><b>💰 Total:</b> ₹${order.totalAmount}</p>

                <p><b>🚚 Status:</b> ${order.status}</p>

                ${productsHTML}

                <button onclick="deleteOrder('${orderDoc.id}')">
                    🗑 Delete Order
                </button>

            </div>
            `;

        });

    } catch (error) {

        console.error(error);

        ordersBox.innerHTML = "<h2>Error Loading Orders</h2>";

    }

}

window.deleteOrder = async function(id){

    if(!confirm("Delete this order?")) return;

    await deleteDoc(doc(db,"orders",id));

    alert("✅ Order Deleted");

    loadOrders();

}

loadOrders();