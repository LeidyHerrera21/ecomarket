const form = document.getElementById("contactForm");
const successMsg = document.getElementById("contactSuccess");

// Hacemos la función global para que pueda ser llamada desde script.js
window.submitContactForm = async (data) => {
  const { db, collection, addDoc, serverTimestamp } = window.__firebase;

  try {
    // Utilizamos los datos ya validados y organizados
    await addDoc(
      collection(db, "contactos"),
      {
        nombre: data.name,
        correo: data.email,
        tipo: data.topic,
        mensaje: data.message,
        fecha: serverTimestamp()
      }
    );

    // Éxito:
    successMsg.classList.remove("d-none");
    form.reset(); // Limpiar el formulario

    setTimeout(() => {
        successMsg.classList.add("d-none");
    }, 3000); // Ocultar mensaje de éxito

  } catch (error) {
    console.error("Error al guardar en Firebase:", error);
    alert("Hubo un error al guardar tu mensaje. Intenta de nuevo.");
  }
};