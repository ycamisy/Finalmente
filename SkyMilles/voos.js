// ==================== voos.js CORRIGIDO ====================
// ⚠️ IMPORTANTE: Configure a URL da sua API aqui
// Se estiver usando XAMPP: 'http://localhost/SkyMilles/api.php'
// Se estiver usando outro servidor, ajuste conforme necessário
const API_URL = 'http://localhost/dashboard/SkyMilles/api.php';

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c✈️ Sistema de Voos Iniciado!', 'background: #27ae60; color: white; font-size: 16px; padding: 10px;');
    testarConexaoAPI();
    configurarFormulario();
});

// ========== TESTAR CONEXÃO COM API ==========
async function testarConexaoAPI() {
    try {
        console.log('🔧 Testando conexão com API...');
        const response = await fetch(`${API_URL}?action=listar&resource=voos`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            console.log('✅ API conectada com sucesso!');
            console.log(`📊 Total de voos: ${result.data.length}`);
            return true;
        } else {
            console.error('❌ Erro na API:', result.message);
            showMessage('Erro: ' + result.message, 'error');
            return false;
        }
    } catch (error) {
        console.error('❌ Erro de conexão:', error);
        showMessage('Não foi possível conectar ao servidor.', 'error');
        return false;
    }
}

// ========== CONFIGURAR FORMULÁRIO ==========
function configurarFormulario() {
    // Formatar valor como moeda
    const inputValor = document.getElementById('valor');
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
    const inputChegada = document.getElementById('chegada');
    if (inputChegada) {
        inputChegada.addEventListener('change', function() {
            const saida = new Date(document.getElementById('saida').value);
            const chegada = new Date(this.value);
            
            if (chegada <= saida) {
                showMessage('A chegada deve ser posterior à saída!', 'error');
                this.value = '';
            }
        });
    }

    // Validar origem e destino
    const inputDestino = document.getElementById('destino');
    if (inputDestino) {
        inputDestino.addEventListener('change', function() {
            const origem = document.getElementById('origem').value;
            if (origem && origem === this.value) {
                showMessage('Origem e destino não podem ser iguais!', 'error');
                this.value = '';
            }
        });
    }

    // Submeter formulário
    const form = document.getElementById('flightForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            await cadastrarVoo();
        });
    }
}

// ========== CADASTRAR VOO ==========
async function cadastrarVoo() {
    const voo = {
        origem: document.getElementById('origem').value,
        destino: document.getElementById('destino').value,
        codigo: document.getElementById('codigo').value.toUpperCase(),
        saida: document.getElementById('saida').value,
        chegada: document.getElementById('chegada').value,
        frequencia: document.getElementById('frequencia').value,
        companhia: document.getElementById('companhia').value,
        assentos: document.getElementById('assentos').value,
        status: document.getElementById('status').value,
        modelo: document.getElementById('modelo').value,
        valor: document.getElementById('valor').value
    };

    console.log('📝 Enviando voo:', voo);

    try {
        const response = await fetch(`${API_URL}?action=cadastrar&resource=voos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(voo)
        });

        const result = await response.json();
        console.log('Resposta:', result);
        
        if (result.success) {
            console.log('✅ Voo cadastrado:', result.data);
            showMessage('✈️ Voo cadastrado com sucesso!', 'success');
            
            setTimeout(() => {
                document.getElementById('flightForm').reset();
                window.location.href = 'visuVoos.html';
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

// ========== DELETAR VOO ==========
async function deletarVoo(id) {
    if (!confirm('⚠️ Deseja realmente deletar este voo?')) {
        return false;
    }
    
    try {
        const response = await fetch(`${API_URL}?action=deletar&id=${id}&resource=voos`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        
        if (result.success) {
            showMessage('✅ Voo deletado com sucesso!', 'success');
            return true;
        } else {
            showMessage('❌ ' + result.message, 'error');
            return false;
        }
    } catch (error) {
        console.error('❌ Erro:', error);
        showMessage('Erro ao deletar voo!', 'error');
        return false;
    }
}

// ========== ATUALIZAR VOO ==========
async function atualizarVoo(vooData) {
    try {
        console.log('📝 Atualizando voo:', vooData);
        const response = await fetch(`${API_URL}?action=atualizar&resource=voos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vooData)
        });
        const result = await response.json();
        
        if (result.success) {
            showMessage('✅ Voo atualizado com sucesso!', 'success');
            return true;
        } else {
            showMessage('❌ ' + result.message, 'error');
            return false;
        }
    } catch (error) {
        console.error('❌ Erro:', error);
        showMessage('Erro ao atualizar voo!', 'error');
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

    setTimeout(() => message.remove(), 3000);
}

function cancelar() {
    if (confirm('Deseja realmente cancelar?')) {
        document.getElementById('flightForm').reset();
        showMessage('Formulário cancelado', 'error');
    }
}

function voltar() {
    if (confirm('Deseja voltar?')) {
        window.history.back();
    }
}

// ========== DISPONIBILIZAR FUNÇÕES GLOBALMENTE ==========
window.deletarVoo = deletarVoo;
window.cancelar = cancelar;
window.voltar = voltar;

// ========== MENSAGEM DE AJUDA ==========
console.log('%c==========================================', 'color: #3498db;');
console.log('%c✈️ SISTEMA DE VOOS - FUNÇÕES DISPONÍVEIS', 'color: #3498db; font-size: 14px; font-weight: bold;');
console.log('%c==========================================', 'color: #3498db;');
console.log('%cFunções de Consulta:', 'color: #27ae60; font-weight: bold;');
console.log('  📋 listarVoos() - Lista todos os voos em tabela');
console.log('  🔍 buscarVooPorCodigo("LA8030") - Busca voo específico');
console.log('  📍 buscarVoosPorOrigem("São Paulo") - Filtra por origem');
console.log('  🎯 buscarVoosPorDestino("Rio") - Filtra por destino');
console.log('  ✈️ buscarVoosPorCompanhia("LATAM") - Filtra por companhia');
console.log('  📊 buscarVoosPorStatus("Confirmado") - Filtra por status');
console.log('%cFunções de Ação:', 'color: #e74c3c; font-weight: bold;');
console.log('  🗑️ deletarVoo(1) - Remove voo pelo ID');
console.log('  📝 atualizarVoo({...}) - Atualiza dados do voo');
console.log('  💾 exportarVoos() - Exporta para JSON');
console.log('%cDiagnóstico:', 'color: #f39c12; font-weight: bold;');
console.log('  🔧 testarConexaoAPI() - Testa conexão com servidor');
console.log('%c==========================================', 'color: #3498db;');