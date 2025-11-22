// Obteniene el formulario y el mensaje de éxito desde el HTML mediante sus IDs
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("contactSuccess");

// Hace la función global para que pueda ser llamada desde script.js
window.submitContactForm = async (data) => {
    // Extrae las funciones de Firebase desde el objeto global creado antes
  const { db, collection, addDoc, serverTimestamp } = window.__firebase;

  try {
    // Guarda los datos del formulario en la colección "contactos" de Firestore
    // "data" ya tiene los campos validados: nombre, correo, tema y mensaje
    await addDoc(
      collection(db, "contactos"),    // Especifica la colección donde guardar
      {
        nombre: data.name,   // Nombre del usuario
        correo: data.email,     // Correo del usuario
        tipo: data.topic,    // Tipo de consulta o categoría
        mensaje: data.message,    // Mensaje enviado
        fecha: serverTimestamp()    // Fecha y hora automática del servidor
      }
    );

    // Si todo salió bien, mostrara el mensaje de éxito
    successMsg.classList.remove("d-none");
    form.reset(); // Limpia el formulario

      // Después de 3 segundos, se oculta el mensaje de éxito
    setTimeout(() => {
        successMsg.classList.add("d-none");
    }, 3000); // Oculta el mensaje de éxito

  } catch (error) {
        // Si hubo un error al guardar en Firebase, lo mostramos en consola
    console.error("Error al guardar en Firebase:", error);
    alert("Hubo un error al guardar tu mensaje. Intenta de nuevo.");      // Avisa al usuario que ocurrió un problema
  } 
};