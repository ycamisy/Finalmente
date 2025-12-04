<?php
// ==================== TESTE DE CONEXÃO ====================
// Teste 1: Verificar se PHP está rodando
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log inicial
error_log("=== API INICIADA ===" . date('Y-m-d H:i:s'));

// Retornar resposta de teste
if (isset($_GET['teste'])) {
    header('Content-Type: application/json; charset=utf-8');
    die(json_encode([
        'status' => 'OK',
        'mensagem' => 'PHP está funcionando!',
        'timestamp' => date('Y-m-d H:i:s'),
        'php_version' => phpversion()
    ]));
}

// ==================== api.php ====================
// API REST para Sistema Skymilles - VERSÃO UNIFICADA
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
    
    public function cadastrar($data) {
        try {
            $checkClientes = $this->db->query("SHOW TABLES LIKE 'Cliente'");
            if ($checkClientes->rowCount() > 0) {
                // Gerar cod_cliente único
                $sql_check = "SELECT MAX(cod_cliente) as max_cod FROM Cliente";
                $stmt_check = $this->db->query($sql_check);
                $result = $stmt_check->fetch();
                $novo_cod = ($result['max_cod'] ?? 0) + 1;
                
                $sql = "INSERT INTO Cliente (cod_cliente, nome_cliente, CPF, data_nasc, sexo, telefone, endereco) 
                        VALUES (:cod_cliente, :nome_cliente, :CPF, :data_nasc, :sexo, :telefone, :endereco)";
                
                $stmt = $this->db->prepare($sql);
                $stmt->execute([
                    ':cod_cliente' => $novo_cod,
                    ':nome_cliente' => $data['nome_cliente'],
                    ':CPF' => $data['CPF'],
                    ':data_nasc' => $data['data_nasc'] ?? null,
                    ':sexo' => $data['sexo'] ?? null,
                    ':telefone' => $data['telefone'] ?? null,
                    ':endereco' => $data['endereco'] ?? null
                ]);
                
                // Criar usuário associado
                $sql_usuario = "INSERT INTO Usuario (login, senha, e_mail, cod_cliente) 
                               VALUES (:login, :senha, :email, :cod_cliente)";
                
                $stmt_usuario = $this->db->prepare($sql_usuario);
                $stmt_usuario->execute([
                    ':login' => $data['login'],
                    ':senha' => md5($data['senha']),
                    ':email' => $data['email'],
                    ':cod_cliente' => $novo_cod
                ]);
                
                $cod_usuario = $this->db->lastInsertId();
                
                $response_data = [
                    'cod_cliente' => $novo_cod,
                    'cod_usuario' => $cod_usuario,
                    'nome_cliente' => $data['nome_cliente'],
                    'email' => $data['email'],
                    'login' => $data['login']
                ];
                
                Response::send(true, "Cliente cadastrado com sucesso!", $response_data, 201);
                return;
            }
            Response::send(false, "Nenhuma tabela de clientes encontrada", null, 500);
        } catch(PDOException $e) {
            Response::send(false, "Erro ao cadastrar: " . $e->getMessage(), null, 400);
        }
    }
    
    public function listar() {
        try {
            $checkClientes = $this->db->query("SHOW TABLES LIKE 'Cliente'");
            if ($checkClientes->rowCount() > 0) {
                $stmt = $this->db->query("SELECT * FROM Cliente ORDER BY nome_cliente ASC");
                Response::send(true, "Clientes listados", $stmt->fetchAll());
                return;
            }
            Response::send(false, "Nenhuma tabela de clientes encontrada", null, 500);
        } catch(PDOException $e) {
            Response::send(false, "Erro ao listar: " . $e->getMessage(), null, 500);
        }
    }
    
    public function buscar($id) {
        try {
            $checkClientes = $this->db->query("SHOW TABLES LIKE 'Cliente'");
            if ($checkClientes->rowCount() > 0) {
                $stmt = $this->db->prepare("SELECT * FROM Cliente WHERE cod_cliente = :id");
                $stmt->execute([':id' => (int)$id]);
                $row = $stmt->fetch();
                if ($row) {
                    Response::send(true, "Cliente encontrado", $row);
                } else {
                    Response::send(false, "Cliente não encontrado", null, 404);
                }
                return;
            }
            Response::send(false, "Nenhuma tabela de clientes encontrada", null, 500);
        } catch(PDOException $e) {
            Response::send(false, "Erro: " . $e->getMessage(), null, 500);
        }
    }
}

// ==================== GERENCIADOR DE VOOS ====================
class VooManager {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    public function listar() {
        try {
            $checkVoos = $this->db->query("SHOW TABLES LIKE 'voos'");
            $checkVoo = $this->db->query("SHOW TABLES LIKE 'Voo'");
            
            if ($checkVoos->rowCount() > 0) {
                $sql = "SELECT * FROM voos ORDER BY saida DESC";
            } else if ($checkVoo->rowCount() > 0) {
                $sql = "SELECT 
                    v.cod_voo as id,
                    v.num_voo,
                    v.data_hora_partida as saida,
                    v.data_hora_chegada as chegada,
                    v.aviao as modelo,
                    v.companhia,
                    ao.nome_aeroporto as aeroporto_origem,
                    ad.nome_aeroporto as aeroporto_destino,
                    co.nome_cidade as origem,
                    cd.nome_cidade as destino,
                    co.estado as estado_origem,
                    cd.estado as estado_destino,
                    CONCAT('VOO', v.num_voo) as codigo,
                    'Confirmado' as status
                FROM Voo v
                INNER JOIN Aeroporto ao ON v.cod_local_partida = ao.cod_aeroporto
                INNER JOIN Aeroporto ad ON v.cod_destino = ad.cod_aeroporto
                INNER JOIN Cidade co ON ao.cod_cidade = co.cod_cidade
                INNER JOIN Cidade cd ON ad.cod_cidade = cd.cod_cidade
                ORDER BY v.data_hora_partida DESC";
            } else {
                Response::send(false, "Nenhuma tabela de voos encontrada no banco de dados", null, 500);
                return;
            }
            
            $stmt = $this->db->query($sql);
            $voos = $stmt->fetchAll();
            
            Response::send(true, "Voos listados com sucesso", $voos);
        } catch(PDOException $e) {
            Response::send(false, "Erro ao listar: " . $e->getMessage(), null, 500);
        }
    }
    
