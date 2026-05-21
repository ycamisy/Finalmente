<?php
// ==================== API DE CLIENTES - INTEGRADA COM BD SKYMILLES ====================
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configurações do banco de dados
define('DB_HOST', 'localhost');
define('DB_NAME', 'Skymilles');
define('DB_USER', 'root');
define('DB_PASS', '');

// ==================== CLASSE DE CONEXÃO ====================
class Database {
    private static $instance = null;
    private $conn;
    
    private function __construct() {
        try {
            $this->conn = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch(PDOException $e) {
            http_response_code(500);
            die(json_encode([
                'success' => false,
                'message' => 'Erro de conexão: ' . $e->getMessage()
            ], JSON_UNESCAPED_UNICODE));
        }
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->conn;
    }
}

// ==================== CLASSE DE RESPOSTA ====================
class Response {
    public static function send($success, $message, $data = null, $code = 200) {
        http_response_code($code);
        echo json_encode([
            'success' => $success,
            'message' => $message,
            'data' => $data,
            'timestamp' => date('Y-m-d H:i:s')
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

// ==================== GERENCIADOR DE CLIENTES ====================
class ClienteManager {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    public function listar() {
        try {
            // Buscar clientes da tabela Cliente e dados relacionados do Usuario
            $sql = "SELECT 
                c.cod_cliente as id,
                c.nome_cliente,
                u.e_mail as email,
                c.CPF,
                c.telefone,
                c.telefone as celular,
                c.endereco,
                c.data_nasc,
                c.sexo,
                CASE 
                    WHEN u.is_admin = TRUE THEN 'Administrador'
                    ELSE 'Cliente'
                END as tipo_usuario,
                'Ativo' as status,
                0 as milhas_iniciais,
                CURRENT_TIMESTAMP as data_cadastro,
                u.login,
                u.foto_perfil
            FROM Cliente c
            LEFT JOIN Usuario u ON c.cod_cliente = u.cod_cliente
            ORDER BY c.nome_cliente ASC";
            
            $stmt = $this->db->query($sql);
            $clientes = $stmt->fetchAll();
            
            Response::send(true, "Clientes listados com sucesso", $clientes);
            
        } catch(PDOException $e) {
            Response::send(false, "Erro ao listar clientes: " . $e->getMessage(), null, 500);
        }
    }
    
    public function buscar($id) {
        try {
            $sql = "SELECT 
                c.cod_cliente as id,
                c.nome_cliente,
                u.e_mail as email,
                c.CPF,
                c.telefone,
                c.telefone as celular,
                c.endereco,
                c.data_nasc,
                c.sexo,
                CASE 
                    WHEN u.is_admin = TRUE THEN 'Administrador'
                    ELSE 'Cliente'
                END as tipo_usuario,
                'Ativo' as status,
                0 as milhas_iniciais,
                u.login,
                u.foto_perfil
            FROM Cliente c
            LEFT JOIN Usuario u ON c.cod_cliente = u.cod_cliente
            WHERE c.cod_cliente = :id";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => (int)$id]);
            $cliente = $stmt->fetch();
            
            if ($cliente) {
                Response::send(true, "Cliente encontrado", $cliente);
            } else {
                Response::send(false, "Cliente não encontrado", null, 404);
            }
            
        } catch(PDOException $e) {
            Response::send(false, "Erro ao buscar cliente: " . $e->getMessage(), null, 500);
        }
    }
    
    public function cadastrar($data) {
        try {
            // Iniciar transação
            $this->db->beginTransaction();
            
            // Validar campos obrigatórios
            $camposObrigatorios = ['nome_cliente', 'email', 'CPF', 'telefone'];
            foreach ($camposObrigatorios as $campo) {
                if (empty($data[$campo])) {
                    Response::send(false, "Campo obrigatório faltando: $campo", null, 400);
                }
            }
            
            // Verificar se CPF já existe
            $checkCPF = $this->db->prepare("SELECT cod_cliente FROM Cliente WHERE CPF = :cpf");
            $checkCPF->execute([':cpf' => $data['CPF']]);
            if ($checkCPF->fetch()) {
                Response::send(false, "CPF já cadastrado no sistema", null, 400);
            }
            
            // Verificar se email já existe
            $checkEmail = $this->db->prepare("SELECT cod_usuario FROM Usuario WHERE e_mail = :email");
            $checkEmail->execute([':email' => $data['email']]);
            if ($checkEmail->fetch()) {
                Response::send(false, "E-mail já cadastrado no sistema", null, 400);
            }
            
            // Gerar cod_cliente único
            $sql_check = "SELECT MAX(cod_cliente) as max_cod FROM Cliente";
            $stmt_check = $this->db->query($sql_check);
            $result = $stmt_check->fetch();
            $novo_cod = ($result['max_cod'] ?? 0) + 1;
            
            // Inserir na tabela Cliente
            $sql = "INSERT INTO Cliente (cod_cliente, nome_cliente, CPF, data_nasc, sexo, telefone, endereco) 
                    VALUES (:cod_cliente, :nome_cliente, :CPF, :data_nasc, :sexo, :telefone, :endereco)";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':cod_cliente' => $novo_cod,
                ':nome_cliente' => $data['nome_cliente'],
                ':CPF' => $data['CPF'],
                ':data_nasc' => $data['data_nasc'] ?? null,
                ':sexo' => $data['sexo'] ?? 'M',
                ':telefone' => $data['telefone'],
                ':endereco' => $data['endereco'] ?? null
            ]);
            
            // Criar usuário associado se login e senha foram fornecidos
            if (!empty($data['login']) && !empty($data['senha'])) {
                $sql_usuario = "INSERT INTO Usuario (login, senha, e_mail, foto_perfil, cod_cliente, is_admin) 
                               VALUES (:login, :senha, :email, :foto_perfil, :cod_cliente, :is_admin)";
                
                $stmt_usuario = $this->db->prepare($sql_usuario);
                $is_admin = (isset($data['tipo_usuario']) && $data['tipo_usuario'] === 'Administrador') ? 1 : 0;
                
                $stmt_usuario->execute([
                    ':login' => $data['login'],
                    ':senha' => md5($data['senha']),
                    ':email' => $data['email'],
                    ':foto_perfil' => $data['foto_perfil'] ?? 'avatar1.jpg',
                    ':cod_cliente' => $novo_cod,
                    ':is_admin' => $is_admin
                ]);
                
                $cod_usuario = $this->db->lastInsertId();
            } else {
                // Gerar login e senha automáticos
                $login = strtolower(str_replace(' ', '', $data['nome_cliente'])) . $novo_cod;
                $senha_padrao = 'senha123';
                
                $sql_usuario = "INSERT INTO Usuario (login, senha, e_mail, foto_perfil, cod_cliente, is_admin) 
                               VALUES (:login, :senha, :email, :foto_perfil, :cod_cliente, :is_admin)";
                
                $stmt_usuario = $this->db->prepare($sql_usuario);
                $is_admin = (isset($data['tipo_usuario']) && $data['tipo_usuario'] === 'Administrador') ? 1 : 0;
                
                $stmt_usuario->execute([
                    ':login' => $login,
                    ':senha' => md5($senha_padrao),
                    ':email' => $data['email'],
                    ':foto_perfil' => 'avatar1.jpg',
                    ':cod_cliente' => $novo_cod,
                    ':is_admin' => $is_admin
                ]);
                
                $cod_usuario = $this->db->lastInsertId();
            }
            
            // Commit da transação
            $this->db->commit();
            
            $response_data = [
                'id' => $novo_cod,
                'cod_cliente' => $novo_cod,
                'cod_usuario' => $cod_usuario,
                'nome_cliente' => $data['nome_cliente'],
                'email' => $data['email'],
                'CPF' => $data['CPF'],
                'login' => $login ?? $data['login']
            ];
            
            Response::send(true, "Cliente cadastrado com sucesso!", $response_data, 201);
            
        } catch(PDOException $e) {
            $this->db->rollBack();
            Response::send(false, "Erro ao cadastrar cliente: " . $e->getMessage(), null, 400);
        }
    }
    
    public function atualizar($data) {
        try {
            if (empty($data['id'])) {
                Response::send(false, "ID do cliente não fornecido", null, 400);
            }
            
            // Iniciar transação
            $this->db->beginTransaction();
            
            // Atualizar tabela Cliente
            $sql = "UPDATE Cliente SET 
                    nome_cliente = :nome_cliente,
                    CPF = :CPF,
                    telefone = :telefone,
                    endereco = :endereco,
                    data_nasc = :data_nasc,
                    sexo = :sexo
                    WHERE cod_cliente = :id";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':id' => (int)$data['id'],
                ':nome_cliente' => $data['nome_cliente'],
                ':CPF' => $data['CPF'],
                ':telefone' => $data['telefone'],
                ':endereco' => $data['endereco'] ?? null,
                ':data_nasc' => $data['data_nasc'] ?? null,
                ':sexo' => $data['sexo'] ?? 'M'
            ]);
            
            // Atualizar Usuario se existir
            $checkUsuario = $this->db->prepare("SELECT cod_usuario FROM Usuario WHERE cod_cliente = :cod_cliente");
            $checkUsuario->execute([':cod_cliente' => (int)$data['id']]);
            
            if ($checkUsuario->fetch()) {
                $is_admin = (isset($data['tipo_usuario']) && $data['tipo_usuario'] === 'Administrador') ? 1 : 0;
                
                $sql_usuario = "UPDATE Usuario SET 
                                e_mail = :email,
                                is_admin = :is_admin
                                WHERE cod_cliente = :cod_cliente";
                
                $stmt_usuario = $this->db->prepare($sql_usuario);
                $stmt_usuario->execute([
                    ':email' => $data['email'],
                    ':is_admin' => $is_admin,
                    ':cod_cliente' => (int)$data['id']
                ]);
            }
            
            // Commit da transação
            $this->db->commit();
            
            Response::send(true, "Cliente atualizado com sucesso!", $data);
            
        } catch(PDOException $e) {
            $this->db->rollBack();
            Response::send(false, "Erro ao atualizar cliente: " . $e->getMessage(), null, 400);
        }
    }
    
