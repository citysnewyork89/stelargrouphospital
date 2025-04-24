document.addEventListener("DOMContentLoaded", () => {
  const ingresoSelect = document.getElementById("ingreso-select");
  const datosIngreso = document.getElementById("datos-ingreso");
  const btnGenerar = document.getElementById("btn-generar");
  const form = document.getElementById("form-consulta");

  // Mostrar/ocultar campos de ingreso según selección
  ingresoSelect.addEventListener("change", () => {
    datosIngreso.style.display = ingresoSelect.value === "si" ? "block" : "none";
  });

  // Función para recoger datos del formulario
  function recogerDatosFormulario() {
    const formData = new FormData(form);
    const datos = {};
    formData.forEach((valor, clave) => {
      datos[clave] = valor.trim();
    });
    return datos;
  }

  // Función para guardar en historial de consultas
  function guardarConsulta(datos) {
    const historial = JSON.parse(localStorage.getItem("consultas") || "[]");
    historial.push({
      ...datos,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("consultas", JSON.stringify(historial));
  }

  // Al hacer clic en "Generar Ticket"
  btnGenerar.addEventListener("click", () => {
    const datos = recogerDatosFormulario();

    // Guardar en localStorage para el ticket
    localStorage.setItem("datosConsultaActual", JSON.stringify(datos));

    // Guardar en historial
    guardarConsulta(datos);

    // Redirigir al ticket
    window.location.href = "../tickets/ticket_consulta.html";
  });
});
