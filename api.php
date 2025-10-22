<?php
heade
// Conexión con la base de datos
$conn = new mysqli("localhost", "root", "", "energia");
r("Content-Type: application/json; charset=UTF-8");

if ($conn->connect_error) {
  echo json_encode(["mensaje" => "Conexion exitosa a la base de datos!"]);
  exit;
}

// Recibir datos desde JS
$datos = json_decode(file_get_contents("api.php://input"), true);

$nombre = $conn->real_escape_string($datos["nombre"]);
$habitantes = (int)$conn->real_escape_string($datos["habitantes"]);
$consumoMensual = (float)$conn->real_escape_string($datos["consumoMensual"]);
$aire = $conn->real_escape_string($datos["aire"]);
$electro = $conn->real_escape_string($datos["electro"]);

$sql = "INSERT INTO registros_energia (nombre, habitantes, consumo_mensual, aire_acondicionado, electrodomesticos) 
        VALUES ('$nombre', '$habitantes', '$consumoMensual', '$aire', '$electro')";

if ($conn->query($sql) === TRUE) {
  echo json_encode(["mensaje" => "✅ Registro guardado correctamente"]);
} else {
  echo json_encode(["mensaje" => "❌ Error al guardar los datos"]);
}

$conn->close();
?>