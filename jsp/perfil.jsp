<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Perfil - Skymilles</title>
    <link rel="stylesheet" href="../css/perfil.css">
</head>
<body>
    <!-- Loading -->
    <div class="loading" id="loading">
        <div class="spinner"></div>
        <p>Carregando...</p>
    </div>

    <!-- Header -->
    <header id="header">
        <a href="http://localhost/dashboard/SkyMilles/"><img id="Logo"
                src="https://i.postimg.cc/nLnYq7Fp/logo-Sky-Milles.png" alt="Logo SkyMilles"></a>
        <a id="NomeMarca" href="./index.jsp"><span>SKY</span>MILLES</a>
        <button class="btn-back" onclick="window.location.href='./index.jsp'">
                ← Voltar para Início
            </button>
    </header>

    <!-- Container Principal -->
    <div class="container">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="profile-card">
                <div class="profile-avatar">
                    <img id="profileAvatar" src="https://i.postimg.cc/qMvvdyYp/download-3.jpg" alt="Avatar">
                    <button class="btn-change-avatar" onclick="openAvatarModal()">
                        📷
                    </button>
                </div>
                <h3 id="profileName">Carregando...</h3>
                <p id="profileEmail">email@exemplo.com</p>
            </div>

            <nav class="sidebar-nav">
                <button class="nav-item active" onclick="showSection('dados-pessoais')">
                    👤 Dados Pessoais
                </button>
                <button class="nav-item" onclick="showSection('endereco')">
                    📍 Endereço
                </button>
                <button class="nav-item" onclick="showSection('seguranca')">
                    🔒 Segurança
                </button>
                <button class="nav-item" onclick="showSection('minhas-viagens')">
                    ✈️ Minhas Viagens
                </button>
                <button class="nav-item" onclick="showSection('meus-milhoes')">
                    💰 Minhas Milhas
                </button>
                <button class="nav-item" onclick="showSection('configuracoes')">
                    ⚙️ Configurações
                </button>
            </nav>

            <button class="btn-logout" onclick="logoutUser()">
                🚪 Sair da Conta
            </button>
        </aside>

        <!-- Conteúdo Principal -->
        <main class="main-content">
            <!-- Dados Pessoais -->
            <section id="section-dados-pessoais" class="content-section active">
                <h2>👤 Dados Pessoais</h2>
                <form id="formDadosPessoais" class="form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nome Completo</label>
                            <input type="text" id="nomeCompleto" required>
                        </div>
                        <div class="form-group">
                            <label>Nome de Usuário</label>
                            <input type="text" id="nomeUsuario" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>CPF/RG</label>
                            <input type="text" id="cpfRg" required>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="email" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Data de Nascimento</label>
                            <input type="date" id="dataNasc">
                        </div>
                        <div class="form-group">
                            <label>Sexo</label>
                            <select id="sexo">
                                <option value="N">Não especificado</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                                <option value="O">Outro</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" class="btn-primary">💾 Salvar Alterações</button>
                </form>
            </section>

            <!-- Endereço -->
            <section id="section-endereco" class="content-section">
                <h2>📍 Endereço</h2>
                <form id="formEndereco" class="form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>CEP</label>
                            <input type="text" id="cep" placeholder="00000-000" maxlength="9">
                        </div>
                        <div class="form-group">
                            <label>Número</label>
                            <input type="text" id="numero" placeholder="Nº">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Endereço</label>
                        <input type="text" id="endereco" placeholder="Rua, Avenida...">
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Bairro</label>
                            <input type="text" id="bairro">
                        </div>
                        <div class="form-group">
                            <label>Cidade</label>
                            <input type="text" id="cidade">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Estado</label>
                            <input type="text" id="estado" maxlength="2">
                        </div>
                        <div class="form-group">
                            <label>Complemento</label>
                            <input type="text" id="complemento" placeholder="Apto, Bloco...">
                        </div>
                    </div>

                    <button type="submit" class="btn-primary">💾 Salvar Endereço</button>
                </form>
            </section>

            <!-- Segurança -->
            <section id="section-seguranca" class="content-section">
                <h2>🔒 Segurança</h2>
                
                <div class="security-card">
                    <h3>Alterar Senha</h3>
                    <form id="formSenha" class="form">
                        <div class="form-group">
                            <label>Senha Atual</label>
                            <input type="password" id="senhaAtual" required>
                        </div>

                        <div class="form-group">
                            <label>Nova Senha</label>
                            <input type="password" id="novaSenha" required>
                        </div>

                        <div class="form-group">
                            <label>Confirmar Nova Senha</label>
                            <input type="password" id="confirmaNovaSenha" required>
                        </div>

                        <button type="submit" class="btn-primary">🔐 Alterar Senha</button>
                    </form>
                </div>

            </section>

            <!-- Minhas Viagens -->
            <section id="section-minhas-viagens" class="content-section">
                <h2>✈️ Minhas Viagens</h2>
                
                <div class="trips-container" id="tripsContainer">
                    <div class="empty-state">
                        <div class="empty-icon">✈️</div>
                        <h3>Carregando viagens...</h3>
                        <p>Aguarde um momento.</p>
                    </div>
                </div>
            </section>

            <!-- Meus Milhões -->
            <section id="section-meus-milhoes" class="content-section">
                <h2>💰 Minhas Milhas</h2>
                
                <!-- Saldo Principal -->
                <div class="milhoes-header">
                    <div class="saldo-card saldo-principal">
                        <div class="saldo-label">Saldo Total de Milhas</div>
                        <div class="saldo-valor" id="saldoMilhas">0</div>
                        <div class="saldo-subtexto">Milhas disponíveis para resgate</div>
                    </div>
                    
                    <div class="saldo-card saldo-secundario">
                        <div class="saldo-label">Milhas em Processamento</div>
                        <div class="saldo-valor" id="milhasProcessando">0</div>
                        <div class="saldo-subtexto">Aguardando confirmação</div>
                    </div>
                    
                    <div class="saldo-card saldo-secundario">
                        <div class="saldo-label">Milhas Resgatadas (Mês)</div>
                        <div class="saldo-valor" id="milhasResgatadas">0</div>
                        <div class="saldo-subtexto">Este mês</div>
                    </div>
                </div>

                <!-- Barra de Progresso -->
                <div class="progresso-section">
                    <h3>Progresso para Próximo Status</h3>
                    <div class="status-info">
                        <span class="status-badge" id="statusAtual">Bronze</span>
                        <div class="progresso-bar">
                            <div class="progresso-fill" id="progressoFill" style="width: 45%;"></div>
                        </div>
                        <span class="progresso-texto" id="progressoTexto">2,250 / 5,000 milhas</span>
                    </div>
                </div>

                <!-- Abas de Conteúdo -->
                <div class="milhoes-tabs">
                    <button class="milhoes-tab-btn active" onclick="switchMilhoesTab('historico')">
                        📋 Histórico
                    </button>
                    <button class="milhoes-tab-btn" onclick="switchMilhoesTab('resgate')">
                        🎁 Resgate
                    </button>
                    <button class="milhoes-tab-btn" onclick="switchMilhoesTab('beneficios')">
                        ⭐ Benefícios
                    </button>
                </div>

                <!-- Aba: Histórico -->
                <div class="milhoes-tab-content active" id="tab-historico">
                    <div class="historico-container" id="historicoMilhas">
                        <div class="empty-state">
                            <div class="empty-icon">📋</div>
                            <h3>Carregando histórico...</h3>
                        </div>
                    </div>
                </div>

                <!-- Aba: Resgate -->
                <div class="milhoes-tab-content" id="tab-resgate">
                    <div class="resgate-grid" id="resgateOpcoes">
                        <div class="empty-state">
                            <div class="empty-icon">🎁</div>
                            <h3>Carregando opções de resgate...</h3>
                        </div>
                    </div>
                </div>

                <!-- Aba: Benefícios -->
                <div class="milhoes-tab-content" id="tab-beneficios">
                    <div class="beneficios-container">
                        <div class="beneficio-card">
                            <div class="beneficio-icon">✈️</div>
                            <h4>Passagens Aéreas</h4>
                            <p>Resgate milhas por passagens em qualquer destino</p>
                            <span class="requisito">A partir de 5.000 milhas</span>
                        </div>
                        
                        <div class="beneficio-card">
                            <div class="beneficio-icon">🏨</div>
                            <h4>Hospedagem</h4>
                            <p>Noites grátis em hotéis parceiros premium</p>
                            <span class="requisito">A partir de 8.000 milhas</span>
                        </div>
                        
                        <div class="beneficio-card">
                            <div class="beneficio-icon">🚗</div>
                            <h4>Aluguel de Carro</h4>
                            <p>Dias de aluguel sem custos adicionais</p>
                            <span class="requisito">A partir de 3.000 milhas</span>
                        </div>
                        
                        <div class="beneficio-card">
                            <div class="beneficio-icon">💳</div>
                            <h4>Cashback</h4>
                            <p>Converta milhas em crédito para sua conta</p>
                            <span class="requisito">A partir de 2.000 milhas</span>
                        </div>
                        
                        <div class="beneficio-card">
                            <div class="beneficio-icon">🍽️</div>
                            <h4>Gastronomia</h4>
                            <p>Refeições em restaurantes parceiros</p>
                            <span class="requisito">A partir de 1.500 milhas</span>
                        </div>
                        
                        <div class="beneficio-card">
                            <div class="beneficio-icon">🎫</div>
                            <h4>Eventos</h4>
                            <p>Ingressos para shows e eventos especiais</p>
                            <span class="requisito">A partir de 2.500 milhas</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Configurações -->
            <section id="section-configuracoes" class="content-section">
                <h2>⚙️ Configurações</h2>
                
                <div class="config-card">
                    <h3>Notificações</h3>
                    <div class="config-item">
                        <div>
                            <strong>Email de Promoções</strong>
                            <p>Receba ofertas especiais e promoções</p>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="notifPromocoes" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                    <div class="config-item">
                        <div>
                            <strong>Email de Viagens</strong>
                            <p>Receba atualizações sobre suas viagens</p>
                        </div>
                        <label class="switch">
                            <input type="checkbox" id="notifViagens" checked>
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>

                <div class="config-card">
                    <h3>Preferências</h3>
                    <div class="form-group">
                        <label>Idioma</label>
                        <select id="idioma">
                            <option value="pt-BR">Português (Brasil)</option>
                            <option value="en-US">English (US)</option>
                            <option value="es-ES">Español</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Moeda</label>
                        <select id="moeda">
                            <option value="BRL">Real (R$)</option>
                            <option value="USD">Dólar (US$)</option>
                            <option value="EUR">Euro (€)</option>
                        </select>
                    </div>
                    <button class="btn-primary">💾 Salvar Preferências</button>
                </div>

                <div class="danger-zone">
                    <h3>⚠️ Zona de Perigo</h3>
                    <p>Estas ações são permanentes e não podem ser desfeitas.</p>
                    <button class="btn-danger" onclick="deleteAccount()">
                        🗑️ Excluir Conta
                    </button>
                </div>
            </section>
        </main>
    </div>

    <!-- Modal de Avatar -->
    <div class="avatar-modal" id="avatarModal">
        <div class="avatar-modal-content">
            <div class="avatar-modal-header">
                <h2>Escolha seu Avatar</h2>
                <button class="close-modal" onclick="closeAvatarModal()">✕</button>
            </div>
            <div class="avatar-grid" id="avatarGrid">
                <!-- Avatares serão inseridos aqui -->
            </div>
            <button class="btn-primary" onclick="saveAvatar()">💾 Salvar Avatar</button>
        </div>
    </div>

    <!-- Scripts -->
    <script>
        // Ocultar loading quando a página carregar
        window.addEventListener('load', function() {
            const loading = document.getElementById('loading');
            if (loading) {
                loading.classList.add('hidden');
            }
        });
    </script>
    <script src="../js/auth.js"></script>
    <script src="../js/perfil.js"></script>

    <!-- Footer -->
    <footer>
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-brand">
                    <div class="footer-brand-text"><span>SKY</span>MILLES</div>
                </div>
                <div class="footer-copyright">
                    © 2025 SkyMilles. Todos os direitos reservados.
                </div>
            </div>
        </div>
    </footer>
</body>
</html>