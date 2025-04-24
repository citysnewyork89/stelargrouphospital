document.getElementById('formLogin').addEventListener('submit', function(e) {
  e.preventDefault();

  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;
  const mensaje = document.getElementById('mensaje');

  const usuariosValidos = [
    { usuario: "doctor", contrasena: "doctor" },
    { usuario: "laura", contrasena: "1973" },
    { usuario: "admin", contrasena: "admin" }
  ];

  const encontrado = usuariosValidos.find(user => user.usuario === usuario && user.contrasena === contrasena);

  if (encontrado) {
    mensaje.style.color = "green";
    mensaje.textContent = "Registro exitoso. Redirigiendo...";
    setTimeout(() => {
      window.location.href = "panel_medico.html";
    }, 1500);
  } else {
    if (usuario && contrasena) {
      mensaje.style.color = "red";
      mensaje.textContent = "Error con el registro. Usuario o contraseña incorrectos.";
    } else {
      mensaje.style.color = "red";
      mensaje.textContent = "Error al iniciar sesión. Contacte con un agente de mantenimiento.";
    }
  }
});
