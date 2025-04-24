document.addEventListener("DOMContentLoaded", () => {
  const datos = JSON.parse(localStorage.getItem("consultaActual"));

  if (!datos) return;

  const set = (id, val) => document.getElementById(id).textContent = val || '—';

  set("ticket_nombre", datos.nombre_paciente);
  set("ticket_numero_cita", datos.numero_cita);
  set("ticket_fecha", datos.fecha);
  set("ticket_id", datos.id_paciente);
  set("ticket_asunto", datos.asunto);
  set("ticket_descripcion", datos.descripcion);
  set("ticket_receta", datos.receta);
  set("ticket_nota", datos.nota_doctor);

  if (datos.ingreso === "si") {
    document.getElementById("seccion_ingreso").style.display = "block";
    set("ticket_sala_ingreso", datos.sala_ingreso);
    set("ticket_motivo_ingreso", datos.motivo_ingreso);
    set("ticket_categoria", datos.categoria === "otro" ? datos.categoria_personalizada : datos.categoria);
    set("ticket_fecha_ingreso", datos.fecha_ingreso);
  }
});
