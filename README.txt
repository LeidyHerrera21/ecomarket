# 🛒 EcoMarket - Tienda de Productos Orgánicos

Bienvenido al repositorio de EcoMarket, un ecommerce de ejemplo enfocado en la venta de productos orgánicos y frescos. 
Este proyecto está desarrollado utilizando HTML, Bootstrap 5 y JavaScript puro, con una implementación robusta para la gestión de formularios de contacto usando Google Cloud Firestore (Firebase).

##🌟 Características Destacadas
Diseño Responsivo: Interfaz moderna y adaptable gracias a Bootstrap 5.

Catálogo de Productos: Grid interactivo con funciones de búsqueda y filtrado por categoría.

Gestión de Carrito: Funcionalidad completa de agregar, modificar, eliminar y vaciar el carrito, implementado con un Offcanvas lateral.

Simulación de Pago: Generación de código QR (código de demostración) para simular pagos vía Yape/Plin.

Formulario de Contacto Avanzado: Validación de campos en tiempo real (lado del cliente).
Persistencia de datos en la nube mediante Firebase Cloud Firestore.

## 🛠️ Tecnologías Utilizadas
Categoría	Tecnología	Versión / Tipo
Frontend	HTML5, CSS3, JavaScript (ES6+)	Vanilla JS
Framework CSS	Bootstrap	v5.3.2
Base de Datos	Firebase Cloud Firestore	Modular SDK v12.6.0
Utilidades	QRCode.js	v1.0.0

## ⚙️ Estructura del Proyecto

El proyecto está organizado de forma modular, separando la lógica del carrito de la lógica de Firebase:

· index.html: Estructura principal, incluyendo el catálogo y el formulario de contacto.
· styles.css: Estilos personalizados para darle el look and feel "Eco".
· script.js: Contiene la lógica del carrito de compras, filtros, y toda la validación en tiempo real del formulario de contacto.
· firebase-init.js: Inicialización de Firebase y Cloud Firestore (configuración de claves y objetos).
· guardar-contacto.js: Función dedicada a tomar los datos validados y enviarlos a la colección contactos en Firestore.


## 🔑 Configuración de Firebase

Para que el formulario de contacto funcione, debes tener tu propio proyecto de Firebase:

  1. Crea un Proyecto en la Consola de Firebase.
  2. Configura Cloud Firestore en modo de prueba para empezar.
  3. Registra una Aplicación Web para obtener tu objeto firebaseConfig.
  4. Reemplaza la configuración en el archivo firebase-init.js con tus propias credenciales.

  5. Asegura tus Reglas de Firestore (en producción): Para permitir solo la escritura (creación) de nuevos documentos de contacto y bloquear la lectura o edición pública, configura tus reglas en la consola. 

# Desarrollado con ❤️ y JavaScript
