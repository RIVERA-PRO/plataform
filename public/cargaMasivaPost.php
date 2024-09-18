<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
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
    // Obtener datos del POST
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validar datos
    if (!isset($data['numRecords']) || !isset($data['telefonos']) || !isset($data['idUsuario'])) {
        echo json_encode(['status' => 'error', 'message' => 'Faltan datos.']);
        exit();
    }

    $numRecords = (int)$data['numRecords'];
    $telefonos = $data['telefonos'];
    $idUsuario = (int)$data['idUsuario'];

    // Validar que el número de registros y el idUsuario sean válidos
    if ($numRecords <= 0 || $idUsuario <= 0) {
        echo json_encode(['status' => 'error', 'message' => 'Datos inválidos.']);
        exit();
    }

    // Verificar si se pasó idCategoria en el POST
    $idCategoriaPost = isset($data['idCategoria']) ? (int)$data['idCategoria'] : null;
    
    // Verificar si se pasó estado y municipio en el POST
    $estadoPost = isset($data['estado']) ? $data['estado'] : null;
    $municipioPost = isset($data['municipio']) ? $data['municipio'] : null;

    $dsn = "mysql:host=$servidor;dbname=$dbname";
    $conexion = new PDO($dsn, $usuario, $contrasena);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Incluir archivos externos
    require 'estados.php';
    require 'titulos.php';
    require 'descripciones.php';

    // Obtener categorías desde la base de datos si no se pasa idCategoria
    if ($idCategoriaPost === null) {
        $sqlCategorias = "SELECT idCategoria FROM categorias";
        $stmtCategorias = $conexion->query($sqlCategorias);
        $categorias = $stmtCategorias->fetchAll(PDO::FETCH_COLUMN);

        // Verificar si se obtuvieron categorías
        if (empty($categorias)) {
            echo json_encode(['status' => 'error', 'message' => 'No se encontraron categorías.']);
            exit();
        }
    }

    // Si no se pasó estado, seleccionar uno aleatoriamente
    if ($estadoPost === null) {
        $estado = array_rand($estados);
    } else {
        $estado = $estadoPost;
    }
    
    $municipios = $estados[$estado];
    
    // Si no se pasó municipio, seleccionar uno aleatoriamente
    if ($municipioPost === null) {
        $municipio = $municipios[array_rand($municipios)];
    } else {
        $municipio = $municipioPost;
    }

    $sqlInsert = "INSERT INTO `publicaciones` (titulo, descripcion, idCategoria, idUsuario, recomendado, vista, telefono, municipio, estado, imagen1) 
                  VALUES (:titulo, :descripcion, :idCategoria, :idUsuario, :recomendado, :vista, :telefono, :municipio, :estado, :imagen1)";
    $stmt = $conexion->prepare($sqlInsert);

    $numTelefonos = count($telefonos);

    for ($i = 0; $i < $numRecords; $i++) {
        $titulo = $tituloBase[array_rand($tituloBase)];
        $descripcion = $descripcionBase[array_rand($descripcionBase)];

        // Usar idCategoria proporcionado o uno aleatorio
        $idCategoria = $idCategoriaPost !== null ? $idCategoriaPost : $categorias[array_rand($categorias)];

        $recomendado = 'si';
        $vista = 'visible';

        // Repartir teléfonos de manera cíclica
        $telefono = $numTelefonos > 0 ? $telefonos[$i % $numTelefonos] : null;

        // Seleccionar imagen aleatoria
        $imagenNum = rand(2, 275);
        $imagen1 = "$rutaweb/imagenes_publicaciones/mamisvip ($imagenNum).png";

        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':descripcion', $descripcion);
        $stmt->bindParam(':idCategoria', $idCategoria);
        $stmt->bindParam(':idUsuario', $idUsuario); // Usar el idUsuario proporcionado
        $stmt->bindParam(':recomendado', $recomendado);
        $stmt->bindParam(':vista', $vista);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':municipio', $municipio);
        $stmt->bindParam(':estado', $estado);
        $stmt->bindParam(':imagen1', $imagen1);

        $stmt->execute();

        // Repartir estado y municipio aleatoriamente entre los registros si no se especifica uno
        if ($estadoPost === null) {
            $estado = array_rand($estados);
            $municipios = $estados[$estado];
            $municipio = $municipios[array_rand($municipios)];
        }
    }

    echo json_encode(['status' => 'success', 'message' => "$numRecords registros insertados correctamente."]);

} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
