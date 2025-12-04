// ==========================================
// SISTEMA DE AUTENTICAÇÃO GLOBAL
// ==========================================
// Adicione este arquivo em todas as páginas: <script src="auth.js"></script>

const AUTH_STORAGE_KEY = 'skymilles_user';
const DEFAULT_AVATAR = 'https://i.postimg.cc/qMvvdyYp/download-3.jpg';

// Mapeamento de avatares
const AVATAR_MAP = {
    'avatar1.jpg': 'https://i.postimg.cc/qMvvdyYp/download-3.jpg',
    'avatar2.jpg': 'https://i.postimg.cc/gk22P85P/doninha.jpg',
    'avatar3.jpg': 'https://i.postimg.cc/Qxddr1P8/download-4.jpg',
    'avatar4.jpg': 'https://i.postimg.cc/DyG80f2p/95d2087a51e8477cff8d9aac8a1687ac.jpg',
    'avatar5.jpg': 'https://i.postimg.cc/kXSBGMnS/09fae38fce5289fec7b95973e168b74e.jpg',
    'avatar6.jpg': 'https://i.postimg.cc/T3XhD8wq/130bcb30c2ece47f478f17fc599e079f.jpg',
    'avatar7.jpg': 'https://i.postimg.cc/PrDPJfty/c3119445123adbaabddd9e917d671962.jpg',
    'avatar8.jpg': 'https://i.postimg.cc/y8zWZqdy/135745bda10f46307e35af3b61ffa7c0.jpg',
    'avatar9.jpg': 'https://i.postimg.cc/Vkc5Cy6R/2f581e343e0b3052fcf53ac5bd43cce2.jpg',
    'avatar10.jpg': 'https://i.postimg.cc/CL8z5MFN/299ba43cd3e2f2781dfccaf5d43e7680.jpg',
    'avatar11.jpg': 'https://i.postimg.cc/ncmCrVHd/694063de7108d916ba95b74d5cb3636a.jpg',
    'avatar12.jpg': 'https://i.postimg.cc/15FfXR9r/357141eb2db8e3dbe1dcafb37df5767d.jpg',
    'avatar13.jpg': 'https://i.postimg.cc/gj8NkwNL/6339b727f95a8d5728e87b3a53d88568.jpg',
    'avatar14.jpg': 'https://i.postimg.cc/mZHdSqRp/b040e76ad3b62145df9c938f4c96e5b8.jpg',
    'avatar15.jpg': 'https://i.postimg.cc/RVtNhCMQ/300b74730de24b8b1d99a8b29faa85d6.jpg',
    'avatar16.jpg': 'https://i.postimg.cc/xjzsP7Ys/sako.jpg'
};

// ==========================================
// FUNÇÕES DE GERENCIAMENTO DE USUÁRIO
// ==========================================

function getLoggedUser() {
    try {
        const userData = localStorage.getItem(AUTH_STORAGE_KEY);
        if (userData) {
            return JSON.parse(userData);
        }
    } catch (error) {
        console.error('Erro ao recuperar dados do usuário:', error);
    }
    return null;
}

function setLoggedUser(userData) {
    try {
        // Garantir que ID do usuário seja armazenado
        if (!userData.id && userData.usuario_id) {
            userData.id = userData.usuario_id;
        }
        
        // Converter foto_perfil para URL completa se necessário
        if (userData.photo && !userData.photo.startsWith('http')) {
            userData.photo = AVATAR_MAP[userData.photo] || userData.photo;
        }
        
        if (userData.avatar && !userData.avatar.startsWith('http')) {
            userData.avatar = AVATAR_MAP[userData.avatar] || userData.avatar;
        }
        
        console.log('💾 Salvando usuário:', userData.id, userData.email);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
        return true;
    } catch (error) {
        console.error('Erro ao salvar dados do usuário:', error);
        return false;
    }
}

function clearLoggedUser() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

function isUserLoggedIn() {
    return getLoggedUser() !== null;
}

// ==========================================
// ATUALIZAÇÃO AUTOMÁTICA DA UI
// ==========================================

