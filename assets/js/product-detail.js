const data = window.openerData || {}; 
// hoặc copy lại object data của bạn vào đây (cách đơn giản nhất)

function getParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

window.onload = () => {
    const category = getParam("category");
    const id = getParam("id");

    if (!category || !data[category]) return;

    const product = data[category][id];
    if (!product) return;

    document.getElementById("product-img").src = product.image;
    document.getElementById("product-name").innerText = product.name;
    document.getElementById("product-price").innerText = product.price;
};