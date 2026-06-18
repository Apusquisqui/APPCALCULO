<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$host    = 'localhost';
$db      = 'loopmathsesion';
$user    = 'emi';
$pass    = '#APUSQUISQUI';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;port=3306;dbname=$db;charset=$charset";

try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    echo json_encode(['ok' => false, 'msg' => 'Error de conexión: ' . $e->getMessage()]);
    exit;
}

// ── Solo aceptar POST ──────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['ok' => false, 'msg' => 'Método no permitido']);
    exit;
}

// ── Leer y validar datos ───────────────────────────────────────────────────
$data = json_decode(file_get_contents('php://input'), true);

$nombre    = trim($data['nombre']    ?? '');
$apellidos = trim($data['apellidos'] ?? '');
$edad      = intval($data['edad']    ?? 0);
$sexo      = trim($data['sexo']      ?? '');
$usuario   = trim($data['usuario']   ?? '');
$contrasena = $data['contrasena']    ?? '';

if (!$nombre || !$apellidos || !$edad || !$sexo || !$usuario || !$contrasena) {
    echo json_encode(['ok' => false, 'msg' => 'Todos los campos son obligatorios']);
    exit;
}

if (!in_array($sexo, ['Masculino', 'Femenino'])) {
    echo json_encode(['ok' => false, 'msg' => 'Valor de sexo no válido']);
    exit;
}

// ── Hash de contraseña ─────────────────────────────────────────────────────
$hash = password_hash($contrasena, PASSWORD_BCRYPT);

// ── Insertar en BD ─────────────────────────────────────────────────────────
try {
    $stmt = $pdo->prepare("
        INSERT INTO usuarios (nombre, apellidos, edad, sexo, usuario, password)
        VALUES (:nombre, :apellidos, :edad, :sexo, :usuario, :password)
    ");
    $stmt->execute([
        ':nombre'    => $nombre,
        ':apellidos' => $apellidos,
        ':edad'      => $edad,
        ':sexo'      => $sexo,
        ':usuario'   => $usuario,
        ':password'  => $hash,
    ]);

    echo json_encode(['ok' => true, 'msg' => 'Usuario registrado correctamente']);

} catch (PDOException $e) {
    // Código 23000 = duplicado (usuario ya existe)
    if ($e->getCode() === '23000') {
        echo json_encode(['ok' => false, 'msg' => 'Ese nombre de usuario ya está en uso']);
    } else {
        echo json_encode(['ok' => false, 'msg' => 'Error al guardar: ' . $e->getMessage()]);
    }
}