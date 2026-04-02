/**
 * product-detail.js
 * ============================================================
 * Contains ALL product data and the rendering functions that
 * inject them into the empty skeleton in product-detail.html.
 *
 * TO UPDATE CONTENT:
 *   - Change data inside the `product` object below.
 *   - The UI will automatically reflect those changes.
 *   - Never edit product-detail.html to update product info.
 * ============================================================
 */

// 1. SIDEBAR DATA

const sidebarMenu = [
  {
    label: "Keyboard",
    id: "menu-keyboard",
    children: [
      {
        label: "Chủ đề",
        id: "menu-theme",
        children: [
          { label: "ACRYLIC",           href: "https://akko.vn/acrylic/" },
          { label: "Black Pink",        href: "https://akko.vn/black-pink/" },
          { label: "BiliBili",          href: "https://akko.vn/bilibili/" },
          { label: "Dragon Ball Super", href: "https://akko.vn/dragon-ball-super/" },
          { label: "Dragon Ball Z",     href: "https://akko.vn/dragon-ball-z/" },
          { label: "Mã Honkai Impact III", href: "https://akko.vn/ma-honkai-impact-iii/" },
          { label: "MOD Series",        href: "https://akko.vn/mod-series/" },
          { label: "Mã Midnight",       href: "https://akko.vn/ma-midnight/" },
          { label: "Matcha Red Bean",   href: "https://akko.vn/matcha-red-bean/" },
          { label: "Monet's Pond",      href: "https://akko.vn/monets-pond/" },
          { label: "Mojike",            href: "https://akko.vn/mojike/" },
          { label: "Mã Ocean",          href: "https://akko.vn/ma-ocean/" },
          { label: "PC Series",         href: "https://akko.vn/pc-series/" },
          { label: "One Piece",         href: "https://akko.vn/one-piece/" },
          { label: "Horizon",           href: "https://akko.vn/horizon/" },
          { label: "Silent",            href: "https://akko.vn/silent/" },
          { label: "Steam Engine",      href: "https://akko.vn/steam-engine/" },
          { label: "World Tour Tokyo",  href: "https://akko.vn/world-tour-tokyo/" },
          { label: "World Tour Tokyo R2", href: "https://akko.vn/world-tour-tokyo-r2/" },
        ],
      },
      {
        label: "Kết nối & Led",
        id: "menu-led",
        children: [
          { label: "Multi-modes", href: "https://akko.vn/multi-modes/" },
          { label: "Bluetooth",   href: "https://akko.vn/bluetooth/" },
          { label: "Led RGB",     href: "https://akko.vn/led-rgb/" },
        ],
      },
    ],
  },
  { label: "Kit Bàn Phím", href: "./products.html#kit_ban_phim" },
  { label: "Keycap",       href: "./products.html#keycap" },
  { label: "Switch",       href: "./products.html#switch" },
  { label: "Mouse",        href: "./products.html#mouse" },
  { label: "Phụ Kiện",    href: "./products.html#phu_kien" },
];

// 2. PRODUCT DATA

