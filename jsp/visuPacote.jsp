<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visualizar e Editar Pacotes</title>
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
            padding: 20px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: rgba(44, 83, 100, 0.95);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30px;
            gap: 20px;
            padding-bottom: 20px;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }

        .header-left {
            display: flex;
            align-items: center;
            gap: 20px;
            flex: 1;
        }

        .logo-img {
            height: 70px;
            width: auto;
            object-fit: contain;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
            transition: all 0.3s;
            flex-shrink: 0;
        }

        .logo-img:hover {
            transform: scale(1.05);
            filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
        }

        h1 {
            color: white;
            font-size: 2em;
            text-align: center;
            margin: 0;
            flex: 1;
        }

        .header-actions {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .back-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            padding: 10px 15px;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 14px;
            font-weight: bold;
            white-space: nowrap;
        }

        .back-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateX(-3px);
        }

        .controls {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            margin-bottom: 30px;
        }

        .btn {
            padding: 12px 25px;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            color: white;
        }

        .btn-refresh {
            background: linear-gradient(135deg, #3498db, #2980b9);
        }

        .btn-export {
            background: linear-gradient(135deg, #27ae60, #229954);
        }

        .btn-novo {
            background: linear-gradient(135deg, #9b59b6, #8e44ad);
        }

        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .filters {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }

        .filter-group {
            display: flex;
            flex-direction: column;
        }

        .filter-group label {
            color: white;
            margin-bottom: 8px;
            font-weight: 500;
        }

        .filter-group select,
        .filter-group input {
            padding: 12px 18px;
            border: none;
            border-radius: 25px;
            background: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            outline: none;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
        }

        .stat-card h3 {
            color: rgba(255, 255, 255, 0.7);
            font-size: 14px;
            margin-bottom: 10px;
        }

        .stat-card p {
            color: white;
            font-size: 28px;
            font-weight: bold;
        }

        .table-container {
            overflow-x: auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        thead {
            background: linear-gradient(135deg, #2c5364, #203a43);
        }

        th {
            padding: 18px;
            text-align: left;
            color: white;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
        }

        td {
            padding: 15px 18px;
            border-bottom: 1px solid #f0f0f0;
        }

        tbody tr {
            transition: all 0.3s;
        }

        tbody tr:hover {
            background: rgba(52, 152, 219, 0.1);
        }

        .status-badge {
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
            display: inline-block;
        }

        .status-ativo { background: #d4edda; color: #155724; }
        .status-inativo { background: #f8d7da; color: #721c24; }
        .status-cancelado { background: #f8d7da; color: #721c24; }
        .status-lotado { background: #fff3cd; color: #856404; }

        .actions {
            display: flex;
            gap: 10px;
        }

        .action-btn {
            padding: 8px 15px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
            transition: all 0.3s;
        }

        .btn-edit {
            background: #3498db;
            color: white;
        }

        .btn-delete {
            background: #e74c3c;
            color: white;
        }

        .action-btn:hover {
            transform: scale(1.05);
        }

        .loading {
            text-align: center;
            padding: 40px;
            color: white;
            font-size: 18px;
        }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: white;
        }

        .empty-state h2 {
            font-size: 24px;
            margin-bottom: 10px;
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            overflow-y: auto;
            padding: 20px;
        }

        .modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background: rgba(44, 83, 100, 0.98);
            border-radius: 20px;
            padding: 40px;
            max-width: 1000px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }

        .modal-header h2 {
            color: white;
            font-size: 2em;
        }

        .close-modal {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            font-size: 28px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s;
        }

        .close-modal:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }

        .form-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        .form-group label {
            color: white;
            font-size: 14px;
            margin-bottom: 8px;
            font-weight: 500;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            padding: 12px 15px;
            border: none;
            border-radius: 25px;
            background: rgba(255, 255, 255, 0.9);
            font-size: 14px;
            outline: none;
            font-family: inherit;
        }

        .form-group textarea {
            resize: vertical;
            min-height: 80px;
            border-radius: 15px;
        }

        .form-group select {
            cursor: pointer;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 15px center;
            padding-right: 40px;
        }

        .form-group.span-3 {
            grid-column: 1 / -1;
        }

        .modal-buttons {
            display: flex;
            gap: 15px;
            justify-content: flex-end;
        }

        .btn-cancelar-modal {
            background: linear-gradient(135deg, #95a5a6, #7f8c8d);
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }

        .btn-salvar-modal {
            background: linear-gradient(135deg, #27ae60, #229954);
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }

        .btn-cancelar-modal:hover,
        .btn-salvar-modal:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .message {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 20px 30px;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            animation: slideIn 0.5s;
            z-index: 2000;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .message.success {
            background: linear-gradient(135deg, #27ae60, #229954);
        }

        .message.error {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
        }

        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @media (max-width: 768px) {
            h1 {
                font-size: 1.8em;
            }

            .header {
                flex-wrap: wrap;
            }

            .header-left {
                width: 100%;
                justify-content: center;
            }

            .header-actions {
                width: 100%;
                justify-content: center;
            }

            .controls {
                flex-direction: column;
            }

            .btn {
                width: 100%;
            }

            .form-grid {
                grid-template-columns: 1fr;
            }

            .modal-content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-left">
                <a href="http://localhost/dashboard/SkyMilles/adm.jsp"><img class="logo-img"
                src="https://i.postimg.cc/nLnYq7Fp/logo-Sky-Milles.png" alt="Logo SkyMilles"></a>
                <h1>Pacotes Cadastrados</h1>
            </div>
            <div class="header-actions">
                <button class="back-btn" onclick="window.location.href='./cadPacote.jsp'">← Voltar</button>
            </div>
        </div>

        <div class="controls">
            <button class="btn btn-refresh" onclick="carregarPacotes()">🔄 Atualizar</button>
            <button class="btn btn-export" onclick="exportarPacotes()">📥 Exportar JSON</button>
            <button class="btn btn-novo" onclick="window.location.href='./cadPacote.jsp'">➕ Novo Pacote</button>
        </div>

        <div class="stats" id="stats">
            <div class="stat-card">
                <h3>Total de Pacotes</h3>
                <p id="totalPacotes">0</p>
            </div>
            <div class="stat-card">
                <h3>Ativos</h3>
                <p id="pacotesAtivos">0</p>
            </div>
            <div class="stat-card">
                <h3>Lotados</h3>
                <p id="pacotesLotados">0</p>
            </div>
            <div class="stat-card">
                <h3>Destinos</h3>
                <p id="totalDestinos">0</p>
            </div>
        </div>

        <div class="filters">
            <div class="filter-group">
                <label>Filtrar por Status</label>
                <select id="filtroStatus" onchange="filtrarPorStatus()">
                    <option value="">Todos</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Lotado">Lotado</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Filtrar por Destino</label>
                <select id="filtroDestino" onchange="filtrarPorDestino()">
                    <option value="">Todos</option>
                </select>
            </div>
            <div class="filter-group">
                <label>Buscar por Nome</label>
                <input type="text" id="buscarNome" placeholder="Ex: Semana em Paris" onkeyup="buscarPorNome()">
            </div>
        </div>

        <div class="table-container">
            <div id="loading" class="loading">Carregando pacotes...</div>
            <table id="pacotesTable" style="display: none;">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Destino</th>
                        <th>Duração</th>
                        <th>Período</th>
                        <th>Valor Base</th>
                        <th>Tipo</th>
                        <th>Vagas</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="pacotesBody">
                </tbody>
            </table>
            <div id="emptyState" class="empty-state" style="display: none;">
                <h2>Nenhum pacote cadastrado</h2>
                <p>Comece cadastrando seu primeiro pacote!</p>
            </div>
        </div>
    </div>

    <!-- Modal de Edição -->
    <div id="modalEdicao" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>✏️ Editar Pacote</h2>
                <button class="close-modal" onclick="fecharModal()">×</button>
            </div>

            <form id="formEdicao">
                <input type="hidden" id="edit_id">
                
                <div class="form-grid">
                    <div class="form-group span-3">
                        <label for="edit_nomePacote">Nome do Pacote</label>
                        <input type="text" id="edit_nomePacote" required>
                    </div>

                    <div class="form-group">
                        <label for="edit_destino">Destino</label>
                        <select id="edit_destino" required>
                            <option value="">Selecione...</option>
                            <option value="São Paulo/BR">São Paulo, Brasil</option>
                            <option value="Rio de Janeiro/BR">Rio de Janeiro, Brasil</option>
                            <option value="Brasília/BR">Brasília, Brasil</option>
                            <option value="Salvador/BR">Salvador, Brasil</option>
                            <option value="Belo Horizonte/BR">Belo Horizonte, Brasil</option>
                            <option value="Florianópolis/BR">Florianópolis, Brasil</option>
                            <option value="Porto Seguro/BR">Porto Seguro, Brasil</option>
                            <option value="Gramado/BR">Gramado, Brasil</option>
                            <option value="Nova York/EUA">Nova York, EUA</option>
                            <option value="Miami/EUA">Miami, EUA</option>
                            <option value="Orlando/EUA">Orlando, EUA</option>
                            <option value="Paris/FR">Paris, França</option>
                            <option value="Londres/UK">Londres, Reino Unido</option>
                            <option value="Dubai/UAE">Dubai, Emirados Árabes</option>
                            <option value="Tóquio/JP">Tóquio, Japão</option>
                            <option value="Barcelona/ES">Barcelona, Espanha</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="edit_duracao">Duração (Dias)</label>
                        <input type="number" id="edit_duracao" min="1" max="60" required>
                    </div>

                    <div class="form-group">
                        <label for="edit_dataInicio">Data de Início</label>
                        <input type="date" id="edit_dataInicio" required>
                    </div>

                    <div class="form-group">
                        <label for="edit_dataFim">Data de Término</label>
                        <input type="date" id="edit_dataFim" required>
                    </div>

                    <div class="form-group">
                        <label for="edit_tipo">Tipo de Pacote</label>
                        <select id="edit_tipo" required>
                            <option value="Romantic">💕 Lua de Mel</option>
                            <option value="Aventura">🏔️ Aventura</option>
                            <option value="Praias">🏖️ Praias</option>
                            <option value="Cultura">🏛️ Cultura</option>
                            <option value="Negocios">💼 Negócios</option>
                            <option value="Familia">👨‍👩‍👧‍👦 Família</option>
                            <option value="Luxo">👑 Luxo</option>
                            <option value="Economico">💰 Econômico</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="edit_categoriaHotel">Categoria Hotel</label>
                        <select id="edit_categoriaHotel" required>
                            <option value="5 Estrelas">⭐⭐⭐⭐⭐ 5 Estrelas</option>
                            <option value="4 Estrelas">⭐⭐⭐⭐ 4 Estrelas</option>
                            <option value="3 Estrelas">⭐⭐⭐ 3 Estrelas</option>
                            <option value="2 Estrelas">⭐⭐ 2 Estrelas</option>
                            <option value="Pousada">🏡 Pousada</option>
                            <option value="Resort">🏝️ Resort</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="edit_companhia">Companhia Aérea</label>
                        <select id="edit_companhia" required>
                            <option value="LATAM">LATAM Airlines</option>
                            <option value="GOL">GOL Linhas Aéreas</option>
                            <option value="Azul">Azul Linhas Aéreas</option>
                            <option value="American">American Airlines</option>
                            <option value="Delta">Delta Airlines</option>
                            <option value="United">United Airlines</option>
                            <option value="Emirates">Emirates</option>
                            <option value="Lufthansa">Lufthansa</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="edit_valorBase">Valor Base por Pessoa</label>
                        <input type="text" id="edit_valorBase" required>
                    </div>

                    <div class="form-group">
                        <label for="edit_desconto">Desconto (%)</label>
                        <input type="number" id="edit_desconto" min="0" max="100" step="0.01">
                    </div>

                    <div class="form-group">
                        <label for="edit_vagas">Número de Vagas</label>
                        <input type="number" id="edit_vagas" min="1" required>
                    </div>

                    <div class="form-group">
                        <label for="edit_vagasDisponivel">Vagas Disponíveis</label>
                        <input type="number" id="edit_vagasDisponivel" min="0" required>
                    </div>

                    <div class="form-group">
                        <label for="edit_status">Status</label>
                        <select id="edit_status" required>
                            <option value="Ativo">✅ Ativo</option>
                            <option value="Inativo">❌ Inativo</option>
                            <option value="Cancelado">🚫 Cancelado</option>
                            <option value="Lotado">📋 Lotado</option>
                        </select>
                    </div>

                    <div class="form-group span-3">
                        <label for="edit_descricao">Descrição do Pacote</label>
                        <textarea id="edit_descricao"></textarea>
                    </div>

                    <div class="form-group span-3">
                        <label for="edit_observacoes">Observações Adicionais</label>
                        <textarea id="edit_observacoes"></textarea>
                    </div>
                </div>

                <div class="modal-buttons">
                    <button type="button" class="btn-cancelar-modal" onclick="fecharModal()">Cancelar</button>
                    <button type="submit" class="btn-salvar-modal">💾 Salvar Alterações</button>
                </div>
            </form>
        </div>
    </div>

    <script>
        const API_URL = 'http://localhost/dashboard/SkyMilles/api.php';
        let todosPacotes = [];

        document.addEventListener('DOMContentLoaded', function() {
            console.log('%c📦 Carregando Sistema de Pacotes...', 'background: #2c5364; color: white; font-size: 16px; padding: 10px;');
            carregarPacotes();
        });

        async function carregarPacotes() {
            document.getElementById('loading').style.display = 'block';
            document.getElementById('pacotesTable').style.display = 'none';
            document.getElementById('emptyState').style.display = 'none';

            try {
                console.log('🔄 Conectando à API em:', API_URL);
                const response = await fetch(`${API_URL}?action=listar&resource=pacotes`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                console.log('📊 Resposta HTTP:', response.status);
                const result = await response.json();
                console.log('✅ Resposta JSON:', result);

                if (result.success && result.data && result.data.length > 0) {
                    todosPacotes = result.data;
                    console.log('📦 Pacotes carregados:', todosPacotes.length);
                    exibirPacotes(todosPacotes);
                    atualizarEstatisticas(todosPacotes);
                    preencherFiltros(todosPacotes);
                    document.getElementById('pacotesTable').style.display = 'table';
                    document.getElementById('emptyState').style.display = 'none';
                } else {
                    console.warn('⚠️ Sem dados:', result.message);
                    document.getElementById('emptyState').style.display = 'block';
                    showMessage('⚠️ Nenhum pacote encontrado', 'error');
                }
            } catch (error) {
                console.error('❌ Erro ao carregar:', error);
                showMessage('Erro ao carregar pacotes: ' + error.message, 'error');
                document.getElementById('emptyState').style.display = 'block';
            }

            document.getElementById('loading').style.display = 'none';
        }

        function exibirPacotes(pacotes) {
            const tbody = document.getElementById('pacotesBody');
            tbody.innerHTML = '';

            pacotes.forEach(pacote => {
                const tr = document.createElement('tr');
                const statusClass = `status-${pacote.status.toLowerCase().replace(' ', '-')}`;
                const dataInicio = new Date(pacote.data_inicio);
                const dataFim = new Date(pacote.data_fim);
                const periodoFormatado = `${dataInicio.toLocaleDateString('pt-BR')} a ${dataFim.toLocaleDateString('pt-BR')}`;
                
                tr.innerHTML = `
                    <td><strong>${pacote.nome_pacote}</strong></td>
                    <td>${pacote.destino}</td>
                    <td>${pacote.duracao} dias</td>
                    <td>${periodoFormatado}</td>
                    <td>R$ ${parseFloat(pacote.valor_base).toFixed(2)}</td>
                    <td>${pacote.tipo_pacote || '-'}</td>
                    <td>${pacote.vagas_disponiveis}/${pacote.vagas_totais}</td>
                    <td><span class="status-badge ${statusClass}">${pacote.status}</span></td>
                    <td class="actions">
                        <button class="action-btn btn-edit" onclick='editarPacote(${JSON.stringify(pacote).replace(/'/g, "&apos;")})'>✏️ Editar</button>
                        <button class="action-btn btn-delete" onclick="deletarPacote(${pacote.id})">🗑️ Deletar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        function atualizarEstatisticas(pacotes) {
            document.getElementById('totalPacotes').textContent = pacotes.length;
            document.getElementById('pacotesAtivos').textContent = pacotes.filter(p => p.status === 'Ativo').length;
            document.getElementById('pacotesLotados').textContent = pacotes.filter(p => p.status === 'Lotado').length;
            
            const destinos = [...new Set(pacotes.map(p => p.destino))];
            document.getElementById('totalDestinos').textContent = destinos.length;
        }

        function preencherFiltros(pacotes) {
            const destinos = [...new Set(pacotes.map(p => p.destino))];
            const selectDestino = document.getElementById('filtroDestino');
            selectDestino.innerHTML = '<option value="">Todos</option>';
            
            destinos.forEach(dest => {
                const option = document.createElement('option');
                option.value = dest;
                option.textContent = dest;
                selectDestino.appendChild(option);
            });
        }

        function filtrarPorStatus() {
            const status = document.getElementById('filtroStatus').value;
            if (status === '') {
                exibirPacotes(todosPacotes);
            } else {
                const filtrados = todosPacotes.filter(p => p.status === status);
                exibirPacotes(filtrados);
            }
        }

        function filtrarPorDestino() {
            const destino = document.getElementById('filtroDestino').value;
            if (destino === '') {
                exibirPacotes(todosPacotes);
            } else {
                const filtrados = todosPacotes.filter(p => p.destino === destino);
                exibirPacotes(filtrados);
            }
        }

        function buscarPorNome() {
            const nome = document.getElementById('buscarNome').value.toLowerCase();
            if (nome === '') {
                exibirPacotes(todosPacotes);
            } else {
                const filtrados = todosPacotes.filter(p => 
                    p.nome_pacote.toLowerCase().includes(nome)
                );
                exibirPacotes(filtrados);
            }
        }

        function editarPacote(pacote) {
            console.log('📝 Editando pacote:', pacote);
            document.getElementById('edit_id').value = pacote.id;
            document.getElementById('edit_nomePacote').value = pacote.nome_pacote;
            document.getElementById('edit_destino').value = pacote.destino;
            document.getElementById('edit_duracao').value = pacote.duracao;
            document.getElementById('edit_dataInicio').value = pacote.data_inicio;
            document.getElementById('edit_dataFim').value = pacote.data_fim;
            document.getElementById('edit_tipo').value = pacote.tipo_pacote || '';
            document.getElementById('edit_categoriaHotel').value = pacote.categoria_hotel || '';
            document.getElementById('edit_companhia').value = pacote.companhia_aerea || '';
            document.getElementById('edit_valorBase').value = 'R$ ' + parseFloat(pacote.valor_base).toFixed(2);
            document.getElementById('edit_desconto').value = pacote.desconto || 0;
            document.getElementById('edit_vagas').value = pacote.vagas_totais;
            document.getElementById('edit_vagasDisponivel').value = pacote.vagas_disponiveis;
            document.getElementById('edit_status').value = pacote.status;
            document.getElementById('edit_descricao').value = pacote.descricao || '';
            document.getElementById('edit_observacoes').value = pacote.observacoes || '';
            
            document.getElementById('modalEdicao').classList.add('active');
        }

        function fecharModal() {
            document.getElementById('modalEdicao').classList.remove('active');
            document.getElementById('formEdicao').reset();
        }

        document.getElementById('formEdicao').addEventListener('submit', async function(e) {
            e.preventDefault();

            const valorBase = document.getElementById('edit_valorBase').value.replace(/\D/g, '');
            const valorNumerico = (parseInt(valorBase) / 100).toFixed(2);

            const pacoteAtualizado = {
                id: document.getElementById('edit_id').value,
                nome_pacote: document.getElementById('edit_nomePacote').value,
                destino: document.getElementById('edit_destino').value,
                duracao: document.getElementById('edit_duracao').value,
                data_inicio: document.getElementById('edit_dataInicio').value,
                data_fim: document.getElementById('edit_dataFim').value,
                tipo_pacote: document.getElementById('edit_tipo').value,
                categoria_hotel: document.getElementById('edit_categoriaHotel').value,
                companhia_aerea: document.getElementById('edit_companhia').value,
                valor_base: valorNumerico,
                desconto: document.getElementById('edit_desconto').value || 0,
                vagas_totais: document.getElementById('edit_vagas').value,
                vagas_disponiveis: document.getElementById('edit_vagasDisponivel').value,
                status: document.getElementById('edit_status').value,
                descricao: document.getElementById('edit_descricao').value,
                observacoes: document.getElementById('edit_observacoes').value
            };

            try {
                const response = await fetch(`${API_URL}?action=atualizar&resource=pacotes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pacoteAtualizado)
                });

                const result = await response.json();

                if (result.success) {
                    showMessage('✅ Pacote atualizado com sucesso!', 'success');
                    fecharModal();
                    carregarPacotes();
                } else {
                    showMessage('❌ ' + (result.message || 'Erro ao atualizar'), 'error');
                }
            } catch (error) {
                console.error('❌ Erro:', error);
                showMessage('Erro ao atualizar pacote!', 'error');
            }
        });

        async function deletarPacote(id) {
            if (!confirm('⚠️ Deseja realmente deletar este pacote?')) return;

            try {
                const response = await fetch(`${API_URL}?action=deletar&id=${id}&resource=pacotes`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();

                if (result.success) {
                    showMessage('✅ Pacote deletado com sucesso!', 'success');
                    carregarPacotes();
                } else {
                    showMessage('❌ ' + result.message, 'error');
                }
            } catch (error) {
                console.error('❌ Erro:', error);
                showMessage('Erro ao deletar pacote!', 'error');
            }
        }

        async function exportarPacotes() {
            if (todosPacotes.length === 0) {
                showMessage('Nenhum pacote para exportar!', 'error');
                return;
            }

            const dataStr = JSON.stringify(todosPacotes, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `pacotes_${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            showMessage('✅ Pacotes exportados com sucesso!', 'success');
        }

        function showMessage(text, type) {
            const existing = document.querySelector('.message');
            if (existing) existing.remove();

            const message = document.createElement('div');
            message.className = `message ${type}`;
            message.textContent = text;
            document.body.appendChild(message);

            setTimeout(() => message.remove(), 3000);
        }

        // Fechar modal ao clicar fora
        document.getElementById('modalEdicao').addEventListener('click', function(e) {
            if (e.target === this) {
                fecharModal();
            }
        });

        // Fechar modal com tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                fecharModal();
            }
        });

        // Logs iniciais
        console.log('%c========================================', 'color: #3498db;');
        console.log('%c📦 SISTEMA DE VISUALIZAÇÃO DE PACOTES', 'color: #3498db; font-size: 14px; font-weight: bold;');
        console.log('%c========================================', 'color: #3498db;');
        console.log('API URL:', API_URL);
        console.log('%c========================================', 'color: #3498db;');
    </script>
</body>
</html>