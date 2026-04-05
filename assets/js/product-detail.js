// assets/js/product-detail.js
// Reads ?id= from URL, fetches /data/products.json, finds and renders the product.

async function loadProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  const container = document.getElementById('product-detail-dynamic');
  if (!container) return;

  if (!productId) {
    container.innerHTML = '<p class="product-not-found">Product not found.</p>';
    return;
  }

  try {
    const response = await fetch('./data/products.json');
    if (!response.ok) throw new Error('Network error');
    const products = await response.json();

    const product = products.find(p => p.id === productId);

    if (!product) {
      container.innerHTML = '<p class="product-not-found">Product not found.</p>';
      return;
    }

    renderProductDetail(product, container);

  } catch (err) {
    console.error('Error loading product:', err);
    container.innerHTML = '<p class="product-not-found">Product not found.</p>';
  }
}

function renderProductDetail(product, container) {
  // Update page title
  document.title = `Akko | ${product.name}`;

  const discount = product.originalPrice ?
    Math.round((1 - product.price / product.originalPrice) * 100) :
    null;

  // Build promotions list
  const promoHTML = product.promotions && product.promotions.length ?
    `<ul>${product.promotions.map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ul>` :
    '';

  // Build specs table
  const specsHTML = product.specs ?
    Object.entries(product.specs).map(([key, val]) => `
        <tr>
          <td class="table-label">${escapeHtml(key)}</td>
          <td>${escapeHtml(val)}</td>
        </tr>
      `).join('') :
    '';

  container.innerHTML = `
    <div class="row row-large">
      <!-- LEFT: Image -->
      <div class="col-lg-6">
        <div class="product-gallery">
          ${discount ? `<div class="sale-badge">-${discount}%</div>` : ''}
          <div class="main-image-container">
            <div class="main-image-wrapper">
              <img
                src="${product.image}"
                alt="${escapeHtml(product.name)}"
                class="main-image main-image-1"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Info -->
      <div class="col-lg-6">
        <div class="product-info">
          <nav class="breadcrumb-list">
            <a href="./index.html">Trang chủ</a>
            <span class="divider">/</span>
            <a href="./products.html">${escapeHtml(getCategoryLabel(product.category))}</a>
          </nav>

          <h1 class="product-title">${escapeHtml(product.name)}</h1>
          <div class="line-divider"></div>

          <div class="price-container">
            <div class="price-details">
              ${product.originalPrice
                ? `<h3 style="display:inline">
                     <span class="old-price">${formatPrice(product.originalPrice)}</span>
                     <span class="currency">₫</span>
                   </h3>`
                : ''}
              <h3 style="display:inline">
                <span class="new-price">${formatPrice(product.price)}</span>
                <span class="currency">₫</span>
              </h3>
            </div>
          </div>

          <div class="short-description">
            ${promoHTML
              ? `<h3><span style="color:#ed1c24"><strong>Khuyến mãi:</strong></span></h3>${promoHTML}`
              : ''}
          </div>

          <div class="quantity-container">
            <button type="button" class="button minus" onclick="changeQty(-1)">-</button>
            <label for="qty-input">Số lượng sản phẩm</label>
            <input type="number" step="1" min="1" value="1" class="qty-input" id="qty-input" />
            <button type="button" class="button plus" onclick="changeQty(1)">+</button>
          </div>

          <div class="cart-container">
            <button type="button" class="add-to-cart-btn">
              <p class="add-to-cart-text">Thêm vào giỏ hàng</p>
            </button>
          </div>

          <div class="category-info">
            <span>Danh mục: <a href="./products.html#${product.category}">${escapeHtml(getCategoryLabel(product.category))}</a></span>
          </div>
        </div>
      </div>
    </div>

    <!-- TABS -->
    <div class="product-tabs">
      <div class="tabs-container">
        <input type="radio" name="product-tab" id="tab-description" class="tab-input" checked />
        <input type="radio" name="product-tab" id="tab-reviews" class="tab-input" />
        <div class="tab-labels">
          <label class="radio" for="tab-description"><span class="name">Mô tả</span></label>
          <label class="radio" for="tab-reviews"><span class="name">Đánh giá (0)</span></label>
        </div>
        <div class="tab-content-area">
          <div class="tab-content" id="description">
            <div class="description-content">
              <p>${escapeHtml(product.description || '')}</p>
              ${specsHTML
                ? `<h3 class="table-title">THÔNG SỐ KĨ THUẬT</h3>
                   <div class="table-responsive">
                     <table class="info-table">
                       <tbody>${specsHTML}</tbody>
                     </table>
                   </div>`
                : ''}
            </div>
          </div>
          <div class="tab-content" id="reviews">
            <div class="review-container">
              <h3 class="review-heading">Đánh giá</h3>
              <p class="no-reviews-text">Chưa có đánh giá nào.</p>
              <p>Chỉ những khách hàng đã đăng nhập và mua sản phẩm này mới có thể đưa ra đánh giá.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  container.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart-btn')) {
      console.log("CLICKED");

      const qty = parseInt(document.getElementById('qty-input').value) || 1;

      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: qty
      });

      console.log("AFTER ADD:", getCart());
    }
  });
}

function changeQty(delta) {
  const input = document.getElementById('qty-input');
  if (!input) return;
  const newVal = Math.max(1, parseInt(input.value || 1) + delta);
  input.value = newVal;
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
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', loadProductDetail);