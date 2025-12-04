const API_URL = 'http://localhost/dashboard/SkyMilles/api.php';

// Avatares disponíveis
const avatares = [
    { id: 'avatar1.jpg', url: 'https://i.postimg.cc/qMvvdyYp/download-3.jpg' },
    { id: 'avatar2.jpg', url: 'https://i.postimg.cc/gk22P85P/doninha.jpg' },
    { id: 'avatar3.jpg', url: 'https://i.postimg.cc/Qxddr1P8/download-4.jpg' },
    { id: 'avatar4.jpg', url: 'https://i.postimg.cc/DyG80f2p/95d2087a51e8477cff8d9aac8a1687ac.jpg' },
    { id: 'avatar5.jpg', url: 'https://i.postimg.cc/kXSBGMnS/09fae38fce5289fec7b95973e168b74e.jpg' },
    { id: 'avatar6.jpg', url: 'https://i.postimg.cc/T3XhD8wq/130bcb30c2ece47f478f17fc599e079f.jpg' },
    { id: 'avatar7.jpg', url: 'https://i.postimg.cc/PrDPJfty/c3119445123adbaabddd9e917d671962.jpg' },
    { id: 'avatar8.jpg', url: 'https://i.postimg.cc/y8zWZqdy/135745bda10f46307e35af3b61ffa7c0.jpg' },
    { id: 'avatar9.jpg', url: 'https://i.postimg.cc/Vkc5Cy6R/2f581e343e0b3052fcf53ac5bd43cce2.jpg' },
    { id: 'avatar10.jpg', url: 'https://i.postimg.cc/CL8z5MFN/299ba43cd3e2f2781dfccaf5d43e7680.jpg' },
    { id: 'avatar11.jpg', url: 'https://i.postimg.cc/ncmCrVHd/694063de7108d916ba95b74d5cb3636a.jpg' },
    { id: 'avatar12.jpg', url: 'https://i.postimg.cc/15FfXR9r/357141eb2db8e3dbe1dcafb37df5767d.jpg' },
    { id: 'avatar13.jpg', url: 'https://i.postimg.cc/gj8NkwNL/6339b727f95a8d5728e87b3a53d88568.jpg' },
    { id: 'avatar14.jpg', url: 'https://i.postimg.cc/mZHdSqRp/b040e76ad3b62145df9c938f4c96e5b8.jpg' },
    { id: 'avatar15.jpg', url: 'https://i.postimg.cc/RVtNhCMQ/300b74730de24b8b1d99a8b29faa85d6.jpg' },
    { id: 'avatar16.jpg', url: 'https://i.postimg.cc/xjzsP7Ys/sako.jpg' }
];

let selectedAvatarUrl = null;

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', async function() {
    console.log('✈️ Carregando perfil...');
    
    // Ocultar loading
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
    }
    
    // Verificar autenticação - usar getLoggedUser do auth.js
    const usuarioLogado = getLoggedUser();
    
    if (!usuarioLogado) {
        console.log('❌ Usuário não autenticado');
        showNotification('Por favor, faça login para acessar seu perfil', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    console.log('✅ Usuário autenticado:', usuarioLogado.email || usuarioLogado.nome);
    
    try {
        // Carregar dados do usuário
        await carregarDadosUsuario(usuarioLogado);
        
        // Carregar viagens/reservas
        await carregarViagensUsuario(usuarioLogado.email || usuarioLogado.nome);
        
        // Carregar avatares no modal
        carregarAvatares();
        
        // Configurar eventos dos formulários
        setupEventListeners();
        
        console.log('✅ Perfil carregado com sucesso');
    } catch (error) {
        console.error('❌ Erro ao carregar perfil:', error);
        showNotification('Erro ao carregar perfil. Tente novamente.', 'error');
    }
});

