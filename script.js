const loginForm = document.getElementById("login-form");
const loginPage = document.getElementById("login-page");
const app = document.getElementById("app");
const logoutBtn = document.getElementById("logout-btn");

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (email && password) {
    loginPage.style.display = "none";
    app.style.display = "block";
    Swal.fire("Success", "Logged in successfully!", "success");
    renderProducts(); 
  }
});

logoutBtn.addEventListener("click", function() {
  app.style.display = "none";
  loginPage.style.display = "block";
});

const links = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");

links.forEach(link => {
  link.addEventListener("click", function() {
    const target = this.getAttribute("data-page") + "-page";
    pages.forEach(page => page.style.display = "none");
    document.getElementById(target).style.display = "block";
  });
});

const productsContainer = document.getElementById("products-container");
const addProductForm = document.getElementById("add-product-form");
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");

let products = [
  { name: "Laptop", price: 1200, image: "image/laptop.jpg" },
  { name: "Smartphone", price: 800, image: "image/phone.jpg" },
  { name: "Smartphone", price: 800, image: "image/phone3.jpg" },
  { name: "Headphones", price: 150, image: "image/headphones.jpg" },
  { name: "Smartwatch", price: 200, image: "image/smartwatch.jpg" },
  { name: "Camera", price: 600, image: "image/camera.jpg" }
];

let cart = [];

addProductForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("product-name").value;
  const price = parseFloat(document.getElementById("product-price").value);
  const image = document.getElementById("product-image").value;

  const product = { name, price, image };
  products.push(product);

  renderProducts();
  Swal.fire("Success", "Product added!", "success");
  addProductForm.reset();
});

function renderProducts() {
  productsContainer.innerHTML = "";
  products.forEach((p, index) => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card mb-4">
        <img src="${p.image}" class="card-img-top" alt="${p.name}">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">$${p.price}</p>
          <button class="btn add-to-cart" data-index="${index}">Add to Cart</button>
        </div>
      </div>
    `;
    productsContainer.appendChild(col);
  });

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", function() {
      const index = this.getAttribute("data-index");
      cart.push(products[index]);
      renderCart();
    });
  });
}

function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center justify-content-between";

    li.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${item.image}" alt="${item.name}" 
             style="width:50px; height:50px; object-fit:cover; margin-right:10px; border-radius:5px;">
        <div>
          <strong>${item.name}</strong><br>
          $${item.price}
        </div>
      </div>
    `;
    cartList.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
}
