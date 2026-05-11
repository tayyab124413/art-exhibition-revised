/* ==============================================
   Art Exhibition – jsFunctions.js  (v3 – no fetch)
   All nav is now embedded per page; this file handles:
   Active links, toggleMenu, forms, counters, chart,
   dark mode, cart, modals, toast.
   ============================================== */

document.addEventListener("DOMContentLoaded", function () {
  highlightActiveLink();
  initDarkModeToggle();
  updateCartBadge();
  initContactForm();
  initLoginForm();
  initSignupForm();
  initCounters();
  initDashboardChart();
  initDashboardActions();
  initCartPage();
});

/* ------------------------------------------------
   ACTIVE LINK HIGHLIGHT
------------------------------------------------ */
function highlightActiveLink() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#nav-menu a").forEach(function (link) {
    const href = (link.getAttribute("href") || "").split("/").pop();
    if (href === page || (page === "index.html" && href === "home.html")) {
      link.classList.add("active");
    }
  });
}

/* ------------------------------------------------
   MOBILE MENU TOGGLE
------------------------------------------------ */
function toggleMenu() {
  var menu = document.getElementById("nav-menu");
  var btn   = document.querySelector(".menu-toggle");
  if (menu) {
    menu.classList.toggle("open");
    if (btn) btn.textContent = menu.classList.contains("open") ? "✕" : "☰";
  }
}

/* ------------------------------------------------
   TOAST NOTIFICATION
------------------------------------------------ */
function showToast(msg, duration) {
  duration = duration || 4000;
  var t = document.getElementById("toast-notification");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast-notification";
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(function () { t.classList.remove("show"); }, duration);
}

/* ------------------------------------------------
   DARK MODE TOGGLE
------------------------------------------------ */
function initDarkModeToggle() {
  var btn = document.getElementById("dark-mode-toggle");
  if (!btn) return;
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    btn.textContent = "☀️";
  }
  btn.addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme");
    if (cur === "dark") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      btn.textContent = "🌙";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      btn.textContent = "☀️";
    }
  });
}

/* ------------------------------------------------
   CART — localStorage based
------------------------------------------------ */
function getCart() {
  return JSON.parse(localStorage.getItem("ae_cart") || "[]");
}
function saveCart(cart) {
  localStorage.setItem("ae_cart", JSON.stringify(cart));
}
function addToCart(id, name, price, img) {
  var cart = getCart();
  var item = cart.find(function (i) { return i.id === id; });
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id: id, name: name, price: price, img: img, qty: 1 });
  }
  saveCart(cart);
  updateCartBadge();
  showToast("🛒 \"" + name + "\" added to cart!");
}
function updateCartBadge() {
  var cart  = getCart();
  var total = cart.reduce(function (s, i) { return s + i.qty; }, 0);
  document.querySelectorAll(".cart-count").forEach(function (el) {
    el.textContent = total;
    el.style.display = total ? "inline-block" : "none";
  });
}
function removeFromCart(id) {
  var cart = getCart().filter(function (i) { return i.id !== id; });
  saveCart(cart);
  initCartPage();
  updateCartBadge();
}
function changeQty(id, delta) {
  var cart = getCart();
  var item = cart.find(function (i) { return i.id === id; });
  if (item) {
    item.qty = Math.max(1, item.qty + delta);
    saveCart(cart);
    initCartPage();
    updateCartBadge();
  }
}
function clearCart() {
  if (confirm("Clear your entire cart?")) {
    localStorage.removeItem("ae_cart");
    initCartPage();
    updateCartBadge();
    showToast("Cart cleared.");
  }
}

