// ==================== cadastroClientes.js ====================
const API_URL = 'http://localhost/dashboard/SkyMilles/api.php';

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c👤 Sistema de Cadastro de Clientes Iniciado!', 'background: #2c5364; color: white; font-size: 16px; padding: 10px;');
    configurarFormulario();
});

// ========== CONFIGURAR FORMULÁRIO ==========
function configurarFormulario() {
    // Máscaras de input
    aplicarMascaras();
    
    // Validação de senha
    document.getElementById('senha').addEventListener('input', verificarForcaSenha);
    
    // Buscar CEP
    document.getElementById('cep').addEventListener('blur', buscarCEP);
    
    // Validação de CPF
    document.getElementById('cpf').addEventListener('blur', validarCPF);
    
    // Submeter formulário
    document.getElementById('clienteForm').addEventListener('submit', cadastrarCliente);
}

// ========== MÁSCARAS DE INPUT ==========
function aplicarMascaras() {
    // Máscara CPF
    document.getElementById('cpf').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
        e.target.value = value;
    });
    
    // Máscara Telefone
    document.getElementById('telefone').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        e.target.value = value;
    });

    // Máscara Celular
    const celularInput = document.getElementById('celular');
    if (celularInput) {
        celularInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            }
            e.target.value = value;
        });
    }
    
    // Máscara CEP
    document.getElementById('cep').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 8) {
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        }
        e.target.value = value;
    });
}

// ========== VALIDAR CPF ==========
function validarCPF() {
    const cpfInput = document.getElementById('cpf');
    const cpf = cpfInput.value.replace(/\D/g, '');
    
    if (cpf.length !== 11) {
        mostrarErro(cpfInput, 'CPF deve ter 11 dígitos');
        return false;
    }
    
    // Validação básica de CPF
    let soma = 0;
    let resto;
    
    if (cpf === '00000000000') {
        mostrarErro(cpfInput, 'CPF inválido');
        return false;
    }
    
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) {
        mostrarErro(cpfInput, 'CPF inválido');
        return false;
    }
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) {
        mostrarErro(cpfInput, 'CPF inválido');
        return false;
    }
    
    removerErro(cpfInput);
    cpfInput.classList.add('valid');
    return true;
}

// ========== BUSCAR CEP ==========
async function buscarCEP() {
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value.replace(/\D/g, '');
    
    if (cep.length !== 8) return;
    
    try {
        showMessage('Buscando endereço...', 'info');
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            showMessage('CEP não encontrado', 'error');
            return;
        }
        
        // Preencher campos
        document.getElementById('logradouro').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';
        
        showMessage('Endereço encontrado!', 'success');
        document.getElementById('numero').focus();
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        showMessage('Erro ao buscar CEP', 'error');
    }
}

// ========== VERIFICAR FORÇA DA SENHA ==========
function verificarForcaSenha() {
    const senha = document.getElementById('senha').value;
    const strengthBar = document.getElementById('passwordStrength');
    
    let strength = 0;
    
    if (senha.length >= 6) strength++;
    if (senha.length >= 8) strength++;
    if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) strength++;
    if (/\d/.test(senha)) strength++;
    if (/[^a-zA-Z\d]/.test(senha)) strength++;
    
    strengthBar.className = 'password-strength-bar';
    
    if (strength <= 2) {
        strengthBar.classList.add('weak');
    } else if (strength <= 4) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('strong');
    }
}

// ========== CADASTRAR CLIENTE ==========
async function cadastrarCliente(e) {
    e.preventDefault();
    
    // Validar senhas
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    
    if (senha !== confirmarSenha) {
        showMessage('As senhas não coincidem!', 'error');
        return;
    }
    
    if (senha.length < 6) {
        showMessage('A senha deve ter no mínimo 6 caracteres!', 'error');
        return;
    }
    
    // Validar termos
    if (!document.getElementById('aceitarTermos').checked) {
        showMessage('Você precisa aceitar os termos de uso!', 'error');
        return;
    }
    
    // Validar CPF
    if (!validarCPF()) {
        showMessage('CPF inválido!', 'error');
        return;
    }
    
    // Preparar dados
    const endereco = `${document.getElementById('logradouro').value}, ${document.getElementById('numero').value}${document.getElementById('complemento').value ? ', ' + document.getElementById('complemento').value : ''} - ${document.getElementById('bairro').value}, ${document.getElementById('cidade').value}/${document.getElementById('estado').value} - CEP: ${document.getElementById('cep').value}`;
    
    const cliente = {
        nome_cliente: document.getElementById('nomeCompleto').value,
        CPF: document.getElementById('cpf').value.replace(/\D/g, ''),
        data_nasc: document.getElementById('dataNasc').value,
        sexo: document.getElementById('sexo').value,
        telefone: document.getElementById('telefone').value.replace(/\D/g, ''),
        celular: document.getElementById('celular').value.replace(/\D/g, ''),
        endereco: endereco,
        email: document.getElementById('email').value,
        login: document.getElementById('login').value,
        senha: senha,
        status: document.getElementById('status').value,
        tipo_usuario: document.getElementById('tipoUsuario').value,
        milhas_iniciais: document.getElementById('milhasIniciais').value || 0,
        receber_promocoes: document.getElementById('receberPromocoes').checked ? 1 : 0,
        observacoes: document.getElementById('observacoes').value
    };
    
    console.log('📤 Enviando cadastro:', cliente);
    
    // Desabilitar botão
    const btnCadastrar = document.getElementById('btnCadastrar');
    const textoOriginal = btnCadastrar.innerHTML;
    btnCadastrar.disabled = true;
    btnCadastrar.innerHTML = '<span class="loading-spinner"></span> Cadastrando...';
    
    try {
        const response = await fetch(`${API_URL}?action=cadastrar&resource=clientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente)
        });
        
        const result = await response.json();
        console.log('Resposta:', result);
        
        if (result.success) {
            console.log('✅ Cliente cadastrado:', result.data);
            showMessage('🎉 Cadastro realizado com sucesso! Redirecionando...', 'success');
            
            setTimeout(() => {
                document.getElementById('clienteForm').reset();
                window.location.href = 'visuClientes.html';
            }, 2000);
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

// ========== FUNÇÕES AUXILIARES ==========
function mostrarErro(input, mensagem) {
    input.classList.add('invalid');
    input.classList.remove('valid');
    
    // Remover mensagem anterior
    const errorExistente = input.parentElement.querySelector('.error-message');
    if (errorExistente) {
        errorExistente.remove();
    }
    
    // Adicionar nova mensagem
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.textContent = mensagem;
    input.parentElement.appendChild(errorMsg);
}

function removerErro(input) {
    input.classList.remove('invalid');
    const errorMsg = input.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

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
    if (confirm('Deseja realmente cancelar o cadastro?')) {
        document.getElementById('clienteForm').reset();
        showMessage('Formulário cancelado', 'info');
    }
}

// ========== MENSAGEM DE AJUDA ==========
console.log('%c==========================================', 'color: #2c5364;');
console.log('%c👤 SISTEMA DE CADASTRO - INFORMAÇÕES', 'color: #2c5364; font-size: 14px; font-weight: bold;');
console.log('%c==========================================', 'color: #2c5364;');
console.log('%cFuncionalidades:', 'color: #27ae60; font-weight: bold;');
console.log('  ✅ Validação de CPF');
console.log('  ✅ Busca automática de CEP');
console.log('  ✅ Verificação de força de senha');
console.log('  ✅ Máscaras de input automáticas');
console.log('  ✅ Validação de campos obrigatórios');
console.log('%c==========================================', 'color: #2c5364;');