/**
 * product-detail.js  (refactored)
 * ============================================================
 * Loads ALL content from product-data.json via fetch(), then
 * renders it into the page skeleton.
 *
 * TO UPDATE CONTENT:
 *   - Edit product-data.json only — never touch this file.
 *   - Add a new product? Duplicate product-data.json, rename it,
 *     and point the HTML page to the new file via data-product-src.
 *
 * HTML SETUP:
 *   Place this attribute on your <script> tag so each page can
 *   point to its own JSON file:
 *
 *     <script src="product-detail.js"
 *             data-product-src="product-data.json" defer></script>
 *
 *   If the attribute is omitted, the script falls back to
 *   "product-data.json" in the same directory.
 * ============================================================
 */

// 0. RESOLVE JSON PATH
//    Read from the script tag's data-product-src attribute, or use default.

const DATA_URL = (() => {
  const scriptTag = document.currentScript ||
    document.querySelector('script[data-product-src]');
  return (scriptTag && scriptTag.dataset.productSrc) || "../assets/data/product-data.json";
})();

// 1. RENDER FUNCTIONS
//    Each function receives the loaded data as a parameter — no globals.

/**
 * renderSidebar(sidebarMenu)
 * Builds the sidebar category menu.
 * Supports up to 2 levels of nested dropdowns.
 */
function renderSidebar(sidebarMenu) {
  const ul = document.getElementById("sidebar-menu");
  if (!ul) return;

  ul.innerHTML = sidebarMenu.map((item) => {
    // Simple link item (no children)
    if (item.href) {
      return `
        <li class="menu-item menu-link">
          <a href="${item.href}">${item.label}</a>
        </li>`;
    }

    // Expandable group with nested sub-menus
    const subItems = item.children.map((child) => {
      // Sub-group with its own children (e.g. "Chủ đề", "Kết nối & Led")
      if (child.children) {
        const links = child.children
          .map((c) => `<li><a href="${c.href}">${c.label}</a></li>`)
          .join("");
        return `
          <li class="sub-menu-item">
            <input type="checkbox" id="${child.id}" class="menu-toggle sub-menu-toggle" />
            <label for="${child.id}" class="sub-menu-label">
              ${child.label}
              <i class="bi bi-chevron-down chevron" style="font-size:11px"></i>
            </label>
            <ul class="sub-sub-menu">${links}</ul>
          </li>`;
      }
      // Plain link inside sub-menu
      return `<li class="sub-menu-item"><a href="${child.href}">${child.label}</a></li>`;
    }).join("");

    return `
      <li class="menu-item">
        <input type="checkbox" id="${item.id}" class="menu-toggle" />
        <label for="${item.id}" class="menu-label">
          <span class="menu-icon">${item.label}</span>
          <i class="bi bi-chevron-down chevron"></i>
        </label>
        <ul class="sub-menu">${subItems}</ul>
      </li>`;
  }).join("");
}

/**
 * renderGallery(product)
 * Builds the CSS-only radio-controlled image gallery.
 */
function renderGallery(product) {
  const gallery   = document.getElementById("product-gallery");
  const thumbWrap = document.getElementById("thumbnail-container");
  if (!gallery || !thumbWrap) return;

  // --- Hidden radio inputs ---
  const radios = product.images
    .map((_, i) =>
      `<input type="radio" name="gallery" id="img${i + 1}" class="image-radio"${i === 0 ? " checked" : ""} />`
    ).join("\n");

  // --- Main images ---
  const mainImgs = product.images
    .map((img, i) => `
      <img src="${img.main}"
           alt="${img.alt}"
           class="main-image main-image-${i + 1}" />`)
    .join("\n");

  // --- Sale badge (optional) ---
  const badge = product.saleBadge
    ? `<div class="sale-badge">${product.saleBadge}</div>`
    : "";

  // --- Prev / Next nav arrows ---
  const prevNextArrows = `
    <label for="img1" class="slider-arrow slider-prev">
      <i class="bi bi-chevron-left"></i>
    </label>
    <label for="img2" class="slider-arrow slider-next">
      <i class="bi bi-chevron-right"></i>
    </label>`;

  gallery.innerHTML = `
    ${radios}
    ${badge}
    <div class="main-image-container">
      <div class="main-image-wrapper">
        ${mainImgs}
      </div>
      <div class="zoom-btn" title="Phóng to hình ảnh">
        <i class="bi bi-arrows-angle-expand"></i>
      </div>
      ${prevNextArrows}
    </div>`;

  // --- Thumbnails ---
  const thumbItems = product.images
    .map((img, i) => `
      <div class="thumbnail-item">
        <label for="img${i + 1}" class="thumbnail-label thumb-${i + 1}">
          <img src="${img.thumb}" alt="thumbnail ${i + 1}" />
        </label>
      </div>`)
    .join("\n");

  thumbWrap.innerHTML = `
    <div class="thumbnail-arrow thumbnail-prev">
      <i class="bi bi-chevron-left"></i>
    </div>
    <div class="thumbnail-scroll">
      <div class="thumbnail-wrapper">
        ${thumbItems}
      </div>
    </div>
    <div class="thumbnail-arrow thumbnail-next">
      <i class="bi bi-chevron-right"></i>
    </div>`;
}

