// Datos del producto de demostración
const PRODUCTS = [
  {id: 'p1', title:'Manzana Roja Orgánica (1kg)', price: 6.50, category: 'fruta', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt44MAmOguJRjxfhr5dnUHUj1twfKteG0Sv3comPjWB7T0uinvjmY0WdrBvQT-vrpiAWk&usqp=CAU'},
  {id: 'p2', title:'Plátano orgánico (1kg)', price: 4.00, category: 'fruta', img:'https://dontorcuatomarket.com/cdn/shop/products/1_500x.png?v=1587158137'},
  {id: 'p3', title:'Zanahoria orgánica (500g)', price: 3.00, category: 'verdura', img:'https://previews.123rf.com/images/gdolgikh/gdolgikh1709/gdolgikh170900523/86269945-fresh-organic-carrot.jpg'},
  {id: 'p4', title:'Quinua orgánica (500g)', price: 8.00, category: 'grano', img:'https://e-an.americatv.com.pe/util-e-interesante-hallan-pesticidas-quinua-peruana-que-se-vende-como-organica-n498454-938x528-1086861.jpg'},
  {id: 'p5', title:'Lechuga orgánica', price: 2.50, category: 'verdura', img:'https://www.gastronomiavasca.net/uploads/image/file/3381/lechuga.jpg'},
  {id: 'p6', title:'Inka kola en lata ', price: 1.00, category: 'bebidas', img:'https://thumbs.dreamstime.com/b/un-taz%C3%B3n-lleno-de-latas-peruanas-inca-kola-la-haya-pa%C3%ADses-bajos-abril-una-las-bebidas-m%C3%A1s-populares-en-per%C3%BA-es-probablemente-160359740.jpg'},
  {id: 'p7', title:'Arroz ', price: 2.00, category: 'grano', img:'https://cofepasa.com/wp-content/uploads/2021/04/arroz-portal.jpg'},
  {id: 'p8', title:'Maiz', price: 3.00, category: 'grano', img:'https://humanidades.com/wp-content/uploads/2018/10/maiz-2-1-e1581908276964.jpg'},
  {id: 'p9', title:'Botella de agua', price: 0.95, category: 'bebidas', img:'https://media.istockphoto.com/id/1089173910/es/foto/agua-de-mujer.jpg?s=612x612&w=0&k=20&c=EKJxmzAon5bdy5aGwpUUe0PpoS-JJdpRat5jkawUgQU='},
  {id: 'p10', title:'Miel de Abeja', price: 2.00, category: 'endulzantes', img:'https://www.udep.edu.pe/wp-content/uploads/sites/49/media/2020/11/Miel-de-palo.jpg'}
];

// Carrito simple en estado local
let cart = {};


// ----------- FUNCIÓN PARA MOSTRAR LOS PRODUCTOS EN PANTALLA -----------
function renderProducts(list = PRODUCTS){
  const grid = document.getElementById('productGrid');
  grid.innerHTML = ''; // Limpia el contenido anterior
  list.forEach(p => { // Recorre cada producto de la lista
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4'; // Se inserta la estructura HTML de la tarjeta del producto
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

// ----------- AÑADIR PRODUCTO AL CARRITO -----------
function addToCart(id){    // Si el producto ya existe en el carrito, aumenta su cantidad
  cart[id] = (cart[id]||0) + 1; // Si no existe, lo inicializa en 1
  showCartCount();    // Actualiza el contador del carrito
  showToast('Añadido al carrito');  // Muestra notificación
}

  // ----------- ACTUALIZAR EL CONTADOR DEL ICONO DEL CARRITO -----------
function showCartCount(){   // Suma todas las cantidades del carrito
  const count = Object.values(cart).reduce((s,n)=>s+n,0);
  document.getElementById('cartCount').innerText = count;
}

// ----------- ABRIR / CERRAR EL CARRITO (OFFCANVAS) -----------
function toggleCart(){
  const off = document.getElementById('cartOffcanvas');
  off.classList.toggle('show');
  off.style.visibility = off.classList.contains('show') ? 'visible' : 'hidden'; // Cambia la visibilidad dependiendo si está abierto o cerrado
  renderCartItems(); // Cada vez que se abre, genera los productos dentro del carrito
}

// Representa los artículos del carrito en el margen lateral
function renderCartItems(){
  const container = document.getElementById('cartItems');
  container.innerHTML = ''; // Limpia el contenido anterior
  if(Object.keys(cart).length === 0){
    container.innerHTML = '<p class="text-muted">Tu carrito está vacío.</p>';  // Muestra un mensaje indicando que no hay productos.
    document.getElementById('cartTotal').innerText = 'S/ 0.00'; // Actualiza el total a 0.
    return;
  }
  let total = 0; // Almacena la suma total del carrito.
  for(const id of Object.keys(cart)){
    const p = PRODUCTS.find(x=>x.id===id); // Busca el producto dentro de la lista PRODUCTOS usando el ID.
    const qty = cart[id]; // Recupera la cantidad de ese producto en el carrito.
    total += p.price * qty; // Suma al total el precio x cantidad.
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
  document.getElementById('cartTotal').innerText = 'S/ ' + total.toFixed(2); // Muestra el total calculado del carrito.
}

function changeQty(id, delta){ // Modifica la cantidad de un producto en el carrito.
  cart[id] = (cart[id]||0) + delta; // Si el producto no existe en el carrito, se toma como 0. Luego se suma o resta la cantidad según 'delta'.
  if(cart[id] <= 0) delete cart[id];
  renderCartItems();
  showCartCount();  // Actualiza el número total de productos visibles en el ícono del carrito.
}

function removeItem(id){ // Elimina completamente un producto del carrito.
  delete cart[id];
  renderCartItems(); // Actualiza el carrito visualmente.
  showCartCount(); // Recalcula y muestra la cantidad total en el ícono del carrito.
} 

function clearCart(){ // Vacía por completo el carrito de compras.
  cart = {};
  renderCartItems(); // Actualiza la vista del carrito para mostrarlo vacío.
  showCartCount(); // Actualiza el número de productos
  toggleCart(); // Cierra o abre el carrito
}

// Finalizar compra
function openCheckout(){
  const modalEl = document.getElementById('checkoutModal');
  const modal = new bootstrap.Modal(modalEl);
// Elemento donde se coloca el resumen de los productos del carrito
  const summary = document.getElementById('checkoutSummary');
  if(Object.keys(cart).length===0){
    summary.innerHTML = '<p class="text-muted">Carrito vacío.</p>';
    modal.show();
    return;
  }
  let html = '<ul class="list-group mb-2">'; // Genera una lista HTML con todos los productos del carrito
  let total = 0; // Total a pagar
  for(const id of Object.keys(cart)){  // Recorre cada ID de producto dentro del carrito
    const p = PRODUCTS.find(x=>x.id===id);
    const qty = cart[id]; // Cantidad agregada al carrito
    total += p.price * qty; // Suma el total
    html += `<li class="list-group-item d-flex justify-content-between align-items-center">${p.title} <span>S/ ${ (p.price*qty).toFixed(2) }</span></li>`;
  }
  html += `</ul><div class="d-flex justify-content-between"><strong>Total:</strong><h5>S/ ${total.toFixed(2)}</h5></div>`; // Cierra la lista y mostramos el total final
  summary.innerHTML = html;
  document.getElementById('payAmount').value = total.toFixed(2);
  modal.show();
}

// Simple toast
function showToast(msg){   // Crea un nuevo elemento <div> que será el contenedor del toast
  const el = document.createElement('div');
  el.className = 'toast align-items-center show'; // Se asigna las clases necesarias para darle estilo y mostrarlo
  el.style.position = 'fixed';  // Se posiciona el toast en la esquina inferior derecha de la pantalla
  el.style.right = '20px';
  el.style.bottom = '20px';
  el.style.zIndex = 9999;  // Se mantiene encima de todos los elementos
  el.innerHTML = `<div class="d-flex"><div class="toast-body">${msg}</div><button class="btn-close btn-close-white ms-2 me-2" onclick="this.parentElement.parentElement.remove()"></button></div>`;
  // Inserta el contenido del toast, incluyendo el mensaje y el botón de cierre
  document.body.appendChild(el); // Se añade el toast al body para que sea visible
  setTimeout(()=>el.remove(), 2500);   // Se elimina el toast automáticamente después de 2.5 segundos
}

// Generar un código QR para el pago
let currentQR = null;
function generatePaymentQR(){ // Función que genera el código QR de pago
  const phone = document.getElementById('payPhone').value.trim(); // Obtiene el número de celular ingresado y le quita espacios sobrantes.
  const amount = parseFloat(document.getElementById('payAmount').value || 0).toFixed(2); // Obtiene el monto ingresado, lo convierte a número y lo formatea con 2 decimales.
  const qrContainer = document.getElementById('qrContainer');
  qrContainer.innerHTML = ''; // Muestra un mensaje de error en pantalla.
  if(!phone || amount<=0){
    qrContainer.innerHTML = '<div class="text-danger">Ingrese un número y un monto válidos.</div>';
    return; // Detiene la función, no se genera el QR.
  }

  const payload = `PAYMENT|phone:${phone}|amount:${amount}|ref:EcoMarket-${Date.now()}`;
 
  currentQR = new QRCode(qrContainer, { text: payload, width: 200, height:200 }); //contenido, ancho y altura del Qr
  // Mostrar también un enlace copiable (no es un enlace oficial de Yape/Plin, pero resulta útil).
  const link = document.createElement('div');
  link.className = 'mt-2';
  link.innerHTML = `<input class="form-control" readonly value="${payload}" onclick="this.select()">`;
  qrContainer.appendChild(link);
  showToast('QR generado. Abre Yape o Plin y escanéalo.'); // Notificación rápida de éxito
}

// ======================== FILTROS Y BÚSQUEDA ========================
function applyFilters(){ // Filtra productos por categoría seleccionada
  const cat = document.getElementById('filterCategory').value;
  let filtered = PRODUCTS.slice();
  if(cat) filtered = filtered.filter(p=>p.category===cat);
  renderProducts(filtered);
}

// Restablece los filtros y muestra todo nuevamente
function resetFilters(){ document.getElementById('filterCategory').value=''; renderProducts(); }

// Busca productos por texto (en el título o categoría)
function applySearch(){
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  if(!q) return renderProducts(); // Si está vacío, muestra todo
  const filtered = PRODUCTS.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  renderProducts(filtered);
}

// Init Renderiza los productos iniciales y actualiza el contador del carrito
renderProducts();
showCartCount();

document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-list");

  fetch("api/products.json") // Carga los productos desde un archivo JSON externo
    .then(res => res.json())
    .then(products => {
      productContainer.innerHTML = "";
      products.forEach(p => { // Crea dinámicamente una tarjeta por cada producto
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

      document.querySelectorAll(".add-to-cart").forEach(btn => { // Activa el botón "Agregar al carrito" en cada producto
        btn.addEventListener("click", e => {
          const { id, name, price, image } = e.target.dataset;
          addToCart({ id, name, price: parseFloat(price), image }); // Llama a la función global para añadir al carrito
        });
      });
    })
    .catch(() => { // Error si el JSON no carga
      productContainer.innerHTML = "<p class='text-danger'>Error al cargar productos.</p>";
    });
});

// ======================== VALIDACIÓN EN TIEMPO REAL ========================

const contactForm = document.getElementById("contactForm");
const fields = {
  name: document.getElementById("contactName"),
  email: document.getElementById("contactEmail"),
  topic: document.getElementById("contactTopic"),
  message: document.getElementById("contactMessage")
};


// ----------- VALIDACIONES INDIVIDUALES DE CADA CAMPO -----------
function validateName() {
  const valid = fields.name.value.trim().length >= 3; // Mínimo 3 caracteres
  updateFieldState(fields.name, valid);
  return valid;
}

function validateEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato: algo@dominio.com
  const valid = regex.test(fields.email.value.trim());
  updateFieldState(fields.email, valid);
  return valid;
}

function validateTopic() { // Valida que el usuario seleccione un tema y que no esté vacío
  const valid = fields.topic.value.trim() !== "";
  updateFieldState(fields.topic, valid);
  return valid;
}

function validateMessage() { // Valida que el mensaje tenga al menos 10 caracteres
  const valid = fields.message.value.trim().length >= 10;
  updateFieldState(fields.message, valid);
  return valid;
}

// ----------- ACTUALIZA EL ESTADO VISUAL DEL CAMPO -----------
// Esta función agrega o quita clases de Bootstrap según si el valor es válido o no
function updateFieldState(field, isValid) {
  if (isValid) {
    field.classList.remove("is-invalid"); // Quita estilo rojo
    field.classList.add("is-valid"); // Muestra borde verde
  } else {
    field.classList.remove("is-valid"); // Quita borde verde
    field.classList.add("is-invalid"); // Muestra borde rojo
  }
}

// Valida en tiempo real
fields.name.addEventListener("input", validateName);
fields.email.addEventListener("input", validateEmail);
fields.topic.addEventListener("change", validateTopic);
fields.message.addEventListener("input", validateMessage);

// Envia formulario
contactForm.addEventListener("submit", async e => {
  e.preventDefault();

  // Ejecuta todas las validaciones y usa el & para asegurar que todas se ejecuten
  const validForm =
    validateName() &
    validateEmail() &
    validateTopic() &
    validateMessage();

  if (validForm) {
    // 1. Obtiene los datos antes de que se limpie el formulario
    const data = {
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        topic: fields.topic.value,
        message: fields.message.value.trim()
    };
    
    // 2. Ejecuta la función de guardado que viene de guardar-contacto.js
    // Esta función debe limpiar y mostrar éxito al terminar.
    await window.submitContactForm(data);

    // Limpia estados visuales
    Object.values(fields).forEach(field => {
      field.classList.remove("is-valid", "is-invalid");
    });
  }
});
