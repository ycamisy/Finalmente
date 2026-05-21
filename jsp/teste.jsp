<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste de Conexão - Skymilles</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #4d9fb8 0%, #27738f 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 32px;
            margin-bottom: 10px;
        }
        
        .header p {
            opacity: 0.9;
        }
        
        .content {
            padding: 40px;
        }
        
        .test-item {
            background: #f9f9f9;
            border-left: 5px solid #ccc;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
        }
        
        .test-item.success {
            border-color: #4caf50;
            background: #f1f8f4;
        }
        
        .test-item.error {
            border-color: #f44336;
            background: #fef1f0;
        }
        
        .test-item.warning {
            border-color: #ff9800;
            background: #fff8f0;
        }
        
        .test-item h3 {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .icon {
            font-size: 24px;
        }
        
        .success .icon { color: #4caf50; }
        .error .icon { color: #f44336; }
        .warning .icon { color: #ff9800; }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            background: white;
        }
        
        table th,
        table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        table th {
            background: #4d9fb8;
            color: white;
            font-weight: 600;
        }
        
        .code-block {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            margin-top: 15px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
        }
        
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: #4d9fb8;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            margin-top: 20px;
            transition: all 0.3s;
        }
        
        .btn:hover {
            background: #3a8199;
            transform: translateY(-2px);
        }
        
        .summary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 12px;
            margin-top: 30px;
            text-align: center;
        }
        
        .summary h2 {
            margin-bottom: 15px;
        }
        
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .summary-item {
            background: rgba(255, 255, 255, 0.2);
            padding: 15px;
            border-radius: 8px;
        }
        
        .summary-item strong {
            display: block;
            font-size: 24px;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔍 Diagnóstico do Sistema Skymilles</h1>
            <p>Verificação completa de conexão e estrutura do banco de dados</p>
        </div>
        
        <div class="content">
            <?php
            $host = 'localhost';
            $username = 'root';
            $password = '';
            $dbname = 'Skymilles';
            
            $errors = [];
            $warnings = [];
            $successes = [];
            
            // TESTE 1: Conexão com MySQL
            echo '<div class="test-item">';
            echo '<h3><span class="icon">🔌</span> Teste 1: Conexão com MySQL</h3>';
            
            try {
                $pdo_test = new PDO("mysql:host=$host", $username, $password);
                $pdo_test->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
                echo '<div class="test-item success">';
                echo '<p><strong>✅ Conexão com MySQL estabelecida com sucesso!</strong></p>';
                echo '<p>Host: ' . $host . '</p>';
                echo '<p>Usuário: ' . $username . '</p>';
                echo '</div>';
                $successes[] = 'MySQL conectado';
                
                // Listar bancos
                echo '<p><strong>Bancos de dados disponíveis:</strong></p>';
                $stmt = $pdo_test->query("SHOW DATABASES");
                $databases = $stmt->fetchAll(PDO::FETCH_COLUMN);
                
                echo '<ul>';
                foreach ($databases as $db) {
                    echo '<li>' . htmlspecialchars($db);
                    if ($db === 'Skymilles') {
                        echo ' <span style="color: #4caf50;">✅ (Este é o banco correto!)</span>';
                    } elseif (strtolower($db) === 'skymilles') {
                        echo ' <span style="color: #ff9800;">⚠️ (Nome em minúscula - pode causar problemas!)</span>';
                        $warnings[] = 'Banco com nome em minúscula detectado';
                    }
                    echo '</li>';
                }
                echo '</ul>';
                
            } catch (PDOException $e) {
                echo '<div class="test-item error">';
                echo '<p><strong>❌ Erro ao conectar com MySQL</strong></p>';
                echo '<p>Erro: ' . $e->getMessage() . '</p>';
                echo '<p><strong>Solução:</strong> Inicie o MySQL no XAMPP/WAMP</p>';
                echo '</div>';
                $errors[] = 'MySQL não conectado';
                echo '</div>';
                die();
            }
            echo '</div>';
            
            // TESTE 2: Verificar banco Skymilles
            echo '<div class="test-item">';
            echo '<h3><span class="icon">💾</span> Teste 2: Banco de Dados Skymilles</h3>';
            
            if (in_array('Skymilles', $databases)) {
                echo '<div class="test-item success">';
                echo '<p><strong>✅ Banco "Skymilles" encontrado!</strong></p>';
                echo '</div>';
                $successes[] = 'Banco Skymilles existe';
            } elseif (in_array('skymilles', $databases)) {
                echo '<div class="test-item warning">';
                echo '<p><strong>⚠️ Banco "skymilles" (minúsculo) encontrado!</strong></p>';
                echo '<p>Recomendação: Renomeie para "Skymilles" ou ajuste os arquivos PHP</p>';
                echo '</div>';
                $dbname = 'skymilles';
                $warnings[] = 'Nome do banco em minúscula';
            } else {
                echo '<div class="test-item error">';
                echo '<p><strong>❌ Banco "Skymilles" NÃO encontrado!</strong></p>';
                echo '<p><strong>Solução:</strong> Execute o arquivo skymilles_database_completo.sql no phpMyAdmin</p>';
                echo '</div>';
                $errors[] = 'Banco não existe';
                echo '</div>';
                die();
            }
            echo '</div>';
            
            // TESTE 3: Conectar ao banco e verificar tabelas
            echo '<div class="test-item">';
            echo '<h3><span class="icon">📊</span> Teste 3: Tabelas do Banco</h3>';
            
            try {
                $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
                echo '<div class="test-item success">';
                echo '<p><strong>✅ Conectado ao banco: ' . $dbname . '</strong></p>';
                echo '</div>';
                
                $stmt = $pdo->query("SHOW TABLES");
                $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
                
                $expected_tables = [
                    'Cliente', 'Usuario', 'Pacote', 'Compra', 'Cidade', 
                    'Hotel', 'Quarto', 'Aeroporto', 'Voo', 'Assento',
                    'Ponto_turistico', 'pacoteQuarto', 'pacoteAssento'
                ];
                
                echo '<p><strong>Tabelas encontradas: ' . count($tables) . '</strong></p>';
                echo '<ul>';
                foreach ($expected_tables as $table) {
                    if (in_array($table, $tables)) {
                        echo '<li style="color: #4caf50;">✅ ' . $table . '</li>';
                    } else {
                        echo '<li style="color: #f44336;">❌ ' . $table . ' (FALTANDO)</li>';
                        $errors[] = "Tabela $table faltando";
                    }
                }
                echo '</ul>';
                
            } catch (PDOException $e) {
                echo '<div class="test-item error">';
                echo '<p><strong>❌ Erro ao conectar ao banco</strong></p>';
                echo '<p>Erro: ' . $e->getMessage() . '</p>';
                echo '</div>';
                $errors[] = 'Erro ao conectar ao banco';
                echo '</div>';
                die();
            }
            echo '</div>';
            
            // TESTE 4: Verificar estrutura da tabela Usuario
            echo '<div class="test-item">';
            echo '<h3><span class="icon">👤</span> Teste 4: Estrutura da Tabela Usuario</h3>';
            
            try {
                $stmt = $pdo->query("DESCRIBE Usuario");
                $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                echo '<table>';
                echo '<thead><tr><th>Campo</th><th>Tipo</th><th>Nulo</th><th>Chave</th><th>Padrão</th></tr></thead>';
                echo '<tbody>';
                
                $has_foto_perfil = false;
                foreach ($columns as $col) {
                    echo '<tr>';
                    echo '<td>' . $col['Field'] . '</td>';
                    echo '<td>' . $col['Type'] . '</td>';
                    echo '<td>' . $col['Null'] . '</td>';
                    echo '<td>' . $col['Key'] . '</td>';
                    echo '<td>' . ($col['Default'] ?? 'NULL') . '</td>';
                    echo '</tr>';
                    
                    if ($col['Field'] === 'foto_perfil') {
                        $has_foto_perfil = true;
                    }
                }
                echo '</tbody></table>';
                
                if ($has_foto_perfil) {
                    echo '<div class="test-item success" style="margin-top: 15px;">';
                    echo '<p><strong>✅ Coluna "foto_perfil" existe!</strong></p>';
                    echo '</div>';
                    $successes[] = 'Coluna foto_perfil existe';
                } else {
                    echo '<div class="test-item error" style="margin-top: 15px;">';
                    echo '<p><strong>❌ Coluna "foto_perfil" NÃO existe!</strong></p>';
                    echo '<p><strong>Solução:</strong> Execute este SQL:</p>';
                    echo '<div class="code-block">';
                    echo 'USE Skymilles;<br>';
                    echo 'ALTER TABLE Usuario<br>';
                    echo 'ADD COLUMN foto_perfil VARCHAR(100) DEFAULT \'avatar1.jpg\'<br>';
                    echo 'AFTER e_mail;';
                    echo '</div>';
                    echo '</div>';
                    $errors[] = 'Coluna foto_perfil faltando';
                }
                
            } catch (PDOException $e) {
                echo '<div class="test-item error">';
                echo '<p><strong>❌ Erro ao verificar estrutura</strong></p>';
                echo '<p>Erro: ' . $e->getMessage() . '</p>';
                echo '</div>';
                $errors[] = 'Erro ao verificar estrutura';
            }
            echo '</div>';
            
            // TESTE 5: Contar registros
            echo '<div class="test-item">';
            echo '<h3><span class="icon">📈</span> Teste 5: Dados no Banco</h3>';
            
            try {
                $counts = [];
                
                $stmt = $pdo->query("SELECT COUNT(*) FROM Cliente");
                $counts['Cliente'] = $stmt->fetchColumn();
                
                $stmt = $pdo->query("SELECT COUNT(*) FROM Usuario");
                $counts['Usuario'] = $stmt->fetchColumn();
                
                $stmt = $pdo->query("SELECT COUNT(*) FROM Pacote");
                $counts['Pacote'] = $stmt->fetchColumn();
                
                echo '<table>';
                echo '<thead><tr><th>Tabela</th><th>Registros</th><th>Status</th></tr></thead>';
                echo '<tbody>';
                
                foreach ($counts as $table => $count) {
                    echo '<tr>';
                    echo '<td>' . $table . '</td>';
                    echo '<td>' . $count . '</td>';
                    echo '<td>' . ($count > 0 ? '✅ OK' : '⚠️ Vazia') . '</td>';
                    echo '</tr>';
                }
                
                echo '</tbody></table>';
                
            } catch (PDOException $e) {
                echo '<p style="color: #f44336;">❌ Erro ao contar registros: ' . $e->getMessage() . '</p>';
            }
            echo '</div>';
            
            // RESUMO FINAL
            echo '<div class="summary">';
            echo '<h2>📊 Resumo do Diagnóstico</h2>';
            echo '<div class="summary-grid">';
            
            echo '<div class="summary-item">';
            echo '<strong>' . count($successes) . '</strong>';
            echo '<p>Testes Passou</p>';
            echo '</div>';
            
            echo '<div class="summary-item">';
            echo '<strong>' . count($warnings) . '</strong>';
            echo '<p>Avisos</p>';
            echo '</div>';
            
            echo '<div class="summary-item">';
            echo '<strong>' . count($errors) . '</strong>';
            echo '<p>Erros</p>';
            echo '</div>';
            
            echo '</div>';
            
            if (count($errors) === 0 && count($warnings) === 0) {
                echo '<p style="margin-top: 20px; font-size: 20px;"><strong>🎉 TUDO FUNCIONANDO PERFEITAMENTE!</strong></p>';
                echo '<p>O sistema está pronto para uso!</p>';
            } elseif (count($errors) === 0) {
                echo '<p style="margin-top: 20px; font-size: 18px;"><strong>✅ Sistema funcionando, mas com avisos!</strong></p>';
                echo '<p>Recomenda-se corrigir os avisos para melhor funcionamento.</p>';
            } else {
                echo '<p style="margin-top: 20px; font-size: 18px;"><strong>⚠️ Sistema precisa de correções!</strong></p>';
                echo '<p>Por favor, siga as soluções indicadas acima.</p>';
            }
            
            echo '</div>';
            ?>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="./index.jsp" class="btn">🏠 Voltar para Home</a>
                <a href="<?php echo $_SERVER['PHP_SELF']; ?>" class="btn" style="background: #764ba2;">🔄 Recarregar Teste</a>
            </div>
        </div>
    </div>
</body>
</html>