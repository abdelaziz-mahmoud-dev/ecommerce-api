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
  
  authError.textContent = ''; // تفريغ رسائل الخطأ القديمة
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    // تعديل المسار إلى /auth/login
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    // التعامل مع الاستجابات غير المتوقعة (مثل إرجاع HTML بدلاً من JSON)
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('المسار غير صحيح أو السيرفر لم يرجع JSON');
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'فشل تسجيل الدخول، تحقق من البيانات');
    }

    // دعم استلام التوكين باسم token أو accessToken
    const token = data.token || data.accessToken;
    if (token) {
      localStorage.setItem('token', token);
    }

    // التبديل بين الشاشات
    loginSection.classList.add('hidden');
    productsSection.classList.remove('hidden');
    
    // جلب عرض المنتجات
    fetchProducts();

  } catch (err) {
    authError.textContent = err.message;
  }
});

// 2. جلب المنتجات من الـ API
async function fetchProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error('تعذر جلب المنتجات');
    
    const products = await res.json();

    // التعامل مع استجابة المنتجات سواء كانت Array مباشرة أو داخل Object
    const productsArray = Array.isArray(products) ? products : (products.products || []);

    if (productsArray.length === 0) {
      productsList.innerHTML = '<p>لا توجد منتجات حالياً.</p>';
      return;
    }

    productsList.innerHTML = productsArray.map(p => `
      <div class="product-card">
        <h3>${p.name || 'منتج بدون اسم'}</h3>
        <p>${p.description || 'لا يوجد وصف'}</p>
        <span>السعر: $${p.price ?? 0}</span>
      </div>
    `).join('');
  } catch (err) {
    console.error('Error loading products:', err);
    productsList.innerHTML = '<p class="error">حدث خطأ أثناء تحميل المنتجات.</p>';
  }
}