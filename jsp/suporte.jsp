<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Central de Suporte - SkyMilles</title>
    <link rel="stylesheet" href="../css/css.css">
    <link rel="stylesheet" href="../css/suporte.css">
    <link rel="stylesheet" href="../css/searchStyles.css">
</head>
<body>
    <!-- Cabeçalho - IDÊNTICO AO INDEX -->
    <header id="header">
        <a href="http://localhost/dashboard/SkyMilles/"><img id="Logo"
            src="https://i.postimg.cc/nLnYq7Fp/logo-Sky-Milles.png" alt="Logo SkyMilles"></a>
        <a id="NomeMarca" href="./index.jsp"><span>SKY</span>MILLES</a>

        <!-- Barra de pesquisa -->
        <div class="search-container">
            <div class="search-wrapper">
                <div class="search-input-container" id="searchInputContainer">
                    <input type="text" id="search-input" placeholder="Buscar ajuda...">
                </div>
                <img class="lupa" id="searchIcon" src="https://cdn-icons-png.flaticon.com/512/54/54481.png" alt="Buscar">
            </div>
            <div id="searchResults"></div>
        </div>

        <!-- Menu Desktop -->
        <nav id="main-nav">
            <button class="ButtonMenu" onclick="location.href='./index.jsp'">Destaques</button>
            <button class="ButtonMenu" onclick="location.href='./pacotes.jsp'">Pacotes Promocionais</button>
            <button class="ButtonMenu" onclick="location.href='./conheca.jsp'">Conheça a Sky Milles</button>
        </nav>

        <!-- Perfil e Botão Hambúrguer -->
        <div class="header-right">
            <div class="perfil-container">
                <img class="perfil" src="https://i.postimg.cc/qMvvdyYp/download-3.jpg" alt="Sua Foto" id="perfil-img">
                <div class="dropdown-menu" id="dropdown-menu">
                    <button onclick="location.href='./login.jsp'">Login</button>
                    <button onclick="location.href='./cadastro.jsp'">Cadastrar</button>
                </div>
            </div>
            
            <button class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>

    <!-- Overlay escuro para mobile -->
    <div class="overlay" id="overlay"></div>

    <!-- Menu Mobile Lateral -->
    <div class="mobile-menu" id="mobile-menu">
        <div class="mobile-menu-header">
            <button class="back-arrow" id="back-arrow">←</button>
            <span class="mobile-menu-title">Faça seu login</span>
            <div class="mobile-perfil-container">
                <img class="mobile-menu-perfil" src="https://i.postimg.cc/qMvvdyYp/download-3.jpg" alt="Perfil" id="mobile-perfil-img">
                <div class="mobile-dropdown-menu" id="mobile-dropdown-menu">
                    <button onclick="location.href='./login.jsp'">Login</button>
                    <button onclick="location.href='./cadastro.jsp'">Cadastrar</button>
                </div>
            </div>
        </div>
        <nav class="mobile-menu-nav">
            <button class="mobile-menu-item" onclick="location.href='./index.jsp'">DESTAQUES</button>
            <button class="mobile-menu-item" onclick="location.href='./pacotes.jsp'">PACOTES</button>
            <button class="mobile-menu-item" onclick="location.href='./conheca.jsp'">CONHEÇA A SKY MILLES</button>
        </nav>
        <div class="mobile-menu-footer">
            <img src="https://i.postimg.cc/nLnYq7Fp/logo-Sky-Milles.png" alt="Logo SkyMilles">
            <div class="mobile-menu-footer-text"><span>SKY</span>MILLES</div>
        </div>
    </div>

    <!-- Hero Section -->
    <section class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <h1>Como podemos <span>ajudar você?</span></h1>
            <p>Estamos aqui para tornar sua experiência ainda melhor</p>
            
            <!-- Busca rápida -->
            <div class="hero-search">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <input type="text" placeholder="Digite sua dúvida ou palavra-chave..." id="heroSearchInput">
            </div>
        </div>
    </section>

    <!-- Canais de Atendimento -->
    <section class="canais-section">
        <div class="container">
            <h2 class="section-title">Canais de Atendimento</h2>
            <p class="section-subtitle">Escolha a melhor forma de entrar em contato conosco</p>

            <div class="canais-grid">
                <div class="canal-card">
                    <div class="canal-icon whatsapp">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                    </div>
                    <h3>WhatsApp</h3>
                    <p>Atendimento rápido e direto</p>
                    <span class="canal-info">(11) 99999-9999</span>
                    <button class="btn-canal">Iniciar Chat</button>
                </div>

                <div class="canal-card">
                    <div class="canal-icon email">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                    </div>
                    <h3>E-mail</h3>
                    <p>Resposta em até 24 horas</p>
                    <span class="canal-info">contato@skymilles.com.br</span>
                    <button class="btn-canal">Enviar E-mail</button>
                </div>

                <div class="canal-card">
                    <div class="canal-icon telefone">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                    </div>
                    <h3>Telefone</h3>
                    <p>Segunda a sexta, 8h às 20h</p>
                    <span class="canal-info">0800 123 4567</span>
                    <button class="btn-canal">Ligar Agora</button>
                </div>

                <div class="canal-card destaque">
                    <div class="canal-icon chat">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
                        </svg>
                    </div>
                    <h3>Chat Online</h3>
                    <p>Disponível 24/7</p>
                    <span class="canal-info canal-status">● Online agora</span>
                    <button class="btn-canal btn-destaque">Iniciar Chat</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Categorias de Ajuda -->
    <section class="categorias-ajuda-section">
        <div class="container">
            <h2 class="section-title">Categorias de Ajuda</h2>
            <p class="section-subtitle">Encontre informações sobre diversos tópicos</p>

            <div class="categorias-ajuda-grid">
                <div class="categoria-ajuda-card" data-categoria="reservas">
                    <div class="categoria-ajuda-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                        </svg>
                    </div>
                    <h3>Reservas</h3>
                    <p>Dúvidas sobre reservas de voos e hotéis</p>
                    <span class="artigos-count">12 artigos</span>
                </div>

                <div class="categoria-ajuda-card" data-categoria="pagamentos">
                    <div class="categoria-ajuda-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                        </svg>
                    </div>
                    <h3>Pagamentos</h3>
                    <p>Formas de pagamento, reembolsos e taxas</p>
                    <span class="artigos-count">8 artigos</span>
                </div>

                <div class="categoria-ajuda-card" data-categoria="cancelamentos">
                    <div class="categoria-ajuda-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
                        </svg>
                    </div>
                    <h3>Cancelamentos</h3>
                    <p>Políticas e procedimentos de cancelamento</p>
                    <span class="artigos-count">6 artigos</span>
                </div>

                <div class="categoria-ajuda-card" data-categoria="bagagem">
                    <div class="categoria-ajuda-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17 6h-2V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2 0 .55.45 1 1 1s1-.45 1-1h6c0 .55.45 1 1 1s1-.45 1-1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9.5 18H8V9h1.5v9zm3.25 0h-1.5V9h1.5v9zm.75-12h-3V3.5h3V6zM16 18h-1.5V9H16v9z"/>
                        </svg>
                    </div>
                    <h3>Bagagem</h3>
                    <p>Regras de bagagem e extravio</p>
                    <span class="artigos-count">10 artigos</span>
                </div>

                <div class="categoria-ajuda-card" data-categoria="milhas">
                    <div class="categoria-ajuda-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                    </div>
                    <h3>Milhas</h3>
                    <p>Programa de fidelidade e resgates</p>
                    <span class="artigos-count">15 artigos</span>
                </div>

                <div class="categoria-ajuda-card" data-categoria="documentacao">
                    <div class="categoria-ajuda-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                        </svg>
                    </div>
                    <h3>Documentação</h3>
                    <p>Documentos necessários para viagem</p>
                    <span class="artigos-count">9 artigos</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Formulário de Contato -->
    <section class="formulario-section">
        <div class="container">
            <div class="formulario-wrapper">
                <!-- ...existing form... -->
                <div class="formulario-info">
                    <h2>Não encontrou o que procura?</h2>
                    <p>Preencha o formulário ao lado e nossa equipe entrará em contato em breve.</p>
                    
                    <div class="info-destaque">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                        </svg>
                        <div>
                            <strong>Tempo médio de resposta</strong>
                            <p>2 horas em dias úteis</p>
                        </div>
                    </div>

                    <div class="info-destaque">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <div>
                            <strong>Taxa de resolução</strong>
                            <p>98% no primeiro contato</p>
                        </div>
                    </div>
                </div>

                <form class="formulario-contato" id="formContato">
                    <div class="form-group">
                        <label>Nome Completo *</label>
                        <input type="text" required placeholder="Seu nome" id="nome">
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>E-mail *</label>
                            <input type="email" required placeholder="seu@email.com" id="email">
                        </div>
                        <div class="form-group">
                            <label>Telefone</label>
                            <input type="tel" placeholder="(00) 00000-0000" id="telefone">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Número da Reserva</label>
                        <input type="text" placeholder="Ex: SKY123456 (opcional)" id="reserva">
                    </div>

                    <div class="form-group">
                        <label>Assunto *</label>
                        <select required id="assunto">
                            <option value="">Selecione um assunto</option>
                            <option value="reservas">Dúvidas sobre Reservas</option>
                            <option value="pagamentos">Problemas com Pagamento</option>
                            <option value="cancelamento">Cancelamento ou Alteração</option>
                            <option value="bagagem">Questões de Bagagem</option>
                            <option value="milhas">Programa de Milhas</option>
                            <option value="outros">Outros Assuntos</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Mensagem *</label>
                        <textarea required placeholder="Descreva sua dúvida ou problema..." rows="6" id="mensagem"></textarea>
                    </div>

                    <button type="submit" class="btn-enviar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                        Enviar Mensagem
                    </button>
                </form>
            </div>
        </div>
    </section>

    <!-- Status do Sistema -->
    <section class="status-section">
        <div class="container">
            <h2 class="section-title">Status do Sistema</h2>
            <p class="section-subtitle">Verifique o status de nossos serviços em tempo real</p>

            <div class="status-grid">
                <!-- ...existing status cards... -->
                <div class="status-card operacional">
                    <div class="status-header">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span class="status-badge">Operacional</span>
                    </div>
                    <h3>Sistema de Reservas</h3>
                    <p>Funcionando normalmente</p>
                </div>

                <div class="status-card operacional">
                    <div class="status-header">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span class="status-badge">Operacional</span>
                    </div>
                    <h3>Pagamentos</h3>
                    <p>Processamento normal</p>
                </div>

                <div class="status-card operacional">
                    <div class="status-header">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span class="status-badge">Operacional</span>
                    </div>
                    <h3>App Mobile</h3>
                    <p>Disponível iOS e Android</p>
                </div>

                <div class="status-card operacional">
                    <div class="status-header">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span class="status-badge">Operacional</span>
                    </div>
                    <h3>Atendimento Online</h3>
                    <p>Chat disponível 24/7</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Modal de Categoria -->
    <div class="modal-overlay" id="modalCategoria">
        <div class="modal-categoria">
            <div class="modal-header">
                <div class="modal-header-content">
                    <div class="modal-icon" id="modalIcon">
                        <!-- Ícone será inserido dinamicamente -->
                    </div>
                    <h2 id="modalTitulo">Título da Categoria</h2>
                </div>
                <button class="modal-close" id="modalClose">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
            
            <div class="modal-body">
                <p class="modal-description" id="modalDescricao">
                    Descrição da categoria
                </p>
                
                <div class="artigos-lista" id="artigosList">
                    <!-- Artigos serão inseridos dinamicamente -->
                </div>
            </div>
            
            <div class="modal-footer">
                <p>Não encontrou o que procura?</p>
                <button class="btn-contato-modal" onclick="document.getElementById('formContato').scrollIntoView({behavior: 'smooth'})">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    Entre em Contato
                </button>
            </div>
        </div>
    </div>

    <!-- Footer - IDÊNTICO AO INDEX -->
    <footer>
        <div class="footer-container">
            <div class="footer-top">
                <div class="footer-column">
                    <h3>Nossos Serviços</h3>
                    <ul>
                        <li><a href="./passagens.jsp">Passagens Aéreas</a></li>
                        <li><a href="./hoteis.jsp">Reserva de Hotéis</a></li>
                        <li><a href="./pacotes.jsp">Pacotes Promocionais</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h3>Institucional</h3>
                    <ul>
                        <li><a href="./conheca.jsp">Conheça a Sky Milles</a></li>
                        <li><a href="./termos.jsp">Termos de Serviço</a></li>
                        <li><a href="./privacidade.jsp">Políticas de Privacidade</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h3>Ajuda</h3>
                    <ul>
                        <li><a href="./perguntas.jsp">Perguntas Frequentes</a></li>
                        <li><a href="./suporte.jsp">Central de Suporte</a></li>
                        <li><a href="./status-voo.jsp">Status de Voo</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h3>Formas de Pagamento</h3>
                    <div class="payment-methods">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa">
                        <img src="https://i.postimg.cc/ZnqJNwgm/boleto.png" alt="Boleto">
                        <img src="https://i.postimg.cc/zvfqhxMv/pix.png" alt="Pix">
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="footer-brand">
                    <a href="./index.jsp"><img src="https://i.postimg.cc/nLnYq7Fp/logo-Sky-Milles.png" alt="Logo SkyMilles"></a>
                    <div class="footer-brand-text"><span>SKY</span>MILLES</div>
                </div>

                <div class="footer-social">
                    <span>Entre em contato</span>
                    <div class="social-links">
                        <a href="#" title="WhatsApp">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                        </a>
                        <a href="#" title="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="#" title="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                                <defs>
                                    <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                        <stop offset="0%" style="stop-color:#FD5949;stop-opacity:1"/>
                                        <stop offset="50%" style="stop-color:#D6249F;stop-opacity:1"/>
                                        <stop offset="100%" style="stop-color:#285AEB;stop-opacity:1"/>
                                    </linearGradient>
                                </defs>
                                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-copyright">
                © 2025 SkyMilles. Todos os direitos reservados.
            </div>
        </div>
    </footer>

    <script src="../js/searchSystem.js"></script>
    <script src="../js/js.js"></script>
    <script src="../js/suporte.js"></script>
    <script src="../js/auth.js"></script>
</body>
</html>