    public function buscar($id) {
        try {
            $checkVoos = $this->db->query("SHOW TABLES LIKE 'voos'");
            $checkVoo = $this->db->query("SHOW TABLES LIKE 'Voo'");
            
            if ($checkVoos->rowCount() > 0) {
                $sql = "SELECT * FROM voos WHERE id = :id";
            } else if ($checkVoo->rowCount() > 0) {
                $sql = "SELECT 
                    v.cod_voo as id,
                    v.num_voo,
                    v.data_hora_partida as saida,
                    v.data_hora_chegada as chegada,
                    v.aviao as modelo,
                    v.companhia,
                    ao.nome_aeroporto as aeroporto_origem,
                    ad.nome_aeroporto as aeroporto_destino,
                    co.nome_cidade as origem,
                    cd.nome_cidade as destino,
                    CONCAT('VOO', v.num_voo) as codigo
                FROM Voo v
                INNER JOIN Aeroporto ao ON v.cod_local_partida = ao.cod_aeroporto
                INNER JOIN Aeroporto ad ON v.cod_destino = ad.cod_aeroporto
                INNER JOIN Cidade co ON ao.cod_cidade = co.cod_cidade
                INNER JOIN Cidade cd ON ad.cod_cidade = cd.cod_cidade
                WHERE v.cod_voo = :id";
            } else {
                Response::send(false, "Nenhuma tabela de voos encontrada", null, 500);
                return;
            }
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => (int)$id]);
            $voo = $stmt->fetch();
            
