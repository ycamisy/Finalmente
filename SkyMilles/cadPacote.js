// ==================== cadPacote.js CORRIGIDO ====================
const API_URL = 'http://localhost/dashboard/SkyMilles/api.php';

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c📦 Sistema de Cadastro de Pacotes Iniciado!', 'background: #2c5364; color: white; font-size: 16px; padding: 10px;');
    testarConexaoAPI();
    configurarFormulario();
});

// ========== TESTAR CONEXÃO COM API ==========
async function testarConexaoAPI() {
    try {
        console.log('🔧 Testando conexão com API...');
        const response = await fetch(`${API_URL}?action=listar&resource=pacotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            console.log('✅ API conectada com sucesso!');
            console.log(`📊 Total de pacotes: ${result.data.length}`);
            return true;
        } else {
            console.error('❌ Erro na API:', result.message);
            return false;
        }
    } catch (error) {
        console.error('❌ Erro de conexão:', error);
        return false;
    }
}

// ========== CONFIGURAR FORMULÁRIO ==========
function configurarFormulario() {
    aplicarMascaras();
    configurarValidacoes();
    
    const form = document.getElementById('pacoteForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            await cadastrarPacote();
        });
    }
}

function aplicarMascaras() {
    // Formatar valor base como moeda
    const inputValor = document.getElementById('valorBase');
    if (inputValor) {
        inputValor.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = (value / 100).toFixed(2);
            value = value.replace('.', ',');
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            e.target.value = 'R$ ' + value;
        });
    }

    // Formatar desconto como percentual
    const inputDesconto = document.getElementById('desconto');
    if (inputDesconto) {
        inputDesconto.addEventListener('change', function(e) {
            let value = parseFloat(e.target.value);
            if (value > 100) {
                showMessage('Desconto não pode ser maior que 100%', 'error');
                e.target.value = 100;
            }
            if (value < 0) {
                e.target.value = 0;
            }
        });
    }
}

function configurarValidacoes() {
    const inputDataInicio = document.getElementById('dataInicio');
    const inputDataFim = document.getElementById('dataFim');
    const inputDuracao = document.getElementById('duracao');

    // Calcular data fim automaticamente
    if (inputDuracao) {
        inputDuracao.addEventListener('change', function() {
            if (inputDataInicio.value) {
                calcularDataFim();
            }
        });
    }

    if (inputDataInicio) {
        inputDataInicio.addEventListener('change', function() {
            if (inputDuracao.value) {
                calcularDataFim();
            }
        });
    }

    if (inputDataFim) {
        inputDataFim.addEventListener('change', function() {
            const dataInicio = new Date(inputDataInicio.value);
            const dataFim = new Date(this.value);
            
            if (dataFim <= dataInicio) {
                showMessage('Data de término deve ser posterior à data de início!', 'error');
                this.value = '';
            }
        });
    }

    // Validar vagas disponíveis
    const inputVagasDisponivel = document.getElementById('vagasDisponivel');
    const inputVagas = document.getElementById('vagas');

    if (inputVagas && inputVagasDisponivel) {
        inputVagas.addEventListener('change', function() {
            if (parseInt(inputVagasDisponivel.value) > parseInt(this.value)) {
                inputVagasDisponivel.value = this.value;
            }
        });
    }
}

function calcularDataFim() {
    const dataInicio = document.getElementById('dataInicio').value;
    const duracao = parseInt(document.getElementById('duracao').value);
    
    if (dataInicio && duracao && duracao > 0) {
        const data = new Date(dataInicio);
        data.setDate(data.getDate() + duracao - 1);
        
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const dia = String(data.getDate()).padStart(2, '0');
        
        document.getElementById('dataFim').value = `${ano}-${mes}-${dia}`;
    }
}

// ========== CADASTRAR PACOTE ==========
async function cadastrarPacote() {
    // Validações básicas
    const nomePacote = document.getElementById('nomePacote').value.trim();
    const destino = document.getElementById('destino').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    const duracao = document.getElementById('duracao').value;
    const tipo = document.getElementById('tipo').value;
    const categoriaHotel = document.getElementById('categoriaHotel').value;
    const companhiaAerea = document.getElementById('companhiaAerea').value;
    const valorBase = document.getElementById('valorBase').value;
    const vagas = document.getElementById('vagas').value;
    const status = document.getElementById('status').value;

    if (!nomePacote || !destino || !dataInicio || !dataFim || !duracao || !tipo || !categoriaHotel || !companhiaAerea || !valorBase || !vagas || !status) {
        showMessage('Preencha todos os campos obrigatórios!', 'error');
        return;
    }

    // Validar datas
    const dtInicio = new Date(dataInicio);
    const dtFim = new Date(dataFim);
    if (dtFim <= dtInicio) {
        showMessage('Data de término deve ser posterior à data de início!', 'error');
        return;
    }

    // Extrair valor numérico
    const valorNumerico = parseFloat(valorBase.replace(/[^\d,]/g, '').replace(',', '.'));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
        showMessage('Valor base inválido!', 'error');
        return;
    }

    // Obter inclusos selecionados
    const inclusos = Array.from(document.querySelectorAll('input[name="inclusos"]:checked'))
        .map(cb => cb.id)
        .join(', ');

    const pacote = {
        nome_pacote: nomePacote,
        destino: destino,
        duracao: duracao,
        data_inicio: dataInicio,
        data_fim: dataFim,
        tipo_pacote: tipo,
        categoria_hotel: categoriaHotel,
        companhia_aerea: companhiaAerea,
        valor_base: valorNumerico.toFixed(2),
        desconto: document.getElementById('desconto').value || 0,
        vagas_totais: vagas,
        vagas_disponiveis: document.getElementById('vagasDisponivel').value || vagas,
        status: status,
        inclusos: inclusos,
        descricao: document.getElementById('descricao').value,
        observacoes: document.getElementById('observacoes').value
    };

    console.log('📝 Enviando pacote:', pacote);

    const btnCadastrar = document.querySelector('button[type="submit"]');
    const textoOriginal = btnCadastrar.innerHTML;
    btnCadastrar.disabled = true;
    btnCadastrar.innerHTML = '⏳ Cadastrando...';

    try {
        const response = await fetch(`${API_URL}?action=cadastrar&resource=pacotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pacote)
        });

        const result = await response.json();
        console.log('Resposta:', result);
        
        if (result.success) {
            console.log('✅ Pacote cadastrado:', result.data);
            showMessage('🎉 Pacote cadastrado com sucesso!', 'success');
            
            setTimeout(() => {
                document.getElementById('pacoteForm').reset();
                window.location.href = 'visuPacote.html';
            }, 1500);
        } else {
            console.error('❌ Erro:', result.message);
            showMessage('Erro: ' + result.message, 'error');
            btnCadastrar.disabled = false;
            btnCadastrar.innerHTML = textoOriginal;
        }
    } catch (error) {
        console.error('❌ Erro:', error);
        showMessage('Erro ao conectar com o servidor!', 'error');
        btnCadastrar.disabled = false;
        btnCadastrar.innerHTML = textoOriginal;
    }
}

