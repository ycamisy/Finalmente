<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Política de Privacidade - SkyMilles</title>
    <link rel="stylesheet" href="../css/css.css">
    <link rel="stylesheet" href="../css/privacidade.css">
    <link rel="stylesheet" href="../css/searchStyles.css">
</head>

<body>
    <!-- Cabeçalho -->
    <header id="header">
        <a href="http://localhost/dashboard/SkyMilles/"><img id="Logo"
            src="https://i.postimg.cc/nLnYq7Fp/logo-Sky-Milles.png" alt="Logo SkyMilles"></a>
        <a id="NomeMarca" href="./index.jsp"><span>SKY</span>MILLES</a>

        <!-- Barra de pesquisa (visível apenas no desktop) -->
        <div class="search-container">
            <div class="search-wrapper">
                <div class="search-input-container" id="searchInputContainer">
                    <input type="text" id="search-input" placeholder="Buscar...">
                </div>
                <img class="lupa" id="searchIcon" src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
                    alt="Buscar">
            </div>
            <div id="searchResults"></div>
        </div>

        <!-- Menu Desktop -->
        <nav id="main-nav">
            <button class="ButtonMenu" onclick="location.href='./destaques.jsp'">Destaques</button>
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

            <!-- Botão Hambúrguer (visível apenas no mobile) -->
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
            <span class="mobile-menu-title">Menu</span>
            <div class="mobile-perfil-container">
                <img class="mobile-menu-perfil" src="https://i.postimg.cc/qMvvdyYp/download-3.jpg" alt="Perfil"
                    id="mobile-perfil-img">
                <div class="mobile-dropdown-menu" id="mobile-dropdown-menu">
                    <button onclick="location.href='./login.jsp'">Login</button>
                    <button onclick="location.href='./cadastro.jsp'">Cadastrar</button>
                </div>
            </div>
        </div>
        <nav class="mobile-menu-nav">
            <button class="mobile-menu-item" onclick="location.href='./index.jsp'">INÍCIO</button>
            <button class="mobile-menu-item" onclick="location.href='./pacotes.jsp'">PACOTES PROMOCIONAIS</button>
            <button class="mobile-menu-item" onclick="location.href='./conheca.jsp'">CONHEÇA A SKY MILLES</button>
        </nav>
        <div class="mobile-menu-footer">
            <img src="https://i.postimg.cc/nLnYq7Fp/logo-Sky-Milles.png" alt="Logo SkyMilles">
            <div class="mobile-menu-footer-text"><span>SKY</span>MILLES</div>
        </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="privacy-container">
        <div class="privacy-header">
            <h1>🔒 Políticas de Privacidade</h1>
            <p>Conheça como protegemos seus dados</p>
        </div>

        <div class="last-update">
            Última atualização: Junho de 2025
        </div>

        <div class="privacy-content">
            <!-- Seção 1: Introdução -->
            <div class="privacy-section">
                <h2>1. Introdução</h2>
                <p>
                    A SkyMilles ("nós", "nos", "nosso" ou "Empresa") está comprometida em proteger sua privacidade. 
                    Esta Política de Privacidade explica como coletamos, usamos, divulgamos e salvaguardamos suas informações 
                    quando você acessa nosso website e utiliza nossos serviços.
                </p>
                <p>
                    Leia esta política de privacidade cuidadosamente. Se você não concorda com as práticas descritas aqui, 
                    não use nossos serviços. Ao acessar o site SkyMilles, você reconhece que entendeu e concorda com esta política.
                </p>
            </div>

            <!-- Seção 2: Informações Coletadas -->
            <div class="privacy-section">
                <h2>2. Informações que Coletamos</h2>
                <p>Coletamos informações de várias maneiras, incluindo:</p>
                
                <h3>2.1 Informações Fornecidas Diretamente por Você</h3>
                <ul>
                    <li>Dados de cadastro (nome, email, telefone, CPF)</li>
                    <li>Endereço e informações de cobrança</li>
                    <li>Dados de pagamento (cartão de crédito, dados bancários)</li>
                    <li>Histórico de viagens e preferências</li>
                    <li>Comunicações via chat, formulários de contato ou email</li>
                </ul>

                <h3>2.2 Informações Coletadas Automaticamente</h3>
                <ul>
                    <li>Endereço de IP e tipo de navegador</li>
                    <li>Páginas visitadas e tempo gasto no site</li>
                    <li>Cookies e tecnologias similares</li>
                    <li>Localização geográfica aproximada</li>
                    <li>Dados de dispositivo (sistema operacional, identificadores únicos)</li>
                </ul>

                <div class="highlight-box">
                    ℹ️ Utilizamos essas informações para melhorar sua experiência e fornecer serviços personalizados.
                </div>
            </div>

            <!-- Seção 3: Uso de Informações -->
            <div class="privacy-section">
                <h2>3. Como Usamos Suas Informações</h2>
                <p>Utilizamos as informações coletadas para:</p>
                <ul>
                    <li>Processar suas reservas e transações</li>
                    <li>Fornecer suporte ao cliente</li>
                    <li>Enviar confirmações de pedidos e atualizações de voo</li>
                    <li>Personalizar sua experiência de navegação</li>
                    <li>Melhorar nossos serviços e website</li>
                    <li>Pesquisas de mercado e análises</li>
                    <li>Cumprir obrigações legais</li>
                    <li>Enviar promoções e ofertas especiais (com consentimento)</li>
                </ul>
            </div>

            <!-- Seção 4: Compartilhamento de Dados -->
            <div class="privacy-section">
                <h2>4. Compartilhamento de Dados</h2>
                <p>
                    Seus dados podem ser compartilhados com terceiros apenas nos seguintes casos:
                </p>
                <ul>
                    <li>Com companhias aéreas para completar suas reservas</li>
                    <li>Com provedores de pagamento para processar transações</li>
                    <li>Com empresas de hospedagem parceiras</li>
                    <li>Com autoridades quando exigido por lei</li>
                    <li>Com prestadores de serviços que nos auxiliam nas operações</li>
                </ul>
                <p>
                    Nunca vendemos suas informações pessoais para terceiros. Todos os nossos parceiros estão comprometidos 
                    em proteger sua privacidade da mesma forma.
                </p>
            </div>

            <!-- Seção 5: Segurança -->
            <div class="privacy-section">
                <h2>5. Segurança de Dados</h2>
                <p>
                    Implementamos medidas de segurança técnicas, administrativas e físicas para proteger suas informações 
                    contra acesso não autorizado, alteração, divulgação ou destruição.
                </p>
                <ul>
                    <li>Criptografia SSL/TLS em todas as conexões</li>
                    <li>Firewalls e sistemas de detecção de intrusão</li>
                    <li>Acesso restrito a dados sensíveis</li>
                    <li>Monitoramento contínuo de segurança</li>
                    <li>Backups regulares de dados</li>
                </ul>
                <p>
                    Entretanto, nenhuma transmissão de dados pela internet é 100% segura. Embora implementemos medidas 
                    robustas, não podemos garantir segurança absoluta.
                </p>
            </div>

            <!-- Seção 6: Retenção de Dados -->
            <div class="privacy-section">
                <h2>6. Retenção de Dados</h2>
                <p>
                    Retemos suas informações pessoais pelo tempo necessário para:
                </p>
                <ul>
                    <li>Fornecer nossos serviços</li>
                    <li>Cumprir obrigações legais e regulatórias</li>
                    <li>Resolver disputas e aplicar acordos</li>
                    <li>Melhorar nossos serviços (dados anonimizados)</li>
                </ul>
                <p>
                    Você pode solicitar a exclusão de seus dados a qualquer momento, respeitando obrigações legais de retenção.
                </p>
            </div>

            <!-- Seção 7: Seus Direitos -->
            <div class="privacy-section">
                <h2>7. Seus Direitos</h2>
                <p>
                    De acordo com a Lei Geral de Proteção de Dados (LGPD), você possui os seguintes direitos:
                </p>
                <ul>
                    <li><strong>Acesso:</strong> Solicitar cópia de seus dados pessoais</li>
                    <li><strong>Correção:</strong> Solicitar correção de dados incorretos</li>
                    <li><strong>Exclusão:</strong> Solicitar exclusão de seus dados (direito ao esquecimento)</li>
                    <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                    <li><strong>Consentimento:</strong> Revogar consentimento a qualquer momento</li>
                    <li><strong>Oposição:</strong> Opor-se ao tratamento de seus dados</li>
                </ul>
                <p>
                    Para exercer qualquer destes direitos, entre em contato com nosso time de Privacidade.
                </p>
            </div>

            <!-- Seção 8: Cookies -->
            <div class="privacy-section">
                <h2>8. Política de Cookies</h2>
                <p>
                    Utilizamos cookies para melhorar sua experiência de navegação. Cookies são pequenos arquivos de texto 
                    armazenados em seu dispositivo.
                </p>
                <h3>Tipos de Cookies Utilizados:</h3>
                <ul>
                    <li><strong>Essenciais:</strong> Necessários para o funcionamento do site</li>
                    <li><strong>Analíticos:</strong> Para entender como você usa nosso site</li>
                    <li><strong>Marketing:</strong> Para personalizar publicidades</li>
                </ul>
                <p>
                    Você pode controlar cookies através das configurações do seu navegador. Desabilitar cookies pode afetar 
                    a funcionalidade do site.
                </p>
            </div>

            <!-- Seção 9: Política para Menores -->
            <div class="privacy-section">
                <h2>9. Proteção de Menores de Idade</h2>
                <p>
                    Nossos serviços não são destinados a menores de 18 anos. Não coletamos intencionalmente informações 
                    de menores. Se descobrirmos que dados de menores foram coletados, deletaremos prontamente.
                </p>
                <p>
                    Pais ou responsáveis podem nos contactar para solicitar a exclusão de dados de menores.
                </p>
            </div>

            <!-- Seção 10: Transferências Internacionais -->
            <div class="privacy-section">
                <h2>10. Transferências Internacionais de Dados</h2>
                <p>
                    Seus dados podem ser transferidos, armazenados e processados em países diferentes do Brasil. 
                    Ao usar nossos serviços, você consente com essa transferência sob os termos desta política.
                </p>
                <p>
                    Todos os destinatários internacionais são obrigados a manter o mesmo nível de proteção de dados.
                </p>
            </div>

            <!-- Seção 11: Mudanças na Política -->
            <div class="privacy-section">
                <h2>11. Mudanças nesta Política</h2>
                <p>
                    Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas 
                    por email ou publicação destacada no site. Seu uso contínuo do site após mudanças constitui aceitação.
                </p>
            </div>

            <!-- Seção 12: Contato -->
            <div class="privacy-section">
                <h2>12. Entre em Contato Conosco</h2>
                <p>
                    Se tiver dúvidas sobre esta Política de Privacidade ou desejar exercer seus direitos, entre em contato:
                </p>
                <ul>
                    <li><strong>Email:</strong> privacidade@skymilles.com.br</li>
                    <li><strong>Telefone:</strong> +55 (11) 3000-1000</li>
                    <li><strong>Endereço:</strong> Av. Paulista, 1000 - São Paulo, SP - Brasil</li>
                </ul>
                <p>
                    Responderemos suas solicitações em até 10 dias úteis.
                </p>
            </div>

            <!-- Box Final -->
            <div class="privacy-footer-info">
                <h3>Dúvidas sobre Privacidade?</h3>
                <p>Estamos aqui para ajudar!</p>
                <p>Envie um email para <a href="mailto:privacidade@skymilles.com.br">privacidade@skymilles.com.br</a></p>
                <p>ou entre em contato através de nossa <a href="./suporte.jsp">Central de Suporte</a></p>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer>
        <div class="footer-container">
            <div class="footer-top">
                <div class="footer-column">
                    <h3>Nossos Serviços</h3>
                    <ul>
                        <li><a href="passagens.jsp">Passagens Aéreas</a></li>
                        <li><a href="hoteis.jsp">Reserva de Hotéis</a></li>
                        <li><a href="pacotes.jsp">Pacotes Promocionais</a></li>
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
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                            alt="Mastercard">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa">
                        <img src="https://i.postimg.cc/ZnqJNwgm/boleto.png" alt="Boleto">
                        <img src="https://i.postimg.cc/zvfqhxMv/pix.png" alt="Pix">
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="footer-brand">
                    <a href="./index.jsp"><img src="https://i.postimg.cc/nLnYq7Fp/logo-Sky-Milles.png"
                            alt="Logo SkyMilles"></a>
                    <div class="footer-brand-text"><span>SKY</span>MILLES</div>
                </div>

                <div class="footer-social">
                    <span>Entre em contato</span>
                    <div class="social-links">
                        <a href="#" title="WhatsApp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg></a>
                        <a href="#" title="Facebook"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
                        <a href="#" title="Instagram"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="url(#instagram-gradient)"><defs><linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#FD5949;stop-opacity:1" /><stop offset="50%" style="stop-color:#D6249F;stop-opacity:1" /><stop offset="100%" style="stop-color:#285AEB;stop-opacity:1" /></linearGradient></defs><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03z" /></svg></a>
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
    <script src="../js/auth.js"></script>
</body>

</html>