// ==========================================
// CARREGAR DADOS DO USUÁRIO (ÚNICA DEFINIÇÃO)
// ==========================================
async function carregarDadosUsuario(usuario) {
    try {
        // Dados pessoais na sidebar
        document.getElementById('profileName').textContent = usuario.nome || usuario.name || 'Usuário';
        document.getElementById('profileEmail').textContent = usuario.email || 'email@exemplo.com';
        
        // Avatar
        if (usuario.avatar || usuario.photo) {
            document.getElementById('profileAvatar').src = usuario.avatar || usuario.photo;
        }
        
        // Formulário de dados pessoais
        document.getElementById('nomeCompleto').value = usuario.nome || usuario.name || '';
        document.getElementById('nomeUsuario').value = usuario.nome_usuario || usuario.login || '';
        document.getElementById('cpfRg').value = usuario.cpf_rg || usuario.CPF || '';
        document.getElementById('email').value = usuario.email || '';
        document.getElementById('dataNasc').value = usuario.data_nascimento || usuario.data_nasc || '';
        document.getElementById('sexo').value = usuario.sexo || 'N';
        
        // Endereço
        if (usuario.endereco) {
            document.getElementById('endereco').value = usuario.endereco || '';
            document.getElementById('cep').value = usuario.cep || '';
            document.getElementById('numero').value = usuario.numero || '';
            document.getElementById('bairro').value = usuario.bairro || '';
            document.getElementById('cidade').value = usuario.cidade || '';
            document.getElementById('estado').value = usuario.estado || '';
            document.getElementById('complemento').value = usuario.complemento || '';
        }
        
        // Carregar dados de milhas
        if (usuario.id) {
            await carregarDadosMilhas(usuario.id);
        }
        
        console.log('✅ Dados do usuário carregados');
    } catch (error) {
        console.error('❌ Erro ao carregar dados:', error);
    }
}

