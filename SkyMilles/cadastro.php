<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configurações do banco de dados
$host = 'localhost';
$dbname = 'Skymilles';
$username = 'root';
$password = '';

try {
    // Conectar ao banco de dados
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Receber dados JSON do formulário
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    // Log para debug
    error_log("Dados recebidos: " . print_r($data, true));
    
    // Validar se as senhas coincidem
    if ($data['senha'] !== $data['confirmaSenha']) {
        echo json_encode(['success' => false, 'message' => 'As senhas não coincidem!']);
        exit;
    }
    
    // Validar campos obrigatórios
    if (empty($data['nomeCompleto']) || empty($data['nomeUsuario']) || 
        empty($data['email']) || empty($data['cpfRg'])) {
        echo json_encode(['success' => false, 'message' => 'Preencha todos os campos obrigatórios!']);
        exit;
    }
    
    // Verificar se o email já existe
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM Usuario WHERE e_mail = :email");
    $stmt->execute([':email' => $data['email']]);
    if ($stmt->fetchColumn() > 0) {
        echo json_encode(['success' => false, 'message' => 'Email já cadastrado!']);
        exit;
    }
    
    // Verificar se o login já existe
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM Usuario WHERE login = :login");
    $stmt->execute([':login' => $data['nomeUsuario']]);
    if ($stmt->fetchColumn() > 0) {
        echo json_encode(['success' => false, 'message' => 'Nome de usuário já existe!']);
        exit;
    }
    
    // Buscar o próximo cod_cliente
    $stmt = $pdo->query("SELECT IFNULL(MAX(cod_cliente), 0) + 1 as proximo_cod FROM Cliente");
    $cod_cliente = $stmt->fetch(PDO::FETCH_ASSOC)['proximo_cod'];
    
    // Buscar o próximo cod_usuario
    $stmt = $pdo->query("SELECT IFNULL(MAX(cod_usuario), 0) + 1 as proximo_cod FROM Usuario");
    $cod_usuario = $stmt->fetch(PDO::FETCH_ASSOC)['proximo_cod'];
    
    // Pegar o ID do avatar selecionado (ou usar padrão)
    $foto_perfil = isset($data['fotoPerfilSelecionada']) ? $data['fotoPerfilSelecionada'] : 'avatar1.jpg';
    
    // Iniciar transação
    $pdo->beginTransaction();
    
    // Inserir na tabela Cliente
    $sql_cliente = "INSERT INTO Cliente (cod_cliente, endereco, sexo, nome_cliente, CPF, data_nasc) 
                    VALUES (:cod_cliente, :endereco, :sexo, :nome_cliente, :cpf, :data_nasc)";
    
    $stmt = $pdo->prepare($sql_cliente);
    $stmt->execute([
        ':cod_cliente' => $cod_cliente,
        ':endereco' => $data['endereco'],
        ':sexo' => 'N', // Não especificado
        ':nome_cliente' => $data['nomeCompleto'],
        ':cpf' => $data['cpfRg'],
        ':data_nasc' => null
    ]);
    
    // Hash da senha (IMPORTANTE: use password_hash em produção!)
    $senha_hash = password_hash($data['senha'], PASSWORD_DEFAULT);
    
    // Inserir na tabela Usuario com o ID do avatar
    $sql_usuario = "INSERT INTO Usuario (cod_usuario, login, senha, e_mail, cod_cliente, foto_perfil) 
                    VALUES (:cod_usuario, :login, :senha, :email, :cod_cliente, :foto_perfil)";
    
    $stmt = $pdo->prepare($sql_usuario);
    $stmt->execute([
        ':cod_usuario' => $cod_usuario,
        ':login' => $data['nomeUsuario'],
        ':senha' => $senha_hash, // Usando hash da senha
        ':email' => $data['email'],
        ':cod_cliente' => $cod_cliente,
        ':foto_perfil' => $foto_perfil // ID do avatar selecionado
    ]);
    
    // Commit da transação
    $pdo->commit();
    
    echo json_encode([
        'success' => true, 
        'message' => 'Usuário cadastrado com sucesso!',
        'cod_cliente' => $cod_cliente,
        'cod_usuario' => $cod_usuario,
        'foto_perfil' => $foto_perfil
    ]);
    
} catch(PDOException $e) {
    // Rollback em caso de erro
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    
    error_log("Erro no cadastro: " . $e->getMessage());
    
    echo json_encode([
        'success' => false, 
        'message' => 'Erro ao cadastrar: ' . $e->getMessage()
    ]);
}
?>