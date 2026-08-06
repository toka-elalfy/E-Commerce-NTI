let products = [
    { name: "MacBook Pro Purple", price: 1999, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" },
    { name: "iPhone 15 Pro", price: 999, image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80" },
    { name: "Sony Headphones", price: 349, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" },
    { name: "Smart Watch", price: 299, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" },
    { name: "Mechanical Keyboard", price: 149, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=600&q=80" },
    { name: "Professional Camera", price: 1200, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80" }
];
let cart = [];

const loginForm = document.getElementById("login-form");
const loginPage = document.getElementById("login-page");
const app = document.getElementById("app");
const logoutBtn = document.getElementById("logout-btn");
const navLinks = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");
const productsContainer = document.getElementById("products-container");
const featuredContainer = document.getElementById("featured-products-container");
const addProductForm = document.getElementById("add-product-form");
const cartList = document.getElementById("cart-list");
const cartTotalDisplay = document.getElementById("cart-total");
const cartCountBadge = document.getElementById("cart-count-badge");
const checkoutBtn = document.getElementById("checkout-btn");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginPage.classList.add("d-none");
    app.style.display = "flex";
    app.style.flexDirection = "column";
    
    Swal.fire({
        icon: 'success',
        title: 'Welcome to Ele City!',
        timer: 1500,
        showConfirmButton: false,
        background: '#f8f7ff',
        color: '#3c096c'
    });
    
    renderProducts();
    renderFeatured();
});

logoutBtn.addEventListener("click", () => {
    app.style.display = "none";
    loginPage.classList.remove("d-none");
});

function navigateTo(pageId) {
    pages.forEach(p => p.style.display = "none");
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) targetPage.style.display = "block";
    window.scrollTo(0,0);
    
    navLinks.forEach(l => {
        l.classList.remove('active');
        if(l.getAttribute('data-page') === pageId) l.classList.add('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        navigateTo(this.getAttribute("data-page"));
    });
});

addProductForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const image = document.getElementById("product-image").value;
    
    products.unshift({ name, price, image });
    renderProducts();
    
    Swal.fire('Added!', 'New product is now live.', 'success');
    addProductForm.reset();
    navigateTo('products');
});

function renderProducts() {
    if(!productsContainer) return;
    productsContainer.innerHTML = products.map((p, idx) => `
        <div class="col-md-4 col-sm-6">
            <div class="card product-card">
                <img src="${p.image}" class="card-img-top" alt="${p.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Item'">
                <div class="card-body">
                    <h5 class="fw-bold mb-1">${p.name}</h5>
                    <p class="fw-bold mb-3" style="color: #9d4edd; font-size: 1.2rem;">$${p.price.toFixed(2)}</p>
                    <button class="btn btn-primary-custom w-100" onclick="addToCart(${idx})">
                        <i class="fas fa-cart-plus me-2"></i>Buy Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderFeatured() {
    if(!featuredContainer) return;
    featuredContainer.innerHTML = products.slice(0, 3).map((p, idx) => `
        <div class="col-md-4">
            <div class="card product-card" style="border-bottom: 4px solid #9d4edd;">
                <img src="${p.image}" class="card-img-top" alt="${p.name}">
                <div class="card-body text-center">
                    <h6 class="fw-bold mb-2">${p.name}</h6>
                    <button class="btn btn-sm btn-primary-custom rounded-pill px-4" onclick="addToCart(${idx})">Quick Buy</button>
                </div>
            </div>
        </div>
    `).join('');
}

window.addToCart = (index) => {
    cart.push(products[index]);
    updateCartUI();
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Item added to bag',
        showConfirmButton: false,
        timer: 1000
    });
};

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCartUI();
};

function updateCartUI() {
    cartCountBadge.innerText = cart.length;
    const emptyMsg = document.getElementById("empty-cart-msg");
    
    if (cart.length === 0) {
        cartList.innerHTML = "";
        emptyMsg.style.display = "block";
    } else {
        emptyMsg.style.display = "none";
        cartList.innerHTML = cart.map((item, idx) => `
            <div class="card p-3 mb-2 shadow-sm border-0 d-flex flex-row justify-content-between align-items-center rounded-4">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" width="60" height="60" class="rounded me-3" style="object-fit: cover;">
                    <div>
                        <h6 class="mb-0 fw-bold">${item.name}</h6>
                        <small class="text-muted">$${item.price.toFixed(2)}</small>
                    </div>
                </div>
                <button class="btn btn-link text-danger" onclick="removeFromCart(${idx})"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
    }
    
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalDisplay.innerText = total.toFixed(2);
}

checkoutBtn.addEventListener("click", () => {
    if(cart.length === 0) return;
    Swal.fire({
        title: 'Confirm Order',
        text: 'Ready to receive your items?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3c096c'
    }).then((result) => {
        if(result.isConfirmed) {
            Swal.fire('Success!', 'Your order is being processed.', 'success');
            cart = [];
            updateCartUI();
            navigateTo('home');
        }
    });
});

window.onload = () => {
    window.navigateTo = navigateTo;
};
