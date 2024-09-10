<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
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

try {
    $dsn = "mysql:host=$servidor;dbname=$dbname";
    $conexion = new PDO($dsn, $usuario, $contrasena);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $idPublicacion = isset($_REQUEST['idPublicacion']) ? $_REQUEST['idPublicacion'] : null;
        $data = json_decode(file_get_contents("php://input"), true);

        $nuevoTitulo = isset($data['titulo']) ? $data['titulo'] : null;
        $nuevaDescripcion = isset($data['descripcion']) ? $data['descripcion'] : null;
        $nuevaCategoria = isset($data['idCategoria']) ? $data['idCategoria'] : null;
        $nuevoEstado = isset($data['estado']) ? $data['estado'] : null;
        $nuevoMunicipio = isset($data['municipio']) ? $data['municipio'] : null;
        $nuevoRecomendado = isset($data['recomendado']) ? $data['recomendado'] : null;
        $nuevaVista = isset($data['vista']) ? $data['vista'] : null;
        $nuevoTelefono = isset($data['telefono']) ? $data['telefono'] : null;

        // Consulta SQL para actualizar los datos de la publicación, excluyendo las imágenes
        $sqlUpdate = "UPDATE publicaciones SET 
            titulo = :titulo, 
            descripcion = :descripcion, 
            idCategoria = :idCategoria,
            estado = :estado,
            municipio = :municipio,
            recomendado = :recomendado,
            vista = :vista,
            telefono = :telefono
        WHERE idPublicacion = :idPublicacion";
        
        $sentenciaUpdate = $conexion->prepare($sqlUpdate);
        $sentenciaUpdate->bindParam(':titulo', $nuevoTitulo);
        $sentenciaUpdate->bindParam(':descripcion', $nuevaDescripcion);
        $sentenciaUpdate->bindParam(':idCategoria', $nuevaCategoria);
        $sentenciaUpdate->bindParam(':estado', $nuevoEstado);
        $sentenciaUpdate->bindParam(':municipio', $nuevoMunicipio);
        $sentenciaUpdate->bindParam(':recomendado', $nuevoRecomendado);
        $sentenciaUpdate->bindParam(':vista', $nuevaVista);
        $sentenciaUpdate->bindParam(':telefono', $nuevoTelefono);
        $sentenciaUpdate->bindParam(':idPublicacion', $idPublicacion, PDO::PARAM_INT);

        if ($sentenciaUpdate->execute()) {
            echo json_encode(["mensaje" => "Publicación actualizada correctamente"]);
        } else {
            echo json_encode(["error" => "Error al actualizar la publicación: " . implode(", ", $sentenciaUpdate->errorInfo())]);
        }
        exit;
    }
} catch (PDOException $error) {
    echo json_encode(["error" => "Error de conexión: " . $error->getMessage()]);
}
?>
