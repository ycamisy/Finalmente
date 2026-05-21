<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Termos de Serviço - SkyMilles</title>
    <link rel="stylesheet" href="../css/css.css">
    <link rel="stylesheet" href="../css/termos.css">
    <link rel="stylesheet" href="../css/searchStyles.css">
</head>

<body>
    <!-- Cabeçalho -->
    <header id="header">
        <a href="http://localhost/dashboard/SkyMilles/"><img id="Logo"
            src="https://i.postimg.cc/nLnYq7Fp/logo-Sky-Milles.png" alt="Logo SkyMilles"></a>
        <a id="NomeMarca" href="#"><span>SKY</span>MILLES</a>

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
            <button class="mobile-menu-item" onclick="location.href='./destaques.jsp'">DESTAQUES</button>
            <button class="mobile-menu-item" onclick="location.href='./pacotes.jsp'">PACOTES PROMOCIONAIS</button>
            <button class="mobile-menu-item" onclick="location.href='./conheca.jsp'">CONHEÇA A SKY MILLES</button>
        </nav>
        <div class="mobile-menu-footer">
            <img src="https://i.postimg.cc/nLnYq7Fp/logo-Sky-Milles.png" alt="Logo SkyMilles">
            <div class="mobile-menu-footer-text"><span>SKY</span>MILLES</div>
        </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="terms-container">
        <div class="terms-header">
            <h1>📋 Termos de Serviço</h1>
            <p>Condições de uso da plataforma SkyMilles</p>
        </div>

        <div class="last-update">
            Última atualização: Junho de 2025 | Versão 2.0
        </div>

        <div class="terms-content">
            <!-- Seção 1: Introdução e Aceitação -->
            <div class="terms-section">
                <h2>1. Introdução e Aceitação dos Termos</h2>
                <p>
                    Bem-vindo à SkyMilles! Estes Termos de Serviço ("Termos") regem o uso de nosso website, aplicativo 
                    móvel e todos os serviços relacionados oferecidos pela SkyMilles ("Serviços").
                </p>
                <p>
                    Ao acessar, navegar ou usar qualquer parte da plataforma SkyMilles, você concorda em ser vinculado 
                    por estes Termos. Se não concorda com qualquer disposição, por favor, não use nossos Serviços.
                </p>
                <div class="info-box">
                    ℹ️ Reservamos o direito de modificar estes Termos a qualquer momento. Notificaremos sobre mudanças 
                    significativas por email ou publicação destacada no site.
                </div>
            </div>

            <!-- Seção 2: Descrição dos Serviços -->
            <div class="terms-section">
                <h2>2. Descrição dos Serviços</h2>
                <p>A SkyMilles oferece os seguintes serviços:</p>
                <ul>
                    <li>Busca e comparação de voos</li>
                    <li>Reserva e compra de passagens aéreas</li>
                    <li>Reserva de hospedagem em hotéis</li>
                    <li>Pacotes promocionais de viagens</li>
                    <li>Programa de milhas e pontos de fidelidade</li>
                    <li>Suporte ao cliente e gestão de reservas</li>
                </ul>
                <p>
                    Estes Serviços são oferecidos como intermediários. A SkyMilles não é operadora de voos, companhia 
                    aérea ou proprietária das acomodações listadas.
                </p>
            </div>

            <!-- Seção 3: Elegibilidade e Conta -->
            <div class="terms-section">
                <h2>3. Elegibilidade e Criar Conta</h2>
                <h3>3.1 Requisitos de Elegibilidade</h3>
                <p>Para usar nossos Serviços, você deve:</p>
                <ul>
                    <li>Ter pelo menos 18 anos de idade</li>
                    <li>Ser residente do Brasil ou estar autorizado a fazer compras internacionais</li>
                    <li>Possuir informações de contato válidas</li>
                    <li>Aceitar estes Termos de Serviço</li>
                </ul>

                <h3>3.2 Criação de Conta</h3>
                <p>
                    Ao criar uma conta, você se compromete a:
                </p>
                <ul>
                    <li>Fornecer informações precisas e completas</li>
                    <li>Manter a confidencialidade de sua senha</li>
                    <li>Aceitar responsabilidade por todas as atividades em sua conta</li>
                    <li>Notificar-nos imediatamente sobre acesso não autorizado</li>
                </ul>

                <div class="warning-box">
                    ⚠️ Você é responsável por toda atividade em sua conta. A SkyMilles não é responsável por acesso 
                    não autorizado resultante de negligência do usuário.
                </div>
            </div>

            <!-- Seção 4: Condições de Uso -->
            <div class="terms-section">
                <h2>4. Condições de Uso</h2>
                <h3>4.1 Uso Apropriado</h3>
                <p>Você concorda em usar nossos Serviços apenas para fins legais e legítimos. É proibido:</p>
                <ul>
                    <li>Usar a plataforma para atividades ilegais</li>
                    <li>Transmitir vírus, malware ou código prejudicial</li>
                    <li>Realizar engenharia reversa ou tentar acessar dados restritos</li>
                    <li>Fazer raspagem de dados ou automação não autorizada</li>
                    <li>Assediar, ameaçar ou intimidar outros usuários</li>
                    <li>Fazer múltiplas reservas com intenção de fraude</li>
                </ul>

                <h3>4.2 Restrições de Acesso</h3>
                <p>
                    A SkyMilles reserva o direito de suspender ou encerrar acesso a qualquer usuário que viole 
                    estes Termos, sem aviso prévio ou reembolso.
                </p>
            </div>

            <!-- Seção 5: Preços e Pagamentos -->
            <div class="terms-section">
                <h2>5. Preços e Pagamentos</h2>
                <h3>5.1 Precisão de Preços</h3>
                <p>
                    Os preços exibidos no site são atualizados regularmente. Embora façamos esforços para garantir 
                    precisão, podem ocorrer erros. A SkyMilles reserva o direito de corrigir erros de preço antes 
                    da confirmação da compra.
                </p>

                <h3>5.2 Método de Pagamento</h3>
                <p>Aceitamos os seguintes métodos de pagamento:</p>
                <ul>
                    <li>Cartões de crédito (Visa, Mastercard)</li>
                    <li>Transferência bancária</li>
                    <li>Boleto bancário</li>
                    <li>Pix</li>
                </ul>

                <h3>5.3 Autorização de Pagamento</h3>
                <p>
                    Ao submeter uma reserva, você autoriza a SkyMilles a cobrar o valor total na forma de pagamento 
                    escolhida. Você é responsável por fornecer informações precisas de pagamento.
                </p>

                <h3>5.4 Segurança de Dados Financeiros</h3>
                <p>
                    Todos os pagamentos são processados através de gateways seguros com criptografia SSL/TLS. 
                    Nunca armazenamos dados completos de cartão de crédito.
                </p>

                <div class="highlight-box">
                    💳 Sua segurança financeira é nossa prioridade. Nunca compartilhe detalhes de pagamento por email.
                </div>
            </div>

            <!-- Seção 6: Reservas e Cancelamentos -->
            <div class="terms-section">
                <h2>6. Reservas e Cancelamentos</h2>
                <h3>6.1 Confirmação de Reserva</h3>
                <p>
                    Após confirmar o pagamento, você receberá um email com os detalhes da reserva e código de 
                    confirmação. Este é seu recibo de transação.
                </p>

                <h3>6.2 Política de Cancelamento</h3>
                <p>As políticas de cancelamento variam conforme o tipo de passagem:</p>

                <div class="table-responsive">
                    <table class="terms-table">
                        <thead>
                            <tr>
                                <th>Tipo de Passagem</th>
                                <th>Prazo de Cancelamento</th>
                                <th>Reembolso</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Passagem Premium</td>
                                <td>Até 7 dias antes do voo</td>
                                <td>100% + Taxa de crédito</td>
                            </tr>
                            <tr>
                                <td>Passagem Standard</td>
                                <td>Até 3 dias antes do voo</td>
                                <td>70% do valor</td>
                            </tr>
                            <tr>
                                <td>Passagem Econômica</td>
                                <td>Até 24h antes do voo</td>
                                <td>Sem reembolso</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>6.3 Reembolsos</h3>
                <p>
                    Reembolsos aprovados serão processados no prazo de 5 a 10 dias úteis na forma de pagamento original. 
                    Não há reembolso para atrasos causados por companhias aéreas ou cancelamentos por força maior.
                </p>

                <h3>6.4 Modificações de Reserva</h3>
                <p>
                    Alterações em datas e horários estão sujeitas à disponibilidade e podem incurrir em taxas adicionais. 
                    A SkyMilles não se responsabiliza por impossibilidade de modificação.
                </p>

                <div class="warning-box">
                    ⚠️ Cancelamentos realizados com menos de 24 horas antes do voo podem não ser processados. 
                    Consulte a companhia aérea diretamente.
                </div>
            </div>

            <!-- Seção 7: Responsabilidades -->
            <div class="terms-section">
                <h2>7. Responsabilidades e Limitações</h2>
                <h3>7.1 Responsabilidade da SkyMilles</h3>
                <p>A SkyMilles é responsável por:</p>
                <ul>
                    <li>Facilitar a busca e reserva de voos</li>
                    <li>Proteger dados pessoais e financeiros</li>
                    <li>Oferecer suporte ao cliente eficiente</li>
                    <li>Cumprir com leis de proteção ao consumidor</li>
                </ul>

                <h3>7.2 Limitações de Responsabilidade</h3>
                <p>A SkyMilles NÃO é responsável por:</p>
                <ul>
                    <li>Cancelamentos, atrasos ou mudanças de voos (responsabilidade da companhia aérea)</li>
                    <li>Bagagem perdida, danificada ou extraviada</li>
                    <li>Indisponibilidade de hospedagem ou serviços</li>
                    <li>Danos incidentais, consequenciais ou punitivos</li>
                    <li>Perda de receita, dados ou oportunidades comerciais</li>
                    <li>Conteúdo de terceiros ou links externos</li>
                </ul>

                <h3>7.3 Força Maior</h3>
                <p>
                    A SkyMilles não é responsável por eventos de força maior incluindo: pandemias, desastres naturais, 
                    guerras, greves ou atos governamentais que afetem os Serviços.
                </p>

                <div class="info-box">
                    ℹ️ As companhias aéreas parceiras são responsáveis por suas operações. Consulte suas políticas específicas.
                </div>
            </div>

            <!-- Seção 8: Programa de Milhas -->
            <div class="terms-section">
                <h2>8. Programa de Milhas e Pontos</h2>
                <h3>8.1 Acúmulo de Milhas</h3>
                <p>
                    Você acumula milhas a cada compra de passagem na SkyMilles. A quantidade de milhas varia conforme 
                    o plano contratado e a tarifa selecionada.
                </p>

                <h3>8.2 Resgate de Milhas</h3>
                <p>
                    Milhas podem ser resgatadas para descontos em futuras passagens, upgrades ou pacotes promocionais. 
                    1.000 milhas equivalem a aproximadamente R$ 50 em desconto.
                </p>

                <h3>8.3 Validade das Milhas</h3>
                <p>
                    Milhas expiram 24 meses após acúmulo se não forem utilizadas. A SkyMilles não é responsável por 
                    milhas expiradas não notificadas previamente.
                </p>

                <h3>8.4 Cancelamento de Milhas</h3>
                <p>
                    Em caso de cancelamento de reserva, as milhas serão devolvidas à sua conta automaticamente. 
                    Milhas não podem ser transferidas entre contas.
                </p>
            </div>

            <!-- Seção 9: Propriedade Intelectual -->
            <div class="terms-section">
                <h2>9. Propriedade Intelectual</h2>
                <p>
                    Todos os conteúdos do website, incluindo textos, imagens, logos, design e código são propriedade 
                    exclusiva da SkyMilles ou de seus licenciadores, protegidos por leis de direitos autorais.
                </p>
                <p>
                    Você concede à SkyMilles licença para usar qualquer conteúdo que você envie (mensagens, feedbacks, 
                    fotos) para melhorar nossos Serviços, sem compensação adicional.
                </p>
                <p>
                    É proibido reproduzir, distribuir ou transmitir qualquer conteúdo sem permissão escrita prévia.
                </p>
            </div>

            <!-- Seção 10: Indenização -->
            <div class="terms-section">
                <h2>10. Indenização</h2>
                <p>
                    Você concorda em indenizar e isentar a SkyMilles, seus diretores, funcionários e agentes de 
                    qualquer reclamação, dano, perda ou custo (incluindo honorários advocatícios) resultantes de:
                </p>
                <ul>
                    <li>Seu uso dos Serviços</li>
                    <li>Violação destes Termos</li>
                    <li>Violação de direitos de terceiros</li>
                    <li>Conteúdo que você postou ou transmitiu</li>
                    <li>Conduta ilegal ou prejudicial</li>
                </ul>
            </div>

            <!-- Seção 11: Conformidade Legal -->
            <div class="terms-section">
                <h2>11. Conformidade Legal</h2>
                <h3>11.1 Lei Aplicável</h3>
                <p>
                    Estes Termos são regidos pelas leis da República Federativa do Brasil, especificamente a legislação 
                    do estado de São Paulo, independentemente de conflitos legais.
                </p>

                <h3>11.2 Jurisdição</h3>
                <p>
                    Você concorda em submeter-se à jurisdição exclusiva dos tribunais brasileiros para resolver 
                    qualquer disputa com a SkyMilles.
                </p>

                <h3>11.3 Resolução de Disputas</h3>
                <p>
                    Antes de iniciar ação judicial, você concorda em tentar resolver disputas através de negociação 
                    amigável com nosso departamento de Suporte.
                </p>

                <h3>11.4 Conformidade com Leis</h3>
                <p>
                    A SkyMilles cumpre com todas as leis aplicáveis, incluindo LGPD (Lei Geral de Proteção de Dados), 
                    CDC (Código de Defesa do Consumidor) e regulamentações de aviação civil.
                </p>
            </div>

            <!-- Seção 12: Mudanças nos Termos -->
            <div class="terms-section">
                <h2>12. Mudanças nos Termos</h2>
                <p>
                    A SkyMilles pode atualizar estes Termos a qualquer momento. Notificaremos sobre mudanças significativas 
                    por email ou publicação destacada no site com antecedência mínima de 30 dias.
                </p>
                <p>
                    Seu uso contínuo da plataforma após publicação de mudanças constitui aceitação dos novos Termos.
                </p>
                <p>
                    Se não concordar com as mudanças, você poderá encerrar sua conta antes da data de vigência.
                </p>
            </div>

            <!-- Seção 13: Rescisão -->
            <div class="terms-section">
                <h2>13. Rescisão de Conta</h2>
                <h3>13.1 Rescisão pelo Usuário</h3>
                <p>
                    Você pode encerrar sua conta a qualquer momento entrando em contato com nosso Suporte. 
                    Após encerramento, você perderá acesso a milhas acumuladas e benefícios pendentes.
                </p>

                <h3>13.2 Rescisão pela SkyMilles</h3>
                <p>
                    A SkyMilles pode encerrar sua conta imediatamente se você:
                </p>
                <ul>
                    <li>Violar estes Termos</li>
                    <li>Cometer fraude ou atividade ilegal</li>
                    <li>Ameaçar ou assediar funcionários</li>
                    <li>Fornecer informações falsas ou enganosas</li>
                </ul>

                <h3>13.3 Efeitos da Rescisão</h3>
                <p>
                    Após rescisão, todos os direitos de uso dos Serviços cessam imediatamente. Milhas não utilizadas 
                    serão perdidas sem compensação.
                </p>
            </div>

            <!-- Seção 14: Contato -->
            <div class="terms-section">
                <h2>14. Contato e Suporte</h2>
                <p>
                    Para questões sobre estes Termos ou nossos Serviços, entre em contato:
                </p>
                <ul>
                    <li><strong>Email:</strong> suporte@skymilles.com.br</li>
                    <li><strong>Telefone:</strong> +55 (11) 3000-1000</li>
                    <li><strong>WhatsApp:</strong> +55 (11) 99999-8888</li>
                    <li><strong>Endereço:</strong> Av. Paulista, 1000 - São Paulo, SP - Brasil</li>
                    <li><strong>Horário:</strong> Segunda a Domingo, 9h às 22h</li>
                </ul>
                <p>
                    Responderemos suas dúvidas em até 24 horas úteis.
                </p>
            </div>

            <!-- Box Final -->
            <div class="terms-footer-info">
                <h3>Dúvidas sobre os Termos?</h3>
                <p>Estamos aqui para esclarecer!</p>
                <p>Envie um email para <a href="mailto:suporte@skymilles.com.br">suporte@skymilles.com.br</a></p>
                <p>ou acesse nossa <a href="./suporte.jsp">Central de Suporte</a></p>
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
                    <a href="http://localhost/dashboard/SkyMilles/"><img
                            src="https://i.postimg.cc/nLnYq7Fp/logo-Sky-Milles.png" alt="Logo SkyMilles"></a>
                    <div class="footer-brand-text"><span>SKY</span>MILLES</div>
                </div>

                <div class="footer-social">
                    <span>Entre em contato</span>
                    <div class="social-links">
                        <a href="#" title="WhatsApp">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366">
                                <path
                                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </a>
                        <a href="#" title="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2">
                                <path
                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        <a href="#" title="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                                <defs>
                                    <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                        <stop offset="0%" style="stop-color:#FD5949;stop-opacity:1" />
                                        <stop offset="50%" style="stop-color:#D6249F;stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:#285AEB;stop-opacity:1" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03z" />
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
    <script src="../js/auth.js"></script>
</body>

</html>
