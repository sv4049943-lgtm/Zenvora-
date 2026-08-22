const products = [
  {name:"Premium Packing Tape",price:149,cat:"tape",emoji:"📦"},
  {name:"Strong Parcel Tape",price:199,cat:"tape",emoji:"📦"},
  {name:"Brown Packaging Tape",price:129,cat:"tape",emoji:"🟫"},
  {name:"Transparent Tape Pack",price:179,cat:"tape",emoji:"📦"},
  {name:"Kitchen Storage Box",price:299,cat:"home",emoji:"🏠"},
  {name:"LED Night Lamp",price:249,cat:"electronics",emoji:"💡"},
  {name:"Wireless Earbuds",price:699,cat:"electronics",emoji:"🎧"},
  {name:"Mobile Stand",price:199,cat:"electronics",emoji:"📱"},
  {name:"Smart Watch",price:899,cat:"electronics",emoji:"⌚"},
  {name:"USB Charging Cable",price:149,cat:"electronics",emoji:"🔌"},
  {name:"Men's Casual T-Shirt",price:399,cat:"fashion",emoji:"👕"},
  {name:"Women's Fashion Top",price:449,cat:"fashion",emoji:"👚"},
  {name:"Travel Bag",price:599,cat:"fashion",emoji:"👜"},
  {name:"Sunglasses",price:299,cat:"fashion",emoji:"🕶️"},
  {name:"Wallet",price:249,cat:"fashion",emoji:"👛"}
];

let cart = [];

function displayProducts(list = products) {
  const box = document.getElementById("products");

  if (!box) return;

  if (list.length === 0) {
    box.innerHTML = "<h3>No products found</h3>";
    return;
  }

  box.innerHTML = list.map((p) => `
    <div class="product">
      <div class="emoji">${p.emoji}</div>
      <h3>${p.name}</h3>
      <div class="price">₹${p.price}</div>
      <button onclick="addToCart('${p.name}')">
        🛒 Add to Cart
      </button>
    </div>
  `).join("");
}

function addToCart(name) {
  const product = products.find(p => p.name === name);

  if (product) {
    cart.push(product);
    updateCart();
    alert("Product added to cart!");
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const count = document.getElementById("cartCount");
  const totalBox = document.getElementById("cartTotal");
  const itemsBox = document.getElementById("cartItems");

  if (count) count.textContent = cart.length;

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  if (totalBox) totalBox.textContent = total;

  if (!itemsBox) return;

  if (cart.length === 0) {
    itemsBox.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  itemsBox.innerHTML = cart.map((p, i) => `
    <div class="cartItem">
      <span>${p.emoji} ${p.name}</span>
      <span>
        ₹${p.price}
        <button onclick="removeFromCart(${i})">❌</button>
      </span>
    </div>
  `).join("");
}

function openCart() {
  const modal = document.getElementById("cartModal");

  if (modal) {
    modal.style.display = "block";
    updateCart();
  }
}

function closeCart() {
  const modal = document.getElementById("cartModal");

  if (modal) {
    modal.style.display = "none";
  }
}

function filterProducts(category) {
  if (category === "all") {
    displayProducts(products);
  } else {
    displayProducts(
      products.filter(p => p.cat === category)
    );
  }
}

function searchProducts() {
  const input = document.getElementById("searchInput");

  if (!input) return;

  const text = input.value.toLowerCase().trim();

  const result = products.filter(p =>
    p.name.toLowerCase().includes(text)
  );

  displayProducts(result);
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  alert("Checkout selected! Total amount: ₹" + total);
}

document.addEventListener("DOMContentLoaded", function() {

  displayProducts();
  updateCart();

  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("input", searchProducts);
  }

});
