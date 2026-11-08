# AKKO Shopping Website

Website bán bàn phím và phụ kiện, xây dựng cho một môn học ở đại học. Hồ Nguyễn Đức Minh thực hiện phần lớn công việc hoàn thiện website.

**Demo:** https://ducminhho106.github.io/SHOPPING-WEBSITE/

## Chức năng
- Danh mục sản phẩm, tìm kiếm/lọc và trang chi tiết.
- Thêm vào giỏ, đổi số lượng, xóa sản phẩm và tính tổng; giỏ lưu bằng localStorage.
- Giao diện đăng ký/đăng nhập mô phỏng trên trình duyệt.
- Các trang giới thiệu và liên hệ.

## Công nghệ
HTML, CSS, JavaScript; Bootstrap và các thư viện icon được tải từ CDN. Cần Internet để tải các tài nguyên bên ngoài.

## Chạy local

Cần Python 3. Tại thư mục gốc repo, chạy:

```powershell
python -m http.server 8000
```

Mở http://localhost:8000/. Không cần npm hoặc bước build. Dùng HTTP server thay vì mở trực tiếp file HTML vì trang có tải dữ liệu/thành phần bằng `fetch`.

## Cấu trúc
- `index.html`: trang chủ.
- `HTML/`: danh mục, chi tiết, giỏ hàng và các trang nội dung.
- `CSS/`: style theo trang/thành phần.
- `JS/products.js`, `JS/product-detail.js`: hiển thị và tương tác sản phẩm.
- `JS/cart.js`, `JS/cart-page.js`: dữ liệu giỏ và giao diện giỏ.
- `JS/auth.js`: tài khoản mô phỏng; `IMG/`: hình ảnh.

## Kiểm tra thủ công
1. Từ trang chủ, mở danh mục và chi tiết một sản phẩm.
2. Thêm vào giỏ, đổi số lượng, kiểm tra tổng tiền và tải lại trang.
3. Xóa sản phẩm và kiểm tra trạng thái giỏ trống.
4. Thử đăng ký/đăng nhập bằng thông tin giả; kiểm tra ở kích thước mobile.

## Phạm vi và giới hạn
Đây là dự án học tập, không phải cửa hàng chính thức của AKKO. Không có backend xác thực hay xử lý thanh toán thật. `auth.js` lưu cả tài khoản/mật khẩu trong localStorage để mô phỏng; không nhập mật khẩu thật hoặc dữ liệu cá nhân. Dữ liệu trình duyệt có thể bị xóa hoặc chỉnh sửa. Chưa có bộ kiểm thử tự động.
