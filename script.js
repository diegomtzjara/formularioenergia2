document.getElementById("formEnergia").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    nombre: document.getElementById("nombre").value,
    habitantes: document.getElementById("habitantes").value,
    consumoMensual: document.getElementById("consumoMensual").value,
    aire: document.getElementById("aire").value,
    electro: document.getElementById("electro").value
  };

  // 📌 Mostrar sugerencias automáticas
  mostrarSugerencias(data);

  // 📤 Enviar datos al servidor
  fetch("api.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(respuesta => {
    document.getElementById("resultado").innerHTML = respuesta.mensaje;
  })
  .catch(error => {
    document.getElementById("resultado").innerHTML = "❌ Error al guardar los datos";
    console.error("Error:", error);
  });
});

function mostrarSugerencias(data) {
  const sugerencias = [];
  const consumo = parseFloat(data.consumoMensual);

  if (consumo > 500) {
    sugerencias.push(" Tu consumo es alto. Considera cambiar a focos LED y desconectar aparatos en desuso.");
  }

  if (data.aire === "Sí") {
    sugerencias.push(" Usa el aire acondicionado solo en horas necesarias y mantén los filtros limpios.");
  }

  if (data.habitantes > 4) {
    sugerencias.push(" Considera dividir el uso de aparatos eléctricos en horarios distintos.");
  }

  document.getElementById("sugerencias").innerHTML = 
    sugerencias.length > 0 
    ? sugerencias.join("<br>")
    : "✅ No se detectaron consumos elevados. ¡Buen trabajo!";
}