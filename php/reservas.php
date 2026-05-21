<?php
header('Content-Type: application/json; charset=utf-8');

// Configuração do banco de dados
$host = 'localhost';
$dbname = 'Skymilles';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erro na conexão com o banco de dados: ' . $e->getMessage()
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Método não permitido'
    ]);
    exit;
}

try {
    // Validar campos obrigatórios
    $campos_obrigatorios = ['nome', 'email', 'telefone', 'cpf', 'passageiros', 'tipo', 'item_id', 'preco'];
    foreach ($campos_obrigatorios as $campo) {
        if (empty($_POST[$campo])) {
            throw new Exception("O campo '$campo' é obrigatório");
        }
    }

    // Sanitizar dados
    $nome = filter_var($_POST['nome'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $telefone = preg_replace('/[^0-9]/', '', $_POST['telefone']);
    $cpf = preg_replace('/[^0-9]/', '', $_POST['cpf']);
    $num_pessoas = (int)$_POST['passageiros'];
    $observacoes = $_POST['observacoes'] ?? '';
    $tipo = $_POST['tipo']; // 'voo' ou 'pacote'
    $item_id = (int)$_POST['item_id'];
    
    // Capturar ID do usuário logado
    $usuario_id = !empty($_POST['usuario_id']) ? (int)$_POST['usuario_id'] : null;
    $usuario_email = $_POST['usuario_email'] ?? $email;

    // Validar e-mail
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("E-mail inválido");
    }

    // Validar CPF
    if (strlen($cpf) !== 11) {
        throw new Exception("CPF inválido");
    }

    // Processar dados específicos do tipo de reserva
    $destino_nome = '';
    $destino_id = 0;
    $preco_string = $_POST['preco'];
    
    // Extrair valor numérico do preço
    $preco_unitario = (float)preg_replace('/[^0-9,]/', '', $preco_string);
    $preco_unitario = str_replace(',', '.', $preco_unitario);
    
    if (strpos($_POST['preco'], '.') !== false && strpos($_POST['preco'], ',') !== false) {
        $preco_unitario = (float)str_replace(['.', ','], ['', '.'], preg_replace('/[^0-9.,]/', '', $preco_string));
    }

    if ($tipo === 'voo') {
        $origem = $_POST['origem'] ?? '';
        $destino = $_POST['destino'] ?? '';
        $data_viagem = $_POST['data'] ?? date('Y-m-d', strtotime('+30 days'));
        $companhia = $_POST['companhia'] ?? '';
        
        $destino_nome = "$origem → $destino";
        
        // Buscar ou criar destino
        $stmt = $pdo->prepare("SELECT id FROM destinos WHERE nome = ? LIMIT 1");
        $stmt->execute([$destino]);
        $destino_db = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($destino_db) {
            $destino_id = $destino_db['id'];
        } else {
            $stmt = $pdo->prepare("INSERT INTO destinos (nome, pais, continente, preco, ativo) VALUES (?, 'Desconhecido', 'outros', ?, 1)");
            $stmt->execute([$destino, $preco_unitario]);
            $destino_id = $pdo->lastInsertId();
        }
        
        // Converter data para formato MySQL
        if (strpos($data_viagem, '-') !== false) {
            $partes = explode('-', $data_viagem);
            $data_partida_str = trim($partes[0]);
            
            $meses = [
                'Jan' => '01', 'Fev' => '02', 'Mar' => '03', 'Abr' => '04',
                'Mai' => '05', 'Jun' => '06', 'Jul' => '07', 'Ago' => '08',
                'Set' => '09', 'Out' => '10', 'Nov' => '11', 'Dez' => '12'
            ];
            
            $partes_data = explode(' ', $data_partida_str);
            if (count($partes_data) === 2) {
                $dia = str_pad($partes_data[0], 2, '0', STR_PAD_LEFT);
                $mes = $meses[$partes_data[1]] ?? '01';
                $ano = date('Y');
                $data_partida = "$ano-$mes-$dia";
            } else {
                $data_partida = date('Y-m-d', strtotime('+30 days'));
            }
        } else {
            $data_partida = date('Y-m-d', strtotime('+30 days'));
        }
        
    } else if ($tipo === 'pacote') {
        $destino_nome = $_POST['destino'] ?? '';
        $duracao = $_POST['duracao'] ?? '';
        
        // Buscar ou criar destino
        $stmt = $pdo->prepare("SELECT id FROM destinos WHERE nome = ? LIMIT 1");
        $stmt->execute([$destino_nome]);
        $destino_db = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($destino_db) {
            $destino_id = $destino_db['id'];
        } else {
            $stmt = $pdo->prepare("INSERT INTO destinos (nome, pais, continente, preco, ativo) VALUES (?, 'Desconhecido', 'outros', ?, 1)");
            $stmt->execute([$destino_nome, $preco_unitario]);
            $destino_id = $pdo->lastInsertId();
        }
        
        $data_partida = date('Y-m-d', strtotime('+30 days'));
    } else {
        throw new Exception("Tipo de reserva inválido");
    }

    // Calcular valor total
    $valor_total = $preco_unitario * $num_pessoas;

    // Gerar código único de reserva
    $codigo_reserva = 'SKY' . date('Ymd') . strtoupper(substr(uniqid(), -6));

    // Verificar se o código já existe
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM reservas WHERE codigo_reserva = ?");
    $stmt->execute([$codigo_reserva]);
    if ($stmt->fetchColumn() > 0) {
        $codigo_reserva = 'SKY' . date('Ymd') . strtoupper(substr(md5(uniqid()), 0, 6));
    }

    // Preparar SQL com usuario_id
    $sql = "INSERT INTO reservas (
        codigo_reserva, usuario_id, nome, email, telefone, cpf, 
        data_partida, num_pessoas, observacoes,
        destino_id, destino_nome, tipo, preco_unitario, valor_total,
        status, data_criacao
    ) VALUES (
        ?, ?, ?, ?, ?, 
        ?, ?, ?,
        ?, ?, ?, ?, ?,
        'pendente', NOW()
    )";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $codigo_reserva,
        $usuario_id,
        $nome,
        $email,
        $telefone,
        $cpf,
        $data_partida,
        $num_pessoas,
        $observacoes,
        $destino_id,
        $destino_nome,
        $tipo,
        $preco_unitario,
        $valor_total
    ]);

    $reserva_id = $pdo->lastInsertId();

    echo json_encode([
        'success' => true,
        'message' => 'Reserva realizada com sucesso!',
        'data' => [
            'codigo_reserva' => $codigo_reserva,
            'reserva_id' => $reserva_id,
            'valor_total' => $valor_total,
            'tipo' => $tipo,
            'usuario_id' => $usuario_id
        ]
    ]);

} catch(Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>