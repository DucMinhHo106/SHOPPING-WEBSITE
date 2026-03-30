//  Hệ thống đăng ký / đăng nhập - sử dụng localStorage để lưu thông tin người dùng

const AUTH = {
  USERS_KEY: 'akko_users',
  SESSION_KEY: 'akko_session',

  // ---------- helpers ----------

  getUsers() {
    try { return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]'); }
    catch { return []; }
  },

  saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },

  getSession() {
    try { return JSON.parse(localStorage.getItem(this.SESSION_KEY) || 'null'); }
    catch { return null; }
  },

  saveSession(session) {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  },

  clearSession() {
    localStorage.removeItem(this.SESSION_KEY);
  },

  // ---------- register ----------

  register(email, password) {
    if (!email || !password) return { ok: false, msg: 'Vui lòng điền đầy đủ thông tin.' };
    if (password.length < 6)  return { ok: false, msg: 'Mật khẩu phải có ít nhất 6 ký tự.' };

    const users = this.getUsers();
    if (users.find(u => u.email === email)) {
      return { ok: false, msg: 'Email này đã được đăng ký.' };
    }

    const newUser = { email, password, createdAt: Date.now() };
    users.push(newUser);
    this.saveUsers(users);

    // tự động đăng nhập sau khi đăng ký
    const session = { email, loginAt: Date.now() };
    this.saveSession(session);
    return { ok: true, session };
  },

  // ---------- login ----------

  login(emailOrUsername, password, remember) {
    if (!emailOrUsername || !password) return { ok: false, msg: 'Vui lòng điền đầy đủ thông tin.' };

    const users = this.getUsers();
    const user = users.find(
      u => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
    );

    if (!user) return { ok: false, msg: 'Tên đăng nhập hoặc mật khẩu không đúng.' };

    const session = { email: user.email, loginAt: Date.now(), remember };
    this.saveSession(session);
    return { ok: true, session };
  },

  // ---------- logout ----------

  logout() {
    this.clearSession();
    updateNavbar();
  }
};

//  UI – Cập nhật navbar theo trạng thái đăng nhập

function updateNavbar() {
  const session = AUTH.getSession();
  const loginLink = document.querySelector('.login-link');
  if (!loginLink) return;

  if (session) {
    const shortName = session.email.split('@')[0];
    loginLink.innerHTML = `
      <span class="user-greeting">
        <i class="bi bi-person-circle"></i> ${shortName}
      </span>
      <span class="logout-btn" id="logoutBtn" style="cursor:pointer; margin-left:6px; color:#c0392b;">
        | Đăng xuất
      </span>`;
    loginLink.removeAttribute('data-bs-toggle');
    loginLink.removeAttribute('data-bs-target');
    loginLink.style.cursor = 'default';

    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      AUTH.logout();
    });
  } 
  else {
    // Hiện lại nút ĐĂNG NHẬP mở modal
    loginLink.innerHTML = '| ĐĂNG NHẬP';
    loginLink.setAttribute('data-bs-toggle', 'modal');
    loginLink.setAttribute('data-bs-target', '#authModal');
  }
}

//  Gắn sự kiện cho form sau khi auth-modal.html được load xong

function initAuthModal() {

  // --- form đăng nhập ---
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const userVal  = document.getElementById('loginUser').value.trim();
      const passVal  = document.getElementById('loginPass').value;
      const remember = document.getElementById('rememberMe')?.checked || false;
      const errEl    = document.getElementById('loginError');

      const result = AUTH.login(userVal, passVal, remember);
      if (result.ok) {
        // đóng modal và cập nhật navbar
        const modal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
        modal?.hide();
        updateNavbar();
      } 
      else {
        errEl.textContent = result.msg;
      }
    });
  }

  // --- form đăng ký ---
  const registerBtn = document.getElementById('registerBtn');
  if (registerBtn) {
    registerBtn.addEventListener('click', () => {
      const emailVal = document.getElementById('registerEmail').value.trim();
      const passVal  = document.getElementById('registerPass').value;
      const errEl    = document.getElementById('registerError');

      const result = AUTH.register(emailVal, passVal);
      if (result.ok) {
        const modal = bootstrap.Modal.getInstance(document.getElementById('authModal'));
        modal?.hide();
        updateNavbar();
      } 
      else {
        errEl.textContent = result.msg;
      }
    });
  }
}

//  Khởi chạy khi trang load

document.addEventListener('DOMContentLoaded', () => {
  // Cập nhật navbar ngay khi load xong
  updateNavbar();

  // auth-modal được fetch() động trong index.html
  const container = document.getElementById('auth-container');
  if (container) {
    const observer = new MutationObserver(() => {
      if (document.getElementById('authModal')) {
        initAuthModal();
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true });
  } 
  else {
    initAuthModal();
  }
});