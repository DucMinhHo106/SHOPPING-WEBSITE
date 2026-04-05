const fs = require('fs');
const path = require('path');

// ====== CONFIG ======
const ROOT_DIR = './assets/images/keyboard'; // thư mục chứa tất cả sản phẩm
const OUTPUT_FILE = 'products.json';

// ====== PARSE GIÁ ======
function parseGia(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  const name = lines[0];
  const prices = lines[1].match(/[\d,]+/g);

  const originalPrice = parseInt(prices[0].replace(/,/g, ''));
  const price = parseInt(prices[1].replace(/,/g, ''));

  const promoIndex = lines.findIndex(l =>
    l.toLowerCase().includes('khuyến mãi')
  );

  const promotions = promoIndex !== -1
    ? lines.slice(promoIndex + 1)
    : [];

  return { name, price, originalPrice, promotions };
}

// ====== PARSE SPECS ======
function parseSpecs(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const specs = {};

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split('\t');
    if (parts.length >= 2) {
      specs[parts[0]] = parts.slice(1).join(' ');
    }
  }

  return specs;
}

// ====== GENERATE ID ======
function generateId(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
}

// ====== MAIN ======
const folders = fs.readdirSync(ROOT_DIR);

const products = [];

folders.forEach(folder => {
  const folderPath = path.join(ROOT_DIR, folder);

  if (!fs.statSync(folderPath).isDirectory()) return;

  try {
    const files = fs.readdirSync(folderPath);

    const giaFile = files.find(f => f.toLowerCase().includes('gia'));
    const dataFile = files.find(f => f.toLowerCase().includes('data'));
    const imageFile = files.find(f =>
      f.match(/\.(png|jpg|jpeg|webp)$/i)
    );

    if (!giaFile || !dataFile || !imageFile) {
      console.log(`❌ Thiếu file trong: ${folder}`);
      return;
    }

    const giaRaw = fs.readFileSync(path.join(folderPath, giaFile), 'utf-8');
    const dataRaw = fs.readFileSync(path.join(folderPath, dataFile), 'utf-8');

    const gia = parseGia(giaRaw);
    const specs = parseSpecs(dataRaw);

    const id = generateId(gia.name);

    const product = {
      id,
      name: gia.name,
      price: gia.price,
      originalPrice: gia.originalPrice,
      image: `assets/images/keyboard/${folder}/${imageFile}`,
      category: "keyboard",
      description: gia.name,
      promotions: gia.promotions,
      specs
    };

    products.push(product);
    console.log(`✅ Done: ${folder}`);

  } catch (err) {
    console.log(`❌ Error folder ${folder}:`, err.message);
  }
});

// ====== SAVE ======
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2));

console.log("\n🚀 DONE ALL → products.json");