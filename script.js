// Datos del producto de demostración
const PRODUCTS = [
  {id: 'p1', title:'Manzana(1kg)', price: 6.50, category: 'fruta', img:'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=600&auto=format&fit=crop&crop=entropy'},
  {id: 'p2', title:'Plátano (1kg)', price: 4.00, category: 'fruta', img:'https://dontorcuatomarket.com/cdn/shop/products/1_500x.png?v=1587158137'},
  {id: 'p3', title:'Zanahoria (500g)', price: 3.00, category: 'verdura', img:'https://previews.123rf.com/images/gdolgikh/gdolgikh1709/gdolgikh170900523/86269945-fresh-organic-carrot.jpg'},
  {id: 'p4', title:'Quinua (500g)', price: 8.00, category: 'grano', img:'https://e-an.americatv.com.pe/util-e-interesante-hallan-pesticidas-quinua-peruana-que-se-vende-como-organica-n498454-938x528-1086861.jpg'},
  {id: 'p5', title:'Lechuga', price: 2.50, category: 'verdura', img:'https://www.gastronomiavasca.net/uploads/image/file/3381/lechuga.jpg'},
  {id: 'p6', title:'Inka kola en lata ', price: 1.00, category: 'bebidas', img:'https://thumbs.dreamstime.com/b/un-taz%C3%B3n-lleno-de-latas-peruanas-inca-kola-la-haya-pa%C3%ADses-bajos-abril-una-las-bebidas-m%C3%A1s-populares-en-per%C3%BA-es-probablemente-160359740.jpg'},
  {id: 'p7', title:'Arroz ', price: 2.00, category: 'grano', img:'https://cofepasa.com/wp-content/uploads/2021/04/arroz-portal.jpg'},
  {id: 'p8', title:'Maiz', price: 3.00, category: 'grano', img:'https://humanidades.com/wp-content/uploads/2018/10/maiz-2-1-e1581908276964.jpg'},
  {id: 'p9', title:'Botella de agua', price: 0.95, category: 'bebidas', img:'https://media.istockphoto.com/id/1089173910/es/foto/agua-de-mujer.jpg?s=612x612&w=0&k=20&c=EKJxmzAon5bdy5aGwpUUe0PpoS-JJdpRat5jkawUgQU='},
  {id: 'p10', title:'Miel de Abeja', price: 2.00, category: 'endulzantes', img:'https://www.udep.edu.pe/wp-content/uploads/sites/49/media/2020/11/Miel-de-palo.jpg'}
];

// Carrito simple en estado local
let cart = {};

function renderProducts(list = PRODUCTS){
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  list.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4';
    col.innerHTML = `
      <div class="card card-product h-100">
        <img src="${p.img}" class="card-img-top" alt="${p.title}" style="height:180px; object-fit:cover; border-top-left-radius:12px; border-top-right-radius:12px;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.title}</h5>
          <p class="mb-1 price">S/ ${p.price.toFixed(2)}</p>
          <p class="text-muted small mb-3">${p.category}</p>
          <div class="mt-auto d-grid gap-2">
            <button class="btn btn-eco" onclick="addToCart('${p.id}')">Agregar al carrito</button>
          </div>
        </div>
      </div>`;
    grid.appendChild(col);
  });
}

function addToCart(id){
  cart[id] = (cart[id]||0) + 1;
  showCartCount();
  showToast('Añadido al carrito');
}

function showCartCount(){
  const count = Object.values(cart).reduce((s,n)=>s+n,0);
  document.getElementById('cartCount').innerText = count;
}

function toggleCart(){
  const off = document.getElementById('cartOffcanvas');
  off.classList.toggle('show');
  off.style.visibility = off.classList.contains('show') ? 'visible' : 'hidden';
  renderCartItems();
}

// Representar los artículos del carrito en el margen lateral
function renderCartItems(){
  const container = document.getElementById('cartItems');
  container.innerHTML = '';
  if(Object.keys(cart).length === 0){
    container.innerHTML = '<p class="text-muted">Tu carrito está vacío.</p>';
    document.getElementById('cartTotal').innerText = 'S/ 0.00';
    return;
  }
  let total = 0;
  for(const id of Object.keys(cart)){
    const p = PRODUCTS.find(x=>x.id===id);
    const qty = cart[id];
    total += p.price * qty;
    const div = document.createElement('div');
    div.className = 'd-flex align-items-center mb-3';
    div.innerHTML = `
      <img src="${p.img}" style="width:64px;height:64px;object-fit:cover;border-radius:8px" class="me-3">
      <div class="flex-fill">
        <strong>${p.title}</strong>
        <div class="small text-muted">S/ ${p.price.toFixed(2)} x ${qty}</div>
      </div>
      <div class="text-end">
        <div class="btn-group mb-1" role="group">
          <button class="btn btn-sm btn-outline-secondary" onclick="changeQty('${id}', -1)">-</button>
          <button class="btn btn-sm btn-outline-secondary" onclick="changeQty('${id}', 1)">+</button>
        </div>
        <div><button class="btn btn-link btn-sm text-danger" onclick="removeItem('${id}')">Eliminar</button></div>
      </div>
    `;
    container.appendChild(div);
  }
  document.getElementById('cartTotal').innerText = 'S/ ' + total.toFixed(2);
}