// ==========================================
// CARREGAR VIAGENS/RESERVAS DO USUÁRIO
// ==========================================
async function carregarViagensUsuario(email) {
    try {
        console.log('🔍 Buscando reservas para:', email);
        
        const response = await fetch(`http://localhost/dashboard/SkyMilles/api.php?action=listar&resource=reservas&email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        console.log('📋 Resposta da API:', result);
        
        const container = document.getElementById('tripsContainer');
        
        if (result.success && result.data && result.data.length > 0) {
            exibirReservas(result.data, container);
        } else {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">✈️</div>
                    <h3>Nenhuma viagem encontrada</h3>
                    <p>Você ainda não possui viagens agendadas.</p>
                    <p style="font-size: 12px; color: #999; margin-top: 10px;">Email: ${email}</p>
                    <button class="btn-primary" onclick="window.location.href='destaques.html'" style="margin-top: 20px;">
                        🔍 Explorar Ofertas
                    </button>
                </div>
            `;
        }
    } catch (error) {
        console.error('❌ Erro ao carregar viagens:', error);
        
        const container = document.getElementById('tripsContainer');
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">❌</div>
                <h3>Erro ao carregar viagens</h3>
                <p>Tente novamente em alguns instantes.</p>
            </div>
        `;
    }
}

// ==========================================
// EXIBIR RESERVAS
// ==========================================
function exibirReservas(reservas, container) {
    container.innerHTML = `
        <div class="trips-list">
            ${reservas.map(reserva => criarCardReserva(reserva)).join('')}
        </div>
    `;
}

function criarCardReserva(reserva) {
    const dataPartida = new Date(reserva.data_partida);
    const dataFormatada = dataPartida.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    
    const statusClasses = {
        'pendente': 'status-pendente',
        'confirmada': 'status-confirmada',
        'cancelada': 'status-cancelada',
        'completada': 'status-completada'
    };
    
    const statusLabels = {
        'pendente': '⏳ Pendente',
        'confirmada': '✅ Confirmada',
        'cancelada': '❌ Cancelada',
        'completada': '🎉 Completada'
    };
    
    const statusClass = statusClasses[reserva.status] || 'status-pendente';
    const statusLabel = statusLabels[reserva.status] || 'Pendente';
    
    return `
        <div class="trip-card ${statusClass}">
            <div class="trip-header">
                <div class="trip-info">
                    <h3>${reserva.destino_nome}</h3>
                    <p class="trip-code">Código: <strong>${reserva.codigo_reserva}</strong></p>
                </div>
                <span class="trip-status">${statusLabel}</span>
            </div>
            
            <div class="trip-details">
                <div class="trip-detail-item">
                    <span class="detail-label">📅 Data Partida</span>
                    <span class="detail-value">${dataFormatada}</span>
                </div>
                
                <div class="trip-detail-item">
                    <span class="detail-label">👥 Passageiros</span>
                    <span class="detail-value">${reserva.num_pessoas} pessoa(s)</span>
                </div>
                
                <div class="trip-detail-item">
                    <span class="detail-label">💰 Valor Total</span>
                    <span class="detail-value">R$ ${parseFloat(reserva.valor_total).toFixed(2).replace('.', ',')}</span>
                </div>
                
                ${reserva.observacoes ? `
                <div class="trip-detail-item full-width">
                    <span class="detail-label">📝 Observações</span>
                    <span class="detail-value">${reserva.observacoes}</span>
                </div>
                ` : ''}
            </div>
            
            <div class="trip-actions">
                <button class="btn-secondary" onclick="editarReserva(${reserva.id}, '${reserva.destino_nome}')">
                    ✏️ Editar
                </button>
                <button class="btn-secondary" onclick="cancelarReserva(${reserva.id}, '${reserva.codigo_reserva}')">
                    ❌ Cancelar
                </button>
                <button class="btn-primary" onclick="visualizarDetalhes(${reserva.id})">
                    👁️ Detalhes
                </button>
            </div>
        </div>
    `;
}

// ==========================================
// CANCELAR RESERVA
// ==========================================
async function cancelarReserva(reservaId, codigo) {
    const confirmacao = confirm(`Deseja realmente cancelar a reserva ${codigo}?\n\nEsta ação não pode ser desfeita.`);
    
    if (!confirmacao) return;
    
    try {
        const response = await fetch(`http://localhost/dashboard/SkyMilles/api.php?action=atualizar&resource=reservas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: reservaId,
                status: 'cancelada'
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('✅ Reserva cancelada com sucesso!');
            // Recarregar viagens
            const usuario = JSON.parse(localStorage.getItem('usuario_logado'));
            await carregarViagensUsuario(usuario.email);
        } else {
            alert('❌ Erro ao cancelar reserva: ' + result.message);
        }
    } catch (error) {
        console.error('❌ Erro:', error);
        alert('Erro ao cancelar reserva');
    }
}

// ==========================================
// NAVEGAÇÃO ENTRE SEÇÕES
// ==========================================
function showSection(sectionName) {
    console.log('📄 Mostrando seção:', sectionName);
    
    // Esconder todas as seções
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remover active de todos os botões
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar seção selecionada
    document.getElementById(`section-${sectionName}`).classList.add('active');
    
    // Marcar botão como ativo
    event.target.classList.add('active');
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Formulário de dados pessoais
    const formDadosPessoais = document.getElementById('formDadosPessoais');
    if (formDadosPessoais) {
        formDadosPessoais.addEventListener('submit', handleSaveDadosPessoais);
    }
    
    // Formulário de endereço
    const formEndereco = document.getElementById('formEndereco');
    if (formEndereco) {
        formEndereco.addEventListener('submit', handleSaveEndereco);
    }
    
    // Formulário de senha
    const formSenha = document.getElementById('formSenha');
    if (formSenha) {
        formSenha.addEventListener('submit', handleChangeSenha);
    }
    
    // CEP
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('blur', buscarCEP);
    }
    
    console.log('✅ Event listeners configurados');
}

