<?php
header("Content-Type: application/json");
 // header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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
$rutaweb = $_ENV['RUTA_WEB'];

try {
    $dsn = "mysql:host=$servidor;dbname=$dbname";
    $conexion = new PDO($dsn, $usuario, $contrasena);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $titulo = $_POST['titulo'];
        $descripcion = $_POST['descripcion'];
        $idCategoria = $_POST['idCategoria'];
        $idUsuario = $_POST['idUsuario'];
        $recomendado = $_POST['recomendado'];
        $vista = $_POST['vista'];
        $telefono = $_POST['telefono'];
        $estado = $_POST['estado'];
        $municipio = $_POST['municipio'];

        if (!empty($titulo) && !empty($descripcion) && !empty($idCategoria) && !empty($idUsuario) && !empty($recomendado) && !empty($vista) && !empty($telefono) && !empty($estado) && !empty($municipio)) {

            // Verificar si se envió una imagen
            $imagenesPresentes = isset($_FILES['imagen1']) || isset($_FILES['imagen2']) || isset($_FILES['imagen3']) || isset($_FILES['imagen4']);

            if ($imagenesPresentes) {

                // Crear carpeta para imágenes si no existe
                $carpetaImagenes = './imagenes_publicaciones';
                if (!file_exists($carpetaImagenes)) {
                    mkdir($carpetaImagenes, 0777, true);
                }

                // Inicializar rutas de imágenes
                $rutaImagenCompleta = '';
                $rutaImagen2Completa = '';
                $rutaImagen3Completa = '';
                $rutaImagen4Completa = '';

                // Subir imágenes si están presentes
                if (isset($_FILES['imagen1']) && $_FILES['imagen1']['error'] === UPLOAD_ERR_OK) {
                    $nombreImagen = $_FILES['imagen1']['name'];
                    $rutaImagen = $carpetaImagenes . '/' . $nombreImagen;
                    move_uploaded_file($_FILES['imagen1']['tmp_name'], $rutaImagen);
                    $rutaImagenCompleta = $rutaweb . '/' . $rutaImagen;
                }

                if (isset($_FILES['imagen2']) && $_FILES['imagen2']['error'] === UPLOAD_ERR_OK) {
                    $nombreImagen2 = $_FILES['imagen2']['name'];
                    $rutaImagen2 = $carpetaImagenes . '/' . $nombreImagen2;
                    move_uploaded_file($_FILES['imagen2']['tmp_name'], $rutaImagen2);
                    $rutaImagen2Completa = $rutaweb . '/' . $rutaImagen2;
                }

                if (isset($_FILES['imagen3']) && $_FILES['imagen3']['error'] === UPLOAD_ERR_OK) {
                    $nombreImagen3 = $_FILES['imagen3']['name'];
                    $rutaImagen3 = $carpetaImagenes . '/' . $nombreImagen3;
                    move_uploaded_file($_FILES['imagen3']['tmp_name'], $rutaImagen3);
                    $rutaImagen3Completa = $rutaweb . '/' . $rutaImagen3;
                }

                if (isset($_FILES['imagen4']) && $_FILES['imagen4']['error'] === UPLOAD_ERR_OK) {
                    $nombreImagen4 = $_FILES['imagen4']['name'];
                    $rutaImagen4 = $carpetaImagenes . '/' . $nombreImagen4;
                    move_uploaded_file($_FILES['imagen4']['tmp_name'], $rutaImagen4);
                    $rutaImagen4Completa = $rutaweb . '/' . $rutaImagen4;
                }

                // Verificar que al menos una imagen esté presente
                if ($rutaImagenCompleta === '' && $rutaImagen2Completa === '' && $rutaImagen3Completa === '' && $rutaImagen4Completa === '') {
                    echo json_encode(["error" => "Debe seleccionar al menos una imagen"]);
                    exit;
                }

                // Almacenar la publicación en la base de datos
                $sqlInsert = "INSERT INTO `publicaciones` (titulo, descripcion, idCategoria, idUsuario, recomendado, vista, telefono, municipio, estado, imagen1, imagen2, imagen3, imagen4) 
                              VALUES (:titulo, :descripcion, :idCategoria, :idUsuario, :recomendado, :vista, :telefono, :municipio, :estado, :imagen1, :imagen2, :imagen3, :imagen4)";
                $stmt = $conexion->prepare($sqlInsert);
                $stmt->bindParam(':titulo', $titulo);
                $stmt->bindParam(':descripcion', $descripcion);
                $stmt->bindParam(':idCategoria', $idCategoria);
                $stmt->bindParam(':idUsuario', $idUsuario);
                $stmt->bindParam(':recomendado', $recomendado);
                $stmt->bindParam(':vista', $vista);
                $stmt->bindParam(':telefono', $telefono);
                $stmt->bindParam(':municipio', $municipio);
                $stmt->bindParam(':estado', $estado);
                $stmt->bindParam(':imagen1', $rutaImagenCompleta);
                $stmt->bindParam(':imagen2', $rutaImagen2Completa);
                $stmt->bindParam(':imagen3', $rutaImagen3Completa);
                $stmt->bindParam(':imagen4', $rutaImagen4Completa);
                $stmt->execute();

                // Obtener el ID de la última inserción
                $lastId = $conexion->lastInsertId();

                // Obtener la fecha de creación actualizada
                $sqlSelect = "SELECT createdAt FROM `publicaciones` WHERE idPublicacion = :lastId";
                $stmtSelect = $conexion->prepare($sqlSelect);
                $stmtSelect->bindParam(':lastId', $lastId);
                $stmtSelect->execute();
                $createdAt = $stmtSelect->fetchColumn();

                // Respuesta JSON con enlace de la imagen y fecha de creación
                echo json_encode([
                    "mensaje" => "Publicación creada exitosamente",
                    "imagen1" => $rutaImagenCompleta,
                    "createdAt" => $createdAt
                ]);
            } else {
                echo json_encode(["error" => "Debe seleccionar al menos una imagen"]);
            }
        } else {
            echo json_encode(["error" => "Por favor, complete todos los campos correctamente"]);
        }
    } else {
        echo json_encode(["error" => "Método no permitido"]);
    }
} catch (PDOException $error) {
    echo json_encode(["error" => "Error de conexión: " . $error->getMessage()]);
}
?>