const product = {
  // --- Basic info ---
  title:      "Bàn phím cơ AKKO 5075S Black on White (Hotswap/Led RGB/USB Type-C)",
  breadcrumb: [
    { label: "Trang chủ", href: "https://akko.vn" },
    { label: "Keyboard",  href: "https://akko.vn/keyboard/" },
  ],
  category: { label: "Keyboard", href: "https://akko.vn/keyboard/" },

  // --- Pricing (use null for no old price) ---
  oldPrice: "790,000",
  newPrice: "750,000",
  saleBadge: "-5%",         // shown on main image; set to null to hide

  // --- Promotional bullets ---
  promos: [
    "Freeship toàn quốc khi đặt hàng tại Akko.vn",
    "Bảo hành chính hãng 12 tháng",
    "Chi nhánh bảo hành 3 miền: Bắc – Trung – Nam",
  ],

  // --- Official store links ---
  stores: [
    {
      platform: "Shopee Mall",
      href: "https://s.shopee.vn/9KXKjmvDmM",
      icon: "fa fa-cart-plus",
      name: "Akko Gear VN",
    },
    {
      platform: "Shopee Store",
      href: "https://s.shopee.vn/5Ajj0VoWpK",
      icon: "fa fa-keyboard-o",
      name: "Akko Store",
    },
    {
      platform: "TikTokShop",
      href: "https://vt.tiktok.com/ZSU6tu4WR/?page=TikTokShop",
      icon: "bi bi-tiktok",
      name: "Akko Việt Nam",
    },
  ],

  // --- Social share (uses current page URL) ---
  shareUrl: "https://akko.vn/ban-phim-co-akko-5075s-black-on-white/",

  // ---- Gallery images ----
  // `main`  = full-size image shown in the viewer
  // `thumb` = smaller thumbnail (append -510x340, etc. as needed)
  images: [
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White.png",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White.png",
      alt:   "AKKO 5075S Black on White - View 1",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-1.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-1-510x340.jpg",
      alt:   "AKKO 5075S Black on White - View 2",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-2.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-2-510x765.jpg",
      alt:   "AKKO 5075S Black on White - View 3",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-3.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-3-510x340.jpg",
      alt:   "AKKO 5075S Black on White - View 4",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-4.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-4-510x340.jpg",
      alt:   "AKKO 5075S Black on White - View 5",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-5.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-5-510x340.jpg",
      alt:   "AKKO 5075S Black on White - View 6",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-6.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-6-510x765.jpg",
      alt:   "AKKO 5075S Black on White - View 7",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-7.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-7-510x340.jpg",
      alt:   "AKKO 5075S Black on White - View 8",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-8.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-8-510x765.jpg",
      alt:   "AKKO 5075S Black on White - View 9",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-9.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-9-510x340.jpg",
      alt:   "AKKO 5075S Black on White - View 10",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-10.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-10-510x340.jpg",
      alt:   "AKKO 5075S Black on White - View 11",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-11.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-11-510x340.jpg",
      alt:   "AKKO 5075S Black on White - View 12",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-12.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-12-510x340.jpg",
      alt:   "AKKO 5075S Black on White - View 13",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-13.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-13-510x765.jpg",
      alt:   "AKKO 5075S Black on White - View 14",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-14.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-14-510x765.jpg",
      alt:   "AKKO 5075S Black on White - View 15",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-15.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-15-510x340.jpg",
      alt:   "AKKO 5075S Black on White - View 16",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-16.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-16-510x765.jpg",
      alt:   "AKKO 5075S Black on White - View 17",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-17.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-17-510x765.jpg",
      alt:   "AKKO 5075S Black on White - View 18",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-18.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-18-510x340.jpg",
      alt:   "AKKO 5075S Black on White - View 19",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-19.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-19-510x340.jpg",
      alt:   "AKKO 5075S Black on White - View 20",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-20.jpg",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-20-510x765.jpg",
      alt:   "AKKO 5075S Black on White - View 21",
    },
    {
      main:  "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-22.png",
      thumb: "https://akko.vn/wp-content/uploads/2026/02/Ban-phim-co-AKKO-5075S-Black-on-White-22-510x287.png",
      alt:   "AKKO 5075S Black on White - View 22",
    },
  ],

  // ---- Description tab: banner images ----
  descriptionImages: [
    { src: "https://akkogear.com.vn/wp-content/uploads/2026/02/1-11.png", alt: "Description 1" },
    { src: "https://akkogear.com.vn/wp-content/uploads/2026/02/2-11.png", alt: "Description 2" },
    { src: "https://akkogear.com.vn/wp-content/uploads/2026/02/3-8.png",  alt: "Description 3" },
    { src: "https://akkogear.com.vn/wp-content/uploads/2026/02/4-8.png",  alt: "Description 4" },
    { src: "https://akkogear.com.vn/wp-content/uploads/2026/02/5-6.png",  alt: "Description 5" },
    { src: "https://akkogear.com.vn/wp-content/uploads/2026/02/6-5.png",  alt: "Description 6" },
    { src: "https://akkogear.com.vn/wp-content/uploads/2026/02/7-5.png",  alt: "Description 7" },
    { src: "https://akkogear.com.vn/wp-content/uploads/2026/02/8-5.png",  alt: "Description 8" },
  ],

  // ---- Specs table rows ----
  specs: [
    { label: "Model",            value: "5075S Black on White" },
    { label: "Cấu Trúc",        value: "Gasket Mount" },
    { label: "Vỏ",              value: "ABS" },
    { label: "Màu sắc",         value: "Black on White" },
    { label: "Kết Nối",         value: "USB Type-C" },
    { label: "LED",              value: "RGB" },
    { label: "Switches",         value: "Akko Frost Pink" },
    { label: "Hot Swappable",    value: "Yes" },
    { label: "N-Key Rollover",   value: "Yes" },
    { label: "Keycaps",          value: "PBT Double Shot, Cherry Profile" },
    { label: "Trình điều khiển", value: "Akko Cloud Driver" },
    { label: "Side-Printed",     value: "Yes" },
    { label: "Kích Thước",       value: "335×146×42mm" },
    { label: "Trọng lượng",      value: "1.2Kg" },
    {
      label: "Phụ Kiện",
      value: "1 sách hướng dẫn sử dụng + 1 dây USB Type-C + 1 Che bụi bàn phím + Key puller, switch puller",
    },
  ],

  // ---- Related products (add/remove items freely) ----
  // `inStock: false` shows "Hết hàng" badge
  relatedProducts: [
    {
      img:     "https://akko.vn/wp-content/uploads/2020/06/gokuvg1-ava-247x247.jpg",
      title:   "Bàn phím cơ AKKO 3108 Dragon Ball Z – Vegeta (Akko switch)",
      price:   "1,699,000₫",
      inStock: false,
      href:    "#",
    },
    {
      img:     "https://akko.vn/wp-content/uploads/2020/03/10221-247x247.jpg",
      title:   "AKKO 3108S RGB Pro – Black (Cherry Switch)",
      price:   "2,399,000₫",
      inStock: false,
      href:    "#",
    },
    {
      img:     "https://akko.vn/wp-content/uploads/2020/06/10669-247x247.jpg",
      title:   "Bàn phím cơ AKKO 3068 SP Ocean Star (Cherry Switch)",
      price:   "1,499,000₫",
      inStock: false,
      href:    "#",
    },
    {
      img:     "https://akko.vn/wp-content/uploads/2019/12/3087_pika_1-247x247.jpg",
      title:   "Bàn phím cơ 3087 PIKACHU DETECTIVE",
      price:   "Liên hệ",
      inStock: false,
      href:    "#",
    },
    {
      img:     "https://akko.vn/wp-content/uploads/2020/06/10902-247x247.jpg",
      title:   "Bàn phím cơ AKKO 3108 Silent (Cherry switch)",
      price:   "1,899,000₫",
      inStock: false,
      href:    "#",
    },
    {
      img:     "https://akko.vn/wp-content/uploads/2020/03/10348-247x247.jpg",
      title:   "AKKO 3108S Pink Led White",
      price:   "1,749,000₫",
      inStock: false,
      href:    "#",
    },
    {
      img:     "https://akko.vn/wp-content/uploads/2020/03/10226-247x247.jpg",
      title:   "AKKO 3108S RGB Pro- Pink (Cherry switch)",
      price:   "2,399,000₫",
      inStock: false,
      href:    "#",
    },
    {
      img:     "https://akko.vn/wp-content/uploads/2020/06/3096-247x247.jpg",
      title:   "Bàn phím cơ AKKO 3096 – World Tour Tokyo R2",
      price:   "2,550,000₫",
      inStock: false,
      href:    "#",
    },
  ],
};

