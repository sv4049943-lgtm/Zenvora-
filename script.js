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

function displayProducts(list = products){
  const box = document.getElementById("products");

  if(list.length === 0){
    box.innerHTML = "<h3>No products found</h3>";
    return;
  }

  box.innerHTML = list.map((p,i)=>`
    <div class="product">
      <div class="emoji">${p.emoji}</div>
      <h3>${p.name}</h3>
      <div class="price">₹${p.price}</div>
      <button onclick="addToCart(${i})">
        🛒 Add to Cart
      </button>
    </div>
  `).join("");
}

function addToCart(index){
  cart.push(products[index]);
  updateCart();
  alert("Product added to cart!");
}

function updateCart(){
  document.getElementById("cartCount").textContent = cart.length;

  let total = cart.reduce((sum,p)=>sum+p.price,0);
  document.getElementById("cartTotal").textContent = total;

  const box = document.getElementById("cartItems");

  if(cart.length === 0){
    box.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  box.innerHTML = cart.map((p,i)=>`
    <div class="cartItem">
      <span>${p.emoji} ${p.name}</span>
      <span>₹${p.price}
      <button onclick="removeFromCart(${i})">❌</button>
      </span>
    </div>
  `).join("");
}

function removeFromCart(index){
  cart.splice(index,1);
  updateCart();
}

function openCart(){
  document.getElementById("cartModal").style.display="block";
  updateCart();
}

function closeCart(){
  document.getElementById("cartModal").style.display="none";
}

function filterProducts(category){
  if(category==="all"){
    displayProducts(products);
  }else{
    displayProducts(products.filter(p=>p.cat===category));
  }
}

function searchProducts(){
  const text = document.getElementById("searchInput").value.toLowerCase();

  const result = products.filter(p =>
    p.name.toLowerCase().includes(text)
  );

  displayProducts(result);
}

function checkout(){
  if(cart.length===0){
    alert("Your cart is empty!");
    return;
  }

  alert(
    "Checkout selected! Total amount: ₹" +
    cart.reduce((sum,p)=>sum+p.price,0)
  );
}

document.getElementById("searchInput").addEventListener("input",searchProducts);

displayProducts();
updateCart();
