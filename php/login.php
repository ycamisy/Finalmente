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
    
    // Receber dados do POST
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        $data = $_POST;
    }
    
    $action = $data['action'] ?? '';
    
    // LOGIN TRADICIONAL
    if ($action === 'login') {
        $username_input = $data['username'] ?? '';
        $password_input = $data['password'] ?? '';
        
        if (empty($username_input) || empty($password_input)) {
            echo json_encode([
                'success' => false,
                'message' => 'Preencha todos os campos!'
            ]);
            exit;
        }
        
        // Buscar usuário no banco (por login ou email)
        $sql = "SELECT u.*, c.nome_cliente, c.endereco, u.foto_perfil 
                FROM Usuario u
                INNER JOIN Cliente c ON u.cod_cliente = c.cod_cliente
                WHERE u.login = :username OR u.e_mail = :username";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':username' => $username_input]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            // IMPORTANTE: Em produção, use password_verify() se você usou password_hash()
            // Por enquanto, comparação direta (como estava no código original)
            if ($user['senha'] === $password_input) {
                // Criar sessão
                $_SESSION['user_id'] = $user['cod_usuario'];
                $_SESSION['user_name'] = $user['nome_cliente'];
                $_SESSION['user_email'] = $user['e_mail'];
                $_SESSION['user_photo'] = $user['foto_perfil'];
                
                echo json_encode([
                    'success' => true,
                    'message' => 'Login realizado com sucesso!',
                    'user' => [
                        'id' => $user['cod_usuario'],
                        'name' => $user['nome_cliente'],
                        'email' => $user['e_mail'],
                        'photo' => $user['foto_perfil'] ? 'uploads/perfis/' . $user['foto_perfil'] : null,
                        'username' => $user['login'],
                        'is_admin' => isset($user['is_admin']) ? (bool)$user['is_admin'] : false
                    ]
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Senha incorreta!'
                ]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Usuário não encontrado!'
            ]);
        }
    }
    
    // LOGIN COM GOOGLE
    elseif ($action === 'google_login') {
        $google_id = $data['google_id'] ?? '';
        $email = $data['email'] ?? '';
        $name = $data['name'] ?? '';
        $photo = $data['photo'] ?? '';
        
        // Verificar se usuário já existe pelo email
        $sql = "SELECT u.*, c.nome_cliente FROM Usuario u
                INNER JOIN Cliente c ON u.cod_cliente = c.cod_cliente
                WHERE u.e_mail = :email";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            // Usuário já existe, fazer login
            $_SESSION['user_id'] = $user['cod_usuario'];
            $_SESSION['user_name'] = $user['nome_cliente'];
            $_SESSION['user_email'] = $user['e_mail'];
            $_SESSION['user_photo'] = $photo;
            
            echo json_encode([
                'success' => true,
                'message' => 'Login com Google realizado!',
                'user' => [
                    'id' => $user['cod_usuario'],
                    'name' => $user['nome_cliente'],
                    'email' => $user['e_mail'],
                    'photo' => $photo,
                    'is_admin' => isset($user['is_admin']) ? (bool)$user['is_admin'] : false
                ]
            ]);
        } else {
            // Criar novo usuário
            $pdo->beginTransaction();
            
            try {
                // Buscar próximo cod_cliente
                $stmt = $pdo->query("SELECT IFNULL(MAX(cod_cliente), 0) + 1 as proximo_cod FROM Cliente");
                $cod_cliente = $stmt->fetch(PDO::FETCH_ASSOC)['proximo_cod'];
                
                // Inserir Cliente
                $sql_cliente = "INSERT INTO Cliente (cod_cliente, nome_cliente, sexo) 
                               VALUES (:cod_cliente, :nome, 'N')";
                $stmt = $pdo->prepare($sql_cliente);
                $stmt->execute([
                    ':cod_cliente' => $cod_cliente,
                    ':nome' => $name
                ]);
                
                // Buscar próximo cod_usuario
                $stmt = $pdo->query("SELECT IFNULL(MAX(cod_usuario), 0) + 1 as proximo_cod FROM Usuario");
                $cod_usuario = $stmt->fetch(PDO::FETCH_ASSOC)['proximo_cod'];
                
                // Inserir Usuario
                $sql_usuario = "INSERT INTO Usuario (cod_usuario, login, e_mail, cod_cliente, google_id) 
                               VALUES (:cod_usuario, :login, :email, :cod_cliente, :google_id)";
                $stmt = $pdo->prepare($sql_usuario);
                $stmt->execute([
                    ':cod_usuario' => $cod_usuario,
                    ':login' => explode('@', $email)[0],
                    ':email' => $email,
                    ':cod_cliente' => $cod_cliente,
                    ':google_id' => $google_id
                ]);
                
                $pdo->commit();
                
                $_SESSION['user_id'] = $cod_usuario;
                $_SESSION['user_name'] = $name;
                $_SESSION['user_email'] = $email;
                $_SESSION['user_photo'] = $photo;
                
                echo json_encode([
                    'success' => true,
                    'message' => 'Conta criada com Google!',
                    'user' => [
                        'id' => $cod_usuario,
                        'name' => $name,
                        'email' => $email,
                        'photo' => $photo,
                        'is_admin' => false
                    ]
                ]);
            } catch (Exception $e) {
                $pdo->rollBack();
                throw $e;
            }
        }
    }
    
    // LOGIN COM FACEBOOK
    elseif ($action === 'facebook_login') {
        $facebook_id = $data['facebook_id'] ?? '';
        $email = $data['email'] ?? '';
        $name = $data['name'] ?? '';
        $photo = $data['photo'] ?? '';
        
        // Similar ao Google login
        $sql = "SELECT u.*, c.nome_cliente FROM Usuario u
                INNER JOIN Cliente c ON u.cod_cliente = c.cod_cliente
                WHERE u.e_mail = :email OR u.facebook_id = :facebook_id";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':email' => $email,
            ':facebook_id' => $facebook_id
        ]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            $_SESSION['user_id'] = $user['cod_usuario'];
            $_SESSION['user_name'] = $user['nome_cliente'];
            $_SESSION['user_email'] = $user['e_mail'];
            $_SESSION['user_photo'] = $photo;
            
            echo json_encode([
                'success' => true,
                'message' => 'Login com Facebook realizado!',
                'user' => [
                    'id' => $user['cod_usuario'],
                    'name' => $user['nome_cliente'],
                    'email' => $user['e_mail'],
                    'photo' => $photo,
                    'is_admin' => isset($user['is_admin']) ? (bool)$user['is_admin'] : false
                ]
            ]);
        } else {
            // Criar novo usuário (similar ao Google)
            $pdo->beginTransaction();
            
            try {
                $stmt = $pdo->query("SELECT IFNULL(MAX(cod_cliente), 0) + 1 as proximo_cod FROM Cliente");
                $cod_cliente = $stmt->fetch(PDO::FETCH_ASSOC)['proximo_cod'];
                
                $sql_cliente = "INSERT INTO Cliente (cod_cliente, nome_cliente, sexo) 
                               VALUES (:cod_cliente, :nome, 'N')";
                $stmt = $pdo->prepare($sql_cliente);
                $stmt->execute([
                    ':cod_cliente' => $cod_cliente,
                    ':nome' => $name
                ]);
                
                $stmt = $pdo->query("SELECT IFNULL(MAX(cod_usuario), 0) + 1 as proximo_cod FROM Usuario");
                $cod_usuario = $stmt->fetch(PDO::FETCH_ASSOC)['proximo_cod'];
                
                $sql_usuario = "INSERT INTO Usuario (cod_usuario, login, e_mail, cod_cliente, facebook_id) 
                               VALUES (:cod_usuario, :login, :email, :cod_cliente, :facebook_id)";
                $stmt = $pdo->prepare($sql_usuario);
                $stmt->execute([
                    ':cod_usuario' => $cod_usuario,
                    ':login' => explode('@', $email)[0],
                    ':email' => $email,
                    ':cod_cliente' => $cod_cliente,
                    ':facebook_id' => $facebook_id
                ]);
                
                $pdo->commit();
                
                $_SESSION['user_id'] = $cod_usuario;
                $_SESSION['user_name'] = $name;
                $_SESSION['user_email'] = $email;
                $_SESSION['user_photo'] = $photo;
                
                echo json_encode([
                    'success' => true,
                    'message' => 'Conta criada com Facebook!',
                    'user' => [
                        'id' => $cod_usuario,
                        'name' => $name,
                        'email' => $email,
                        'photo' => $photo,
                        'is_admin' => false
                    ]
                ]);
            } catch (Exception $e) {
                $pdo->rollBack();
                throw $e;
            }
        }
    }
    
    // LOGOUT
    elseif ($action === 'logout') {
        session_destroy();
        echo json_encode([
            'success' => true,
            'message' => 'Logout realizado com sucesso!'
        ]);
    }
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Erro no servidor: ' . $e->getMessage()
    ]);
}
?>
