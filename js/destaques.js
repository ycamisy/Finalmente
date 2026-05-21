// ==================== CONFIGURAÇÃO DA API ====================
const API_URL = './api.php';

// ==================== FUNÇÕES DE API ====================
async function buscarVoosDoBanco() {
    try {
        const response = await fetch(`${API_URL}?resource=voos&action=listar`);
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Voos carregados do banco:', result.data.length);
            return result.data;
        } else {
            console.error('❌ Erro ao buscar voos:', result.message);
            return [];
        }
    } catch (error) {
        console.error('❌ Erro na requisição:', error);
        return [];
    }
}

// ==================== CALCULAR PREÇO BASEADO NA ROTA ====================
function calcularPrecoVoo(origem, destino) {
    // Tabela de preços baseada em distância/popularidade
    const precos = {
        // Internacionais
        'internacional_longo': 3500, // EUA, Europa, Ásia
        'internacional_medio': 2500, // América do Sul
        'internacional_curto': 1500, // Países vizinhos
        // Nacionais
        'nacional_longo': 800,
        'nacional_medio': 600,
        'nacional_curto': 400
    };
    
    const cidadesInternacionais = [
        'New York', 'Paris', 'Tokyo', 'London', 'Buenos Aires'
    ];
    
    const cidadesBrasileiras = [
        'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 'Belém'
    ];
    
    const origemInternacional = cidadesInternacionais.includes(origem);
    const destinoInternacional = cidadesInternacionais.includes(destino);
    
    // Determinar tipo de rota
    if (origemInternacional || destinoInternacional) {
        // Rota internacional
        if ((origem === 'Tokyo' || destino === 'Tokyo') || 
            (origem === 'New York' || destino === 'New York')) {
            return precos.internacional_longo;
        } else if (origem === 'Buenos Aires' || destino === 'Buenos Aires') {
            return precos.internacional_medio;
        } else {
            return precos.internacional_longo;
        }
    } else {
        // Rota nacional
        const distanciasLongas = [
            ['São Paulo', 'Belém'],
            ['Rio de Janeiro', 'Brasília'],
            ['Belo Horizonte', 'Belém']
        ];
        
        const ehLonga = distanciasLongas.some(([c1, c2]) => 
            (origem === c1 && destino === c2) || (origem === c2 && destino === c1)
        );
        
        return ehLonga ? precos.nacional_longo : precos.nacional_medio;
    }
}

// ==================== TRANSFORMAR VOOS DO BANCO ====================
function transformarVoosParaDestaque(voosBanco) {
    return voosBanco.map(voo => {
        // Extrair nome da cidade
        const origem = voo.origem || 'Origem';
        const destino = voo.destino || 'Destino';
        
        // Calcular preço baseado na rota
        const precoBase = calcularPrecoVoo(origem, destino);
        const variacao = Math.random() * 0.2 - 0.1; // ±10%
        const precoFinal = Math.round(precoBase * (1 + variacao));
        
        return {
            id: voo.id || voo.cod_voo,
            cod_voo: voo.cod_voo,
            num_voo: voo.num_voo,
            origem: origem,
            destino: destino,
            aeroporto_origem: voo.aeroporto_origem,
            aeroporto_destino: voo.aeroporto_destino,
            preco: formatarPreco(precoFinal),
            precoNumerico: precoFinal,
            data: formatarDataVoo(voo.data_hora_partida, voo.data_hora_chegada),
            companhia: voo.companhia || 'Companhia',
            vendas: calcularVendasAleatorias(),
            economia: calcularEconomia(precoFinal),
            imagem: obterImagemDestino(destino),
            codigo: voo.codigo || `VOO${voo.num_voo || voo.id}`,
            saida: voo.data_hora_partida,
            chegada: voo.data_hora_chegada,
            modelo: voo.modelo || voo.aviao || 'Aeronave',
            status: voo.status || 'Confirmado'
        };
    });
}

