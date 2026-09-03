const BASE_URL = 'https://ecommerce-api-ten-phi.vercel.app/api';

// عناصر الـ DOM
const loginSection = document.getElementById('login-section');
const productsSection = document.getElementById('products-section');
const loginForm = document.getElementById('login-form');
const addProductForm = document.getElementById('add-product-form');
const productsList = document.getElementById('products-list');
const authError = document.getElementById('auth-error');
const productError = document.getElementById('product-error');
const logoutBtn = document.getElementById('logout-btn');

// التثبيت الأولي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (token) {
    showProductsView();
  }
});

// 1. تسجيل الدخول
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  authError.textContent = '';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'بيانات الدخول غير صحيحة');
    }

    const token = data.token || data.accessToken;
    localStorage.setItem('token', token);
    
    showProductsView();
  } catch (err) {
    authError.textContent = err.message;
  }
});

// 2. إظهار شاشة المنتجات
function showProductsView() {
  loginSection.classList.add('hidden');
  productsSection.classList.remove('hidden');
  document.body.style.alignItems = 'flex-start';
  fetchProducts();
}

// 3. جلب قائمة المنتجات
async function fetchProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error('فشل في جلب المنتجات');

    const products = await res.json();
    const list = Array.isArray(products) ? products : (products.products || []);

    if (list.length === 0) {
      productsList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b;">لا توجد منتجات حتى الآن.</p>';
      return;
    }

    productsList.innerHTML = list.map(p => `
      <div class="product-card">
        <div>
          <h4>${p.name || 'منتج بدون اسم'}</h4>
          <p>${p.description || 'لا يوجد وصف للمنتج'}</p>
        </div>
        <div class="price">$${p.price ?? 0}</div>
      </div>
    `).join('');
  } catch (err) {
    productsList.innerHTML = `<p class="error-msg">${err.message}</p>`;
  }
}

// 4. إضافة منتج جديد
addProductForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  productError.textContent = '';

  const name = document.getElementById('product-name').value.trim();
  const price = Number(document.getElementById('product-price').value);
  const description = document.getElementById('product-desc').value.trim();
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, price, description })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'تعذر إضافة المنتج');
    }

    addProductForm.reset();
    fetchProducts();
  } catch (err) {
    productError.textContent = err.message;
  }
});

// 5. تسجيل الخروج
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  productsSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
  document.body.style.alignItems = 'center';
});