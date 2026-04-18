// assets/js/products.js
// Fetches products from /IMG/data/products.json and renders them dynamically.
// Each product card links to product-detail.html?id=<product_id>

let ALL_PRODUCTS = [];
let isLoaded = false;

const categoryMap = {
  keyboard: "keyboard",
  kit_ban_phim: "kit_ban_phim",
  mouse: "mouse",
  keycap: "keycap",
  switch: "switch",
  phu_kien: "phu_kien"
};

async function loadProducts() {
  try {
    const response = await fetch('../IMG/data/products.json');
    const products = await response.json();

    ALL_PRODUCTS = products;
    isLoaded = true;
    showCategory("keyboard");

  } 
  catch (err) {
    console.error(err);
  }
}

function renderProducts(products, filterCategory = null) {
  const sections = document.querySelectorAll('.product-section');
  sections.forEach(s => s.innerHTML = "");

  products.forEach(product => {

    if (filterCategory && product.category !== filterCategory) return;

    const sectionId = categoryMap[product.category];
    const section = document.getElementById(sectionId);
    if (!section) return;

    const discount = product.originalPrice
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : null;

    const html = `
      <a class="product-card-link" href="../html/product-detail.html?id=${encodeURIComponent(product.id)}">
        <div class="product-card">
          ${discount ? `<div class="product-badge">-${discount}%</div>` : ''}
          <div class="product-card-image">
            <img src="..${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" />
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

    section.insertAdjacentHTML('beforeend', html);
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
  if (!isLoaded) return;

  const sections = document.querySelectorAll('.product-section');
  sections.forEach(s => {
    s.style.display = 'none';
    s.innerHTML = "";
  });

  const target = document.getElementById(categoryId);
  if (!target) return;

  target.style.display = 'grid';

  renderProducts(ALL_PRODUCTS, categoryId);
}

// On page load
document.addEventListener('DOMContentLoaded', loadProducts);