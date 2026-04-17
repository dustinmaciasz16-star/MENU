const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];

// Crear partículas
function crearNieve() {
  snowflakes = [];
  for (let i = 0; i < 120; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.3,
      opacity: Math.random(),
      drift: Math.random() * 0.5 - 0.25
    });
  }
}

// Dibujar nieve
function dibujarNieve() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snowflakes.forEach(flake => {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);

    ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`;
    ctx.shadowColor = "white";
    ctx.shadowBlur = 8;

    ctx.fill();
  });

  moverNieve();
}

// Movimiento
function moverNieve() {
  snowflakes.forEach(flake => {
    flake.y += flake.speed;
    flake.x += flake.drift;

    // reaparece arriba
    if (flake.y > canvas.height) {
      flake.y = -10;
      flake.x = Math.random() * canvas.width;
    }

    // si se sale lateral
    if (flake.x > canvas.width || flake.x < 0) {
      flake.x = Math.random() * canvas.width;
    }
  });
}

// Animación
function animar() {
  dibujarNieve();
  requestAnimationFrame(animar);
}

// Resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  crearNieve();
});

crearNieve();
animar();