// ========== DELETAR PACOTE ==========
async function deletarPacote(id) {
    if (!confirm('⚠️ Deseja realmente deletar este pacote?')) {
        return false;
    }
    
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
            return true;
        } else {
            showMessage('❌ ' + result.message, 'error');
            return false;
        }
    } catch (error) {
        console.error('❌ Erro:', error);
        showMessage('Erro ao deletar pacote!', 'error');
        return false;
    }
}

// ========== ATUALIZAR PACOTE ==========
async function atualizarPacote(pacoteData) {
    try {
        console.log('📝 Atualizando pacote:', pacoteData);
        const response = await fetch(`${API_URL}?action=atualizar&resource=pacotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pacoteData)
        });
        const result = await response.json();
        
        if (result.success) {
            showMessage('✅ Pacote atualizado com sucesso!', 'success');
            return true;
        } else {
            showMessage('❌ ' + result.message, 'error');
            return false;
        }
    } catch (error) {
        console.error('❌ Erro:', error);
        showMessage('Erro ao atualizar pacote!', 'error');
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
        document.getElementById('pacoteForm').reset();
        showMessage('Formulário cancelado', 'error');
    }
}

// ========== DISPONIBILIZAR FUNÇÕES GLOBALMENTE ==========
window.deletarPacote = deletarPacote;
window.cancelar = cancelar;

console.log('%c==========================================', 'color: #3498db;');
console.log('%c📦 SISTEMA DE PACOTES - FUNÇÕES DISPONÍVEIS', 'color: #3498db; font-size: 14px; font-weight: bold;');
console.log('%c==========================================', 'color: #3498db;');
console.log('%cFunções de Ação:', 'color: #e74c3c; font-weight: bold;');
console.log('  🗑️ deletarPacote(id) - Remove pacote pelo ID');
console.log('  📝 atualizarPacote({...}) - Atualiza dados do pacote');
console.log('%c==========================================', 'color: #3498db;');