    public function deletar($id) {
        try {
            // Iniciar transação
            $this->db->beginTransaction();
            
            // Deletar Usuario primeiro (por causa da foreign key)
            $stmt_usuario = $this->db->prepare("DELETE FROM Usuario WHERE cod_cliente = :id");
            $stmt_usuario->execute([':id' => (int)$id]);
            
            // Deletar Cliente
            $stmt = $this->db->prepare("DELETE FROM Cliente WHERE cod_cliente = :id");
            $stmt->execute([':id' => (int)$id]);
            
            if ($stmt->rowCount() > 0) {
                $this->db->commit();
                Response::send(true, "Cliente deletado com sucesso!");
            } else {
                $this->db->rollBack();
                Response::send(false, "Cliente não encontrado", null, 404);
            }
            
        } catch(PDOException $e) {
            $this->db->rollBack();
            Response::send(false, "Erro ao deletar cliente: " . $e->getMessage(), null, 500);
        }
    }
}

// ==================== ROTEAMENTO ====================
try {
    $method = $_SERVER['REQUEST_METHOD'];
    $action = $_GET['action'] ?? '';
    
    $manager = new ClienteManager();
    
    switch($action) {
        case 'listar':
            $manager->listar();
            break;
            
        case 'buscar':
            $id = $_GET['id'] ?? 0;
            $manager->buscar($id);
            break;
            
        case 'cadastrar':
            if ($method !== 'POST') {
                Response::send(false, "Método não permitido. Use POST", null, 405);
            }
            $inputData = json_decode(file_get_contents('php://input'), true);
            if ($inputData === null) {
                Response::send(false, "JSON inválido", null, 400);
            }
            $manager->cadastrar($inputData);
            break;
            
        case 'atualizar':
            if (!in_array($method, ['POST', 'PUT'])) {
                Response::send(false, "Método não permitido. Use POST ou PUT", null, 405);
            }
            $inputData = json_decode(file_get_contents('php://input'), true);
            if ($inputData === null) {
                Response::send(false, "JSON inválido", null, 400);
            }
            $manager->atualizar($inputData);
            break;
            
        case 'deletar':
            if (!in_array($method, ['DELETE', 'POST'])) {
                Response::send(false, "Método não permitido", null, 405);
            }
            $id = $_GET['id'] ?? 0;
            $manager->deletar($id);
            break;
            
        default:
            Response::send(false, "Ação não especificada ou inválida", [
                'acoes_disponiveis' => ['listar', 'buscar', 'cadastrar', 'atualizar', 'deletar']
            ], 400);
    }
    
} catch(Exception $e) {
    error_log("Erro na API de Clientes: " . $e->getMessage());
    Response::send(false, "Erro interno: " . $e->getMessage(), null, 500);
}
?>