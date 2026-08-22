const products = [
  {
    name:"Premium Packing Tape",
    price:149,
    oldPrice:249,
    cat:"tape",
    rating:"4.8",
    badge:"BEST SELLER",
    emoji:"📦"
  },
  {
    name:"Strong Parcel Tape",
    price:199,
    oldPrice:299,
    cat:"tape",
    rating:"4.7",
    badge:"POPULAR",
    emoji:"📦"
  },
  {
    name:"Brown Packaging Tape",
    price:129,
    oldPrice:199,
    cat:"tape",
    rating:"4.6",
    badge:"DEAL",
    emoji:"📦"
  },
  {
    name:"Transparent Tape Pack",
    price:179,
    oldPrice:249,
    cat:"tape",
    rating:"4.8",
    badge:"TRENDING",
    emoji:"📦"
  },
  {
    name:"Kitchen Storage Box",
    price:299,
    oldPrice:499,
    cat:"home",
    rating:"4.7",
    badge:"POPULAR",
    emoji:"🏠"
  },
  {
    name:"LED Night Lamp",
    price:249,
    oldPrice:399,
    cat:"electronics",
    rating:"4.6",
    badge:"DEAL",
    emoji:"💡"
  },
  {
    name:"Wireless Earbuds",
    price:699,
    oldPrice:999,
    cat:"electronics",
    rating:"4.5",
    badge:"BEST SELLER",
    emoji:"🎧"
  },
  {
    name:"Mobile Stand",
    price:199,
    oldPrice:299,
    cat:"electronics",
    rating:"4.7",
    badge:"TRENDING",
    emoji:"📱"
  },
  {
    name:"Smart Watch",
    price:899,
    oldPrice:1299,
    cat:"electronics",
    rating:"4.4",
    badge:"HOT",
    emoji:"⌚"
  },
  {
    name:"USB Charging Cable",
    price:149,
    oldPrice:249,
    cat:"electronics",
    rating:"4.8",
    badge:"DEAL",
    emoji:"🔌"
  },
  {
    name:"Men's Casual T-Shirt",
    price:399,
    oldPrice:699,
    cat:"fashion",
    rating:"4.5",
    badge:"TRENDING",
    emoji:"👕"
  },
  {
    name:"Women's Fashion Top",
    price:449,
    oldPrice:799,
    cat:"fashion",
    rating:"4.6",
    badge:"POPULAR",
    emoji:"👚"
  },
  {
    name:"Travel Bag",
    price:599,
    oldPrice:999,
    cat:"fashion",
    rating:"4.7",
    badge:"BEST SELLER",
    emoji:"👜"
  },
  {
    name:"Sunglasses",
    price:299,
    oldPrice:499,
    cat:"fashion",
    rating:"4.4",
    badge:"DEAL",
    emoji:"🕶️"
  },
  {
    name:"Premium Wallet",
    price:249,
    oldPrice:399,
    cat:"fashion",
    rating:"4.8",
    badge:"HOT",
    emoji:"👛"
  }
];

let cart = [];

function displayProducts(list = products){

  const box = document.getElementById("products");

  if(!box) return;

  if(list.length === 0){
    box.innerHTML = "<h3>No products found</h3>";
    return;
  }

  box.innerHTML = list.map(p => {

    const discount = Math.round(
      ((p.oldPrice - p.price) / p.oldPrice) * 100
    );

    return `
      <div class="product">

        <div class="productBadge">
          ${p.badge}
        </div>

        <div class="emoji">
          ${p.emoji}
        </div>

        <h3>${p.name}</h3>

        <div class="rating">
          ⭐ ${p.rating}
        </div>

        <div class="price">
          ₹${p.price}
          <del>₹${p.oldPrice}</del>
          <small>${discount}% OFF</small>
        </div>

        <button onclick="addToCart('${p.name}')">
          🛒 Add to Cart
        </button>

      </div>
    `;

  }).join("");
}

function addToCart(name){

  const product = products.find(
    p => p.name === name
  );

  if(product){

    cart.push(product);

    updateCart();

    alert("Added to your cart!");
  }
}

function removeFromCart(index){

  cart.splice(index,1);

  updateCart();
}

function updateCart(){

  const count =
    document.getElementById("cartCount");

  const totalBox =
    document.getElementById("cartTotal");

  const itemsBox =
    document.getElementById("cartItems");

  if(count)
    count.textContent = cart.length;

  const total =
    cart.reduce(
      (sum,p) => sum + p.price,
      0
    );

  if(totalBox)
    totalBox.textContent = total;

  if(!itemsBox) return;

  if(cart.length === 0){

    itemsBox.innerHTML =
      "<p>Your cart is empty.</p>";

    return;
  }

  itemsBox.innerHTML =
    cart.map((p,i)=>`

      <div class="cartItem">

        <span>
          ${p.emoji} ${p.name}
        </span>

        <span>
          ₹${p.price}

          <button
            onclick="removeFromCart(${i})">
            ❌
          </button>

        </span>

      </div>

    `).join("");
}

function openCart(){

  const modal =
    document.getElementById("cartModal");

  if(modal){

    modal.style.display = "block";

    updateCart();
  }
}

function closeCart(){

  const modal =
    document.getElementById("cartModal");

  if(modal)
    modal.style.display = "none";
}

function filterProducts(category){

  if(category === "all"){

    displayProducts(products);

  }else{

    displayProducts(
      products.filter(
        p => p.cat === category
      )
    );

  }
}

function searchProducts(){

  const input =
    document.getElementById("searchInput");

  if(!input) return;

  const text =
    input.value.toLowerCase().trim();

  const result =
    products.filter(
      p => p.name.toLowerCase().includes(text)
    );

  displayProducts(result);
}

function checkout(){

  if(cart.length === 0){

    alert("Your cart is empty!");

    return;
  }

  const total =
    cart.reduce(
      (sum,p) => sum + p.price,
      0
    );

  alert(
    "Checkout Total: ₹" + total
  );
}

document.addEventListener(
  "DOMContentLoaded",
  function(){

    displayProducts();

    updateCart();

    const searchInput =
      document.getElementById(
        "searchInput"
      );

    if(searchInput){

      searchInput.addEventListener(
        "input",
        searchProducts
      );

    }

  }
);