function changeQty(id, delta){
  cart[id] = (cart[id]||0) + delta;
  if(cart[id] <= 0) delete cart[id];
  renderCartItems();
  showCartCount();
}

function removeItem(id){
  delete cart[id];
  renderCartItems();
  showCartCount();
}

function clearCart(){
  cart = {};
  renderCartItems();
  showCartCount();
  toggleCart();
}

// Finalizar compra
function openCheckout(){
  const modalEl = document.getElementById('checkoutModal');
  const modal = new bootstrap.Modal(modalEl);
  // rellenar resumen
  const summary = document.getElementById('checkoutSummary');
  if(Object.keys(cart).length===0){
    summary.innerHTML = '<p class="text-muted">Carrito vacío.</p>';
    modal.show();
    return;
  }
  let html = '<ul class="list-group mb-2">';
  let total = 0;
  for(const id of Object.keys(cart)){
    const p = PRODUCTS.find(x=>x.id===id);
    const qty = cart[id];
    total += p.price * qty;
    html += `<li class="list-group-item d-flex justify-content-between align-items-center">${p.title} <span>S/ ${ (p.price*qty).toFixed(2) }</span></li>`;
  }
  html += `</ul><div class="d-flex justify-content-between"><strong>Total:</strong><h5>S/ ${total.toFixed(2)}</h5></div>`;
  summary.innerHTML = html;
  document.getElementById('payAmount').value = total.toFixed(2);
  modal.show();
}

// Simple toast
function showToast(msg){
  const el = document.createElement('div');
  el.className = 'toast align-items-center show';
  el.style.position = 'fixed';
  el.style.right = '20px';
  el.style.bottom = '20px';
  el.style.zIndex = 9999;
  el.innerHTML = `<div class="d-flex"><div class="toast-body">${msg}</div><button class="btn-close btn-close-white ms-2 me-2" onclick="this.parentElement.parentElement.remove()"></button></div>`;
  document.body.appendChild(el);
  setTimeout(()=>el.remove(), 2500);
}

// Generar un código QR para el pago
let currentQR = null;
function generatePaymentQR(){
  const phone = document.getElementById('payPhone').value.trim();
  const amount = parseFloat(document.getElementById('payAmount').value || 0).toFixed(2);
  const qrContainer = document.getElementById('qrContainer');
  qrContainer.innerHTML = '';
  if(!phone || amount<=0){
    qrContainer.innerHTML = '<div class="text-danger">Ingrese un número y un monto válidos.</div>';
    return;
  }
  // Crea una carga útil fácil de usar y una carga útil «universal»; aplicaciones como Yape/Plin suelen aceptar simplemente un teléfono + importe.
  const payload = `PAYMENT|phone:${phone}|amount:${amount}|ref:EcoMarket-${Date.now()}`;
  // Use qrcode.js to draw
  currentQR = new QRCode(qrContainer, { text: payload, width: 200, height:200 });
  // Mostrar también un enlace copiable (no es un enlace oficial de Yape/Plin, pero resulta útil).
  const link = document.createElement('div');
  link.className = 'mt-2';
  link.innerHTML = `<input class="form-control" readonly value="${payload}" onclick="this.select()">`;
  qrContainer.appendChild(link);
  showToast('QR generado. Abre Yape o Plin y escanéalo.');
}

// Filtros y búsqueda
function applyFilters(){
  const cat = document.getElementById('filterCategory').value;
  let filtered = PRODUCTS.slice();
  if(cat) filtered = filtered.filter(p=>p.category===cat);
  renderProducts(filtered);
}

function resetFilters(){ document.getElementById('filterCategory').value=''; renderProducts(); }

function applySearch(){
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  if(!q) return renderProducts();
  const filtered = PRODUCTS.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  renderProducts(filtered);
}

// Init
renderProducts();
showCartCount();

document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-list");

  fetch("api/products.json")
    .then(res => res.json())
    .then(products => {
      productContainer.innerHTML = "";
      products.forEach(p => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";
        card.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img src="${p.image}" class="card-img-top" alt="${p.name}">
            <div class="card-body">
              <h5 class="card-title">${p.name}</h5>
              <p class="card-text">${p.description}</p>
              <p class="fw-bold text-success">S/ ${p.price.toFixed(2)}</p>
              <button class="btn btn-success w-100 add-to-cart" 
                      data-id="${p.id}" data-name="${p.name}" 
                      data-price="${p.price}" data-image="${p.image}">
                Agregar al carrito
              </button>
            </div>
          </div>
        `;
        productContainer.appendChild(card);
      });

      document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", e => {
          const { id, name, price, image } = e.target.dataset;
          addToCart({ id, name, price: parseFloat(price), image });
        });
      });
    })
    .catch(() => {
      productContainer.innerHTML = "<p class='text-danger'>Error al cargar productos.</p>";
    });
});


    
