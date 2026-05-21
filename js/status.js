const API_URL = 'http://localhost/dashboard/SkyMilles/api.php';
let todosVoos = [];
let vooSelecionado = null;

// Carregar voos ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    carregarVoos();
});

// Carregar voos da API
async function carregarVoos() {
    const loading = document.getElementById('loading');
    const emptyState = document.getElementById('emptyState');
    const flightsList = document.getElementById('flightsList');

    loading.style.display = 'block';
    emptyState.style.display = 'none';
    flightsList.style.display = 'none';

    try {
        console.log('Carregando voos de:', `${API_URL}?action=listar&resource=voos`);
        
        const response = await fetch(`${API_URL}?action=listar&resource=voos`);
        const result = await response.json();

        console.log('Resposta da API:', result);

        if (result.success && result.data && result.data.length > 0) {
            todosVoos = result.data;
            console.log('Voos carregados:', todosVoos);
            exibirVoos(todosVoos);
            preencherFiltros(todosVoos);
            atualizarEstatisticas(todosVoos);
            flightsList.style.display = 'grid';
        } else {
            console.log('Nenhum voo encontrado');
            todosVoos = [];
            emptyState.style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao carregar voos:', error);
        emptyState.style.display = 'block';
    } finally {
        loading.style.display = 'none';
    }
}

// Exibir voos na lista
function exibirVoos(voos) {
    const flightsList = document.getElementById('flightsList');
    flightsList.innerHTML = '';

    if (voos.length === 0) {
        document.getElementById('emptyState').style.display = 'block';
        flightsList.style.display = 'none';
        return;
    }

    document.getElementById('emptyState').style.display = 'none';
    flightsList.style.display = 'grid';

    voos.forEach(voo => {
        const flightCard = createFlightCard(voo);
        flightsList.appendChild(flightCard);
    });
}

// Criar card de voo
function createFlightCard(voo) {
    const card = document.createElement('div');
    const statusClass = `status-${voo.status.toLowerCase().replace(' ', '-')}`;
    card.className = `flight-card ${statusClass}`;

    const dataPartida = new Date(voo.saida);
    const dataChegada = new Date(voo.chegada);

    card.innerHTML = `
        <div class="flight-header">
            <span class="flight-code">${voo.codigo}</span>
            <span class="status-badge ${statusClass}">${voo.status}</span>
        </div>

        <div class="flight-route">
            <span class="route-location">${extrairCidade(voo.origem)}</span>
            <span class="route-arrow">→</span>
            <span class="route-location">${extrairCidade(voo.destino)}</span>
        </div>

        <div class="flight-times">
            <div class="time-info">
                <div class="time-label">Partida</div>
                <div class="time-value">${formatarHora(dataPartida)}</div>
            </div>
            <div class="time-info">
                <div class="time-label">Chegada</div>
                <div class="time-value">${formatarHora(dataChegada)}</div>
            </div>
        </div>

        <div class="flight-details">
            <div class="detail-item">
                <div class="detail-label">Companhia</div>
                <div class="detail-value">${voo.companhia}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Assentos</div>
                <div class="detail-value">${voo.assentos}</div>
            </div>
        </div>

        <div class="price-highlight">
            <div class="price-label">A partir de</div>
            <div class="price-value">R$ ${formatarPreco(voo.valor)}</div>
        </div>

        <button class="btn-view-details" onclick="verDetalhes(${voo.id})">
            Ver Detalhes Completos
        </button>
    `;

    return card;
}

// Extrair cidade do formato "Cidade/Estado (COD)"
function extrairCidade(local) {
    if (local.includes('(')) {
        return local.split('(')[0].trim();
    }
    return local;
}

// Formatar hora
function formatarHora(data) {
    return data.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

// Formatar data completa
function formatarDataCompleta(data) {
    return data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Formatar preço
function formatarPreco(valor) {
    return parseFloat(valor).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Calcular duração do voo
function calcularDuracao(saida, chegada) {
    const diff = (chegada - saida) / 1000 / 60;
    const horas = Math.floor(diff / 60);
    const minutos = Math.floor(diff % 60);
    return `${horas}h ${minutos}m`;
}

// Atualizar estatísticas
function atualizarEstatisticas(voos) {
    document.getElementById('totalVoos').textContent = voos.length;
    
    const companhias = [...new Set(voos.map(v => v.companhia))];
    document.getElementById('totalCompanhias').textContent = companhias.length;
    
    const menorPreco = Math.min(...voos.map(v => parseFloat(v.valor)));
    document.getElementById('menorPreco').textContent = `R$ ${formatarPreco(menorPreco)}`;
    
    const rotas = [...new Set(voos.map(v => `${v.origem}-${v.destino}`))];
    document.getElementById('totalRotas').textContent = rotas.length;
}

// Preencher filtros
function preencherFiltros(voos) {
    const companhias = [...new Set(voos.map(v => v.companhia))].sort();
    const selectCompanhia = document.getElementById('filtroCompanhia');
    selectCompanhia.innerHTML = '<option value="">Todas as Companhias</option>';
    
    companhias.forEach(comp => {
        const option = document.createElement('option');
        option.value = comp;
        option.textContent = comp;
        selectCompanhia.appendChild(option);
    });
}

// Buscar voo
function buscarVoo() {
    const termo = document.getElementById('buscarVoo').value.toLowerCase();
    aplicarFiltros(termo);
}

// Filtrar por status
function filtrarPorStatus() {
    const termo = document.getElementById('buscarVoo').value.toLowerCase();
    aplicarFiltros(termo);
}

// Filtrar por companhia
function filtrarPorCompanhia() {
    const termo = document.getElementById('buscarVoo').value.toLowerCase();
    aplicarFiltros(termo);
}

// Aplicar todos os filtros
function aplicarFiltros(termoBusca = '') {
    const status = document.getElementById('filtroStatus').value;
    const companhia = document.getElementById('filtroCompanhia').value;

    let filtrados = todosVoos.filter(voo => {
        const matchBusca = termoBusca === '' || 
            voo.codigo.toLowerCase().includes(termoBusca) ||
            voo.origem.toLowerCase().includes(termoBusca) ||
            voo.destino.toLowerCase().includes(termoBusca) ||
            voo.companhia.toLowerCase().includes(termoBusca);

        const matchStatus = status === '' || voo.status === status;
        const matchCompanhia = companhia === '' || voo.companhia === companhia;

        return matchBusca && matchStatus && matchCompanhia;
    });

    ordenarVoos(filtrados);
}

// Ordenar voos
function ordenarVoos(voos = null) {
    const ordenacao = document.getElementById('ordenacao').value;
    const voosParaOrdenar = voos || todosVoos;

    let ordenados = [...voosParaOrdenar];

    switch (ordenacao) {
        case 'saida':
            ordenados.sort((a, b) => new Date(a.saida) - new Date(b.saida));
            break;
        case 'valor-asc':
            ordenados.sort((a, b) => parseFloat(a.valor) - parseFloat(b.valor));
            break;
        case 'valor-desc':
            ordenados.sort((a, b) => parseFloat(b.valor) - parseFloat(a.valor));
            break;
        case 'companhia':
            ordenados.sort((a, b) => a.companhia.localeCompare(b.companhia));
            break;
    }

    exibirVoos(ordenados);
    atualizarEstatisticas(ordenados);
}

// Ver detalhes do voo
function verDetalhes(idVoo) {
    const voo = todosVoos.find(v => v.id === idVoo);
    if (!voo) return;

    vooSelecionado = voo;

    const dataPartida = new Date(voo.saida);
    const dataChegada = new Date(voo.chegada);
    const duracao = calcularDuracao(dataPartida, dataChegada);
    const statusClass = `status-${voo.status.toLowerCase().replace(' ', '-')}`;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="info-section">
            <h3>Informações do Voo</h3>
            <div class="info-grid">
                <div class="info-item">
                    <span class="label">Código do Voo:</span>
                    <span class="value">${voo.codigo}</span>
                </div>
                <div class="info-item">
                    <span class="label">Companhia:</span>
                    <span class="value">${voo.companhia}</span>
                </div>
                <div class="info-item">
                    <span class="label">Status:</span>
                    <span class="value"><span class="status-badge ${statusClass}">${voo.status}</span></span>
                </div>
                <div class="info-item">
                    <span class="label">Modelo:</span>
                    <span class="value">${voo.modelo || 'Não informado'}</span>
                </div>
            </div>
        </div>

        <div class="info-section">
            <h3>Rota</h3>
            <div class="info-grid">
                <div class="info-item">
                    <span class="label">Origem:</span>
                    <span class="value">${voo.origem}</span>
                </div>
                <div class="info-item">
                    <span class="label">Destino:</span>
                    <span class="value">${voo.destino}</span>
                </div>
            </div>
        </div>

        <div class="info-section">
            <h3>Horários</h3>
            <div class="info-grid">
                <div class="info-item">
                    <span class="label">Partida:</span>
                    <span class="value">${formatarDataCompleta(dataPartida)}</span>
                </div>
                <div class="info-item">
                    <span class="label">Chegada:</span>
                    <span class="value">${formatarDataCompleta(dataChegada)}</span>
                </div>
                <div class="info-item">
                    <span class="label">Duração:</span>
                    <span class="value">${duracao}</span>
                </div>
                <div class="info-item">
                    <span class="label">Frequência:</span>
                    <span class="value">${voo.frequencia}</span>
                </div>
            </div>
        </div>

        <div class="info-section">
            <h3>Capacidade e Preço</h3>
            <div class="info-grid">
                <div class="info-item">
                    <span class="label">Total de Assentos:</span>
                    <span class="value">${voo.assentos}</span>
                </div>
                <div class="info-item">
                    <span class="label">Valor:</span>
                    <span class="value" style="color: #10b981; font-size: 1.3em;">R$ ${formatarPreco(voo.valor)}</span>
                </div>
            </div>
        </div>
    `;

    document.getElementById('modalDetalhes').classList.add('active');
}

// Fechar modal
function fecharModal() {
    document.getElementById('modalDetalhes').classList.remove('active');
    vooSelecionado = null;
}

// Reservar voo
function reservarVoo() {
    if (!vooSelecionado) return;
    
    // Aqui você pode implementar a lógica de reserva
    // Por enquanto, vamos apenas redirecionar para uma página de reserva
    alert(`Redirecionando para reserva do voo ${vooSelecionado.codigo}...`);
    // window.location.href = `./reserva.html?voo=${vooSelecionado.id}`;
}

// Fechar modal ao clicar fora
document.getElementById('modalDetalhes').addEventListener('click', function(e) {
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