function updateProfileUI() {
    const user = getLoggedUser();
    
    // Atualizar foto de perfil desktop
    const perfilImg = document.getElementById('perfil-img');
    if (perfilImg) {
        if (user && user.photo) {
            perfilImg.src = user.photo;
        } else {
            perfilImg.src = DEFAULT_AVATAR;
        }
    }
    
    // Atualizar foto de perfil mobile
    const mobilePerfilImg = document.getElementById('mobile-perfil-img');
    if (mobilePerfilImg) {
        if (user && user.photo) {
            mobilePerfilImg.src = user.photo;
        } else {
            mobilePerfilImg.src = DEFAULT_AVATAR;
        }
    }
    
    // Atualizar título do menu mobile
    const mobileMenuTitle = document.querySelector('.mobile-menu-title');
    if (mobileMenuTitle) {
        if (user) {
            mobileMenuTitle.textContent = `Olá, ${user.name.split(' ')[0]}!`;
        } else {
            mobileMenuTitle.textContent = 'Faça seu login';
        }
    }
    
    // Atualizar botões do dropdown
    updateDropdownButtons(user);
}

function updateDropdownButtons(user) {
    // Desktop dropdown
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu) {
        if (user) {
            dropdownMenu.innerHTML = `
                <button onclick="goToProfile()">Meu Perfil</button>
                <button onclick="logoutUser()">Sair</button>
            `;
        } else {
            dropdownMenu.innerHTML = `
                <button onclick="location.href='login.html'">Login</button>
                <button onclick="location.href='cadastro.html'">Cadastrar</button>
            `;
        }
    }
    
    // Mobile dropdown
    const mobileDropdownMenu = document.getElementById('mobile-dropdown-menu');
    if (mobileDropdownMenu) {
        if (user) {
            mobileDropdownMenu.innerHTML = `
                <button onclick="goToProfile()">Meu Perfil</button>
                <button onclick="logoutUser()">Sair</button>
            `;
        } else {
            mobileDropdownMenu.innerHTML = `
                <button onclick="location.href='login.html'">Login</button>
                <button onclick="location.href='cadastro.html'">Cadastrar</button>
            `;
        }
    }
}

// ==========================================
// FUNÇÕES DE NAVEGAÇÃO
// ==========================================

function goToProfile() {
    window.location.href = 'perfil.html';
}

function logoutUser() {
    if (confirm('Deseja realmente sair?')) {
        console.log('👋 Fazendo logout...');
        
        // Limpar localStorage
        clearLoggedUser();
        
        // Logout do servidor
        fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'logout'
            })
        }).catch(err => console.error('Erro no logout:', err));
        
        // Resetar UI
        const perfilImg = document.getElementById('perfil-img');
        if (perfilImg) perfilImg.src = DEFAULT_AVATAR;
        
        const mobilePerfilImg = document.getElementById('mobile-perfil-img');
        if (mobilePerfilImg) mobilePerfilImg.src = DEFAULT_AVATAR;
        
        updateDropdownButtons(null);
        
        // Mostrar notificação
        showNotification('Você saiu da sua conta', 'success');
        
        // Redirecionar para home
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 800);
    }
}

// ==========================================
// PROTEÇÃO DE PÁGINAS
// ==========================================

function requireLogin() {
    if (!isUserLoggedIn()) {
        showNotification('Você precisa fazer login para acessar esta página!', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return false;
    }
    return true;
}

function redirectIfLoggedIn() {
    if (isUserLoggedIn()) {
        console.log('✅ Usuário já está logado');
        return true;
    }
    return false;
}

// ==========================================
// NOTIFICAÇÕES
// ==========================================

function showNotification(message, type = 'info') {
    // Remover notificações anteriores
    const oldNotifications = document.querySelectorAll('.notification');
    oldNotifications.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        font-size: 15px;
        font-weight: 500;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ==========================================
// INICIALIZAÇÃO AUTOMÁTICA
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Sistema de autenticação carregado');
    
    // Atualizar UI com dados do usuário
    updateProfileUI();
    
    // Log do status
    const user = getLoggedUser();
    if (user) {
        console.log('✅ Usuário logado:', user.nome || user.name || user.email);
    } else {
        console.log('❌ Nenhum usuário logado');
    }
});

// ==========================================
// EXPORTAR FUNÇÕES GLOBALMENTE
// ==========================================

window.getLoggedUser = getLoggedUser;
window.setLoggedUser = setLoggedUser;
window.clearLoggedUser = clearLoggedUser;
window.isUserLoggedIn = isUserLoggedIn;
window.updateProfileUI = updateProfileUI;
window.goToProfile = goToProfile;
window.logoutUser = logoutUser;
window.requireLogin = requireLogin;
window.redirectIfLoggedIn = redirectIfLoggedIn;
window.showNotification = showNotification;

// Adicionar CSS das animações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
