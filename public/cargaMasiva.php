<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Cargar variables de entorno
require __DIR__.'/vendor/autoload.php';
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$servidor = $_ENV['DB_HOST'] . ':' . $_ENV['DB_PORT'];
$usuario = $_ENV['DB_USER'];
$contrasena = $_ENV['DB_PASS'];
$dbname = $_ENV['DB_NAME'];
$rutaweb = $_ENV['RUTA_WEB'];

try {
    $dsn = "mysql:host=$servidor;dbname=$dbname";
    $conexion = new PDO($dsn, $usuario, $contrasena);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Incluir archivos externos
    require 'estados.php';
    require 'titulos.php';
    require 'descripciones.php';

    $sqlInsert = "INSERT INTO `publicaciones` (titulo, descripcion, idCategoria, idUsuario, recomendado, vista, telefono, municipio, estado, imagen1) 
                  VALUES (:titulo, :descripcion, :idCategoria, :idUsuario, :recomendado, :vista, :telefono, :municipio, :estado, :imagen1)";
    $stmt = $conexion->prepare($sqlInsert);

    $numRecords = 300;
    
    for ($i = 1; $i <= $numRecords; $i++) {
        $titulo = $tituloBase[array_rand($tituloBase)];
        $descripcion = $descripcionBase[array_rand($descripcionBase)];
        $idCategoria = rand(1, 9);
        $idUsuario = 1;
        $recomendado = 'si';
        $vista = 'visible';
        $telefono = '525520567823';

        $estado = array_rand($estados);
        $municipios = $estados[$estado];
        $municipio = $municipios[array_rand($municipios)];

        $imagenNum = rand(2, 275);
        $imagen1 = "$rutaweb/imagenes_publicaciones/mamisvip ($imagenNum).png";

        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':descripcion', $descripcion);
        $stmt->bindParam(':idCategoria', $idCategoria);
        $stmt->bindParam(':idUsuario', $idUsuario);
        $stmt->bindParam(':recomendado', $recomendado);
        $stmt->bindParam(':vista', $vista);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':municipio', $municipio);
        $stmt->bindParam(':estado', $estado);
        $stmt->bindParam(':imagen1', $imagen1);

        $stmt->execute();
    }

    echo json_encode(['status' => 'success', 'message' => "$numRecords records inserted successfully."]);

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
