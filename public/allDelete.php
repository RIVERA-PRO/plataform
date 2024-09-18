<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejo de solicitudes OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Cargar variables de entorno desde el archivo .env
require __DIR__.'/vendor/autoload.php';
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Obtener los valores de las variables de entorno
$servidor = $_ENV['DB_HOST'] . ':' . $_ENV['DB_PORT'];
$usuario = $_ENV['DB_USER'];
$contrasena = $_ENV['DB_PASS'];
$dbname = $_ENV['DB_NAME'];
$mensaje = "";

try {
    $dsn = "mysql:host=$servidor;dbname=$dbname";
    $conexion = new PDO($dsn, $usuario, $contrasena);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // Eliminar todas las publicaciones de la base de datos
        $sqlDeleteAll = "DELETE FROM publicaciones";
        $sentenciaDeleteAll = $conexion->prepare($sqlDeleteAll);

        if ($sentenciaDeleteAll->execute()) {
            // Reiniciar el autoincremento del ID
            $sqlResetAutoIncrement = "ALTER TABLE publicaciones AUTO_INCREMENT = 1";
            $sentenciaResetAutoIncrement = $conexion->prepare($sqlResetAutoIncrement);

            if ($sentenciaResetAutoIncrement->execute()) {
                echo json_encode(["mensaje" => "Todas las publicaciones han sido eliminadas y el ID reiniciado a 1"]);
            } else {
                echo json_encode(["error" => "Error al reiniciar el autoincremento del ID"]);
            }
        } else {
            echo json_encode(["error" => "Error al eliminar las publicaciones"]);
        }

        exit;
    }
} catch (PDOException $error) {
    echo json_encode(["error" => "Error de conexión: " . $error->getMessage()]);
}
?>