            if ($voo) {
                Response::send(true, "Voo encontrado", $voo);
            } else {
                Response::send(false, "Voo não encontrado", null, 404);
            }
        } catch(PDOException $e) {
            Response::send(false, "Erro: " . $e->getMessage(), null, 500);
        }
    }
    
    public function cadastrar($data) {
        try {
            $checkVoos = $this->db->query("SHOW TABLES LIKE 'voos'");
            $checkVoo = $this->db->query("SHOW TABLES LIKE 'Voo'");
            
            if ($checkVoos->rowCount() > 0) {
                $campos = ['origem', 'destino', 'saida', 'chegada', 'frequencia', 'companhia', 'assentos', 'status', 'modelo', 'valor'];
                foreach ($campos as $campo) {
                    if (empty($data[$campo])) {
                        Response::send(false, "Campo obrigatório faltando: $campo", null, 400);
                    }
                }
                $codigo = strtoupper($data['codigo'] ?? '');
                if (empty($codigo)) {
                    $codigo = $this->gerarCodigo();
                }
                $sql = "INSERT INTO voos (origem, destino, codigo, saida, chegada, frequencia, 
                        companhia, assentos, status, modelo, valor) 
                        VALUES (:origem, :destino, :codigo, :saida, :chegada, :frequencia, 
                        :companhia, :assentos, :status, :modelo, :valor)";
                $stmt = $this->db->prepare($sql);
                $stmt->execute([
                    ':origem' => $data['origem'],
                    ':destino' => $data['destino'],
                    ':codigo' => $codigo,
                    ':saida' => $data['saida'],
                    ':chegada' => $data['chegada'],
                    ':frequencia' => $data['frequencia'],
                    ':companhia' => $data['companhia'],
                    ':assentos' => (int)$data['assentos'],
                    ':status' => $data['status'],
                    ':modelo' => $data['modelo'],
                    ':valor' => $data['valor']
                ]);
                $data['id'] = $this->db->lastInsertId();
                $data['codigo'] = $codigo;
            } else if ($checkVoo->rowCount() > 0) {
                $campos = ['data_hora_partida', 'data_hora_chegada', 'aviao', 'companhia', 'cod_local_partida', 'cod_destino'];
                foreach ($campos as $campo) {
                    if (empty($data[$campo])) {
                        Response::send(false, "Campo obrigatório faltando: $campo", null, 400);
                    }
                }
                $numVoo = isset($data['num_voo']) && $data['num_voo'] !== '' ? (int)$data['num_voo'] : (int)date('ymdHi');
                $sql = "INSERT INTO Voo (num_voo, data_hora_partida, data_hora_chegada, aviao, companhia, cod_local_partida, cod_destino) 
                        VALUES (:num_voo, :data_hora_partida, :data_hora_chegada, :aviao, :companhia, :cod_local_partida, :cod_destino)";
                $stmt = $this->db->prepare($sql);
                $stmt->execute([
                    ':num_voo' => $numVoo,
                    ':data_hora_partida' => $data['data_hora_partida'],
                    ':data_hora_chegada' => $data['data_hora_chegada'],
                    ':aviao' => $data['aviao'],
                    ':companhia' => $data['companhia'],
                    ':cod_local_partida' => (int)$data['cod_local_partida'],
                    ':cod_destino' => (int)$data['cod_destino']
                ]);
                $data['cod_voo'] = $this->db->lastInsertId();
                $data['num_voo'] = $numVoo;
            } else {
                Response::send(false, "Nenhuma tabela de voos encontrada", null, 500);
                return;
            }
            Response::send(true, "Voo cadastrado com sucesso!", $data, 201);
        } catch(PDOException $e) {
            Response::send(false, "Erro ao cadastrar: " . $e->getMessage(), null, 400);
        }
    }
    
    public function atualizar($data) {
        try {
            $checkVoos = $this->db->query("SHOW TABLES LIKE 'voos'");
            $checkVoo = $this->db->query("SHOW TABLES LIKE 'Voo'");
            
            if ($checkVoos->rowCount() > 0) {
                if (empty($data['id'])) {
                    Response::send(false, "ID do voo não fornecido", null, 400);
                }
                $sql = "UPDATE voos SET 
                        origem = :origem, destino = :destino, codigo = :codigo,
                        saida = :saida, chegada = :chegada, frequencia = :frequencia,
                        companhia = :companhia, assentos = :assentos, status = :status,
                        modelo = :modelo, valor = :valor
                        WHERE id = :id";
                $stmt = $this->db->prepare($sql);
                $codigo = strtoupper($data['codigo'] ?? '');
                if (empty($codigo)) {
                    $codigo = $this->gerarCodigo();
                }
                $stmt->execute([
                    ':id' => (int)$data['id'],
                    ':origem' => $data['origem'],
                    ':destino' => $data['destino'],
                    ':codigo' => $codigo,
                    ':saida' => $data['saida'],
                    ':chegada' => $data['chegada'],
                    ':frequencia' => $data['frequencia'],
                    ':companhia' => $data['companhia'],
                    ':assentos' => (int)$data['assentos'],
                    ':status' => $data['status'],
                    ':modelo' => $data['modelo'],
                    ':valor' => $data['valor']
                ]);
            } else if ($checkVoo->rowCount() > 0) {
                // Modelo antigo
                if (empty($data['cod_voo'])) {
                    Response::send(false, "ID do voo não fornecido", null, 400);
                }
                
                $sql = "UPDATE Voo SET 
                        num_voo = :num_voo,
                        data_hora_partida = :data_hora_partida,
                        data_hora_chegada = :data_hora_chegada,
                        aviao = :aviao,
                        companhia = :companhia,
                        cod_local_partida = :cod_local_partida,
                        cod_destino = :cod_destino
                        WHERE cod_voo = :cod_voo";
                
                $stmt = $this->db->prepare($sql);
                $stmt->execute([
                    ':cod_voo' => (int)$data['cod_voo'],
                    ':num_voo' => (int)$data['num_voo'],
                    ':data_hora_partida' => $data['data_hora_partida'],
                    ':data_hora_chegada' => $data['data_hora_chegada'],
                    ':aviao' => $data['aviao'],
                    ':companhia' => $data['companhia'],
                    ':cod_local_partida' => (int)$data['cod_local_partida'],
                    ':cod_destino' => (int)$data['cod_destino']
                ]);
            } else {
                Response::send(false, "Nenhuma tabela de voos encontrada", null, 500);
                return;
            }
            
            if ($stmt->rowCount() > 0) {
                Response::send(true, "Voo atualizado!", $data);
            } else {
                Response::send(false, "Nenhuma alteração realizada", null, 304);
            }
        } catch(PDOException $e) {
            Response::send(false, "Erro: " . $e->getMessage(), null, 400);
        }
    }
    
    public function deletar($id) {
        try {
            $checkVoos = $this->db->query("SHOW TABLES LIKE 'voos'");
            $checkVoo = $this->db->query("SHOW TABLES LIKE 'Voo'");
            
            if ($checkVoos->rowCount() > 0) {
                $sql = "DELETE FROM voos WHERE id = :id";
            } else if ($checkVoo->rowCount() > 0) {
                $sql = "DELETE FROM Voo WHERE cod_voo = :id";
            } else {
                Response::send(false, "Nenhuma tabela de voos encontrada", null, 500);
                return;
            }
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => (int)$id]);
            
            if ($stmt->rowCount() > 0) {
                Response::send(true, "Voo deletado com sucesso!");
            } else {
                Response::send(false, "Voo não encontrado", null, 404);
            }
        } catch(PDOException $e) {
            Response::send(false, "Erro: " . $e->getMessage(), null, 500);
        }
    }
    
    public function listarCidades() {
        try {
            $sql = "SELECT cod_cidade, nome_cidade, estado FROM Cidade ORDER BY nome_cidade";
            $stmt = $this->db->query($sql);
            $cidades = $stmt->fetchAll();
            
            Response::send(true, "Cidades listadas", $cidades);
        } catch(PDOException $e) {
            Response::send(false, "Erro: " . $e->getMessage(), null, 500);
        }
    }
    
    public function listarAeroportos() {
        try {
            $sql = "SELECT 
                a.cod_aeroporto,
                a.nome_aeroporto,
                a.endereco,
                c.nome_cidade,
                c.estado
            FROM Aeroporto a
            INNER JOIN Cidade c ON a.cod_cidade = c.cod_cidade
            ORDER BY a.nome_aeroporto";
            
            $stmt = $this->db->query($sql);
            $aeroportos = $stmt->fetchAll();
            
            Response::send(true, "Aeroportos listados", $aeroportos);
        } catch(PDOException $e) {
            Response::send(false, "Erro: " . $e->getMessage(), null, 500);
        }
    }

    private function gerarCodigo() {
        return 'VOO-' . date('ymdHi') . '-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
    }
}

