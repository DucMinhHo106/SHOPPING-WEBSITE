// assets/js/products.js
// Fetches products from /data/products.json and renders them dynamically.
// Each product card links to product-detail.html?id=<product_id>

async function loadProducts() {
  try {
    const response = await fetch('./data/products.json');
    if (!response.ok) throw new Error('Failed to load products.json');
    const products = await response.json();
    renderProducts(products);
  } catch (err) {
    console.error('Could not load products:', err);
  }
}

function renderProducts(products) {
  // Group by category
  const grouped = {};
  products.forEach(product => {
    const cat = product.category || 'other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(product);
  });

  Object.keys(grouped).forEach(category => {
    const section = document.getElementById(category);
    if (!section) return;

    // Build section HTML
    let html = `
      <div class="product-grid">
    `;

    grouped[category].forEach(product => {
      const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : null;

      html += `
        <a class="product-card-link" href="./product-detail.html?id=${encodeURIComponent(product.id)}">
          <div class="product-card">
            ${discount ? `<div class="product-badge">-${discount}%</div>` : ''}
            <div class="product-card-image">
              <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" />
            </div>
            <div class="product-card-body">
              <h5 class="product-card-title">${escapeHtml(product.name)}</h5>
              <div class="product-card-price">
                ${product.originalPrice
                  ? `<span class="price-old">${formatPrice(product.originalPrice)}₫</span>`
                  : ''}
                <span class="price-new">${formatPrice(product.price)}₫</span>
              </div>
            </div>
          </div>
        </a>
      `;
    });

    section.innerHTML += html;
  });
}

function getCategoryLabel(key) {
  const labels = {
    keyboard: 'Keyboard',
    kit_ban_phim: 'Kit Bàn Phím',
    mouse: 'Mouse',
    keycap: 'Keycap',
    switch: 'Switch',
    phu_kien: 'Phụ Kiện'
  };
  return labels[key] || key;
}

function formatPrice(num) {
  return num.toLocaleString('vi-VN');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Show/hide section by category (called from nav links)
function showCategory(categoryId) {
  const sections = document.querySelectorAll('.product-section');
  sections.forEach(s => s.style.display = 'none');
  const target = document.getElementById(categoryId);
  if (target) {
    target.style.display = 'block';
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// On page load
document.addEventListener('DOMContentLoaded', loadProducts);