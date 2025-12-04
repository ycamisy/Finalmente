<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configurações do banco de dados
$host = 'localhost';
$dbname = 'Skymilles'; // Nome exato do banco com letra maiúscula
$username = 'root';
$password = '';

try {
    // Conectar ao banco de dados
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Receber dados JSON
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    // Log para debug
    error_log("Dados recebidos para atualizar avatar: " . print_r($data, true));
    
    // Validar dados recebidos
    if (empty($data['cod_usuario']) || empty($data['foto_perfil'])) {
        echo json_encode([
            'success' => false, 
            'message' => 'Dados incompletos. É necessário enviar cod_usuario e foto_perfil.'
        ]);
        exit;
    }
    
    // Verificar se o usuário existe
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM Usuario WHERE cod_usuario = :cod_usuario");
    $stmt->execute([':cod_usuario' => $data['cod_usuario']]);
    
    if ($stmt->fetchColumn() == 0) {
        echo json_encode([
            'success' => false, 
            'message' => 'Usuário não encontrado.'
        ]);
        exit;
    }
    
    // Atualizar a foto de perfil
    $sql = "UPDATE Usuario SET foto_perfil = :foto_perfil WHERE cod_usuario = :cod_usuario";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':foto_perfil' => $data['foto_perfil'],
        ':cod_usuario' => $data['cod_usuario']
    ]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Avatar atualizado com sucesso!',
        'foto_perfil' => $data['foto_perfil']
    ]);
    
} catch(PDOException $e) {
    error_log("Erro ao atualizar avatar: " . $e->getMessage());
    
    echo json_encode([
        'success' => false,
        'message' => 'Erro ao atualizar avatar: ' . $e->getMessage()
    ]);
}
?>