// ==========================================
// SALVAR DADOS PESSOAIS
// ==========================================
async function handleSaveDadosPessoais(e) {
    e.preventDefault();
    
    const usuario = getLoggedUser();
    const dados = {
        id: usuario.id,
        nome: document.getElementById('nomeCompleto').value,
        nome_usuario: document.getElementById('nomeUsuario').value,
        cpf_rg: document.getElementById('cpfRg').value,
        email: document.getElementById('email').value,
        data_nascimento: document.getElementById('dataNasc').value,
        sexo: document.getElementById('sexo').value
    };
    
    console.log('💾 Salvando dados:', dados);
    
    try {
        const response = await fetch('perfil.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'update_dados_pessoais',
                user_id: usuario.id,
                ...dados
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('✅ Dados salvos com sucesso!', 'success');
            
            // Atualizar localStorage
            usuario.nome = dados.nome;
            usuario.email = dados.email;
            usuario.nome_usuario = dados.nome_usuario;
            setLoggedUser(usuario);
            
            // Atualizar sidebar
            document.getElementById('profileName').textContent = usuario.nome;
            document.getElementById('profileEmail').textContent = usuario.email;
            
            // Atualizar UI global
            updateProfileUI();
        } else {
            showNotification('❌ ' + result.message, 'error');
        }
    } catch (error) {
        console.error('❌ Erro ao salvar:', error);
        showNotification('Erro ao salvar dados', 'error');
    }
}

// ==========================================
// SALVAR ENDEREÇO
// ==========================================
async function handleSaveEndereco(e) {
    e.preventDefault();
    
    const usuario = getLoggedUser();
    const endereco = {
        id: usuario.id,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        complemento: document.getElementById('complemento').value
    };
    
    console.log('💾 Salvando endereço:', endereco);
    
    try {
        const response = await fetch('perfil.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'update_endereco',
                user_id: usuario.id,
                endereco: `${endereco.endereco}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade}/${endereco.estado}`
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('✅ Endereço salvo com sucesso!', 'success');
        } else {
            showNotification('❌ ' + result.message, 'error');
        }
    } catch (error) {
        console.error('❌ Erro ao salvar:', error);
        showNotification('Erro ao salvar endereço', 'error');
    }
}

// ==========================================
// ALTERAR SENHA
// ==========================================
async function handleChangeSenha(e) {
    e.preventDefault();
    
    const senhaAtual = document.getElementById('senhaAtual').value;
    const novaSenha = document.getElementById('novaSenha').value;
    const confirmaNovaSenha = document.getElementById('confirmaNovaSenha').value;
    
    if (novaSenha !== confirmaNovaSenha) {
        showNotification('❌ As senhas não coincidem!', 'error');
        return;
    }
    
    if (novaSenha.length < 6) {
        showNotification('❌ A senha deve ter no mínimo 6 caracteres!', 'error');
        return;
    }
    
    const usuario = getLoggedUser();
    
    const data = {
        action: 'change_password',
        user_id: usuario.id,
        senhaAtual: senhaAtual,
        novaSenha: novaSenha
    };
    
    console.log('🔐 Alterando senha...');
    
    try {
        const response = await fetch('perfil.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('✅ Senha alterada com sucesso!', 'success');
            document.getElementById('formSenha').reset();
        } else {
            showNotification('❌ ' + result.message, 'error');
        }
    } catch (error) {
        console.error('❌ Erro ao alterar senha:', error);
        showNotification('Erro ao alterar senha', 'error');
    }
}

// ==========================================
// BUSCAR CEP
// ==========================================
async function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    
    if (cep.length !== 8) return;
    
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
            document.getElementById('endereco').value = data.logradouro || '';
            document.getElementById('bairro').value = data.bairro || '';
            document.getElementById('cidade').value = data.localidade || '';
            document.getElementById('estado').value = data.uf || '';
            showNotification('✅ CEP encontrado!', 'success');
        } else {
            showNotification('❌ CEP não encontrado', 'error');
        }
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
    }
}

