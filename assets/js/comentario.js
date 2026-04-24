const formulario = document.getElementById("formulario");
const contenedor = document.getElementById("contenedor-comentarios");

// 🚀 Cargar comentarios al iniciar
document.addEventListener("DOMContentLoaded", mostrarComentarios);

// 📩 Evento submit
formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const comentario = document.getElementById("comentario").value.trim();

  // Validación simple
  if (!nombre || !correo || !comentario) {
    alert("Completa todos los campos");
    return;
  }

  const nuevoComentario = {
    id: Date.now(),
    nombre,
    correo,
    comentario,
    fecha: new Date().toLocaleString()
  };

  guardarComentario(nuevoComentario);
  mostrarComentarios();

  formulario.reset();
});

// 💾 Guardar en localStorage
function guardarComentario(comentario) {
  let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
  comentarios.push(comentario);
  localStorage.setItem("comentarios", JSON.stringify(comentarios));
}

// 🖥️ Mostrar comentarios
function mostrarComentarios() {
  contenedor.innerHTML = "";

  let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

  // Mostrar los más recientes primero
  comentarios.reverse().forEach(c => {
    const card = document.createElement("div");
    card.classList.add("card-comentario");

    card.innerHTML = `
      <h5>${c.nombre}</h5>
      <span>${c.correo} • ${c.fecha}</span>
      <p>${c.comentario}</p>
      <button class="btn-eliminar" onclick="eliminarComentario(${c.id})">Eliminar</button>
    `;

    contenedor.appendChild(card);
  });
}

// ❌ Eliminar comentario
function eliminarComentario(id) {
  let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

  comentarios = comentarios.filter(c => c.id !== id);

  localStorage.setItem("comentarios", JSON.stringify(comentarios));

  mostrarComentarios();
}