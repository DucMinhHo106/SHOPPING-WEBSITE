function formatPrice(num) {
  return num.toLocaleString('vi-VN') + '₫';
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-items');

  if (!container) {
    console.log("Không tìm thấy #cart-items");
    return;
  }

  if (cart.length === 0) {
    container.innerHTML = "<p style=\"text-align: center; padding-top: 20px;\">🛒 Giỏ hàng trống</p>";
    document.getElementById("js-cart-total").textContent = "0₫";
    document.getElementById("js-cart-subtotal").textContent = "0₫";
    return;
  }

  let html = "";

  cart.forEach(item => {
    html += `
      <div class="cart-item">
        <button onclick="removeItem('${item.id}')">×</button>

        <img src="../${item.image}" width="60">
        <span>${item.name}</span>

        <span>${formatPrice(item.price)}</span>

        <button onclick="changeQty('${item.id}', -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQty('${item.id}', 1)">+</button>

        <span>${formatPrice(item.price * item.quantity)}</span>
      </div>
    `;
  });

  container.innerHTML = html;

  const total = getCartTotal();
  document.getElementById("js-cart-total").textContent = formatPrice(total);
  document.getElementById("js-cart-subtotal").textContent = formatPrice(total);
}

function removeItem(id) {
  removeFromCart(id);
  renderCart();
}

function changeQty(id, delta) {
  updateQuantity(id, delta);
  renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);