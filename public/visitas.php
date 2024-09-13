<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

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

try {
    $dsn = "mysql:host=$servidor;dbname=$dbname";
    $conexion = new PDO($dsn, $usuario, $contrasena);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener la IP y User-Agent del visitante
    $ip = $_SERVER['REMOTE_ADDR'];
    $userAgent = $_SERVER['HTTP_USER_AGENT'];
    $timestamp = time();

    // Verificar el método de la solicitud
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method == 'POST') {
        // Verificar si ya existe una visita de esta IP y User-Agent
        $sqlCheck = "SELECT COUNT(*) FROM visitas WHERE ip = :ip AND userAgent = :userAgent";
        $stmtCheck = $conexion->prepare($sqlCheck);
        $stmtCheck->bindParam(':ip', $ip);
        $stmtCheck->bindParam(':userAgent', $userAgent);
        $stmtCheck->execute();

        if ($stmtCheck->fetchColumn() == 0) {
            // No existe una visita con esta IP y User-Agent, se inserta
            $sqlInsert = "INSERT INTO visitas (ip, userAgent, timestamp) VALUES (:ip, :userAgent, :timestamp)";
            $stmtInsert = $conexion->prepare($sqlInsert);
            $stmtInsert->bindParam(':ip', $ip);
            $stmtInsert->bindParam(':userAgent', $userAgent);
            $stmtInsert->bindParam(':timestamp', $timestamp);
            $stmtInsert->execute();
            echo json_encode(["mensaje" => "Visita registrada exitosamente"]);
        } else {
            echo json_encode(["mensaje" => "Visita ya registrada"]);
        }
    } elseif ($method == 'GET') {
        // Obtener las visitas y enviarlas como respuesta JSON
        $sqlSelect = "SELECT * FROM visitas";
        $stmtSelect = $conexion->prepare($sqlSelect);
        $stmtSelect->execute();
        $visitas = $stmtSelect->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($visitas);
    } else {
        echo json_encode(["error" => "Método no permitido"]);
    }
} catch (PDOException $error) {
    echo json_encode(["error" => "Error de conexión: " . $error->getMessage()]);
}
?>
