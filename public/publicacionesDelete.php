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
        $idPublicacion = isset($_GET['idPublicacion']) ? $_GET['idPublicacion'] : null;

        if (!$idPublicacion) {
            echo json_encode(["error" => "Se requiere proporcionar un ID de publicación para eliminarla."]);
            exit;
        }

        // Obtener nombre del archivo de imagen1 de la base de datos
        $sqlSelectImagen = "SELECT imagen1 FROM publicaciones WHERE idPublicacion = :idPublicacion";
        $sentenciaSelectImagen = $conexion->prepare($sqlSelectImagen);
        $sentenciaSelectImagen->bindParam(':idPublicacion', $idPublicacion, PDO::PARAM_INT);
        $sentenciaSelectImagen->execute();
        $imagen = $sentenciaSelectImagen->fetch(PDO::FETCH_ASSOC);

        // Eliminar la publicación de la base de datos
        $sqlDelete = "DELETE FROM publicaciones WHERE idPublicacion = :idPublicacion";
        $sentenciaDelete = $conexion->prepare($sqlDelete);
        $sentenciaDelete->bindParam(':idPublicacion', $idPublicacion, PDO::PARAM_INT);

        if ($sentenciaDelete->execute()) {
            // Eliminar archivo de la carpeta imagenes_publicaciones
            $carpetaImagenes = './imagenes_publicaciones/';
            if ($imagen && $imagen['imagen1']) {
                $rutaImagen = $carpetaImagenes . basename($imagen['imagen1']);
                if (file_exists($rutaImagen)) {
                    unlink($rutaImagen);
                }
            }

            echo json_encode(["mensaje" => "Publicación y archivo asociado eliminados correctamente"]);
        } else {
            echo json_encode(["error" => "Error al eliminar la publicación"]);
        }

        exit;
    }
} catch (PDOException $error) {
    echo json_encode(["error" => "Error de conexión: " . $error->getMessage()]);
}
?>
