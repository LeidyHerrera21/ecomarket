🛒 EcoMarket - Tienda de Productos Orgánicos
Bienvenido al repositorio de EcoMarket, un ecommerce de ejemplo enfocado en la venta de productos orgánicos y frescos. 
Este proyecto está desarrollado utilizando HTML, Bootstrap 5 y JavaScript puro, con una implementación robusta para la gestión de formularios de contacto usando Google Cloud Firestore (Firebase).

🌟 Características Destacadas
Diseño Responsivo: Interfaz moderna y adaptable gracias a Bootstrap 5.
Catálogo de Productos: Grid interactivo con funciones de búsqueda y filtrado por categoría.
Gestión de Carrito: Funcionalidad completa de agregar, modificar, eliminar y vaciar el carrito, implementado con un Offcanvas lateral.
Simulación de Pago: Generación de código QR (código de demostración) para simular pagos vía Yape/Plin.
Formulario de Contacto Avanzado:
Validación de campos en tiempo real (lado del cliente).
Persistencia de datos en la nube mediante Firebase Cloud Firestore.

🛠️ Tecnologías Utilizadas
Categoría	Tecnología	Versión / Tipo
Frontend	HTML5, CSS3, JavaScript (ES6+)	Vanilla JS
Framework CSS	Bootstrap	v5.3.2
Base de Datos	Firebase Cloud Firestore	Modular SDK v12.6.0
Utilidades	QRCode.js	v1.0.0

💾 Estructura del Proyecto y Firebase
La integración con Firebase Cloud Firestore está configurada de manera modular y limpia:

1. index.html
Define la estructura completa del sitio, incluyendo la navegación, el hero, el listado de productos y el formulario de contacto.
Carga los scripts como módulos (type="module") para una correcta inicialización de Firebase:

<script type="module" src="firebase-init.js"></script>
<script type="module" src="guardar-contacto.js"></script>
<script src="script.js"></script>
