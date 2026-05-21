// ==================== cadHotel.js ====================
// Sistema de Cadastro de Hotéis com CEP Internacional
// ⚠️ IMPORTANTE: Configure a URL da sua API aqui
const API_URL = 'http://localhost/dashboard/SkyMilles/api.php';

// ==================== CONFIGURAÇÕES DE CEP POR PAÍS ====================
const CEP_CONFIG = {
    BR: {
        nome: 'CEP',
        formato: '00000-000',
        placeholder: '12345-678',
        mascara: '#####-###',
        regex: /^\d{5}-\d{3}$/,
        api: 'https://viacep.com.br/ws/{cep}/json/',
        apiKey: false
    },
    US: {
        nome: 'ZIP Code',
        formato: '00000',
        placeholder: '12345',
        mascara: '#####',
        regex: /^\d{5}$/,
        api: 'https://api.zippopotam.us/us/{cep}',
        apiKey: false
    },
    FR: {
        nome: 'Code Postal',
        formato: '00000',
        placeholder: '75001',
        mascara: '#####',
        regex: /^\d{5}$/,
        api: 'https://api.zippopotam.us/fr/{cep}',
        apiKey: false
    },
    UK: {
        nome: 'Postcode',
        formato: 'AA0A 0AA',
        placeholder: 'SW1A 1AA',
        mascara: null,
        regex: /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i,
        api: 'https://api.zippopotam.us/gb/{cep}',
        apiKey: false
    },
    IT: {
        nome: 'Codice Postale',
        formato: '00000',
        placeholder: '00118',
        mascara: '#####',
        regex: /^\d{5}$/,
        api: 'https://api.zippopotam.us/it/{cep}',
        apiKey: false
    },
    ES: {
        nome: 'Código Postal',
        formato: '00000',
        placeholder: '28001',
        mascara: '#####',
        regex: /^\d{5}$/,
        api: 'https://api.zippopotam.us/es/{cep}',
        apiKey: false
    },
    PT: {
        nome: 'Código Postal',
        formato: '0000-000',
        placeholder: '1000-001',
        mascara: '####-###',
        regex: /^\d{4}-\d{3}$/,
        api: 'https://api.zippopotam.us/pt/{cep}',
        apiKey: false
    },
    DE: {
        nome: 'Postleitzahl',
        formato: '00000',
        placeholder: '10115',
        mascara: '#####',
        regex: /^\d{5}$/,
        api: 'https://api.zippopotam.us/de/{cep}',
        apiKey: false
    },
    AR: {
        nome: 'Código Postal',
        formato: 'A0000AAA',
        placeholder: 'C1002AAR',
        mascara: null,
        regex: /^[A-Z]\d{4}[A-Z]{3}$/i,
        api: 'https://api.zippopotam.us/ar/{cep}',
        apiKey: false
    },
    MX: {
        nome: 'Código Postal',
        formato: '00000',
        placeholder: '01000',
        mascara: '#####',
        regex: /^\d{5}$/,
        api: 'https://api.zippopotam.us/mx/{cep}',
        apiKey: false
    },
    CA: {
        nome: 'Postal Code',
        formato: 'A0A 0A0',
        placeholder: 'K1A 0B1',
        mascara: null,
        regex: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
        api: 'https://api.zippopotam.us/ca/{cep}',
        apiKey: false
    },
    JP: {
        nome: '郵便番号',
        formato: '000-0000',
        placeholder: '100-0001',
        mascara: '###-####',
        regex: /^\d{3}-\d{4}$/,
        api: 'https://api.zippopotam.us/jp/{cep}',
        apiKey: false
    },
    CN: {
        nome: '邮政编码',
        formato: '000000',
        placeholder: '100000',
        mascara: '######',
        regex: /^\d{6}$/,
        api: null, // API não disponível gratuitamente
        apiKey: false
    },
    AE: {
        nome: 'Postal Code',
        formato: '',
        placeholder: 'Não utiliza',
        mascara: null,
        regex: null,
        api: null,
        apiKey: false
    },
    AU: {
        nome: 'Postcode',
        formato: '0000',
        placeholder: '2000',
        mascara: '####',
        regex: /^\d{4}$/,
        api: 'https://api.zippopotam.us/au/{cep}',
        apiKey: false
    },
    NZ: {
        nome: 'Postcode',
        formato: '0000',
        placeholder: '1010',
        mascara: '####',
        regex: /^\d{4}$/,
        api: 'https://api.zippopotam.us/nz/{cep}',
        apiKey: false
    },
    ZA: {
        nome: 'Postcode',
        formato: '0000',
        placeholder: '0001',
        mascara: '####',
        regex: /^\d{4}$/,
        api: 'https://api.zippopotam.us/za/{cep}',
        apiKey: false
    },
    IN: {
        nome: 'PIN Code',
        formato: '000000',
        placeholder: '110001',
        mascara: '######',
        regex: /^\d{6}$/,
        api: 'https://api.zippopotam.us/in/{cep}',
        apiKey: false
    },
    TH: {
        nome: 'Postal Code',
        formato: '00000',
        placeholder: '10110',
        mascara: '#####',
        regex: /^\d{5}$/,
        api: null, // API não disponível
        apiKey: false
    },
    SG: {
        nome: 'Postal Code',
        formato: '000000',
        placeholder: '018956',
        mascara: '######',
        regex: /^\d{6}$/,
        api: null, // API não disponível
        apiKey: false
    }
};

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🏨 Sistema de Hotéis Iniciado!', 'background: #8B4513; color: white; font-size: 16px; padding: 10px;');
    testarConexaoAPI();
    configurarFormulario();
    configurarCEP();
});