class HotelManager {
    private $db;
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    public function listar() {
        try {
            // Verificar se existem as tabelas de hotéis
            $checkHoteis = $this->db->query("SHOW TABLES LIKE 'hoteis'");
            $checkHotel = $this->db->query("SHOW TABLES LIKE 'Hotel'");
            $checkQuarto = $this->db->query("SHOW TABLES LIKE 'Quarto'");
            
            if ($checkHoteis->rowCount() > 0) {
                // Tabela moderna 'hoteis'
                $stmt = $this->db->query("SELECT * FROM hoteis ORDER BY nomeHotel ASC");
                Response::send(true, "Hotéis listados", $stmt->fetchAll());
                return;
            } elseif ($checkQuarto->rowCount() > 0) {
                // Usar tabela 'Quarto' do banco antigo
                $stmt = $this->db->query("SELECT * FROM Quarto ORDER BY cod_quarto ASC");
                $quartos = $stmt->fetchAll();
                
                // Transformar para formato esperado
                $quartosFormatados = array_map(function($q) {
                    return [
                        'id' => $q['cod_quarto'],
                        'nomeHotel' => 'Hotel Padrão',
                        'numeroQuarto' => $q['cod_quarto'],
                        'tipoQuarto' => 'Padrão',
                        'capacidade' => 2,
                        'valorDiaria' => $q['valor_reserva'] ?? 0,
                        'disponibilidade' => 'Disponível'
                    ];
                }, $quartos);
                
                Response::send(true, "Quartos listados", $quartosFormatados);
                return;
            }
            Response::send(false, "Nenhuma tabela de hotéis/quartos encontrada", null, 500);
        } catch(PDOException $e) {
            Response::send(false, "Erro ao listar: " . $e->getMessage(), null, 500);
        }
    }
    
    public function buscar($id) {
        try {
            $checkHoteis = $this->db->query("SHOW TABLES LIKE 'hoteis'");
            $checkQuarto = $this->db->query("SHOW TABLES LIKE 'Quarto'");
            
            if ($checkHoteis->rowCount() > 0) {
                $stmt = $this->db->prepare("SELECT * FROM hoteis WHERE id = :id");
                $stmt->execute([':id' => (int)$id]);
                $row = $stmt->fetch();
                if ($row) {
                    Response::send(true, "Hotel encontrado", $row);
                } else {
                    Response::send(false, "Hotel não encontrado", null, 404);
                }
            } elseif ($checkQuarto->rowCount() > 0) {
                $stmt = $this->db->prepare("SELECT * FROM Quarto WHERE cod_quarto = :id");
                $stmt->execute([':id' => (int)$id]);
                $row = $stmt->fetch();
                if ($row) {
                    Response::send(true, "Quarto encontrado", $row);
                } else {
                    Response::send(false, "Quarto não encontrado", null, 404);
                }
            } else {
                Response::send(false, "Nenhuma tabela encontrada", null, 500);
            }
        } catch(PDOException $e) {
            Response::send(false, "Erro: " . $e->getMessage(), null, 500);
        }
    }
    
    public function cadastrar($data) {
        try {
            $checkHoteis = $this->db->query("SHOW TABLES LIKE 'hoteis'");
            
            if ($checkHoteis->rowCount() > 0) {
                // Usar tabela 'hoteis' moderna
                $required = ['nomeHotel','categoria','cidade','endereco','tipoQuarto','capacidade','valorDiaria','disponibilidade'];
                foreach ($required as $campo) {
                    if (empty($data[$campo])) Response::send(false, "Campo obrigatório faltando: $campo", null, 400);
                }
                
                $numero = $data['numeroQuarto'] ?? '';
                if (empty($numero)) $numero = $this->gerarNumeroQuarto();
                $valor = $this->normalizarMoeda($data['valorDiaria']);
                
                $sql = "INSERT INTO hoteis (nomeHotel, categoria, cidade, endereco, tipoQuarto, numeroQuarto, capacidade, valorDiaria, disponibilidade, dataCheckIn, dataCheckOut, cafeManha, comodidades, observacoes) 
                        VALUES (:nomeHotel,:categoria,:cidade,:endereco,:tipoQuarto,:numeroQuarto,:capacidade,:valorDiaria,:disponibilidade,:dataCheckIn,:dataCheckOut,:cafeManha,:comodidades,:observacoes)";
                
                $stmt = $this->db->prepare($sql);
                $stmt->execute([
                    ':nomeHotel' => $data['nomeHotel'],
                    ':categoria' => $data['categoria'],
                    ':cidade' => $data['cidade'],
                    ':endereco' => $data['endereco'],
                    ':tipoQuarto' => $data['tipoQuarto'],
                    ':numeroQuarto' => $numero,
                    ':capacidade' => (int)$data['capacidade'],
                    ':valorDiaria' => $valor,
                    ':disponibilidade' => $data['disponibilidade'],
                    ':dataCheckIn' => $data['dataCheckIn'] ?? null,
                    ':dataCheckOut' => $data['dataCheckOut'] ?? null,
                    ':cafeManha' => $data['cafeManha'] ?? null,
                    ':comodidades' => $data['comodidades'] ?? null,
                    ':observacoes' => $data['observacoes'] ?? null,
                ]);
                
                $data['id'] = $this->db->lastInsertId();
                $data['numeroQuarto'] = $numero;
                $data['valorDiaria'] = $valor;
                Response::send(true, "Quarto cadastrado com sucesso!", $data, 201);
                return;
            }
            Response::send(false, "Nenhuma tabela de hotéis encontrada", null, 500);
        } catch(PDOException $e) {
            Response::send(false, "Erro ao cadastrar: " . $e->getMessage(), null, 400);
        }
    }
    
