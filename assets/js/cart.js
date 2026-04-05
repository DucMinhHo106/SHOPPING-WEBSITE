/**
 * cart.js
 * Modular cart management using localStorage.
 * Provides: addToCart, removeFromCart, getCart, clearCart, updateCartBadge
 *
 * Usage: include this script before any page that needs cart functionality.
 */

const CART_KEY = "akko_cart";

// ─── Core Storage Functions ───────────────────────────────────────────────────

/**
 * Retrieves the current cart from localStorage.
 * @returns {Array} Array of cart item objects
 */
const getCart = () => {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error("getCart error:", e);
        return [];
    }
};

/**
 * Persists the cart array to localStorage.
 * @param {Array} cart
 */
const saveCart = (cart) => {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartBadge(); // sync badge every time cart changes
    } catch (e) {
        console.error("saveCart error:", e);
    }
};

/**
 * Adds a product to the cart. If the product already exists, increments quantity.
 * @param {Object} product - must have at least { id, name, price, image }
 */
const addToCart = (product) => {
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
        existing.quantity += product.quantity || 1; // ✅ FIX
    } else {
        cart.push({
            ...product,
            quantity: product.quantity || 1 // ✅ FIX
        });
    }

    saveCart(cart);
};

/**
 * Removes a product from the cart by its id.
 * @param {string} id - product id
 */
const removeFromCart = (id) => {
    const cart = getCart().filter((item) => item.id !== id);
    saveCart(cart);
};

/**
 * Updates the quantity of a cart item. Removes item if quantity drops to 0.
 * @param {string} id
 * @param {number} delta - positive to increment, negative to decrement
 */
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

/**
 * Updates all elements with class "cart-badge" with the current item count.
 * Call this after any cart mutation or on page load.
 */
const updateCartBadge = () => {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll(".cart-badge").forEach((el) => {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? "inline-block" : "none";
    });
};

/**
 * Parses a Vietnamese price string to a plain number.
 * e.g. "2.990.000₫" → 2990000
 * @param {string} priceStr
 * @returns {number}
 */
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