// ========== CONFIGURAR CEP ==========
function configurarCEP() {
    const paisSelect = document.getElementById('pais');
    const cepInput = document.getElementById('cep');
    const btnBuscar = document.getElementById('btnBuscarCep');
    
    // Quando o país mudar
    paisSelect.addEventListener('change', function() {
        const paisSelecionado = this.value;
        
        if (paisSelecionado) {
            const config = CEP_CONFIG[paisSelecionado];
            
            // Habilitar campo de CEP
            cepInput.disabled = false;
            cepInput.value = '';
            cepInput.placeholder = config.placeholder;
            
            // Atualizar label
            document.getElementById('labelCep').textContent = config.nome;
            
            // Mostrar formato
            const formatoInfo = document.getElementById('formatoCep');
            if (config.formato) {
                formatoInfo.textContent = `Formato: ${config.formato}`;
                formatoInfo.style.display = 'block';
            } else {
                formatoInfo.textContent = config.placeholder === 'Não utiliza' ? 
                    'Este país não utiliza código postal' : '';
                formatoInfo.style.display = 'block';
            }
            
            // Habilitar/desabilitar botão de busca
            if (config.api) {
                btnBuscar.disabled = false;
                btnBuscar.title = `Buscar ${config.nome}`;
            } else {
                btnBuscar.disabled = true;
                btnBuscar.title = 'Busca não disponível para este país';
            }
            
            // Aplicar máscara se disponível
            if (config.mascara) {
                aplicarMascara(cepInput, config.mascara);
            }
        } else {
            cepInput.disabled = true;
            btnBuscar.disabled = true;
            cepInput.value = '';
            cepInput.placeholder = 'Selecione um país primeiro';
            document.getElementById('formatoCep').style.display = 'none';
        }
    });
    
    // Buscar CEP ao clicar no botão
    btnBuscar.addEventListener('click', buscarCEP);
    
    // Buscar CEP ao pressionar Enter
    cepInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            buscarCEP();
        }
    });
}

// ========== APLICAR MÁSCARA ==========
function aplicarMascara(input, mascara) {
    input.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        let resultado = '';
        let posicaoValor = 0;
        
        for (let i = 0; i < mascara.length && posicaoValor < valor.length; i++) {
            if (mascara[i] === '#') {
                resultado += valor[posicaoValor++];
            } else {
                resultado += mascara[i];
            }
        }
        
        e.target.value = resultado;
    });
}

// ========== BUSCAR CEP ==========
async function buscarCEP() {
    const paisSelect = document.getElementById('pais');
    const cepInput = document.getElementById('cep');
    const loadingCep = document.getElementById('loadingCep');
    
    const paisSelecionado = paisSelect.value;
    const cep = cepInput.value.replace(/\D/g, '');
    
    if (!paisSelecionado) {
        showMessage('Selecione um país primeiro!', 'error');
        return;
    }
    
    if (!cep) {
        showMessage('Digite um CEP válido!', 'error');
        return;
    }
    
    const config = CEP_CONFIG[paisSelecionado];
    
    if (!config.api) {
        showMessage('Busca de CEP não disponível para este país. Preencha manualmente.', 'info');
        return;
    }
    
    // Validar formato
    if (config.regex && !config.regex.test(cepInput.value)) {
        showMessage(`Formato inválido! Use: ${config.formato}`, 'error');
        return;
    }
    
    // Mostrar loading
    loadingCep.style.display = 'inline';
    
    try {
        // Brasil usa ViaCEP
        if (paisSelecionado === 'BR') {
            await buscarCEPBrasil(cep);
        } 
        // Outros países usam Zippopotam
        else {
            await buscarCEPInternacional(paisSelecionado, cep);
        }
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        showMessage('Erro ao buscar CEP. Preencha manualmente.', 'error');
    } finally {
        loadingCep.style.display = 'none';
    }
}