/* Render Cart Page */
function initCartPage() {
  var wrap = document.getElementById("cart-items-wrap");
  if (!wrap) return;
  var cart = getCart();
  var summary = document.getElementById("cart-summary");
  if (!cart.length) {
    wrap.innerHTML =
      '<p class="text-center" style="padding:40px 0;font-size:1.1rem;color:var(--text-muted);">Your cart is empty. <a href="exhibits.html" class="link-button">Browse Gallery →</a></p>';
    if (summary) summary.innerHTML = "";
    return;
  }
  var total = 0;
  var html  = "";
  cart.forEach(function (item) {
    var sub = item.price * item.qty;
    total += sub;
    html += '<div class="cart-item">' +
      '<img src="' + (item.img || "../sources/image1.png") + '" alt="' + item.name + '">' +
      '<div class="cart-item-info">' +
        '<h4>' + item.name + '</h4>' +
        '<p style="margin:0;color:var(--brand-accent);font-weight:700;">$' + item.price.toFixed(2) + ' each</p>' +
      '</div>' +
      '<div class="cart-item-controls">' +
        '<button class="tiny-button border-button" onclick="changeQty(\'' + item.id + '\',-1)">−</button>' +
        '<span style="font-weight:700;min-width:28px;text-align:center;">' + item.qty + '</span>' +
        '<button class="tiny-button border-button" onclick="changeQty(\'' + item.id + '\',1)">+</button>' +
        '<button class="tiny-button danger-button" onclick="removeFromCart(\'' + item.id + '\')">Remove</button>' +
      '</div>' +
      '<div class="cart-item-total">$' + sub.toFixed(2) + '</div>' +
    '</div>';
  });
  wrap.innerHTML = html;
  if (summary) {
    summary.innerHTML =
      '<div class="cart-summary-box">' +
        '<div class="flex-between"><span>Subtotal</span><span>$' + total.toFixed(2) + '</span></div>' +
        '<div class="flex-between"><span>Shipping</span><span style="color:var(--brand-accent);">Free</span></div>' +
        '<hr class="divider" style="margin:14px 0;">' +
        '<div class="flex-between" style="font-size:1.2rem;font-weight:800;"><span>Total</span><span style="color:var(--brand-accent);">$' + total.toFixed(2) + '</span></div>' +
        '<button class="lg-button accent-button" style="width:100%;margin-top:20px;" onclick="checkoutCart()">Proceed to Checkout →</button>' +
        '<button class="sm-button" style="width:100%;margin-top:10px;background:transparent;color:var(--text-muted);border:1px solid var(--border-light);" onclick="clearCart()">Clear Cart</button>' +
      '</div>';
  }
}
function checkoutCart() {
  showToast("✓ Order placed successfully! Thank you for your purchase.", 5000);
  setTimeout(function () {
    localStorage.removeItem("ae_cart");
    updateCartBadge();
    initCartPage();
  }, 1500);
}

/* ------------------------------------------------
   CONTACT FORM
------------------------------------------------ */
function initContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    showToast("✓ Message sent! We'll respond within 24 hours.", 5000);
    form.reset();
  });
}

/* ------------------------------------------------
   LOGIN FORM
------------------------------------------------ */
function initLoginForm() {
  var form = document.getElementById("login-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = (document.getElementById("email") || {}).value || "";
    var pass  = (document.getElementById("password") || {}).value || "";
    if (!email.trim() || !pass.trim()) {
      showToast("⚠ Please fill in all fields.");
      return;
    }
    showToast("✓ Signing you in…");
    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 1000);
  });
}

/* ------------------------------------------------
   SIGNUP FORM
------------------------------------------------ */
function initSignupForm() {
  var form = document.getElementById("signup-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var pass    = (document.getElementById("password") || {}).value || "";
    var confirm = (document.getElementById("confirm-password") || {}).value || "";
    if (pass !== confirm) {
      showToast("⚠ Passwords do not match. Please try again.");
      return;
    }
    showToast("✓ Account created! Redirecting to login…");
    setTimeout(function () {
      window.location.href = "login.html";
    }, 1500);
  });
}

/* ------------------------------------------------
   ANIMATED COUNTERS (IntersectionObserver)
------------------------------------------------ */
function initCounters() {
  var els = document.querySelectorAll(".counter-value");
  if (!els.length) return;
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el     = entry.target;
      var target = parseInt(el.getAttribute("data-target") || "0");
      var steps  = 60;
      var inc    = target / steps;
      var cur    = 0;
      var timer  = setInterval(function () {
        cur += inc;
        if (cur >= target) { cur = target; clearInterval(timer); }
        el.textContent = Math.floor(cur).toLocaleString();
      }, 25);
      obs.unobserve(el);
    });
  }, { threshold: 0.3 });
  els.forEach(function (el) { obs.observe(el); });
}

