// ==================== SISTEMA DE PESQUISA GLOBAL ====================

class SearchSystem {
    constructor(config = {}) {
        this.searchInputSelector = config.searchInputSelector || '#searchInput';
        this.searchButtonSelector = config.searchButtonSelector || '#btnSearch';
        this.resultsContainerSelector = config.resultsContainerSelector || '#searchResults';
        this.apiUrl = config.apiUrl || 'http://localhost/dashboard/SkyMilles/api.php';
        this.resourceType = config.resourceType || 'voos'; // voos, hoteis, pacotes, clientes
        this.pageUrl = config.pageUrl || window.location.pathname.split('/').pop();
        
        this.init();
    }
    
    init() {
        const searchInput = document.querySelector(this.searchInputSelector);
        const searchButton = document.querySelector(this.searchButtonSelector);
        const container = document.getElementById('searchInputContainer');
        if (container && container.getAttribute('data-search-initialized') === 'true') return;
        if (searchInput && searchButton) {
            searchButton.addEventListener('click', () => this.performSearch());
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch();
                }
            });
        }
    }
    
    async performSearch() {
        const searchInput = document.querySelector(this.searchInputSelector);
        const query = searchInput ? searchInput.value.trim() : '';
        if (!query) {
            this.showMessage('Digite um termo para buscar!', 'warning');
            return;
        }
        const t = String(query).toLowerCase();
        const indexCards = document.querySelectorAll('.card-wrapper, .airline-card, .plano-card');
        const hotelCards = document.querySelectorAll('.hotel-card, .categoria-card, .diferencial-hotel-card');
        const passagensCards = document.querySelectorAll('.destino-card, .oferta-card');
        const pacoteCards = document.querySelectorAll('.pacote-card');
        let nodes = [];
        let fallback = [];
        if (indexCards.length) nodes = Array.from(indexCards);
        else if (hotelCards.length) nodes = Array.from(hotelCards);
        else if (passagensCards.length) nodes = Array.from(passagensCards);
        else if (pacoteCards.length) nodes = Array.from(pacoteCards);
        else fallback = Array.from(document.querySelectorAll('section, .section-title'));
        const toScan = nodes.length ? nodes : fallback;
        let count = 0;
        let closest = null;
        let closestDist = Infinity;
        const viewportTop = window.scrollY;
        const viewportCenter = viewportTop + window.innerHeight / 2;
        toScan.forEach(n => {
            const txt = n.textContent.toLowerCase();
            const match = txt.includes(t);
            if (match) {
                count++;
                const rect = n.getBoundingClientRect();
                const mid = rect.top + window.scrollY + rect.height / 2;
                const dist = Math.abs(mid - viewportCenter);
                if (dist < closestDist) {
                    closestDist = dist;
                    closest = n;
                }
                n.style.border = '3px solid #f8c537';
                n.style.boxShadow = '0 0 20px rgba(248, 197, 55, 0.6)';
            } else {
                n.style.border = 'none';
                n.style.boxShadow = 'none';
            }
        });
        if (closest) {
            closest.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            this.showMessage(`${count} resultado(s)`, 'success');
        } else {
            this.showMessage(`Nenhum resultado para "${query}"`, 'warning');
        }
    }
    
    filterResults(data, query) {
        const lowerQuery = query.toLowerCase();
        
        return data.filter(item => {
            // Buscar em todos os campos
            return Object.values(item).some(value => {
                if (value === null || value === undefined) return false;
                return String(value).toLowerCase().includes(lowerQuery);
            });
        });
    }
    
    displayResults(results, query) {
        return;
    }
    
    formatResultItem(item, index) {
        // Formatar item baseado no tipo de recurso
        switch (this.resourceType) {
            case 'voos':
                return this.formatVooItem(item, index);
            case 'hoteis':
                return this.formatHotelItem(item, index);
            case 'pacotes':
                return this.formatPacoteItem(item, index);
            case 'clientes':
                return this.formatClienteItem(item, index);
            default:
                return this.formatGenericItem(item, index);
        }
    }
    
    formatVooItem(item, index) {
        return `
            <div class="search-result-item" data-index="${index}">
                <div class="result-icon">✈️</div>
                <div class="result-content">
                    <h4>${item.codigo || 'VOO ' + (item.num_voo || item.id)}</h4>
                    <p><strong>Rota:</strong> ${item.origem || item.aeroporto_origem || 'N/A'} → ${item.destino || item.aeroporto_destino || 'N/A'}</p>
                    <p><strong>Data/Hora:</strong> ${item.saida || item.data_hora_partida || 'N/A'}</p>
                    <p><strong>Companhia:</strong> ${item.companhia || 'N/A'} | <strong>Aeronave:</strong> ${item.modelo || item.aviao || 'N/A'}</p>
                </div>
                <div class="result-actions">
                    <button class="btn-small" onclick="verDetalhesVoo(${item.id || item.cod_voo})">Ver Detalhes</button>
                </div>
            </div>
        `;
    }
    
    formatHotelItem(item, index) {
        return `
            <div class="search-result-item" data-index="${index}">
                <div class="result-icon">🏨</div>
                <div class="result-content">
                    <h4>${item.nomeHotel || 'Hotel sem nome'}</h4>
                    <p><strong>Categoria:</strong> ${item.categoria || 'N/A'}</p>
                    <p><strong>Localização:</strong> ${item.cidade || 'N/A'}, ${item.estado || 'N/A'}</p>
                    <p><strong>Tipo de Quarto:</strong> ${item.tipoQuarto || 'N/A'} | <strong>Capacidade:</strong> ${item.capacidade || 'N/A'} hóspedes</p>
                    <p><strong>Valor:</strong> R$ ${item.valorDiaria || '0,00'}/noite | <strong>Status:</strong> ${item.disponibilidade || 'N/A'}</p>
                </div>
                <div class="result-actions">
                    <button class="btn-small" onclick="verDetalhesHotel(${item.id})">Ver Detalhes</button>
                </div>
            </div>
        `;
    }
    
    formatPacoteItem(item, index) {
        return `
            <div class="search-result-item" data-index="${index}">
                <div class="result-icon">🎒</div>
                <div class="result-content">
                    <h4>${item.nome_pacote || 'Pacote sem nome'}</h4>
                    <p><strong>Código:</strong> ${item.codigo_pacote || 'N/A'}</p>
                    <p><strong>Destino:</strong> ${item.destino || 'N/A'} | <strong>Duração:</strong> ${item.duracao || 'N/A'} dias</p>
                    <p><strong>Período:</strong> ${item.data_inicio || 'N/A'} até ${item.data_fim || 'N/A'}</p>
                    <p><strong>Valor Base:</strong> R$ ${item.valor_base || '0,00'} | <strong>Vagas:</strong> ${item.vagas_disponiveis || '0'}/${item.vagas_totais || '0'}</p>
                </div>
                <div class="result-actions">
                    <button class="btn-small" onclick="verDetalhesPacote(${item.id})">Ver Detalhes</button>
                </div>
            </div>
        `;
    }
    
    formatClienteItem(item, index) {
        return `
            <div class="search-result-item" data-index="${index}">
                <div class="result-icon">👤</div>
                <div class="result-content">
                    <h4>${item.nome_cliente || 'Cliente sem nome'}</h4>
                    <p><strong>CPF:</strong> ${item.CPF || 'N/A'}</p>
                    <p><strong>Telefone:</strong> ${item.telefone || 'N/A'}</p>
                    <p><strong>Endereço:</strong> ${item.endereco || 'N/A'}</p>
                </div>
                <div class="result-actions">
                    <button class="btn-small" onclick="verDetalhesCliente(${item.cod_cliente})">Ver Detalhes</button>
                </div>
            </div>
        `;
    }
    
    formatGenericItem(item, index) {
        return `
            <div class="search-result-item" data-index="${index}">
                <div class="result-icon">📋</div>
                <div class="result-content">
                    <h4>${Object.values(item)[0] || 'Item ' + index}</h4>
                    <p>${JSON.stringify(item).substring(0, 100)}...</p>
                </div>
            </div>
        `;
    }
    
    showMessage(text, type) {
        const existing = document.querySelector('.search-message');
        if (existing) existing.remove();
        
        const message = document.createElement('div');
        message.className = `search-message ${type}`;
        message.textContent = text;
        document.body.appendChild(message);
        
        setTimeout(() => message.remove(), 4000);
    }
}

