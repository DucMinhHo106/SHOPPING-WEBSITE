// assets/js/cart-page.js

function formatPrice(num) {
    return num.toLocaleString('vi-VN') + '₫';
}

function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cart-items');

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = "<p>Giỏ hàng trống</p>";

        document.getElementById("js-cart-total").textContent = "0₫";
        document.getElementById("js-cart-subtotal").textContent = "0₫";

        return;
    }

    let html = "";

    cart.forEach(item => {
        html += `
      <div class="cart-item">
        <button class="cart-remove" onclick="removeItem('${item.id}')">×</button>

        <div class="cart-product">
          <img class="cart-image" src="../${item.image}" />
          <span class="cart-name">${item.name}</span>
        </div>

        <div class="cart-price">
          ${formatPrice(item.price)}
        </div>

        <div class="cart-qty">
          <button onclick="changeQty('${item.id}', -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty('${item.id}', 1)">+</button>
        </div>

        <div class="cart-subtotal">
          ${formatPrice(item.price * item.quantity)}
        </div>
      </div>
    `;
    });

    container.innerHTML = html;

    // update total
    const total = getCartTotal();

    document.getElementById("js-cart-total").textContent = formatPrice(total);
    document.getElementById("js-cart-subtotal").textContent = formatPrice(total);
}

// ===== actions =====

function removeItem(id) {
    removeFromCart(id);
    renderCart();
}

function changeQty(id, delta) {
    updateQuantity(id, delta);
    renderCart();
}

// ===== init =====
document.addEventListener("DOMContentLoaded", renderCart);