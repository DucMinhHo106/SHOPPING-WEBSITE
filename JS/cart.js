/**
 * cart.js
 * Modular cart management using localStorage.
 * Provides: addToCart, removeFromCart, getCart, clearCart, updateCartBadge
 *
 * Usage: include this script before any page that needs cart functionality.
 */

const CART_KEY = "akko_cart";

const getCart = () => {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : [];
    } 
    catch (e) {
        console.error("getCart error:", e);
        return [];
    }
};

const saveCart = (cart) => {
    console.log("Saving:", cart);

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const addToCart = (product) => {
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
        existing.quantity += product.quantity || 1;
        existing.price = product.price;
    } 
    else {
        cart.push({
            ...product,
            quantity: product.quantity || 1
        });
        alert("Cập nhật giỏ hàng thành công");
    }

    saveCart(cart);
};

const removeFromCart = (id) => {
    const cart = getCart().filter((item) => item.id !== id);
    saveCart(cart);
};

const updateQuantity = (id, delta) => {
    const cart = getCart();
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        removeFromCart(id);
        return;
    }

    saveCart(cart);
};

/**
 * Clears the entire cart.
 */
const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    updateCartBadge();
};

// ─── UI Helpers ───────────────────────────────────────────────────────────────

const updateCartBadge = () => {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll(".cart-badge").forEach((el) => {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? "inline-block" : "none";
    });
};

const parsePriceVN = (priceStr) =>
    parseInt(priceStr.replace(/[^\d]/g, ""), 10) || 0;

/**
 * Calculates the total price of all items in the cart.
 * @returns {number}
 */
const getCartTotal = () => {
    return getCart().reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
};

// ─── Init badge on every page ─────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", updateCartBadge);