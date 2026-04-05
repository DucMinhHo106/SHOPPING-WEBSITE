# Dynamic Product Integration — Modification Guide

## File Structure

Place these new/modified files into your project:

```
SHOPPING-WEBSITE/
├── data/
│   └── products.json              ← NEW: product data source
├── assets/
│   ├── css/
│   │   └── products-dynamic.css   ← NEW: card & detail styles
│   └── js/
│       ├── products.js            ← REPLACE existing file
│       └── product-detail.js      ← REPLACE existing file
├── products.html                  ← MODIFY (2 small changes)
└── product-detail.html            ← MODIFY (2 small changes)
```

---

## 1. products.html — 2 changes

### Change A: Add CSS import (in `<head>`, after existing CSS links)
```html
<link rel="stylesheet" href="./assets/css/products-dynamic.css">
```

### Change B: Remove the old `<script src="./assets/js/products.js">` at the bottom
and replace it with the new one (same src path, so just ensure the file is replaced):
```html
<script src="./assets/js/products.js"></script>
```
No HTML change needed — just replace the JS file on disk.

---

## 2. product-detail.html — 2 changes

### Change A: Add CSS import (in `<head>`, after existing CSS links)
```html
<link rel="stylesheet" href="./assets/css/products-dynamic.css">
```

### Change B: Replace the hardcoded product block inside `<main>`

Find this element (the large static product block):
```html
<div class="col-lg-9 product-main">
  <div class="row">
    ... (all the hardcoded image gallery, product info, tabs) ...
  </div>
</div>
```

Replace its inner content with a single dynamic container:
```html
<div class="col-lg-9 product-main">
  <div id="product-detail-dynamic">
    <!-- Product loaded dynamically by product-detail.js -->
  </div>
</div>
```

### Change C: Replace the old script tag at the bottom
Find:
```html
<script src="./assets/js/product-detail.js"></script>
<script src="./assets/js/details.js"></script>
```
Replace with just:
```html
<script src="./assets/js/product-detail.js"></script>
```
(details.js is no longer needed; its gallery logic is handled inside the dynamic renderer)

---

## 3. How product links work

In `products.js`, each card renders as:
```html
<a href="./product-detail.html?id=akko-3108-v3-black-gold">
  <div class="product-card">...</div>
</a>
```

In `product-detail.js`, on page load:
```js
const params = new URLSearchParams(window.location.search);
const productId = params.get('id'); // "akko-3108-v3-black-gold"
// fetches ./data/products.json, finds product by id, renders it
```

If `?id=` is missing or no product matches → displays: **"Product not found."**

---

## 4. Adding more products

Edit `data/products.json` and append new objects following this schema:

```json
{
  "id": "unique-slug",            // used in ?id= URL param
  "name": "Product Name",
  "price": 699000,                // sale price in VND
  "originalPrice": 990000,        // optional, for discount badge
  "image": "https://...",         // product image URL
  "category": "keyboard",         // keyboard | kit_ban_phim | mouse | keycap | switch | phu_kien
  "description": "Short description...",
  "promotions": ["Freeship...", "Bảo hành 12 tháng"],
  "specs": {
    "Model": "...",
    "Vỏ": "ABS",
    "Kết Nối": "USB Type-C"
    // add any key-value pairs
  }
}
```

No HTML changes needed — the JS reads the JSON and renders everything automatically.

---

## 5. Future scalability suggestions

| Improvement | Approach |
|---|---|
| **REST API** | Replace `fetch('./data/products.json')` with `fetch('https://your-api.com/products')` — zero other changes needed |
| **Filtering** | Add a `filterProducts(category, priceRange)` function that filters the loaded array before `renderProducts()` |
| **Search** | Add an input listener on the search bar that calls `renderProducts(products.filter(...))` |
| **Pagination** | Slice the products array: `renderProducts(products.slice(page * 12, (page+1) * 12))` |
| **Cart** | Store `{id, qty}` objects in `localStorage` and build a cart page that reads from JSON by id |
| **Backend** | Node.js/Express with `/api/products` endpoint reading from a DB — only `fetch()` URL changes in JS |
