const BASE_URL = 'https://ecommerce-api-ten-phi.vercel.app/api';

// DOM Elements
const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const productForm = document.getElementById('product-form');
const productsList = document.getElementById('products-list');
const authError = document.getElementById('auth-error');
const productMsg = document.getElementById('product-msg');

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('token')) {
    showDashboard();
  }
});

// Switch Tabs Login/Register
function switchAuthTab(tab) {
  authError.textContent = '';
  if (tab === 'login') {
    document.getElementById('tab-login-btn').classList.add('active');
    document.getElementById('tab-register-btn').classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
  } else {
    document.getElementById('tab-register-btn').classList.add('active');
    document.getElementById('tab-login-btn').classList.remove('active');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  }
}

// 1. Auth: Register
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');

    localStorage.setItem('token', data.token || data.accessToken);
    showDashboard();
  } catch (err) {
    authError.textContent = err.message;
  }
});

// 1. Auth: Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Invalid credentials');

    localStorage.setItem('token', data.token || data.accessToken);
    showDashboard();
  } catch (err) {
    authError.textContent = err.message;
  }
});

function showDashboard() {
  authSection.classList.add('hidden');
  appSection.classList.remove('hidden');
  document.body.style.alignItems = 'flex-start';
  fetchProducts();
}

function logout() {
  localStorage.removeItem('token');
  appSection.classList.add('hidden');
  authSection.classList.remove('hidden');
  document.body.style.alignItems = 'center';
}

// 2. Products: Fetch All
async function fetchProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    const data = await res.json();
    const list = Array.isArray(data) ? data : (data.products || []);

    productsList.innerHTML = list.map(p => `
      <div class="product-card">
        <div>
          <h4>${p.name}</h4>
          <p>${p.description}</p>
        </div>
        <div>
          <div class="price">$${p.price}</div>
          <div class="actions-row">
            <button class="btn btn-secondary btn-sm" onclick="addToCart('${p._id}')">Add Cart</button>
            <button class="btn btn-primary btn-sm" onclick="setupEditProduct('${p._id}', '${p.name}', '${p.category || ''}', ${p.price}, '${p.description}')">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p._id}')">Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    productsList.innerHTML = `<p class="error-msg">${err.message}</p>`;
  }
}

// 2. Products: Create or Update (PUT / POST)
productForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  productMsg.textContent = '';
  
  const id = document.getElementById('edit-product-id').value;
  const name = document.getElementById('p-name').value;
  const category = document.getElementById('p-category').value.trim();
  const price = Number(document.getElementById('p-price').value);
  const description = document.getElementById('p-desc').value;
  const token = localStorage.getItem('token');

  const isEdit = Boolean(id);
  const url = isEdit ? `${BASE_URL}/products/${id}` : `${BASE_URL}/products`;
  const method = isEdit ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, category, price, description })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Operation failed');

    productMsg.textContent = isEdit ? 'Updated successfully!' : 'Added successfully!';
    resetProductForm();
    fetchProducts();
  } catch (err) {
    productMsg.textContent = err.message;
  }
});

function setupEditProduct(id, name, category, price, desc) {
  document.getElementById('edit-product-id').value = id;
  document.getElementById('p-name').value = name;
  document.getElementById('p-category').value = category;
  document.getElementById('p-price').value = price;
  document.getElementById('p-desc').value = desc;
  
  document.getElementById('form-title').textContent = 'Edit Product';
  document.getElementById('product-submit-btn').textContent = 'Update Product';
  document.getElementById('cancel-edit-btn').classList.remove('hidden');
}

function resetProductForm() {
  productForm.reset();
  document.getElementById('edit-product-id').value = '';
  document.getElementById('form-title').textContent = 'Add New Product';
  document.getElementById('product-submit-btn').textContent = 'Create Product';
  document.getElementById('cancel-edit-btn').classList.add('hidden');
}

// 2. Products: Delete (DELETE)
async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Delete failed');
    fetchProducts();
  } catch (err) {
    alert(err.message);
  }
}

// 3. Cart API Endpoints Integrations
async function addToCart(productId) {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId, quantity: 1 })
    });
    if (!res.ok) throw new Error('Could not add to cart');
    alert('Product added to cart!');
  } catch (err) {
    alert(err.message);
  }
}

async function fetchCart() {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${BASE_URL}/cart`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    renderCart(data);
    toggleCartModal(true);
  } catch (err) {
    alert('Failed to fetch cart');
  }
}

function renderCart(cartData) {
  const cartItems = document.getElementById('cart-items');
  const items = cartData.items || [];
  
  if (items.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('cart-total').textContent = '0.00';
    return;
  }

  cartItems.innerHTML = items.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.product?.name || 'Product'}</strong>
        <div>$${item.product?.price} x ${item.quantity}</div>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.product?._id}')">Remove</button>
      </div>
    </div>
  `).join('');

  document.getElementById('cart-total').textContent = cartData.totalPrice || '0.00';
}

async function removeFromCart(productId) {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${BASE_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to remove item');
    fetchCart();
  } catch (err) {
    alert(err.message);
  }
}

function toggleCartModal(show) {
  const modal = document.getElementById('cart-modal');
  show ? modal.classList.remove('hidden') : modal.classList.add('hidden');
}

// 4. Orders API Integration
async function createOrder() {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Order creation failed');
    alert('Order created successfully!');
    toggleCartModal(false);
  } catch (err) {
    alert(err.message);
  }
}