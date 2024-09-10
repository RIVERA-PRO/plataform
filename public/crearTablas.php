<?php
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

    // Función para crear una tabla si no existe
    function crearTablaSiNoExiste($conexion, $nombreTabla, $consultaSQL) {
        $sql = "SHOW TABLES LIKE '$nombreTabla'";
        $stmt = $conexion->prepare($sql);
        $stmt->execute();
        
        if ($stmt->rowCount() == 0) {
            // La tabla no existe, se crea
            $stmtCreate = $conexion->prepare($consultaSQL);
            $stmtCreate->execute();
            echo "Tabla $nombreTabla creada correctamente.<br>";
        } else {
            echo "La tabla $nombreTabla ya existe.<br>";
        }
    }

 // Crear tabla 'categorias' si no existe
 $consultaCategorias = "CREATE TABLE IF NOT EXISTS `categorias` (
    idCategoria INT(11) AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(100) NOT NULL
)";
crearTablaSiNoExiste($conexion, 'categorias', $consultaCategorias);

    // Crear tabla 'contacto' si no existe
    $consultaContacto = "CREATE TABLE IF NOT EXISTS `contacto` (
        idContacto INT(11) AUTO_INCREMENT PRIMARY KEY,
        idUsuario INT(11) NOT NULL,
        nombre VARCHAR(100) NOT NULL,
        telefono VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        direccion VARCHAR(100) NOT NULL
    )";
    crearTablaSiNoExiste($conexion, 'contacto', $consultaContacto);

    // Crear tabla 'banner' si no existe
    $consultaBanner = "CREATE TABLE IF NOT EXISTS `banner` (
        idBanner INT(11) AUTO_INCREMENT PRIMARY KEY,
        imagen VARCHAR(900) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    crearTablaSiNoExiste($conexion, 'banner', $consultaBanner);


// Crear tabla 'publicaciones' si no existe
$consultaPublicaciones = "CREATE TABLE IF NOT EXISTS `publicaciones` (
    idPublicacion INT(11) AUTO_INCREMENT PRIMARY KEY,
    idCategoria INT(100) NOT NULL,
    idUsuario INT(100) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    estado VARCHAR(255) NOT NULL,
    municipio VARCHAR(255) NOT NULL,
    recomendado VARCHAR(20) NOT NULL,
    vista VARCHAR(20) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    imagen1 VARCHAR(900),
    imagen2 VARCHAR(900),
    imagen3 VARCHAR(900),
    imagen4 VARCHAR(900),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
crearTablaSiNoExiste($conexion, 'publicaciones', $consultaPublicaciones);

    // Crear tabla 'usuarios' si no existe
    $consultaUsuarios = "CREATE TABLE IF NOT EXISTS `usuarios` (
        idUsuario INT(11) AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        contrasena VARCHAR(255) NOT NULL,
        rol  VARCHAR(100) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    crearTablaSiNoExiste($conexion, 'usuarios', $consultaUsuarios);

    $contrasenaAdmin = password_hash('admin1234', PASSWORD_DEFAULT);

 



// Insertar nuevo usuario admin
$sqlInsertAdmin = "INSERT INTO `usuarios` (nombre, email, contrasena, rol, createdAt) 
                  VALUES ('admin', 'admin@gmail.com', :contrasenaAdmin, 'admin', NOW())";
$stmtAdmin = $conexion->prepare($sqlInsertAdmin);
$stmtAdmin->bindParam(':contrasenaAdmin', $contrasenaAdmin);
$stmtAdmin->execute();

echo "Usuario admin creado correctamente.";
    
    echo "Proceso de creación de tablas finalizado.";
} catch (PDOException $error) {
    echo "Error de conexión: " . $error->getMessage();
}
?>