// ==================== FUNÇÕES AUXILIARES ====================
function formatarPreco(valor) {
    if (!valor) return 'R$ 0,00';
    
    // Se já está formatado, retornar
    if (typeof valor === 'string' && valor.includes('R$')) {
        return valor;
    }
    
    // Converter para número
    let numero = parseFloat(valor);
    if (isNaN(numero)) numero = 0;
    
    return `R$ ${numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatarDataVoo(saida, chegada) {
    try {
        // Tratar string de data do MySQL (formato: 'YYYY-MM-DD' ou '2025-12-21')
        let dataSaida, dataChegada;
        
        if (typeof saida === 'string') {
            // Remover qualquer hora se existir
            const dataParte = saida.split(' ')[0];
            dataSaida = new Date(dataParte + 'T00:00:00');
        } else {
            dataSaida = new Date(saida);
        }
        
        if (typeof chegada === 'string') {
            const dataParte = chegada.split(' ')[0];
            dataChegada = new Date(dataParte + 'T00:00:00');
        } else {
            dataChegada = new Date(chegada);
        }
        
        // Verificar validade
        if (isNaN(dataSaida.getTime())) {
            return 'Data a confirmar';
        }
        
        const dia = dataSaida.getDate();
        const mes = dataSaida.toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
        
        // Se não houver data de chegada válida, calcular retorno (7 dias)
        if (isNaN(dataChegada.getTime())) {
            dataChegada = new Date(dataSaida);
            dataChegada.setDate(dataChegada.getDate() + 7);
        }
        
        const diaRetorno = dataChegada.getDate();
        const mesRetorno = dataChegada.toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
        
        return `${dia} ${mes.charAt(0).toUpperCase() + mes.slice(1)} - ${diaRetorno} ${mesRetorno.charAt(0).toUpperCase() + mesRetorno.slice(1)}`;
    } catch (e) {
        console.error('Erro ao formatar data:', e);
        return 'Data a confirmar';
    }
}

function calcularVendasAleatorias() {
    return Math.floor(Math.random() * 100) + 50;
}

function calcularEconomia(preco) {
    // Descontos maiores para voos mais caros
    if (preco > 3000) return '30%';
    if (preco > 2000) return '25%';
    if (preco > 1000) return '20%';
    return '15%';
}

// ==================== MAPEAMENTO DE IMAGENS ====================
const imagensDestinos = {
    'New York': 'https://images.unsplash.com/photo-1468436139062-f07654d5bb6b?w=800&h=400&fit=crop',
    'Paris': 'https://images.unsplash.com/photo-1526129319026-5b5b44b79d4c?w=800&h=400&fit=crop',
    'Tokyo': 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800&h=400&fit=crop',
    'London': 'https://images.unsplash.com/photo-1473953397176-4be3f86af8ff?w=800&h=400&fit=crop',
    'Buenos Aires': 'https://images.unsplash.com/photo-1544989164-3368f945b3b1?w=800&h=400&fit=crop',
    'São Paulo': 'https://www.zapimoveis.com.br/blog/wp-content/uploads/2023/12/cidade-de-sao-paulo.jpg',
    'Rio de Janeiro': 'https://images.unsplash.com/photo-1526401485004-2ca8d6c16377?w=800&h=400&fit=crop',
    'Belo Horizonte': 'https://images.unsplash.com/photo-1601066527041-624164cfeb8e?w=800&h=400&fit=crop',
    'Brasília': 'https://images.unsplash.com/photo-1605390322819-9a65704fbf81?w=800&h=400&fit=crop',
    'Belém': 'https://images.unsplash.com/photo-1621894848956-4e37cbf8c87f?w=800&h=400&fit=crop',

    'Nova York': 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=400&fit=crop',
    'Tóquio': 'https://images.unsplash.com/photo-1505066701515-6483b0c0a164?w=800&h=400&fit=crop',
    'Londres': 'https://images.unsplash.com/photo-1512718882467-75a9621c8f42?w=800&h=400&fit=crop',

    'Salvador': 'https://images.unsplash.com/photo-1600375673828-789a98b86b66?w=800&h=400&fit=crop',
    'Fortaleza': 'https://images.unsplash.com/photo-1619546952812-280db9ba4b6d?w=800&h=400&fit=crop',
    'Recife': 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&h=400&fit=crop',
    'Maceió': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',

    'Miami': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=400&fit=crop',
    'Los Angeles': 'https://images.unsplash.com/photo-1541478791383-5f7bbb1c8e1d?w=800&h=400&fit=crop',
    'Orlando': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=400&fit=crop',
    'Madrid': 'https://images.unsplash.com/photo-1560976819-78b6f7a3a350?w=800&h=400&fit=crop',
    'Roma': 'https://images.unsplash.com/photo-1526481280690-906abd947c37?w=800&h=400&fit=crop',
    'Lisboa': 'https://images.unsplash.com/photo-1467269204584-1e3b7c2bfb58?w=800&h=400&fit=crop',
    'Cancún': 'https://images.unsplash.com/photo-1493558103817-58b2924f7544?w=800&h=400&fit=crop',
    'Santiago': 'https://images.unsplash.com/photo-1590608897129-79da98d34bf5?w=800&h=400&fit=crop',

    'default': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=400&fit=crop'
};

function obterImagemDestino(destino) {
    if (!destino) return imagensDestinos['default'];
    
    const destinoNormalizado = destino.trim();
    
    // Buscar exato
    if (imagensDestinos[destinoNormalizado]) {
        return imagensDestinos[destinoNormalizado];
    }
    
    // Buscar case insensitive
    const destinoLower = destinoNormalizado.toLowerCase();
    for (const [key, value] of Object.entries(imagensDestinos)) {
        if (key.toLowerCase() === destinoLower) {
            return value;
        }
    }
    
    return imagensDestinos['default'];
}

// ==================== DADOS DOS PACOTES (MANTIDO ESTÁTICO) ====================
const pacotes = [
    {
        id: 1,
        destino: 'Maldivas',
        duracao: '7 dias / 6 noites',
        preco: 'R$ 8.999',
        inclui: 'Voo + Hotel 5★ + Café da manhã',
        imagem: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=300&fit=crop',
        vendas: 89,
        avaliacao: 4.9
    },
    {
        id: 2,
        destino: 'Dubai',
        duracao: '5 dias / 4 noites',
        preco: 'R$ 6.499',
        inclui: 'Voo + Hotel 4★ + City Tour',
        imagem: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=300&fit=crop',
        vendas: 76,
        avaliacao: 4.8
    },
    {
        id: 3,
        destino: 'Fernando de Noronha',
        duracao: '4 dias / 3 noites',
        preco: 'R$ 4.299',
        inclui: 'Voo + Pousada + Mergulho',
        imagem: 'https://images.unsplash.com/photo-1581791534314-e3f26d2c74b4?w=800&h=300&fit=crop',
        vendas: 94,
        avaliacao: 4.9
    },
    {
        id: 4,
        destino: 'Buenos Aires',
        duracao: '6 dias / 5 noites',
        preco: 'R$ 3.799',
        inclui: 'Voo + Hotel 4★ + Passeios',
        imagem: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=800&h=300&fit=crop',
        vendas: 67,
        avaliacao: 4.7
    },
    {
        id: 5,
        destino: 'Cancún',
        duracao: '7 dias / 6 noites',
        preco: 'R$ 5.999',
        inclui: 'Voo + Resort All Inclusive',
        imagem: 'https://images.unsplash.com/photo-1493558103817-58b2924f7544?w=800&h=300&fit=crop',
        vendas: 112,
        avaliacao: 4.8
    },
    {
        id: 6,
        destino: 'Gramado',
        duracao: '4 dias / 3 noites',
        preco: 'R$ 2.499',
        inclui: 'Voo + Hotel 4★ + Café da manhã',
        imagem: 'https://images.unsplash.com/photo-1542601906990-d44d2d0b1b06?w=800&h=300&fit=crop',
        vendas: 130,
        avaliacao: 4.7
    },
    {
        id: 7,
        destino: 'Orlando',
        duracao: '6 dias / 5 noites',
        preco: 'R$ 7.299',
        inclui: 'Voo + Hotel 4★ + Ingressos',
        imagem: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=300&fit=crop',
        vendas: 98,
        avaliacao: 4.8
    },
    {
        id: 8,
        destino: 'Lisboa',
        duracao: '5 dias / 4 noites',
        preco: 'R$ 5.199',
        inclui: 'Voo + Hotel 4★ + City Tour',
        imagem: 'https://images.unsplash.com/photo-1467269204584-1e3b7c2bfb58?w=800&h=300&fit=crop',
        vendas: 85,
        avaliacao: 4.7
    },
    {
        id: 9,
        destino: 'Paris',
        duracao: '5 dias / 4 noites',
        preco: 'R$ 6.899',
        inclui: 'Voo + Hotel 4★ + Passeios',
        imagem: 'https://images.unsplash.com/photo-1526129319026-5b5b44b79d4c?w=800&h=300&fit=crop',
        vendas: 120,
        avaliacao: 4.9
    },
    {
        id: 10,
        destino: 'Roma',
        duracao: '5 dias / 4 noites',
        preco: 'R$ 6.299',
        inclui: 'Voo + Hotel 4★ + City Tour',
        imagem: 'https://images.unsplash.com/photo-1526481280690-906abd947c37?w=800&h=300&fit=crop',
        vendas: 92,
        avaliacao: 4.8
    },
    {
        id: 11,
        destino: 'Maceió',
        duracao: '4 dias / 3 noites',
        preco: 'R$ 2.899',
        inclui: 'Voo + Hotel + Café da manhã',
        imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=300&fit=crop',
        vendas: 140,
        avaliacao: 4.7
    },
    {
        id: 12,
        destino: 'Santiago',
        duracao: '5 dias / 4 noites',
        preco: 'R$ 4.799',
        inclui: 'Voo + Hotel + Passeios',
        imagem: 'https://images.unsplash.com/photo-1590608897129-79da98d34bf5?w=800&h=300&fit=crop',
        vendas: 75,
        avaliacao: 4.6
    }
];

// ==================== FUNÇÕES DE RENDERIZAÇÃO ====================
function renderVoos(voos) {
    const container = document.getElementById('voos-content');
    
    if (!voos || voos.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <p style="font-size: 1.2rem; color: #64748b;">
                    Nenhum voo disponível no momento.<br>
                    <small>Cadastre voos na tabela Voo do banco de dados.</small>
                </p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = voos.map(voo => `
        <div class="card" onclick="reservarVoo(${voo.id})">
            <div class="card-image">
                <img src="${voo.imagem}" alt="${voo.destino}" onerror="this.src='${imagensDestinos.default}'">
                <div class="badge">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                        <polyline points="16 7 22 7 22 13"/>
                    </svg>
                    <span>${voo.vendas} vendas</span>
                </div>
                <div class="discount-badge">-${voo.economia}</div>
            </div>
            <div class="card-content">
                <div class="flight-route">
                    <div class="location">
                        <p class="location-label">Origem</p>
                        <p class="location-name">${voo.origem}</p>
                    </div>
                    <svg class="plane-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
                    </svg>
                    <div class="location right">
                        <p class="location-label">Destino</p>
                        <p class="location-name">${voo.destino}</p>
                    </div>
                </div>
                <div class="card-details">
                    <div class="detail-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        ${voo.data}
                    </div>
                    <div>• ${voo.companhia}</div>
                </div>
                <div class="card-footer">
                    <div class="price-section">
                        <p>A partir de</p>
                        <div class="price">${voo.preco}</div>
                    </div>
                    <button class="btn-reserve">Reservar</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderPacotes() {
    const container = document.getElementById('pacotes-content');
    container.innerHTML = pacotes.map(pacote => `
        <div class="card" onclick="verPacote(${pacote.id})">
            <div class="card-image">
                <img src="${pacote.imagem}" alt="${pacote.destino}">
                <div class="rating-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span>${pacote.avaliacao}</span>
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${pacote.destino}</h3>
                <div class="card-details">
                    <div class="detail-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        ${pacote.duracao}
                    </div>
                </div>
                <div class="purchases-info">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                        <polyline points="16 7 22 7 22 13"/>
                    </svg>
                    <span>${pacote.vendas} pessoas compraram</span>
                </div>
                <p class="card-description">${pacote.inclui}</p>
                <div class="card-footer">
                    <div class="price-section">
                        <p>Pacote completo</p>
                        <div class="price">${pacote.preco}</div>
                    </div>
                    <button class="btn-reserve">Ver Pacote</button>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== CONTROLE DE ABAS ====================
function showTab(tab) {
    const voosContent = document.getElementById('voos-content');
    const pacotesContent = document.getElementById('pacotes-content');
    const tabVoos = document.getElementById('tab-voos');
    const tabPacotes = document.getElementById('tab-pacotes');

    if (tab === 'voos') {
        voosContent.classList.remove('hidden');
        pacotesContent.classList.add('hidden');
        tabVoos.classList.add('active');
        tabPacotes.classList.remove('active');
    } else {
        voosContent.classList.add('hidden');
        pacotesContent.classList.remove('hidden');
        tabVoos.classList.remove('active');
        tabPacotes.classList.add('active');
    }
}

// ==================== MODAL DE RESERVA ====================
let voos = [];
let reservaAtual = null;

function reservarVoo(id) {
    const voo = voos.find(v => v.id === id);
    if (voo) {
        abrirModal('voo', voo);
    }
}

function verPacote(id) {
    const pacote = pacotes.find(p => p.id === id);
    if (pacote) {
        abrirModal('pacote', pacote);
    }
}

function abrirModal(tipo, item) {
    reservaAtual = { tipo, item };
    const modal = document.getElementById('reservaModal');
    const summary = document.getElementById('bookingSummary');

    if (tipo === 'voo') {
        summary.innerHTML = `
            <h4>✈️ Detalhes do Voo</h4>
            <p><strong>Origem:</strong> <span>${item.origem} (${item.aeroporto_origem})</span></p>
            <p><strong>Destino:</strong> <span>${item.destino} (${item.aeroporto_destino})</span></p>
            <p><strong>Data:</strong> <span>${item.data}</span></p>
            <p><strong>Companhia:</strong> <span>${item.companhia}</span></p>
            <p><strong>Código do Voo:</strong> <span>${item.codigo}</span></p>
            <p><strong>Modelo:</strong> <span>${item.modelo}</span></p>
            <p style="border-top: 2px dashed #cbd5e1; margin-top: 1rem; padding-top: 1rem;">
                <strong>Valor Total:</strong> 
                <span style="color: #2685A8; font-size: 1.5rem; font-weight: bold;">${item.preco}</span>
            </p>
        `;
    } else {
        summary.innerHTML = `
            <h4>🏖️ Detalhes do Pacote</h4>
            <p><strong>Destino:</strong> <span>${item.destino}</span></p>
            <p><strong>Duração:</strong> <span>${item.duracao}</span></p>
            <p><strong>Inclui:</strong> <span>${item.inclui}</span></p>
            <p><strong>Avaliação:</strong> <span>${item.avaliacao} ⭐</span></p>
            <p style="border-top: 2px dashed #cbd5e1; margin-top: 1rem; padding-top: 1rem;">
                <strong>Valor Total:</strong> 
                <span style="color: #2685A8; font-size: 1.5rem; font-weight: bold;">${item.preco}</span>
            </p>
        `;
    }

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    const modal = document.getElementById('reservaModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    document.getElementById('reservaForm').reset();
    document.getElementById('successMessage').classList.remove('show');
}

window.onclick = function(event) {
    const modal = document.getElementById('reservaModal');
    if (event.target == modal) {
        fecharModal();
    }
}

// ==================== ENVIO DE RESERVA ====================
async function enviarReserva(event) {
    event.preventDefault();

    const btnSubmit = document.getElementById('btnSubmit');
    const btnText = btnSubmit.textContent;
    btnSubmit.textContent = 'Processando...';
    btnSubmit.disabled = true;

    const formData = new FormData(event.target);

    // Adicionar dados da reserva
    formData.append('tipo', reservaAtual.tipo);
    formData.append('item_id', reservaAtual.item.id);

    if (reservaAtual.tipo === 'voo') {
        formData.append('origem', reservaAtual.item.origem);
        formData.append('destino', reservaAtual.item.destino);
        formData.append('data', reservaAtual.item.data);
        formData.append('companhia', reservaAtual.item.companhia);
    } else {
        formData.append('destino', reservaAtual.item.destino);
        formData.append('duracao', reservaAtual.item.duracao);
    }

    formData.append('preco', reservaAtual.item.preco);

    try {
        const response = await fetch('./reservas.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            document.getElementById('successMessage').classList.add('show');
            document.getElementById('reservaForm').reset();
            document.querySelector('.modal-body').scrollTop = 0;

            setTimeout(() => {
                fecharModal();
            }, 3000);
        } else {
            alert('Erro ao processar reserva: ' + result.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao processar reserva. Por favor, tente novamente.');
    } finally {
        btnSubmit.textContent = btnText;
        btnSubmit.disabled = false;
    }
}

// ==================== INICIALIZAÇÃO ====================
async function inicializarPagina() {
    console.log('🚀 Iniciando SkyMilles Destaques...');
    console.log('📡 Buscando voos do banco de dados (tabelas: Voo, Aeroporto, Cidade)');
    
    try {
        const voosBanco = await buscarVoosDoBanco();
        
        if (voosBanco && voosBanco.length > 0) {
            voos = transformarVoosParaDestaque(voosBanco);
            renderVoos(voos);
            renderPacotes();
            
            console.log(`✅ ${voos.length} voos carregados e exibidos!`);
            console.log('💡 Voos vêm diretamente das tabelas Voo, Aeroporto e Cidade do seu banco MySQL');
        } else {
            console.warn('⚠️ Nenhum voo encontrado no banco de dados');
            console.log('💡 Dica: Cadastre voos na tabela Voo do banco Skymilles');
            renderVoos([]);
            renderPacotes();
        }
    } catch (error) {
        console.error('❌ Erro ao inicializar página:', error);
        document.getElementById('voos-content').innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <p style="font-size: 1.2rem; color: #ef4444;">
                    ❌ Erro ao carregar voos<br>
                    <small>${error.message}</small><br><br>
                    <small>Verifique se o arquivo api.php está no mesmo diretório e se o banco está configurado.</small>
                </p>
            </div>
        `;
    }
}

// Carregar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', inicializarPagina);

// Auto-atualização a cada 5 minutos
setInterval(async () => {
    console.log('🔄 Verificando atualizações...');
    const voosBanco = await buscarVoosDoBanco();
    const voosAtualizados = transformarVoosParaDestaque(voosBanco);
    
    if (JSON.stringify(voosAtualizados) !== JSON.stringify(voos)) {
        voos = voosAtualizados;
        renderVoos(voos);
        console.log('✅ Voos atualizados automaticamente');
    }
}, 5 * 60 * 1000);