// 3. RENDER FUNCTIONS

/**
 * renderSidebar()
 * Builds the sidebar category menu from `sidebarMenu` data.
 * Supports up to 2 levels of nested dropdowns.
 */
function renderSidebar() {
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
 * renderGallery()
 * Builds the CSS-only radio-controlled image gallery.
 * Each image gets a numbered radio input + main image + thumbnail.
 */
function renderGallery() {
  const gallery   = document.getElementById("product-gallery");
  const thumbWrap = document.getElementById("thumbnail-container");
  if (!gallery || !thumbWrap) return;

  const total = product.images.length;

  // --- Hidden radio inputs (drive CSS :checked selectors) ---
  const radios = product.images
    .map((_, i) => `<input type="radio" name="gallery" id="img${i + 1}" class="image-radio"${i === 0 ? " checked" : ""} />`)
    .join("\n");

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
  // The prev arrow always points to the last image when on img1 (wraps around)
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
 * renderProductInfo()
 * Builds breadcrumb, title, price, promos, quantity form,
 * store links, category and social share buttons.
 */
function renderProductInfo() {
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
    { cls: "facebook", icon: "bi bi-facebook", url: `//www.facebook.com/sharer.php?u=${product.shareUrl}` },
    { cls: "twitter",  icon: "bi bi-twitter",  url: `//twitter.com/share?url=${product.shareUrl}` },
    { cls: "email",    icon: "bi bi-envelope",  url: `mailto:?body=${product.shareUrl}` },
    { cls: "pinterest",icon: "bi bi-pinterest", url: `//pinterest.com/pin/create/button/?url=${product.shareUrl}` },
    { cls: "linkedin", icon: "bi bi-linkedin",  url: `//www.linkedin.com/shareArticle?mini=true&url=${product.shareUrl}` },
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
 * renderTabs()
 * Builds the description tab (banner images + specs table)
 * and the reviews tab, plus the related products carousel.
 */
function renderTabs() {
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

// 4. INITIALISE — run all renderers when DOM is ready

document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  renderGallery();
  renderProductInfo();
  renderTabs();
});
