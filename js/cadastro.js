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

// Carregar avatares no modal
function carregarAvatares() {
    const grid = document.getElementById('avatarGrid');
    grid.innerHTML = '';
    
    avatares.forEach((avatar, index) => {
        const div = document.createElement('div');
        div.className = 'avatar-option';
        if (index === 0) div.classList.add('selected');
        
        const img = document.createElement('img');
        img.src = avatar.url;
        img.alt = `Avatar ${index + 1}`;
        
        div.appendChild(img);
        div.onclick = () => selecionarAvatar(avatar.id, avatar.url, div);
        
        grid.appendChild(div);
    });
}

// Abrir modal de avatares
function openAvatarModal() {
    document.getElementById('avatarModal').classList.add('active');
}

// Fechar modal de avatares
function closeAvatarModal() {
    document.getElementById('avatarModal').classList.remove('active');
}

// Selecionar avatar
function selecionarAvatar(id, url, element) {
    // Remover seleção anterior
    document.querySelectorAll('.avatar-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Adicionar seleção ao clicado
    element.classList.add('selected');
    
    // Atualizar imagem principal
    document.getElementById('selectedAvatar').src = url;
    
    // Salvar ID e URL do avatar no campo hidden
    document.getElementById('fotoPerfilSelecionada').value = id;
    document.getElementById('fotoPerfilSelecionada').dataset.url = url;
    
    // Fechar modal após 500ms
    setTimeout(closeAvatarModal, 500);
}

// ===== BUSCA DE CEP =====
function formatarCEP(valor) {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 5) {
        valor = valor.substring(0, 5) + '-' + valor.substring(5, 8);
    }
    return valor;
}

function limparEndereco() {
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('cepStatus').textContent = '';
}

async function buscarCEP(cep) {
    cep = cep.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        return;
    }
    
    const cepStatus = document.getElementById('cepStatus');
    cepStatus.textContent = '🔍 Buscando CEP...';
    cepStatus.style.color = '#ffdf86';
    
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            cepStatus.textContent = '❌ CEP não encontrado';
            cepStatus.style.color = '#ff5252';
            limparEndereco();
            return;
        }
        
        document.getElementById('endereco').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';
        
        cepStatus.textContent = '✅ CEP encontrado!';
        cepStatus.style.color = '#4caf50';
        
        document.getElementById('numero').focus();
        
        setTimeout(() => {
            cepStatus.textContent = '';
        }, 3000);
        
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        cepStatus.textContent = '⚠️ Erro ao buscar CEP';
        cepStatus.style.color = '#ff9800';
        limparEndereco();
    }
}