/**
 * renderProductInfo(product)
 * Builds breadcrumb, title, price, promos, quantity form,
 * store links, category and social share buttons.
 */
function renderProductInfo(product) {
  const container = document.getElementById("product-info");
  if (!container) return;

  // Breadcrumb links
  const breadcrumbs = product.breadcrumb
    .map((b) => `<a href="${b.href}">${b.label}</a><span class="divider">/</span>`)
    .join("");

  // Old price (only shown when present)
  const oldPriceHtml = product.oldPrice
    ? `<h3 style="display:inline">
         <span class="old-price">${product.oldPrice}</span>
         <span class="currency">₫</span>
       </h3>`
    : "";

  // Promo bullets
  const promoItems = product.promos
    .map((p) => `<li>${p}</li>`)
    .join("");

  // Store links
  const storeItems = product.stores.map((s) => `
    <li>
      ${s.platform}:
      <a href="${s.href}" class="store-link" target="_blank" rel="noopener noreferrer">
        <i class="${s.icon}" style="font-size:16px"></i>
        <span> ${s.name}</span>
      </a>
    </li>`).join("");

  // Social share buttons (open in popup)
  const popupScript = `window.open(this.href,this.title,'width=500,height=500,top=300px,left=300px');return false;`;
  const shareLinks = [
    { cls: "facebook",  icon: "bi bi-facebook",  url: `//www.facebook.com/sharer.php?u=${product.shareUrl}` },
    { cls: "twitter",   icon: "bi bi-twitter",   url: `//twitter.com/share?url=${product.shareUrl}` },
    { cls: "email",     icon: "bi bi-envelope",  url: `mailto:?body=${product.shareUrl}` },
    { cls: "pinterest", icon: "bi bi-pinterest", url: `//pinterest.com/pin/create/button/?url=${product.shareUrl}` },
    { cls: "linkedin",  icon: "bi bi-linkedin",  url: `//www.linkedin.com/shareArticle?mini=true&url=${product.shareUrl}` },
  ].map((s) => `
    <a href="${s.url}" target="_blank"
       onclick="${popupScript}"
       class="${s.cls}">
      <i class="${s.icon}"></i>
    </a>`).join("");

  container.innerHTML = `
    <nav class="breadcrumb-list">
      ${breadcrumbs}
    </nav>

    <h1 class="product-title">${product.title}</h1>

    <div class="line-divider"></div>

    <div class="price-container">
      <div class="price-details">
        ${oldPriceHtml}
        <h3 style="display:inline">
          <span class="new-price">${product.newPrice}</span>
          <span class="currency">₫</span>
        </h3>
      </div>
    </div>

    <div class="short-description">
      <h3><span style="color:#ed1c24"><strong>Khuyến mãi:</strong></span></h3>
      <ul>${promoItems}</ul>
    </div>

    <form class="cart" action="">
      <div class="quantity-container">
        <button type="button" class="button minus">-</button>
        <label for="qty-input">Số lượng sản phẩm</label>
        <input type="number" step="1" min="1" name="quantity" value="1"
               class="qty-input" id="qty-input" />
        <button type="button" class="button plus">+</button>
      </div>
      <div class="cart-container">
        <button type="button" class="add-to-cart-btn">
          <p class="add-to-cart-text">Thêm vào giỏ hàng</p>
        </button>
      </div>
    </form>

    <div class="store-container">
      <b>Xem ngay 3 gian hàng chính hãng</b>
      <ul class="store-list">${storeItems}</ul>
    </div>

    <div class="category-info">
      <span>Danh mục:
        <a href="${product.category.href}">${product.category.label}</a>
      </span>
    </div>

    <div class="social-share">
      ${shareLinks}
    </div>`;
}

/**
 * renderTabs(product)
 * Builds the description tab (banner images + specs table),
 * the reviews tab, and the related products carousel.
 */