    public function atualizar($data) {
        try {
            $checkHoteis = $this->db->query("SHOW TABLES LIKE 'hoteis'");
            if ($checkHoteis->rowCount() > 0) {
                if (empty($data['id'])) Response::send(false, "ID do hotel não fornecido", null, 400);
                
                $numero = $data['numeroQuarto'] ?? '';
                if (empty($numero)) $numero = $this->gerarNumeroQuarto();
                $valor = $this->normalizarMoeda($data['valorDiaria']);
                
                $sql = "UPDATE hoteis SET nomeHotel=:nomeHotel,categoria=:categoria,cidade=:cidade,endereco=:endereco,tipoQuarto=:tipoQuarto,numeroQuarto=:numeroQuarto,capacidade=:capacidade,valorDiaria=:valorDiaria,disponibilidade=:disponibilidade,dataCheckIn=:dataCheckIn,dataCheckOut=:dataCheckOut,cafeManha=:cafeManha,comodidades=:comodidades,observacoes=:observacoes WHERE id=:id";
                
                $stmt = $this->db->prepare($sql);
                $stmt->execute([
                    ':id' => (int)$data['id'],
                    ':nomeHotel' => $data['nomeHotel'],
                    ':categoria' => $data['categoria'],
                    ':cidade' => $data['cidade'],
                    ':endereco' => $data['endereco'],
                    ':tipoQuarto' => $data['tipoQuarto'],
                    ':numeroQuarto' => $numero,
                    ':capacidade' => (int)$data['capacidade'],
                    ':valorDiaria' => $valor,
                    ':disponibilidade' => $data['disponibilidade'],
                    ':dataCheckIn' => $data['dataCheckIn'] ?? null,
                    ':dataCheckOut' => $data['dataCheckOut'] ?? null,
                    ':cafeManha' => $data['cafeManha'] ?? null,
                    ':comodidades' => $data['comodidades'] ?? null,
                    ':observacoes' => $data['observacoes'] ?? null,
                ]);
                
                if ($stmt->rowCount() > 0) Response::send(true, "Hotel atualizado", $data); 
                else Response::send(false, "Nenhuma alteração realizada", null, 304);
                return;
            }
            Response::send(false, "Nenhuma tabela de hotéis encontrada", null, 500);
        } catch(PDOException $e) {
            Response::send(false, "Erro: " . $e->getMessage(), null, 400);
        }
    }
    
    public function deletar($id) {
        try {
            $checkHoteis = $this->db->query("SHOW TABLES LIKE 'hoteis'");
            $checkQuarto = $this->db->query("SHOW TABLES LIKE 'Quarto'");
            
            if ($checkHoteis->rowCount() > 0) {
                $stmt = $this->db->prepare("DELETE FROM hoteis WHERE id = :id");
                $stmt->execute([':id' => (int)$id]);
                
                if ($stmt->rowCount() > 0) Response::send(true, "Hotel deletado com sucesso!"); 
                else Response::send(false, "Hotel não encontrado", null, 404);
                return;
            } elseif ($checkQuarto->rowCount() > 0) {
                $stmt = $this->db->prepare("DELETE FROM Quarto WHERE cod_quarto = :id");
                $stmt->execute([':id' => (int)$id]);
                
                if ($stmt->rowCount() > 0) Response::send(true, "Quarto deletado com sucesso!"); 
                else Response::send(false, "Quarto não encontrado", null, 404);
                return;
            }
            Response::send(false, "Nenhuma tabela encontrada", null, 500);
        } catch(PDOException $e) {
            Response::send(false, "Erro: " . $e->getMessage(), null, 500);
        }
    }
    
    private function gerarNumeroQuarto() {
        return 'QT-' . date('ymdHi') . '-' . str_pad(rand(1,9999),4,'0',STR_PAD_LEFT);
    }
    
    private function normalizarMoeda($valor) {
        if ($valor === null) return null;
        $num = preg_replace('/[^0-9.,]/', '', (string)$valor);
        $num = str_replace('.', '', $num);
        $num = str_replace(',', '.', $num);
        return $num;
    }
}

