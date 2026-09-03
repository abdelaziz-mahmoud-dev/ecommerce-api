const BASE_URL = 'https://ecommerce-api-ten-phi.vercel.app/api';

// عناصر الـ DOM
const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const productsSection = document.getElementById('products-section');
const productsList = document.getElementById('products-list');
const authError = document.getElementById('auth-error');

// 1. التعامل مع تسجيل الدخول
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'فشل تسجيل الدخول');
    }

    // حفظ التوكين والانتقال لصفحة المنتجات
    localStorage.setItem('token', data.token);
    loginSection.classList.add('hidden');
    productsSection.classList.remove('hidden');
    
    // جلب المنتجات
    fetchProducts();

  } catch (err) {
    authError.textContent = err.message;
  }
});

// 2. جلب المنتجات من الـ API
async function fetchProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    const products = await res.json();

    productsList.innerHTML = products.map(p => `
      <div class="product-card">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <span>السعر: $${p.price}</span>
      </div>
    `).join('');
  } catch (err) {
    console.error('Error loading products:', err);
  }
}