function renderTabs(product) {
  const container = document.getElementById("product-tabs");
  if (!container) return;

  // --- Description images ---
  const descImgs = product.descriptionImages
    .map((img) => `<img src="${img.src}" alt="${img.alt}" class="img-fluid mb-3" />`)
    .join("\n");

  // --- Specs table rows ---
  const specRows = product.specs
    .map((row) => `
      <tr>
        <td class="table-label">${row.label}</td>
        <td>${row.value}</td>
      </tr>`)
    .join("");

  // --- Related products: split into groups of 4 for carousel slides ---
  const ITEMS_PER_SLIDE = 4;
  const slides = [];
  for (let i = 0; i < product.relatedProducts.length; i += ITEMS_PER_SLIDE) {
    const group = product.relatedProducts.slice(i, i + ITEMS_PER_SLIDE);
    const cards = group.map((p) => `
      <div class="col-lg-3 col-md-4 col-6">
        <div class="product-card">
          <div class="item-image-box">
            <a href="${p.href}">
              <img src="${p.img}" alt="${p.title}" class="item-image" />
            </a>
          </div>
          <div class="product-info">
            <h5 class="product-title">
              <a href="${p.href}">${p.title}</a>
            </h5>
            <p class="product-price">${p.price}</p>
            ${!p.inStock
              ? `<p class="product-stock"><i class="bi bi-telephone"></i> Hết hàng</p>`
              : ""}
          </div>
        </div>
      </div>`).join("");

    slides.push(`
      <div class="carousel-item${i === 0 ? " active" : ""}">
        <div class="row g-3">${cards}</div>
      </div>`);
  }

  container.innerHTML = `
    <div class="tabs-container">
      <input type="radio" name="product-tab" id="tab-description" class="tab-input" checked />
      <input type="radio" name="product-tab" id="tab-reviews"     class="tab-input" />

      <div class="tab-labels">
        <label class="radio" for="tab-description">
          <span class="name">Mô tả</span>
        </label>
        <label class="radio" for="tab-reviews">
          <span class="name">Đánh giá (0)</span>
        </label>
      </div>

      <div class="tab-content-area">

        <!-- Description tab -->
        <div class="tab-content" id="description">
          <div class="description-content">
            <div class="description-images">${descImgs}</div>
            <h3 class="table-title">THÔNG SỐ KĨ THUẬT</h3>
            <div class="table-responsive">
              <table class="info-table">
                <tbody>${specRows}</tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Reviews tab -->
        <div class="tab-content" id="reviews">
          <div class="review-container">
            <div class="row">
              <div class="col-12">
                <h3 class="review-heading">Đánh giá</h3>
                <p class="no-reviews-text">Chưa có đánh giá nào.</p>
              </div>
              <div class="col-12">
                <div class="review-form">
                  <div class="review-form-inner col-inner">
                    <div class="review-login-prompt">
                      <p>Chỉ những khách hàng đã đăng nhập và mua sản phẩm này mới có thể đưa ra đánh giá.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div><!-- /.tab-content-area -->
    </div><!-- /.tabs-container -->

    <!-- Related products carousel -->
    <div class="related-products">
      <div class="container">
        <h3 class="related-title">Sản phẩm tương tự</h3>
        <div id="relatedProductsCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            ${slides.join("")}
          </div>
          <button class="carousel-control-prev" type="button"
                  data-bs-target="#relatedProductsCarousel" data-bs-slide="prev">
            <span class="carousel-control-icon">
              <i class="bi bi-chevron-left"></i>
            </span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button"
                  data-bs-target="#relatedProductsCarousel" data-bs-slide="next">
            <span class="carousel-control-icon">
              <i class="bi bi-chevron-right"></i>
            </span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>`;
}

// 2. ERROR UI
//    Show a visible message when data cannot be loaded.

function showError(message) {
  const targets = ["sidebar-menu", "product-gallery", "product-info", "product-tabs"];
  targets.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = `
        <div style="padding:16px;color:#c0392b;border:1px solid #e74c3c;border-radius:6px;margin:8px 0;">
          <strong>⚠ Lỗi tải dữ liệu:</strong> ${message}
        </div>`;
    }
  });
  console.error("[product-detail.js]", message);
}

// 3. BOOTSTRAP — fetch JSON then render everything

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(DATA_URL);

    // Handle HTTP-level errors (404, 500, etc.)
    if (!response.ok) {
      throw new Error(`Không tìm thấy file dữ liệu (HTTP ${response.status}: ${DATA_URL})`);
    }

    const data = await response.json();

    // Basic shape validation
    if (!data.product || !data.sidebarMenu) {
      throw new Error(`File JSON thiếu trường "product" hoặc "sidebarMenu".`);
    }

    // Render all sections with loaded data
    renderSidebar(data.sidebarMenu);
    renderGallery(data.product);
    renderProductInfo(data.product);
    renderTabs(data.product);

  } catch (err) {
    // Covers network failures, JSON parse errors, and our custom throws
    showError(err.message);
  }
});