// ========== BUSCAR CEP BRASIL ==========
async function buscarCEPBrasil(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.erro) {
        showMessage('CEP não encontrado!', 'error');
        return;
    }
    
    // Preencher campos
    document.getElementById('endereco').value = data.logradouro || '';
    document.getElementById('bairro').value = data.bairro || '';
    document.getElementById('cidade').value = data.localidade || '';
    document.getElementById('estado').value = data.uf || '';
    
    showMessage('✅ CEP encontrado!', 'success');
    
    // Focar no campo de número/complemento
    document.getElementById('complemento').focus();
}

// ========== BUSCAR CEP INTERNACIONAL ==========
async function buscarCEPInternacional(pais, cep) {
    const config = CEP_CONFIG[pais];
    const url = config.api.replace('{cep}', cep);
    
    const response = await fetch(url);
    
    if (!response.ok) {
        showMessage('Código postal não encontrado!', 'error');
        return;
    }
    
    const data = await response.json();
    
    // Zippopotam retorna estrutura diferente
    if (data.places && data.places.length > 0) {
        const place = data.places[0];
        
        document.getElementById('cidade').value = place['place name'] || '';
        document.getElementById('estado').value = place['state'] || '';
        document.getElementById('bairro').value = place['state'] || '';
        
        showMessage('✅ Código postal encontrado!', 'success');
        document.getElementById('endereco').focus();
    } else {
        showMessage('Código postal não encontrado!', 'error');
    }
}

// ========== TESTAR CONEXÃO COM API ==========
async function testarConexaoAPI() {
    try {
        console.log('🔧 Testando conexão com API...');
        const response = await fetch(`${API_URL}?action=listar&resource=hoteis`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            console.log('✅ API conectada com sucesso!');
            console.log(`📊 Total de quartos: ${result.data.length}`);
            return true;
        } else {
            console.error('❌ Erro na API:', result.message);
            showMessage('Aviso: ' + result.message, 'warning');
            return false;
        }
    } catch (error) {
        console.error('❌ Erro de conexão:', error);
        showMessage('Aviso: Não foi possível conectar ao servidor.', 'warning');
        return false;
    }
}

// ========== CONFIGURAR FORMULÁRIO ==========
function configurarFormulario() {
    // Formatar valor como moeda
    const inputValor = document.getElementById('valorDiaria');
    if (inputValor) {
        inputValor.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = (value / 100).toFixed(2);
            value = value.replace('.', ',');
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            e.target.value = 'R$ ' + value;
        });
    }

    // Validar datas
    const inputCheckOut = document.getElementById('dataCheckOut');
    if (inputCheckOut) {
        inputCheckOut.addEventListener('change', function() {
            const checkIn = new Date(document.getElementById('dataCheckIn').value);
            const checkOut = new Date(this.value);
            
            if (checkOut <= checkIn) {
                showMessage('O check-out deve ser posterior ao check-in!', 'error');
                this.value = '';
            }
        });
    }

    // Submeter formulário
    const form = document.getElementById('hotelForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            await cadastrarQuarto();
        });
    }
}

// ========== OBTER COMODIDADES SELECIONADAS ==========
function obterComodidades() {
    const checkboxes = document.querySelectorAll('input[name="comodidades"]:checked');
    const comodidades = Array.from(checkboxes).map(cb => {
        return cb.nextElementSibling.textContent.trim();
    });
    return comodidades.join(', ');
}

// ========== CADASTRAR QUARTO ==========
async function cadastrarQuarto() {
    const nomeHotel = document.getElementById('nomeHotel').value;
    const categoria = document.getElementById('categoria').value;
    const pais = document.getElementById('pais').value;
    const cidade = document.getElementById('cidade').value;
    
    if (!nomeHotel || !categoria || !pais || !cidade) {
        showMessage('Preencha todos os campos obrigatórios!', 'error');
        return;
    }
    
    const quarto = {
        nomeHotel: nomeHotel,
        categoria: categoria,
        pais: pais,
        paisNome: document.getElementById('pais').selectedOptions[0].text,
        cep: document.getElementById('cep').value,
        estado: document.getElementById('estado').value,
        cidade: cidade,
        bairro: document.getElementById('bairro').value,
        endereco: document.getElementById('endereco').value,
        complemento: document.getElementById('complemento').value,
        enderecoCompleto: montarEnderecoCompleto(),
        tipoQuarto: document.getElementById('tipoQuarto').value,
        numeroQuarto: document.getElementById('numeroQuarto').value,
        capacidade: document.getElementById('capacidade').value,
        valorDiaria: document.getElementById('valorDiaria').value,
        disponibilidade: document.getElementById('disponibilidade').value,
        dataCheckIn: document.getElementById('dataCheckIn').value || null,
        dataCheckOut: document.getElementById('dataCheckOut').value || null,
        cafeManha: document.getElementById('cafeManha').value,
        comodidades: obterComodidades(),
        observacoes: document.getElementById('observacoes').value
    };

    console.log('📝 Enviando quarto:', quarto);

    try {
        const response = await fetch(`${API_URL}?action=cadastrar&resource=hoteis`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quarto)
        });

        const result = await response.json();
        console.log('Resposta:', result);
        
        if (result.success) {
            console.log('✅ Quarto cadastrado:', result.data);
            showMessage('🏨 Quarto cadastrado com sucesso!', 'success');
            
            setTimeout(() => {
                document.getElementById('hotelForm').reset();
                window.location.href = 'visuHoteis.html';
            }, 1500);
        } else {
            console.error('❌ Erro:', result.message);
            showMessage('Erro: ' + result.message, 'error');
        }
    } catch (error) {
        console.error('❌ Erro:', error);
        showMessage('Erro ao conectar com o servidor!', 'error');
    }
}