// ==========================================
// MODAL DE AVATAR
// ==========================================
function carregarAvatares() {
    const grid = document.getElementById('avatarGrid');
    grid.innerHTML = '';
    
    avatares.forEach((avatar, index) => {
        const div = document.createElement('div');
        div.className = 'avatar-option';
        
        const img = document.createElement('img');
        img.src = avatar.url;
        img.alt = `Avatar ${index + 1}`;
        
        div.appendChild(img);
        div.onclick = () => selecionarAvatar(avatar.url, div);
        
        grid.appendChild(div);
    });
}

function openAvatarModal() {
    document.getElementById('avatarModal').classList.add('active');
}

function closeAvatarModal() {
    document.getElementById('avatarModal').classList.remove('active');
}

function selecionarAvatar(url, element) {
    document.querySelectorAll('.avatar-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    element.classList.add('selected');
    selectedAvatarUrl = url;
}

// ==========================================
// SALVAR AVATAR (CORRIGIDO)
// ==========================================
async function saveAvatar() {
    if (!selectedAvatarUrl) {
        showNotification('❌ Selecione um avatar!', 'error');
        return;
    }
    
    const usuario = getLoggedUser();
    
    if (!usuario || !usuario.id) {
        showNotification('❌ Usuário não identificado!', 'error');
        return;
    }
    
    const data = {
        action: 'update_avatar',
        user_id: usuario.id,
        avatar_url: selectedAvatarUrl
    };
    
    console.log('📸 Salvando avatar:', data);
    
    try {
        const response = await fetch('perfil.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        console.log('📸 Resposta do servidor:', result);
        
        if (result.success) {
            showNotification('✅ Avatar atualizado!', 'success');
            
            // Atualizar localStorage
            usuario.avatar = selectedAvatarUrl;
            usuario.photo = selectedAvatarUrl;
            setLoggedUser(usuario);
            
            // Atualizar imagens
            document.getElementById('profileAvatar').src = selectedAvatarUrl;
            
            // Atualizar UI global
            updateProfileUI();
            
            closeAvatarModal();
            
            // Limpar seleção
            selectedAvatarUrl = null;
        } else {
            showNotification('❌ Erro: ' + (result.message || 'Falha ao salvar avatar'), 'error');
        }
    } catch (error) {
        console.error('❌ Erro ao salvar avatar:', error);
        showNotification('Erro ao salvar avatar: ' + error.message, 'error');
    }
}

// ==========================================
// EXCLUIR CONTA
// ==========================================
function deleteAccount() {
    const confirmacao = confirm('⚠️ ATENÇÃO!\n\nVocê tem certeza que deseja excluir sua conta?\n\nEsta ação é PERMANENTE e não pode ser desfeita!\n\nTodos os seus dados serão apagados.');
    
    if (!confirmacao) return;
    
    const confirmacao2 = confirm('Esta é sua última chance!\n\nDeseja realmente continuar?');
    
    if (!confirmacao2) return;
    
    // TODO: Implementar exclusão de conta
    showNotification('🚧 Funcionalidade em desenvolvimento', 'info');
}

// Fechar modal ao clicar fora
document.getElementById('avatarModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeAvatarModal();
    }
});

// ==========================================
// SISTEMA DE MILHÕES
// ==========================================

async function carregarDadosMilhas(usuarioId) {
    try {
        console.log('💰 Carregando dados de milhas...');
        
        const response = await fetch('perfil.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'get_milhoes_data',
                user_id: usuarioId
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            exibirDadosMilhas(result.data);
        } else {
            console.error('Erro ao carregar milhas:', result.message);
        }
    } catch (error) {
        console.error('❌ Erro ao carregar milhas:', error);
    }
}

