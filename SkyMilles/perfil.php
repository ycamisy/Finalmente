<?php
session_start();
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
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        $data = $_POST;
    }
    
    $action = $data['action'] ?? '';
    $user_id = $data['user_id'] ?? null;
    
    if (!$user_id) {
        echo json_encode([
            'success' => false,
            'message' => 'ID de usuário não fornecido'
        ]);
        exit;
    }
    
    // ==========================================
    // BUSCAR DADOS DO USUÁRIO
    // ==========================================
    if ($action === 'get_user_data') {
        $sql = "SELECT u.*, c.nome_cliente, c.endereco, c.CPF, c.data_nasc, c.sexo
                FROM Usuario u
                INNER JOIN Cliente c ON u.cod_cliente = c.cod_cliente
                WHERE u.cod_usuario = :user_id";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':user_id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            echo json_encode([
                'success' => true,
                'data' => [
                    'nome' => $user['nome_cliente'],
                    'login' => $user['login'],
                    'email' => $user['e_mail'],
                    'cpf' => $user['CPF'],
                    'data_nasc' => $user['data_nasc'],
                    'sexo' => $user['sexo'],
                    'endereco' => $user['endereco'],
                    'foto_perfil' => $user['foto_perfil']
                ]
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Usuário não encontrado'
            ]);
        }
    }
    
    // ==========================================
    // ATUALIZAR DADOS PESSOAIS
    // ==========================================
    elseif ($action === 'update_dados_pessoais') {
        $nomeCompleto = $data['nomeCompleto'] ?? '';
        $nomeUsuario = $data['nomeUsuario'] ?? '';
        $email = $data['email'] ?? '';
        $cpfRg = $data['cpfRg'] ?? '';
        $dataNasc = $data['dataNasc'] ?? null;
        $sexo = $data['sexo'] ?? 'N';
        
        $pdo->beginTransaction();
        
        try {
            // Atualizar Cliente
            $sql_cliente = "UPDATE Cliente c
                           INNER JOIN Usuario u ON c.cod_cliente = u.cod_cliente
                           SET c.nome_cliente = :nome,
                               c.CPF = :cpf,
                               c.data_nasc = :data_nasc,
                               c.sexo = :sexo
                           WHERE u.cod_usuario = :user_id";
            
            $stmt = $pdo->prepare($sql_cliente);
            $stmt->execute([
                ':nome' => $nomeCompleto,
                ':cpf' => $cpfRg,
                ':data_nasc' => $dataNasc ?: null,
                ':sexo' => $sexo,
                ':user_id' => $user_id
            ]);
            
            // Atualizar Usuario
            $sql_usuario = "UPDATE Usuario
                           SET login = :login,
                               e_mail = :email
                           WHERE cod_usuario = :user_id";
            
            $stmt = $pdo->prepare($sql_usuario);
            $stmt->execute([
                ':login' => $nomeUsuario,
                ':email' => $email,
                ':user_id' => $user_id
            ]);
            
            $pdo->commit();
            
            echo json_encode([
                'success' => true,
                'message' => 'Dados atualizados com sucesso!'
            ]);
            
        } catch (Exception $e) {
            $pdo->rollBack();
            throw $e;
        }
    }
    
    // ==========================================
    // ATUALIZAR ENDEREÇO
    // ==========================================
    elseif ($action === 'update_endereco') {
        $endereco = $data['endereco'] ?? '';
        
        $sql = "UPDATE Cliente c
                INNER JOIN Usuario u ON c.cod_cliente = u.cod_cliente
                SET c.endereco = :endereco
                WHERE u.cod_usuario = :user_id";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':endereco' => $endereco,
            ':user_id' => $user_id
        ]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Endereço atualizado com sucesso!'
        ]);
    }
    
    // ==========================================
    // ALTERAR SENHA
    // ==========================================
    elseif ($action === 'change_password') {
        $senhaAtual = $data['senhaAtual'] ?? '';
        $novaSenha = $data['novaSenha'] ?? '';
        
        // Buscar senha atual
        $sql = "SELECT senha FROM Usuario WHERE cod_usuario = :user_id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':user_id' => $user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            echo json_encode([
                'success' => false,
                'message' => 'Usuário não encontrado'
            ]);
            exit;
        }
        
        // Verificar senha atual
        // Se usar password_hash, usar password_verify
        // Por enquanto, comparação direta
        if ($user['senha'] !== $senhaAtual) {
            echo json_encode([
                'success' => false,
                'message' => 'Senha atual incorreta'
            ]);
            exit;
        }
        
        // Atualizar senha
        // IMPORTANTE: Em produção, use password_hash()
        $novaSenhaHash = password_hash($novaSenha, PASSWORD_DEFAULT);
        
        $sql = "UPDATE Usuario SET senha = :senha WHERE cod_usuario = :user_id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':senha' => $novaSenhaHash,
            ':user_id' => $user_id
        ]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Senha alterada com sucesso!'
        ]);
    }
    
    // ==========================================
    // ATUALIZAR AVATAR
    // ==========================================
    elseif ($action === 'update_avatar') {
        $avatarUrl = $data['avatar_url'] ?? '';
        
        if (!$avatarUrl) {
            echo json_encode([
                'success' => false,
                'message' => 'URL do avatar não fornecida'
            ]);
            exit;
        }
        
        // Extrair nome do arquivo da URL
        $avatarFile = basename(parse_url($avatarUrl, PHP_URL_PATH));
        
        // Mapeamento de avatares (mesmo do JavaScript)
        $avatarMap = [
            'https://i.postimg.cc/qMvvdyYp/download-3.jpg' => 'avatar1.jpg',
            'https://i.postimg.cc/gk22P85P/doninha.jpg' => 'avatar2.jpg',
            'https://i.postimg.cc/Qxddr1P8/download-4.jpg' => 'avatar3.jpg',
            'https://i.postimg.cc/DyG80f2p/95d2087a51e8477cff8d9aac8a1687ac.jpg' => 'avatar4.jpg',
            'https://i.postimg.cc/kXSBGMnS/09fae38fce5289fec7b95973e168b74e.jpg' => 'avatar5.jpg',
            'https://i.postimg.cc/T3XhD8wq/130bcb30c2ece47f478f17fc599e079f.jpg' => 'avatar6.jpg',
            'https://i.postimg.cc/PrDPJfty/c3119445123adbaabddd9e917d671962.jpg' => 'avatar7.jpg',
            'https://i.postimg.cc/y8zWZqdy/135745bda10f46307e35af3b61ffa7c0.jpg' => 'avatar8.jpg',
            'https://i.postimg.cc/Vkc5Cy6R/2f581e343e0b3052fcf53ac5bd43cce2.jpg' => 'avatar9.jpg',
            'https://i.postimg.cc/CL8z5MFN/299ba43cd3e2f2781dfccaf5d43e7680.jpg' => 'avatar10.jpg',
            'https://i.postimg.cc/ncmCrVHd/694063de7108d916ba95b74d5cb3636a.jpg' => 'avatar11.jpg',
            'https://i.postimg.cc/15FfXR9r/357141eb2db8e3dbe1dcafb37df5767d.jpg' => 'avatar12.jpg',
            'https://i.postimg.cc/gj8NkwNL/6339b727f95a8d5728e87b3a53d88568.jpg' => 'avatar13.jpg',
            'https://i.postimg.cc/mZHdSqRp/b040e76ad3b62145df9c938f4c96e5b8.jpg' => 'avatar14.jpg',
            'https://i.postimg.cc/RVtNhCMQ/300b74730de24b8b1d99a8b29faa85d6.jpg' => 'avatar15.jpg',
            'https://i.postimg.cc/xjzsP7Ys/sako.jpg' => 'avatar16.jpg'
        ];
        
        // Usar URL completa ou nome mapeado
        $avatarFile = isset($avatarMap[$avatarUrl]) ? $avatarMap[$avatarUrl] : $avatarUrl;
        
        try {
            // Salvar a URL completa na base de dados (ou o nome do arquivo)
            $sql = "UPDATE Usuario 
                    SET foto_perfil = :foto 
                    WHERE cod_usuario = :user_id";
            
            $stmt = $pdo->prepare($sql);
            $result = $stmt->execute([
                ':foto' => $avatarFile,
                ':user_id' => $user_id
            ]);
            
            if ($result) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Avatar atualizado com sucesso!',
                    'foto_perfil' => $avatarFile,
                    'avatar_url' => $avatarUrl
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Falha ao executar consulta'
                ]);
            }
        } catch (Exception $e) {
            echo json_encode([
                'success' => false,
                'message' => 'Erro ao atualizar avatar: ' . $e->getMessage()
            ]);
        }
    }
    
    // ==========================================
    // AÇÃO INVÁLIDA
    // ==========================================
    else {
        echo json_encode([
            'success' => false,
            'message' => 'Ação não reconhecida: ' . $action
        ]);
    }
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erro no servidor: ' . $e->getMessage()
    ]);
}
?>