// ========== MONTAR ENDEREÇO COMPLETO ==========
function montarEnderecoCompleto() {
    const partes = [];
    
    const endereco = document.getElementById('endereco').value;
    const complemento = document.getElementById('complemento').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const cep = document.getElementById('cep').value;
    const paisNome = document.getElementById('pais').selectedOptions[0].text.replace(/[^\w\s]/gi, '').trim();
    
    if (endereco) partes.push(endereco);
    if (complemento) partes.push(complemento);
    if (bairro) partes.push(bairro);
    if (cidade) partes.push(cidade);
    if (estado) partes.push(estado);
    if (cep) partes.push(cep);
    if (paisNome) partes.push(paisNome);
    
    return partes.join(', ');
}

// ========== DELETAR QUARTO ==========
async function deletarQuarto(id) {
    if (!confirm('⚠️ Deseja realmente deletar este quarto?')) {
        return false;
    }
    
    try {
        const response = await fetch(`${API_URL}?action=deletar&id=${id}&resource=hoteis`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        
        if (result.success) {
            showMessage('✅ Quarto deletado com sucesso!', 'success');
            return true;
        } else {
            showMessage('❌ ' + result.message, 'error');
            return false;
        }
    } catch (error) {
        console.error('❌ Erro:', error);
        showMessage('Erro ao deletar quarto!', 'error');
        return false;
    }
}

// ========== ATUALIZAR QUARTO ==========
async function atualizarQuarto(quartoData) {
    try {
        console.log('📝 Atualizando quarto:', quartoData);
        const response = await fetch(`${API_URL}?action=atualizar&resource=hoteis`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quartoData)
        });
        const result = await response.json();
        
        if (result.success) {
            showMessage('✅ Quarto atualizado com sucesso!', 'success');
            return true;
        } else {
            showMessage('❌ ' + result.message, 'error');
            return false;
        }
    } catch (error) {
        console.error('❌ Erro:', error);
        showMessage('Erro ao atualizar quarto!', 'error');
        return false;
    }
}

// ========== FUNÇÕES AUXILIARES ==========
function showMessage(text, type) {
    const existing = document.querySelector('.message');
    if (existing) existing.remove();

    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);

    setTimeout(() => message.remove(), 4000);
}

function cancelar() {
    if (confirm('Deseja realmente cancelar?')) {
        document.getElementById('hotelForm').reset();
        document.getElementById('cep').disabled = true;
        document.getElementById('btnBuscarCep').disabled = true;
        showMessage('Formulário cancelado', 'error');
    }
}

function voltar() {
    if (confirm('Deseja voltar?')) {
        window.history.back();
    }
}

// ========== DISPONIBILIZAR FUNÇÕES GLOBALMENTE ==========
window.deletarQuarto = deletarQuarto;
window.cancelar = cancelar;
window.voltar = voltar;
window.buscarCEP = buscarCEP;

// ========== MENSAGEM DE AJUDA ==========
console.log('%c==========================================', 'color: #8B4513;');
console.log('%c🏨 SISTEMA DE HOTÉIS COM CEP INTERNACIONAL', 'color: #8B4513; font-size: 14px; font-weight: bold;');
console.log('%c==========================================', 'color: #8B4513;');
console.log('%c🌍 Países suportados: 20+', 'color: #27ae60; font-weight: bold;');
console.log('%c📍 APIs integradas:', 'color: #3498db; font-weight: bold;');
console.log('  • ViaCEP (Brasil)');
console.log('  • Zippopotam (Internacional)');
console.log('%c==========================================', 'color: #8B4513;');