function exibirDadosMilhas(dados) {
    // Atualizar saldos
    document.getElementById('saldoMilhas').textContent = formatarNumero(dados.saldo_total);
    document.getElementById('milhasProcessando').textContent = formatarNumero(dados.milhas_processando);
    document.getElementById('milhasResgatadas').textContent = formatarNumero(dados.resgatadas_mes);
    
    // Atualizar progresso
    const percentual = (dados.milhas_para_proximo / dados.milhas_necessarias) * 100;
    document.getElementById('progressoFill').style.width = percentual + '%';
    document.getElementById('statusAtual').textContent = dados.status_atual;
    document.getElementById('progressoTexto').textContent = 
        formatarNumero(dados.milhas_para_proximo) + ' / ' + formatarNumero(dados.milhas_necessarias) + ' milhas';
    
    // Carregar histórico
    exibirHistorico(dados.historico);
    
    // Carregar opções de resgate
    exibirOpcoesResgate(dados.opcoes_resgate);
}

function exibirHistorico(historico) {
    const container = document.getElementById('historicoMilhas');
    
    if (!historico || historico.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <h3>Nenhum movimento encontrado</h3>
                <p>Seus movimentos de milhas aparecerão aqui.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = historico.map(item => `
        <div class="historico-item ${item.tipo === 'credito' ? 'positivo' : 'negativo'}">
            <div class="historico-info">
                <div class="historico-tipo">${item.tipo === 'credito' ? '➕' : '➖'} ${item.descricao}</div>
                <div class="historico-descricao">${item.motivo}</div>
                <div class="historico-data">${formatarData(item.data)}</div>
            </div>
            <div class="historico-valor ${item.tipo === 'credito' ? '' : 'negativo'}">
                ${item.tipo === 'credito' ? '+' : '-'}${formatarNumero(Math.abs(item.valor))}
            </div>
        </div>
    `).join('');
}

function exibirOpcoesResgate(opcoes) {
    const container = document.getElementById('resgateOpcoes');
    
    if (!opcoes || opcoes.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-icon">🎁</div>
                <h3>Nenhuma opção de resgate disponível</h3>
                <p>Novos benefícios em breve!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = opcoes.map(opcao => {
        const usuario = getLoggedUser();
        const disponivel = usuario.id && usuario.milhas_disponiveis >= opcao.custo_milhas;
        
        return `
            <div class="resgate-opcao">
                <div class="resgate-icon">${opcao.icone}</div>
                <div class="resgate-nome">${opcao.nome}</div>
                <div class="resgate-custo">${formatarNumero(opcao.custo_milhas)} milhas</div>
                <div class="resgate-descricao">${opcao.descricao}</div>
                <div class="resgate-status ${disponivel ? 'disponivel' : 'indisponivel'}">
                    ${disponivel ? '✓ Disponível' : '❌ Milhas insuficientes'}
                </div>
                <button class="btn-resgatar" 
                    onclick="resgatar(${opcao.id}, '${opcao.nome}')"
                    ${!disponivel ? 'disabled' : ''}>
                    ${disponivel ? 'Resgatar' : 'Indisponível'}
                </button>
            </div>
        `;
    }).join('');
}

function switchMilhoesTab(tabName) {
    // Esconder todas as abas
    document.querySelectorAll('.milhoes-tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remover active dos botões
    document.querySelectorAll('.milhoes-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar aba selecionada
    document.getElementById(`tab-${tabName}`).classList.add('active');
    
    // Marcar botão como ativo
    event.target.classList.add('active');
}

async function resgatar(opcaoId, nomeBeneficio) {
    if (!confirm(`Deseja resgatar ${nomeBeneficio}?`)) {
        return;
    }
    
    const usuario = getLoggedUser();
    
    try {
        const response = await fetch('perfil.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'resgatar_milhas',
                user_id: usuario.id,
                opcao_id: opcaoId
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('✅ Resgate realizado com sucesso!', 'success');
            
            // Recarregar dados de milhas
            await carregarDadosMilhas(usuario.id);
        } else {
            showNotification('❌ ' + result.message, 'error');
        }
    } catch (error) {
        console.error('❌ Erro ao resgatar:', error);
        showNotification('Erro ao processar resgate', 'error');
    }
}

function formatarNumero(numero) {
    if (!numero) return '0';
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatarData(dataString) {
    const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dataString).toLocaleDateString('pt-BR', opcoes);
}

console.log('✅ perfil.js carregado');