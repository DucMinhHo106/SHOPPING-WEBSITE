// Lấy params từ URL
const params = new URLSearchParams(window.location.search);
const category = params.get("category");
const id = params.get("id");

// Lấy container
const container = document.getElementById("product-detail");

// Check hợp lệ
if (!category || !data[category] || !data[category][id]) {
    container.innerHTML = "<p>Không tìm thấy sản phẩm</p>";
} 
else {
    const p = data[category][id];

    container.innerHTML = `
    <div class="detail">
        <img src="${p.image}">
        <h2>${p.name}</h2>
        <p>${p.price}</p>
        <button onclick="addToCart('${category}', ${id})">
            Thêm vào giỏ hàng
        </button>

        <br><br>
        <a href="products.html#${category}">⬅ Quay lại</a>
    </div>
`;
}
