document.getElementById("formulario-cita").addEventListener("submit", function(event) {
  event.preventDefault();

  // Obtener el último número de turno del almacenamiento local
  let turnoActual = localStorage.getItem("ultimoTurno");
  if (!turnoActual) {
    turnoActual = 1;
  } else {
    turnoActual = parseInt(turnoActual) + 1;
  }
  localStorage.setItem("ultimoTurno", turnoActual);

  const numeroTurno = turnoActual.toString().padStart(3, '0'); // Ej: 001, 002...

  // Obtener los datos del formulario
  const nombre = this.elements[0].value;
  const fecha = this.elements[1].value;
  const asunto = this.elements[2].value;
  const categoria = this.elements[3].value;
  const tipo = this.elements[4].value;

  // Crear el contenido del archivo (el ticket)
  const contenido = `__________________________________\n` +
                    `     Cita Médica\n` +
                    `__________________________________\n` +
                    `Turno: #${numeroTurno}\n` +
                    `Nombre: ${nombre}\n` +
                    `Fecha y hora: ${fecha}\n` +
                    `Asunto: ${asunto}\n` +
                    `Categoría: ${categoria}\n` +
                    `Tipo de paciente: ${tipo}\n` +
                    `=============================\n` +
                    `¡Gracias por reservar tu cita!\n`;

  // Crear un archivo de texto
  const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = `ticket_turno_${numeroTurno}.txt`;
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
  URL.revokeObjectURL(url);

  // Guardar la cita en citasPendientes para usar luego en ver_citas_pendientes.html
  const cita = {
    nombre: nombre,
    fecha: fecha,
    asunto: asunto,
    numeroCita: numeroTurno
  };

  const citasPendientes = JSON.parse(localStorage.getItem("citasPendientes")) || [];
  citasPendientes.push(cita);
  localStorage.setItem("citasPendientes", JSON.stringify(citasPendientes));

  // Mensaje
  alert(`¡Tu cita ha sido reservada! Tu número de turno es: #${numeroTurno}`);

  // Limpiar formulario
  this.reset();
});