class PacoteManager {
    private $db;
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    public function listar() {
        try {
            $checkPacotes = $this->db->query("SHOW TABLES LIKE 'pacotes'");
            if ($checkPacotes->rowCount() > 0) {
                $stmt = $this->db->query("SELECT * FROM pacotes ORDER BY data_inicio DESC");
                Response::send(true, "Pacotes listados", $stmt->fetchAll());
                return;
            }
            Response::send(false, "Nenhuma tabela de pacotes encontrada", null, 500);
        } catch(PDOException $e) {
            Response::send(false, "Erro ao listar: " . $e->getMessage(), null, 500);
        }
    }
    public function buscar($id) {
        try {
            $checkPacotes = $this->db->query("SHOW TABLES LIKE 'pacotes'");
            if ($checkPacotes->rowCount() > 0) {
                $stmt = $this->db->prepare("SELECT * FROM pacotes WHERE id = :id");
                $stmt->execute([':id' => (int)$id]);
                $row = $stmt->fetch();
                if ($row) Response::send(true, "Pacote encontrado", $row); else Response::send(false, "Pacote não encontrado", null, 404);
                return;
            }
            Response::send(false, "Nenhuma tabela de pacotes encontrada", null, 500);
        } catch(PDOException $e) {
            Response::send(false, "Erro: " . $e->getMessage(), null, 500);
        }
    }
    public function cadastrar($data) {
        try {
            $checkPacotes = $this->db->query("SHOW TABLES LIKE 'pacotes'");
            if ($checkPacotes->rowCount() > 0) {
                $required = ['nome_pacote','destino','duracao','data_inicio','data_fim','valor_base','vagas_totais','status'];
                foreach ($required as $campo) {
                    if (empty($data[$campo])) Response::send(false, "Campo obrigatório faltando: $campo", null, 400);
                }
                $codigo = $data['codigo_pacote'] ?? '';
                if (empty($codigo)) $codigo = $this->gerarCodigoPacote();
                $sql = "INSERT INTO pacotes (codigo_pacote, nome_pacote, destino, duracao, data_inicio, data_fim, tipo_pacote, categoria_hotel, companhia_aerea, valor_base, desconto, vagas_totais, vagas_disponiveis, status, inclusos, descricao, observacoes) VALUES (:codigo_pacote,:nome_pacote,:destino,:duracao,:data_inicio,:data_fim,:tipo_pacote,:categoria_hotel,:companhia_aerea,:valor_base,:desconto,:vagas_totais,:vagas_disponiveis,:status,:inclusos,:descricao,:observacoes)";
                $stmt = $this->db->prepare($sql);
                $stmt->execute([
                    ':codigo_pacote' => $codigo,
                    ':nome_pacote' => $data['nome_pacote'],
                    ':destino' => $data['destino'],
                    ':duracao' => (int)$data['duracao'],
                    ':data_inicio' => $data['data_inicio'],
                    ':data_fim' => $data['data_fim'],
                    ':tipo_pacote' => $data['tipo_pacote'] ?? null,
                    ':categoria_hotel' => $data['categoria_hotel'] ?? null,
                    ':companhia_aerea' => $data['companhia_aerea'] ?? null,
                    ':valor_base' => $data['valor_base'],
                    ':desconto' => $data['desconto'] ?? 0,
                    ':vagas_totais' => (int)$data['vagas_totais'],
                    ':vagas_disponiveis' => (int)($data['vagas_disponiveis'] ?? $data['vagas_totais']),
                    ':status' => $data['status'],
                    ':inclusos' => $data['inclusos'] ?? null,
                    ':descricao' => $data['descricao'] ?? null,
                    ':observacoes' => $data['observacoes'] ?? null,
                ]);
                $data['id'] = $this->db->lastInsertId();
                $data['codigo_pacote'] = $codigo;
                Response::send(true, "Pacote cadastrado com sucesso!", $data, 201);
                return;
            }
            Response::send(false, "Nenhuma tabela de pacotes encontrada", null, 500);
        } catch(PDOException $e) {
            Response::send(false, "Erro ao cadastrar: " . $e->getMessage(), null, 400);
        }
    }
    public function atualizar($data) {
        try {
            $checkPacotes = $this->db->query("SHOW TABLES LIKE 'pacotes'");
            if ($checkPacotes->rowCount() > 0) {
                if (empty($data['id'])) Response::send(false, "ID do pacote não fornecido", null, 400);
                $codigo = $data['codigo_pacote'] ?? '';
                if (empty($codigo)) $codigo = $this->gerarCodigoPacote();
                $sql = "UPDATE pacotes SET codigo_pacote=:codigo_pacote, nome_pacote=:nome_pacote, destino=:destino, duracao=:duracao, data_inicio=:data_inicio, data_fim=:data_fim, tipo_pacote=:tipo_pacote, categoria_hotel=:categoria_hotel, companhia_aerea=:companhia_aerea, valor_base=:valor_base, desconto=:desconto, vagas_totais=:vagas_totais, vagas_disponiveis=:vagas_disponiveis, status=:status, inclusos=:inclusos, descricao=:descricao, observacoes=:observacoes WHERE id=:id";
                $stmt = $this->db->prepare($sql);
                $stmt->execute([
                    ':id' => (int)$data['id'],
                    ':codigo_pacote' => $codigo,
                    ':nome_pacote' => $data['nome_pacote'],
                    ':destino' => $data['destino'],
                    ':duracao' => (int)$data['duracao'],
                    ':data_inicio' => $data['data_inicio'],
                    ':data_fim' => $data['data_fim'],
                    ':tipo_pacote' => $data['tipo_pacote'] ?? null,
                    ':categoria_hotel' => $data['categoria_hotel'] ?? null,
                    ':companhia_aerea' => $data['companhia_aerea'] ?? null,
                    ':valor_base' => $data['valor_base'],
                    ':desconto' => $data['desconto'] ?? 0,
                    ':vagas_totais' => (int)$data['vagas_totais'],
                    ':vagas_disponiveis' => (int)($data['vagas_disponiveis'] ?? $data['vagas_totais']),
                    ':status' => $data['status'],
                    ':inclusos' => $data['inclusos'] ?? null,
                    ':descricao' => $data['descricao'] ?? null,
                    ':observacoes' => $data['observacoes'] ?? null,
                ]);
                if ($stmt->rowCount() > 0) Response::send(true, "Pacote atualizado", $data); else Response::send(false, "Nenhuma alteração realizada", null, 304);
                return;
            }
            Response::send(false, "Nenhuma tabela de pacotes encontrada", null, 500);
        } catch(PDOException $e) {
            Response::send(false, "Erro: " . $e->getMessage(), null, 400);
        }
    }
    public function deletar($id) {
        try {
            $checkPacotes = $this->db->query("SHOW TABLES LIKE 'pacotes'");
            if ($checkPacotes->rowCount() > 0) {
                $stmt = $this->db->prepare("DELETE FROM pacotes WHERE id = :id");
                $stmt->execute([':id' => (int)$id]);
                if ($stmt->rowCount() > 0) Response::send(true, "Pacote deletado com sucesso!"); else Response::send(false, "Pacote não encontrado", null, 404);
                return;
            }
            Response::send(false, "Nenhuma tabela de pacotes encontrada", null, 500);
        } catch(PDOException $e) {
            Response::send(false, "Erro: " . $e->getMessage(), null, 500);
        }
    }
    private function gerarCodigoPacote() {
        return 'PAC-' . date('ymdHi') . '-' . str_pad(rand(1,9999),4,'0',STR_PAD_LEFT);
    }
}