// Aguardar o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    carregarAvatares();
    
    const form = document.getElementById('cadastroForm');
    const successMessage = document.getElementById('successMessage');
    const cepInput = document.getElementById('cep');
    
    // Event listener para formatação do CEP
    cepInput.addEventListener('input', function(e) {
        e.target.value = formatarCEP(e.target.value);
    });
    
    // Event listener para buscar CEP
    cepInput.addEventListener('blur', function(e) {
        const cep = e.target.value.replace(/\D/g, '');
        if (cep.length === 8) {
            buscarCEP(cep);
        }
    });
    
    cepInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const cep = e.target.value.replace(/\D/g, '');
            if (cep.length === 8) {
                buscarCEP(cep);
            }
        }
    });

    // Event listener do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        console.log('📝 Formulário submetido');
        
        const senha = document.getElementById('senha').value;
        const confirmaSenha = document.getElementById('confirmaSenha').value;
        
        if (senha !== confirmaSenha) {
            alert('As senhas não coincidem!');
            return;
        }
        
        console.log('✅ Senhas conferem, prosseguindo...');
        
        // Montar endereço completo
        const endereco = document.getElementById('endereco').value;
        const numero = document.getElementById('numero').value;
        const complemento = document.getElementById('complemento').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;
        
        const enderecoCompleto = `${endereco}, ${numero}${complemento ? ' - ' + complemento : ''} - ${bairro}, ${cidade}/${estado}`;
        
        console.log('📍 Endereço completo:', enderecoCompleto);
        
        const fotoPerfilInput = document.getElementById('fotoPerfilSelecionada');
        
        console.log('📸 Avatar selecionado:', fotoPerfilInput.value);
        console.log('🔗 URL do avatar:', fotoPerfilInput.dataset.url);
        
        const usuario = {
            nomeCompleto: document.getElementById('nomeCompleto').value,
            cpfRg: document.getElementById('cpfRg').value,
            email: document.getElementById('email').value,
            cep: document.getElementById('cep').value,
            nomeUsuario: document.getElementById('nomeUsuario').value,
            endereco: enderecoCompleto,
            senha: senha,
            confirmaSenha: confirmaSenha,
            fotoPerfilSelecionada: fotoPerfilInput.value
        };
        
        console.log('📤 Enviando dados:', usuario);
        
        // Desabilitar botão para evitar duplo envio
        const btnCadastrar = form.querySelector('button[type="submit"]');
        const textoOriginal = btnCadastrar.textContent;
        btnCadastrar.disabled = true;
        btnCadastrar.textContent = 'CADASTRANDO...';
        
        try {
            console.log('🌐 Fazendo requisição para cadastro.php...');
            
            const response = await fetch('cadastro.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario)
            });
            
            console.log('📡 Resposta recebida:', response.status);
            
            const result = await response.json();
            console.log('✅ Resposta do servidor:', result);
            
            // Reabilitar botão
            btnCadastrar.disabled = false;
            btnCadastrar.textContent = textoOriginal;
            
            if (result.success) {
                console.log('🎉 Cadastro bem-sucedido!');
                
                // Criar objeto de usuário para salvar no localStorage
                const userData = {
                    id: result.cod_usuario,
                    name: usuario.nomeCompleto,
                    email: usuario.email,
                    username: usuario.nomeUsuario,
                    photo: fotoPerfilInput.dataset.url || avatares[0].url
                };
                
                console.log('💾 Salvando usuário:', userData);
                
                // Salvar usuário no sistema de autenticação
                if (typeof setLoggedUser === 'function') {
                    setLoggedUser(userData);
                    console.log('✅ Usuário salvo com setLoggedUser');
                } else {
                    localStorage.setItem('skymilles_user', JSON.stringify(userData));
                    console.log('✅ Usuário salvo com localStorage');
                }
                
                // Mostrar mensagem de sucesso
                if (typeof showNotification === 'function') {
                    showNotification('✅ Cadastro realizado com sucesso! Redirecionando...', 'success');
                } else {
                    successMessage.textContent = '✅ Cadastro realizado com sucesso!';
                    successMessage.classList.add('show');
                    console.log('✅ Notificação mostrada (fallback)');
                }
                
                // Limpar formulário
                form.reset();
                document.getElementById('selectedAvatar').src = avatares[0].url;
                document.getElementById('fotoPerfilSelecionada').value = avatares[0].id;
                document.getElementById('fotoPerfilSelecionada').dataset.url = avatares[0].url;
                limparEndereco();
                
                console.log('⏱️ Redirecionando em 2 segundos...');
                
                // Redirecionar para página inicial após 2 segundos
                setTimeout(() => {
                    console.log('🚀 Redirecionando para index.html');
                    window.location.href = 'index.html';
                }, 2000);
                
            } else {
                console.error('❌ Erro no cadastro:', result.message);
                
                if (typeof showNotification === 'function') {
                    showNotification('❌ ' + result.message, 'error');
                } else {
                    alert('Erro: ' + result.message);
                }
            }
            
        } catch (error) {
            console.error('❌ Erro ao cadastrar:', error);
            console.error('Detalhes do erro:', {
                message: error.message,
                stack: error.stack
            });
            
            // Reabilitar botão
            btnCadastrar.disabled = false;
            btnCadastrar.textContent = textoOriginal;
            
            if (typeof showNotification === 'function') {
                showNotification('Erro ao conectar com o servidor!', 'error');
            } else {
                alert('Erro ao conectar com o servidor. Verifique:\n1. Se o XAMPP/WAMP está rodando\n2. Se o arquivo cadastro.php existe\n3. Se o MySQL está ativo\n\nErro técnico: ' + error.message);
            }
        }
    });

    // Fechar modal ao clicar fora
    document.getElementById('avatarModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeAvatarModal();
        }
    });
    
    // Salvar URL do avatar inicial
    document.getElementById('fotoPerfilSelecionada').dataset.url = avatares[0].url;
});