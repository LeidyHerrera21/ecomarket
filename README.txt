🛒 EcoMarket: Tienda de Productos Orgánicos¡Bienvenido al repositorio de EcoMarket! Esta es una aplicación web simple que simula una tienda de productos orgánicos, destacando la implementación de un carrito de compras y un formulario de contacto completamente funcional que utiliza Firebase Cloud Firestore para el almacenamiento de datos.🌟 Características DestacadasInterfaz Responsiva: Construida con Bootstrap 5.3 para una visualización óptima en cualquier dispositivo.Catálogo de Productos: Listado y filtrado de productos locales (frutas, verduras, granos, etc.).Carrito de Compras: Funcionalidad completa de agregar/eliminar/actualizar artículos y calcular el total, gestionado en el estado local (script.js).Simulación de Pago QR: Herramienta para generar un código QR (simulado) con detalles de pago (Monto y Teléfono).Integración con Firebase (Cloud Firestore): El formulario de contacto utiliza una base de datos NoSQL para registrar todas las consultas de los usuarios.🚀 Instalación y EjecuciónEste proyecto es una aplicación de Front-end puro (HTML, CSS y JavaScript) y no requiere un servidor Back-end complejo.1. RequisitosNecesitas un proyecto activo en Google Firebase con el servicio de Cloud Firestore habilitado.2. Configuración de FirebaseAsegúrate de que el archivo firebase-init.js contenga las credenciales correctas de tu proyecto Firebase:JavaScript// firebase-init.js
const firebaseConfig = {
    apiKey: "TU_API_KEY", // <-- ¡Reemplazar con tu clave real!
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    // ... otros campos
};
3. Ejecutar la AplicaciónSimplemente abre el archivo index.html en tu navegador. Alternativamente, utiliza una extensión de servidor web local (como "Live Server" en VS Code) para evitar problemas de CORS y asegurar la carga correcta de los módulos ES (type="module").💾 Integración del Formulario de Contacto (Firebase)El formulario de contacto es la parte clave de la integración de Firebase. La lógica se divide en tres archivos modulares:1. Inicialización (firebase-init.js)Este archivo se encarga de:Importar las funciones necesarias de Firebase SDK v12.6.0 (Modular).Inicializar la aplicación de Firebase con las credenciales (firebaseConfig).Obtener la referencia a la base de datos Firestore (db).Exponer los objetos clave de Firebase (db, addDoc, collection, serverTimestamp) a la variable global window.__firebase para que otros scripts puedan usarlos.2. Lógica de Validación (script.js)El archivo principal de lógica de la tienda contiene la validación en tiempo real del formulario (Bootstrap is-invalid/is-valid).Cuando el usuario hace clic en "Enviar consulta", se ejecutan las funciones de validación (validateName(), validateEmail(), etc.).Si el formulario es válido, script.js compila los datos del formulario en un objeto data y llama a la función de guardado: await window.submitContactForm(data);.3. Guardar en Firestore (guardar-contacto.js)Este archivo contiene la función global que interactúa con Firebase:FunciónDescripciónwindow.submitContactForm(data)Función asíncrona que recibe los datos validados del formulario.addDoc(collection(db, "contactos"), { ... })Utiliza addDoc para crear un nuevo documento con un ID automático en la colección contactos de Firestore.serverTimestamp()Utiliza la marca de tiempo del servidor de Firebase para registrar la hora de envío con precisión.RespuestaAl éxito, limpia el formulario (form.reset()) y muestra el mensaje de éxito (#contactSuccess).🔒 Reglas de Seguridad SugeridasPara que este formulario público funcione y para proteger tu base de datos, te recomendamos configurar las reglas de seguridad de Firestore para permitir solo la creación (escritura) en la colección contactos, denegando la lectura y modificación:Fragmento de códigorules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contactos/{documentId} {
      allow read: if false;       // Nadie puede leer desde la web
      allow create: if true;      // Cualquiera puede crear (enviar formulario)
      allow update, delete: if false; // Nadie puede modificar o eliminar
    }
  }
}
📦 Estructura del Proyectoecomarket/
├── index.html          # Estructura de la tienda y formulario (Bootstrap)
├── styles.css          # Estilos CSS personalizados
├── script.js           # Lógica principal, carrito, validación de formulario
├── firebase-init.js    # Inicialización de Firebase/Firestore y exposición global
└── guardar-contacto.js # Lógica de guardado en Firebase (Cloud Firestore)