// ==================== GERENCIADOR DE RESERVAS ====================
class ReservaManager {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    public function cadastrar($data) {
        try {
            // Gerar código único de reserva
            $codigoReserva = 'SKY-' . date('Ymd') . '-' . str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
            
            // Verificar se tabela reservas existe
            $checkTable = $this->db->query("SHOW TABLES LIKE 'reservas'");
            
            if ($checkTable->rowCount() == 0) {
                Response::send(false, "Tabela de reservas não existe. Execute o SQL de criação primeiro.", null, 500);
                return;
            }
            
            $sql = "INSERT INTO reservas (codigo_reserva, nome, email, telefone, cpf, 
                    data_partida, num_pessoas, observacoes, destino_id, destino_nome, tipo,
                    preco_unitario, valor_total, status, usuario_id) 
                    VALUES (:codigo_reserva, :nome, :email, :telefone, :cpf, :data_partida, 
                    :num_pessoas, :observacoes, :destino_id, :destino_nome, :tipo,
                    :preco_unitario, :valor_total, :status, :usuario_id)";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':codigo_reserva' => $codigoReserva,
                ':nome' => $data['nome'],
                ':email' => $data['email'],
                ':telefone' => $data['telefone'],
                ':cpf' => preg_replace('/[^0-9]/', '', $data['cpf']),
                ':data_partida' => $data['data_partida'],
                ':num_pessoas' => $data['num_pessoas'],
                ':observacoes' => $data['observacoes'] ?? null,
                ':destino_id' => $data['destino_id'],
                ':destino_nome' => $data['destino_nome'],
                ':tipo' => $data['tipo'] ?? 'voo',
                ':preco_unitario' => $data['preco_unitario'],
                ':valor_total' => $data['valor_total'],
                ':status' => 'pendente',
                ':usuario_id' => $data['usuario_id'] ?? null
            ]);
            
            $data['id'] = $this->db->lastInsertId();
            $data['codigo_reserva'] = $codigoReserva;
            
            Response::send(true, "Reserva criada com sucesso!", $data, 201);
            
        } catch(PDOException $e) {
            Response::send(false, "Erro ao criar reserva: " . $e->getMessage(), null, 400);
        }
    }
    
    public function listar() {
        try {
            $email = $_GET['email'] ?? null;
            
            if ($email) {
                $sql = "SELECT * FROM reservas WHERE email = :email ORDER BY data_criacao DESC";
                $stmt = $this->db->prepare($sql);
                $stmt->execute([':email' => $email]);
            } else {
                $sql = "SELECT * FROM reservas ORDER BY data_criacao DESC";
                $stmt = $this->db->query($sql);
            }
            
            $reservas = $stmt->fetchAll();
            Response::send(true, "Reservas listadas com sucesso", $reservas);
            
        } catch(PDOException $e) {
            Response::send(false, "Erro ao listar reservas: " . $e->getMessage(), null, 500);
        }
    }
    
    public function buscar($id) {
        try {
            $sql = "SELECT * FROM reservas WHERE id = :id OR codigo_reserva = :codigo";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => $id, ':codigo' => $id]);
            $reserva = $stmt->fetch();
            
            if ($reserva) {
                Response::send(true, "Reserva encontrada", $reserva);
            } else {
                Response::send(false, "Reserva não encontrada", null, 404);
            }
            
        } catch(PDOException $e) {
            Response::send(false, "Erro ao buscar reserva: " . $e->getMessage(), null, 500);
        }
    }
    
    public function atualizarStatus($id, $status) {
        try {
            $statusPermitidos = ['pendente', 'confirmada', 'cancelada'];
            if (!in_array($status, $statusPermitidos)) {
                Response::send(false, "Status inválido", null, 400);
            }
            
            $sql = "UPDATE reservas SET status = :status WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':status' => $status, ':id' => $id]);
            
            if ($stmt->rowCount() > 0) {
                Response::send(true, "Status atualizado com sucesso!");
            } else {
                Response::send(false, "Reserva não encontrada", null, 404);
            }
            
        } catch(PDOException $e) {
            Response::send(false, "Erro ao atualizar status: " . $e->getMessage(), null, 500);
        }
    }
}

// ==================== GERENCIADOR DE DESTINOS ====================
class DestinoManager {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    public function listar() {
        try {
            $sql = "SELECT * FROM destinos WHERE ativo = 1 ORDER BY nome";
            $stmt = $this->db->query($sql);
            $destinos = $stmt->fetchAll();
            
            Response::send(true, "Destinos listados com sucesso", $destinos);
            
        } catch(PDOException $e) {
            Response::send(false, "Erro ao listar destinos: " . $e->getMessage(), null, 500);
        }
    }
    
    public function buscar($id) {
        try {
            $sql = "SELECT * FROM destinos WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => $id]);
            $destino = $stmt->fetch();
            
            if ($destino) {
                Response::send(true, "Destino encontrado", $destino);
            } else {
                Response::send(false, "Destino não encontrado", null, 404);
            }
            
        } catch(PDOException $e) {
            Response::send(false, "Erro ao buscar destino: " . $e->getMessage(), null, 500);
        }
    }
}

// ==================== GERENCIADOR DE USUÁRIOS ====================
class UsuarioManager {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }
    
    public function login($login, $senha) {
        try {
            $sql = "SELECT u.*, c.nome_cliente, c.CPF, c.telefone 
                    FROM Usuario u 
                    LEFT JOIN Cliente c ON u.cod_cliente = c.cod_cliente 
                    WHERE u.login = :login AND u.senha = :senha";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':login' => $login, ':senha' => $senha]);
            $usuario = $stmt->fetch();
            
            if ($usuario) {
                unset($usuario['senha']);
                Response::send(true, "Login realizado com sucesso!", $usuario);
            } else {
                Response::send(false, "Login ou senha incorretos", null, 401);
            }
            
        } catch(PDOException $e) {
            Response::send(false, "Erro ao realizar login: " . $e->getMessage(), null, 500);
        }
    }
    
    public function verificarAdmin($codUsuario) {
        try {
            $sql = "SELECT is_admin FROM Usuario WHERE cod_usuario = :cod";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':cod' => $codUsuario]);
            $result = $stmt->fetch();
            
            Response::send(true, "Verificação realizada", [
                'is_admin' => (bool)($result['is_admin'] ?? false)
            ]);
            
        } catch(PDOException $e) {
            Response::send(false, "Erro ao verificar permissões: " . $e->getMessage(), null, 500);
        }
    }
}

