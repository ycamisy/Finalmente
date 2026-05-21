<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrador - SkyMilles</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #2c5364 0%, #203a43 50%, #0f2027 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .admin-container {
            max-width: 1200px;
            width: 100%;
            background: rgba(44, 83, 100, 0.95);
            border-radius: 30px;
            padding: 60px 40px;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
            animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .header {
            text-align: center;
            margin-bottom: 50px;
        }

        .logo-img {
            height: 100px;
            width: auto;
            object-fit: contain;
            filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
            margin-bottom: 30px;
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        h1 {
            color: white;
            font-size: 3em;
            margin-bottom: 15px;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .subtitle {
            color: rgba(255, 255, 255, 0.8);
            font-size: 1.2em;
            margin-bottom: 20px;
        }

        .divider {
            width: 500px;
            height: 4px;
            background: linear-gradient(90deg, transparent, white, transparent);
            margin: 30px auto;
            border-radius: 2px;
        }

        .cards-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }

        .admin-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 40px 30px;
            text-align: center;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            border: 2px solid rgba(255, 255, 255, 0.1);
            position: relative;
            overflow: hidden;
        }

        .admin-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.5s;
        }

        .admin-card:hover::before {
            left: 100%;
        }

        .admin-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            border-color: rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.15);
        }

        .card-icon {
            font-size: 4em;
            margin-bottom: 20px;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }

        .card-title {
            color: white;
            font-size: 1.8em;
            font-weight: bold;
            margin-bottom: 15px;
        }

        .card-description {
            color: rgba(255, 255, 255, 0.8);
            font-size: 1em;
            line-height: 1.6;
            margin-bottom: 25px;
        }

        .card-btn {
            display: inline-block;
            padding: 15px 40px;
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            text-decoration: none;
            border-radius: 30px;
            font-weight: bold;
            font-size: 1.1em;
            transition: all 0.3s;
            box-shadow: 0 8px 20px rgba(52, 152, 219, 0.3);
        }

        .card-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(52, 152, 219, 0.5);
            background: linear-gradient(135deg, #2980b9, #1f6391);
        }

        .card-btn.secondary {
            background: linear-gradient(135deg, #27ae60, #229954);
            box-shadow: 0 8px 20px rgba(39, 174, 96, 0.3);
        }

        .card-btn.secondary:hover {
            box-shadow: 0 12px 30px rgba(39, 174, 96, 0.5);
            background: linear-gradient(135deg, #229954, #1e8449);
        }

        .stats-bar {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 50px;
            padding-top: 50px;
            border-top: 2px solid rgba(255, 255, 255, 0.1);
        }

        .stat-item {
            text-align: center;
            padding: 25px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            transition: all 0.3s;
        }

        .stat-item:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: scale(1.05);
        }

        .stat-number {
            font-size: 2.5em;
            font-weight: bold;
            color: #3498db;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .stat-label {
            color: rgba(255, 255, 255, 0.8);
            font-size: 1em;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 30px;
            border-top: 2px solid rgba(255, 255, 255, 0.1);
        }

        .footer-text {
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.9em;
        }

        @media (max-width: 768px) {
            .admin-container {
                padding: 40px 20px;
            }

            h1 {
                font-size: 2em;
            }

            .cards-container {
                grid-template-columns: 1fr;
            }

            .card-icon {
                font-size: 3em;
            }

            .card-title {
                font-size: 1.5em;
            }

            .stats-bar {
                grid-template-columns: 1fr;
            }
        }

        /* Animação de entrada dos cards */
        .admin-card {
            animation: cardFadeIn 0.6s ease-out backwards;
        }

        .admin-card:nth-child(1) {
            animation-delay: 0.1s;
        }

        .admin-card:nth-child(2) {
            animation-delay: 0.2s;
        }

        @keyframes cardFadeIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Efeito de brilho nos cards */
        .admin-card::after {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            bottom: -50%;
            left: -50%;
            background: linear-gradient(to bottom, rgba(229, 172, 142, 0), rgba(255, 255, 255, 0.1) 50%, rgba(229, 172, 142, 0));
            transform: rotateZ(60deg) translate(-5em, 7.5em);
            opacity: 0;
            transition: opacity 0.3s;
        }

        .admin-card:hover::after {
            opacity: 1;
            animation: shine 0.75s;
        }

        @keyframes shine {
            0% {
                transform: rotateZ(60deg) translate(-5em, 7.5em);
            }
            100% {
                transform: rotateZ(60deg) translate(25em, -15em);
            }
        }
    </style>
</head>
<body>
    <div class="admin-container">
        <div class="header">
            <a href="http://localhost/dashboard/SkyMilles/adm.html"><img class="logo-img"
                src="https://i.postimg.cc/nLnYq7Fp/logo-Sky-Milles.png" alt="Logo SkyMilles"></a>
            <h1>Painel Administrativo</h1>
            <p class="subtitle">Sistema de Gerenciamento de Voos SkyMilles</p>
            <div class="divider"></div>
        </div>

        <!-- Voos -->
        <div class="cards-container">
            <div class="admin-card" onclick="window.location.href='voos.html'">
                <div class="card-icon">✈️</div>
                <h2 class="card-title">Cadastrar Voo</h2>
                <p class="card-description">
                    Registre novos voos no sistema com todas as informações necessárias: origem, destino, horários, companhia e muito mais.
                </p>
                <a href="voos.html" class="card-btn">Novo Cadastro</a>
            </div>

            <div class="admin-card" onclick="window.location.href='visuVoos.html'">
                <div class="card-icon">📋</div>
                <h2 class="card-title">Visualizar Voos</h2>
                <p class="card-description">
                    Consulte, edite e gerencie todos os voos cadastrados. Filtre por status, companhia e exporte dados em JSON.
                </p>
                <a href="visuVoos.html" class="card-btn secondary">Ver Voos</a>
            </div>
        </div>

        <!-- Hotéis -->

        <div class="cards-container">
            <div class="admin-card" onclick="window.location.href='cadHotel.html'">
                <div class="card-icon">🏨</div>
                <h2 class="card-title">Cadastrar Hotel</h2>
                <p class="card-description">
                    Registre novos hotéis no sistema com todas as informações necessárias: nome, localização, categorias e muito mais.
                </p>
                <a href="cadHotel.html" class="card-btn">Novo Cadastro</a>
            </div>

            <div class="admin-card" onclick="window.location.href='visuHoteis.html'">
                <div class="card-icon">📋</div>
                <h2 class="card-title">Visualizar Hotéis</h2>
                <p class="card-description">
                    Consulte, edite e gerencie todos os hotéis cadastrados. Filtre por status, companhia e exporte dados em JSON.
                </p>
                <a href="visuHotel.html" class="card-btn secondary">Ver Hotéis</a>
            </div>
        </div>

        <!-- Clientes -->

         <div class="cards-container">
            <div class="admin-card" onclick="window.location.href='cadCliente.html'">
                <div class="card-icon">👤</div>
                <h2 class="card-title">Cadastrar Cliente</h2>
                <p class="card-description">
                    Registre novos clientes no sistema com todas as informações necessárias: nome, contato, preferências e muito mais.
                </p>
                <a href="cadCliente.html" class="card-btn">Novo Cadastro</a>
            </div>


            <div class="admin-card" onclick="window.location.href='visuCliente.html'">
                <div class="card-icon">📋</div>
                <h2 class="card-title">Visualizar Clientes</h2>
                <p class="card-description">
                    Consulte, edite e gerencie todos os clientes cadastrados. Filtre por status, companhia e exporte dados em JSON.
                </p>
                <a href="visuCliente.html" class="card-btn secondary">Ver Clientes</a>
            </div>
        </div>

        <!-- Pacotes -->

        <div class="cards-container">
            <div class="admin-card" onclick="window.location.href='cadPacote.html'">
                <div class="card-icon">📦</div>
                <h2 class="card-title">Cadastrar Pacote</h2>
                <p class="card-description">
                    Registre novos pacotes de viagem no sistema com todas as informações: destino, duração, preço, inclusos e mais.
                </p>
                <a href="cadPacote.html" class="card-btn">Novo Cadastro</a>
            </div>

            <div class="admin-card" onclick="window.location.href='visuPacote.html'">
                <div class="card-icon">📋</div>
                <h2 class="card-title">Visualizar Pacotes</h2>
                <p class="card-description">
                    Consulte, edite e gerencie todos os pacotes cadastrados. Filtre por status, tipo e exporte dados em JSON.
                </p>
                <a href="visuPacote.html" class="card-btn secondary">Ver Pacotes</a>
            </div>
        </div>

        <div class="stats-bar">
            <div class="stat-item">
                <div class="stat-number">🚀</div>
                <div class="stat-label">Sistema Ativo</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Disponibilidade</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">🔒</div>
                <div class="stat-label">Seguro</div>
            </div>
        </div>

        <div class="footer">
            <p class="footer-text">© 2024 SkyMilles - Sistema de Gerenciamento de Voos</p>
            <p class="footer-text" style="margin-top: 10px;">Desenvolvido com ❤️ para uma gestão eficiente</p>
        </div>
    </div>

    <script>
        // Adiciona efeito de parallax suave no movimento do mouse
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.admin-card');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            cards.forEach((card, index) => {
                const speed = (index + 1) * 5;
                const x = (mouseX * speed) - (speed / 2);
                const y = (mouseY * speed) - (speed / 2);
                
                card.style.transform = `translate(${x}px, ${y}px)`;
            });
        });

        // Animação de contador para os stats (opcional)
        window.addEventListener('load', () => {
            console.log('Painel Administrativo SkyMilles carregado com sucesso!');
        });

        // Adiciona teclas de atalho
        document.addEventListener('keydown', (e) => {
            // Alt + 1 = Cadastrar Voo
            if (e.altKey && e.key === '1') {
                window.location.href = 'voos.html';
            }
            // Alt + 2 = Visualizar Voos
            if (e.altKey && e.key === '2') {
                window.location.href = 'visuVoos.html';
            }
        });

        // Adiciona tooltip de atalhos
        const cards = document.querySelectorAll('.admin-card');
        cards.forEach((card, index) => {
            card.title = `Atalho: Alt + ${index + 1}`;
        });
    </script>
</body>
</html>