// ==================== INICIALIZAÇÃO AUTOMÁTICA ====================
document.addEventListener('DOMContentLoaded', function() {
    // Detectar página atual e inicializar sistema apropriado
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    console.log('Página atual detectada:', currentPage);
    
    // Verificar se os elementos de pesquisa existem
    const searchInput = document.querySelector('#searchInput') || document.querySelector('#search-input');
    const searchButton = document.querySelector('#btnSearch') || document.querySelector('#searchIcon');
    
    if (!searchInput || !searchButton) {
        console.warn('Elementos de pesquisa não encontrados na página:', currentPage);
        return;
    }
    
    if (currentPage.includes('visuVoo') || currentPage.includes('index') || currentPage.includes('destaques') || currentPage.includes('passagens') || currentPage.includes('status-voo')) {
        new SearchSystem({
            resourceType: 'voos',
            searchInputSelector: '#searchInput, #search-input',
            searchButtonSelector: '#btnSearch, #searchIcon',
            resultsContainerSelector: '#searchResults'
        });
    } else if (currentPage.includes('visuHotel') || currentPage.includes('hoteis')) {
        new SearchSystem({
            resourceType: 'hoteis',
            searchInputSelector: '#searchInput, #search-input',
            searchButtonSelector: '#btnSearch, #searchIcon',
            resultsContainerSelector: '#searchResults'
        });
    } else if (currentPage.includes('visuPacote') || currentPage.includes('pacotes')) {
        new SearchSystem({
            resourceType: 'pacotes',
            searchInputSelector: '#searchInput, #search-input',
            searchButtonSelector: '#btnSearch, #searchIcon',
            resultsContainerSelector: '#searchResults'
        });
    } else if (currentPage.includes('visuCliente')) {
        new SearchSystem({
            resourceType: 'clientes',
            searchInputSelector: '#searchInput, #search-input',
            searchButtonSelector: '#btnSearch, #searchIcon',
            resultsContainerSelector: '#searchResults'
        });
    } else if (currentPage.includes('conheca')) {
        new SearchSystem({
            resourceType: 'pacotes',
            searchInputSelector: '#searchInput, #search-input',
            searchButtonSelector: '#btnSearch, #searchIcon',
            resultsContainerSelector: '#searchResults'
        });
    }
});

// ==================== FUNÇÕES GLOBAIS DE NAVEGAÇÃO ====================
window.verDetalhesVoo = function(id) {
    console.log('Ver detalhes do voo:', id);
};

window.verDetalhesHotel = function(id) {
    console.log('Ver detalhes do hotel:', id);
};

window.verDetalhesPacote = function(id) {
    console.log('Ver detalhes do pacote:', id);
};

window.verDetalhesCliente = function(id) {
    console.log('Ver detalhes do cliente:', id);
};