// ==================== ROTEAMENTO DA API ====================
try {
    $method = $_SERVER['REQUEST_METHOD'];
    $action = $_GET['action'] ?? '';
    $resource = $_GET['resource'] ?? 'voos';
    
    // Log para debug
    error_log("API Request - Método: $method, Action: $action, Resource: $resource");
    
    $inputData = null;
    if (in_array($method, ['POST', 'PUT'])) {
        $inputData = json_decode(file_get_contents('php://input'), true);
        if ($inputData === null && $_SERVER['CONTENT_LENGTH'] > 0) {
            Response::send(false, "JSON inválido", null, 400);
        }
    }
    
    // ==================== ROTEAMENTO DE CLIENTES ====================
    if ($resource === 'clientes') {
        $manager = new ClienteManager();
        
        switch($action) {
            case 'cadastrar':
                if ($method !== 'POST') {
                    Response::send(false, "Método não permitido. Use POST", null, 405);
                }
                $manager->cadastrar($inputData);
                break;
            case 'listar':
                $manager->listar();
                break;
            case 'buscar':
                $id = $_GET['id'] ?? 0;
                $manager->buscar($id);
                break;
            default:
                Response::send(false, "Ação inválida para clientes", null, 400);
        }
    }
    // ==================== ROTEAMENTO DE VOOS ====================
    else if ($resource === 'voos') {
        $manager = new VooManager();
        
        switch($action) {
            case 'listar':
            case '':
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
                $manager->cadastrar($inputData);
                break;
            case 'atualizar':
                if (!in_array($method, ['POST', 'PUT'])) {
                    Response::send(false, "Método não permitido. Use POST ou PUT", null, 405);
                }
                $manager->atualizar($inputData);
                break;
            case 'deletar':
                $id = $_GET['id'] ?? ($inputData['cod_voo'] ?? ($inputData['id'] ?? 0));
                $manager->deletar($id);
                break;
            case 'cidades':
                $manager->listarCidades();
                break;
            case 'aeroportos':
                $manager->listarAeroportos();
                break;
            default:
                Response::send(false, "Ação inválida: $action", null, 400);
        }
    }
    // ==================== ROTEAMENTO DE RESERVAS ====================
    else if ($resource === 'reservas') {
        $manager = new ReservaManager();
        
        switch($action) {
            case 'cadastrar':
                if ($method !== 'POST') {
                    Response::send(false, "Método não permitido. Use POST", null, 405);
                }
                $manager->cadastrar($inputData);
                break;
            case 'listar':
                $manager->listar();
                break;
            case 'buscar':
                $id = $_GET['id'] ?? '';
                $manager->buscar($id);
                break;
            case 'atualizar_status':
                if (!in_array($method, ['POST', 'PUT'])) {
                    Response::send(false, "Método não permitido", null, 405);
                }
                $manager->atualizarStatus($inputData['id'], $inputData['status']);
                break;
            default:
                Response::send(false, "Ação não especificada para reservas", null, 400);
        }
    }
    // ==================== ROTEAMENTO DE DESTINOS ====================
    else if ($resource === 'destinos') {
        $manager = new DestinoManager();
        
        switch($action) {
            case 'listar':
                $manager->listar();
                break;
            case 'buscar':
                $id = $_GET['id'] ?? 0;
                $manager->buscar($id);
                break;
            default:
                Response::send(false, "Ação não especificada para destinos", null, 400);
        }
    }
    // ==================== ROTEAMENTO DE USUÁRIOS ====================
    else if ($resource === 'usuario') {
        $manager = new UsuarioManager();
        
        switch($action) {
            case 'login':
                if ($method !== 'POST') {
                    Response::send(false, "Método não permitido. Use POST", null, 405);
                }
                $manager->login($inputData['login'], $inputData['senha']);
                break;
            case 'verificar_admin':
                $cod = $_GET['cod_usuario'] ?? 0;
                $manager->verificarAdmin($cod);
                break;
            default:
                Response::send(false, "Ação não especificada para usuário", null, 400);
        }
    }
    else if ($resource === 'hoteis') {
        $manager = new HotelManager();
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
                $manager->cadastrar($inputData);
                break;
            case 'atualizar':
                if (!in_array($method, ['POST','PUT'])) {
                    Response::send(false, "Método não permitido. Use POST ou PUT", null, 405);
                }
                $manager->atualizar($inputData);
                break;
            case 'deletar':
                $id = $_GET['id'] ?? ($inputData['id'] ?? 0);
                $manager->deletar($id);
                break;
            default:
                Response::send(false, "Ação inválida para hotéis", null, 400);
        }
    }
    else if ($resource === 'pacotes') {
        $manager = new PacoteManager();
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
                $manager->cadastrar($inputData);
                break;
            case 'atualizar':
                if (!in_array($method, ['POST','PUT'])) {
                    Response::send(false, "Método não permitido. Use POST ou PUT", null, 405);
                }
                $manager->atualizar($inputData);
                break;
            case 'deletar':
                $id = $_GET['id'] ?? ($inputData['id'] ?? 0);
                $manager->deletar($id);
                break;
            default:
                Response::send(false, "Ação inválida para pacotes", null, 400);
        }
    }
    // ==================== RECURSO NÃO ENCONTRADO ====================
    else {
        Response::send(false, "Recurso não encontrado: $resource", [
            'recursos_disponiveis' => ['voos', 'reservas', 'destinos', 'usuario', 'hoteis', 'pacotes', 'clientes']
        ], 404);
    }
    
} catch(Exception $e) {
    error_log("Erro na API: " . $e->getMessage());
    Response::send(false, "Erro interno: " . $e->getMessage(), null, 500);
}
?>