/* ------------------------------------------------
   DASHBOARD CANVAS CHART
------------------------------------------------ */
function initDashboardChart() {
  var canvas = document.getElementById("visits-chart");
  if (!canvas) return;
  var ctx    = canvas.getContext("2d");
  var data   = [135, 210, 172, 260, 198, 330, 295];
  var labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var max    = Math.max.apply(null, data);
  var W = canvas.width, H = canvas.height;
  var pad = { top: 30, bottom: 48, left: 52, right: 20 };
  var cW  = W - pad.left - pad.right;
  var cH  = H - pad.top  - pad.bottom;
  var gap = cW / data.length;
  var bW  = gap * 0.6;

  ctx.clearRect(0, 0, W, H);

  /* Grid */
  for (var g = 0; g <= 5; g++) {
    var gy = pad.top + (cH / 5) * g;
    ctx.strokeStyle = "#e8e8e0"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad.left, gy); ctx.lineTo(W - pad.right, gy); ctx.stroke();
    ctx.fillStyle = "#999"; ctx.font = "11px Inter,sans-serif"; ctx.textAlign = "right";
    ctx.fillText(Math.round(max * (5 - g) / 5), pad.left - 6, gy + 4);
  }

  /* Bars */
  data.forEach(function (val, i) {
    var bH  = (val / max) * cH;
    var x   = pad.left + i * gap + (gap - bW) / 2;
    var y   = pad.top + cH - bH;
    var gr  = ctx.createLinearGradient(0, y, 0, y + bH);
    gr.addColorStop(0, "#d4af37"); gr.addColorStop(1, "#9a7b1a");
    ctx.fillStyle = gr;
    var r = 5;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + bW - r, y);
    ctx.quadraticCurveTo(x + bW, y, x + bW, y + r);
    ctx.lineTo(x + bW, y + bH); ctx.lineTo(x, y + bH);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#333"; ctx.font = "bold 11px Inter,sans-serif"; ctx.textAlign = "center";
    ctx.fillText(val, x + bW / 2, y - 8);
    ctx.fillStyle = "#888"; ctx.font = "12px Inter,sans-serif";
    ctx.fillText(labels[i], x + bW / 2, H - 12);
  });
}

/* ------------------------------------------------
   DASHBOARD ACTIONS
------------------------------------------------ */
function initDashboardActions() {
  document.querySelectorAll(".btn-delete-artwork").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var row  = btn.closest("tr");
      var name = row ? (row.querySelector(".artwork-name") || {}).textContent : "this item";
      if (confirm("Delete \"" + name + "\"? This cannot be undone.")) {
        if (row) { row.style.opacity = "0.35"; row.style.pointerEvents = "none"; }
        showToast("\"" + name + "\" deleted.");
      }
    });
  });

  var addBtn = document.getElementById("btn-add-artwork");
  if (addBtn) addBtn.addEventListener("click", function () { openModal("modal-add-artwork"); });
}

/* ------------------------------------------------
   TABLE SEARCH (dashboard)
------------------------------------------------ */
function filterTable(q) {
  document.querySelectorAll("#artworks-table tbody tr").forEach(function (row) {
    row.style.display = row.textContent.toLowerCase().includes(q.toLowerCase()) ? "" : "none";
  });
}

/* ------------------------------------------------
   ADD ARTWORK FORM (dashboard modal)
------------------------------------------------ */
function handleAddArtwork(e) {
  e.preventDefault();
  var name = (document.getElementById("art-name") || {}).value || "Artwork";
  closeModal("modal-add-artwork");
  showToast("✓ \"" + name + "\" added to collection!");
  e.target.reset();
}

/* ------------------------------------------------
   MODAL HELPERS
------------------------------------------------ */
function openModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.add("open");
}
function closeModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove("open");
}

/* ------------------------------------------------
   GALLERY FILTER (exhibits page)
------------------------------------------------ */
function filterGallery(cat, btn) {
  document.querySelectorAll(".gallery-card").forEach(function (card) {
    card.style.display = (cat === "all" || card.dataset.category === cat) ? "flex" : "none";
  });
  document.querySelectorAll(".filter-btn").forEach(function (b) {
    b.classList.remove("accent-button");
    b.classList.add("border-button");
  });
  btn.classList.remove("border-button");
  btn.classList.add("accent-button");
}
