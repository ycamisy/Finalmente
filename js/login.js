// ============================================
// CONFIGURAÇÕES - SUBSTITUA COM SUAS CHAVES
// ============================================
const GOOGLE_CLIENT_ID = '709619499906-vkqmub7bvhbgr47pfgr1g4mfjdg0a4ev.apps.googleusercontent.com';
const FACEBOOK_APP_ID = '123456789012345';

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

// ============================================
// INICIALIZAÇÃO
// ============================================
let googleInitialized = false;
let facebookInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Sistema de login inicializado');
    
    checkSession();
    setupTraditionalLogin();
    setTimeout(initializeGoogle, 1000);
    initializeFacebook();
});

// ============================================
// LOGIN TRADICIONAL
// ============================================
function setupTraditionalLogin() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', handleTraditionalLogin);
    }
}

async function handleTraditionalLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showError('Preencha todos os campos!');
        return;
    }
    
    console.log('🔐 Tentando login tradicional...');
    
    try {
        const response = await fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'login',
                username: username,
                password: password
            })
        });
        
        const result = await response.json();
        console.log('✅ Resposta do servidor:', result);
        
        if (result.success) {
            // Converter foto_perfil para URL completa
            if (result.user.photo && !result.user.photo.startsWith('http')) {
                result.user.photo = AVATAR_MAP[result.user.photo] || result.user.photo;
            }
            
            // Salvar usuário usando o sistema de autenticação
            if (typeof setLoggedUser === 'function') {
                setLoggedUser(result.user);
            } else {
                localStorage.setItem('skymilles_user', JSON.stringify(result.user));
            }
            
            // Mostrar mensagem de sucesso
            if (typeof showNotification === 'function') {
                showNotification('✅ Login realizado com sucesso! Redirecionando...', 'success');
            } else {
                showSuccess('Login realizado com sucesso!');
            }
            
            const destino = result.user.is_admin ? 'adm.html' : 'index.html';
            setTimeout(() => {
                window.location.href = destino;
            }, 1500);
        } else {
            showError(result.message);
        }
    } catch (error) {
        console.error('❌ Erro no login:', error);
        showError('Erro ao conectar com o servidor. Verifique se o XAMPP está rodando!');
    }
}

// ============================================
// GOOGLE SIGN-IN
// ============================================
function initializeGoogle() {
    console.log('🔵 Inicializando Google Sign-In...');
    
    if (typeof google === 'undefined') {
        console.error('❌ Google SDK não carregado');
        return;
    }
    
    try {
        google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse,
            auto_select: false,
            cancel_on_tap_outside: true
        });
        
        googleInitialized = true;
        console.log('✅ Google Sign-In inicializado');
        
        google.accounts.id.renderButton(
            document.getElementById('googleLoginBtn'),
            { 
                theme: 'filled_blue',
                size: 'large',
                width: 350,
                text: 'continue_with'
            }
        );
    } catch (error) {
        console.error('❌ Erro ao inicializar Google:', error);
    }
}

document.getElementById('googleLoginBtn')?.addEventListener('click', function(e) {
    if (!googleInitialized) {
        console.log('⏳ Google ainda não inicializado, tentando novamente...');
        initializeGoogle();
        setTimeout(() => {
            if (googleInitialized) {
                google.accounts.id.prompt();
            }
        }, 500);
    } else {
        google.accounts.id.prompt();
    }
});

async function handleGoogleResponse(response) {
    console.log('🔵 Resposta do Google recebida');
    
    try {
        const payload = parseJwt(response.credential);
        console.log('👤 Dados do usuário Google:', payload);
        
        showSuccess('Conectando com Google...');
        
        const serverResponse = await fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'google_login',
                google_id: payload.sub,
                email: payload.email,
                name: payload.name,
                photo: payload.picture
            })
        });
        
        const result = await serverResponse.json();
        console.log('✅ Resposta do servidor Google:', result);
        
        if (result.success) {
            // Salvar usuário
            if (typeof setLoggedUser === 'function') {
                setLoggedUser(result.user);
            } else {
                localStorage.setItem('skymilles_user', JSON.stringify(result.user));
            }
            
            if (typeof showNotification === 'function') {
                showNotification('✅ Login com Google realizado! Redirecionando...', 'success');
            } else {
                showSuccess(result.message);
            }
            
            const destino = result.user.is_admin ? 'adm.html' : 'index.html';
            setTimeout(() => {
                window.location.href = destino;
            }, 1500);
        } else {
            showError(result.message);
        }
    } catch (error) {
        console.error('❌ Erro no login Google:', error);
        showError('Erro ao fazer login com Google: ' + error.message);
    }
}

function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
    }
}

// ============================================
// FACEBOOK LOGIN
// ============================================
function initializeFacebook() {
    console.log('🔵 Inicializando Facebook SDK...');
    
    window.fbAsyncInit = function() {
        FB.init({
            appId: FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v18.0'
        });
        
        facebookInitialized = true;
        console.log('✅ Facebook SDK inicializado');
        
        FB.getLoginStatus(function(response) {
            console.log('Facebook status:', response);
        });
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); 
        js.id = id;
        js.src = "https://connect.facebook.net/pt_BR/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

document.getElementById('facebookLoginBtn')?.addEventListener('click', function() {
    console.log('🔵 Tentando login Facebook...');
    
    if (!facebookInitialized) {
        showError('Facebook ainda não está pronto. Aguarde um momento...');
        setTimeout(() => {
            if (facebookInitialized) {
                loginWithFacebook();
            }
        }, 2000);
        return;
    }
    
    loginWithFacebook();
});

function loginWithFacebook() {
    showSuccess('Conectando com Facebook...');
    
    FB.login(function(response) {
        console.log('Facebook login response:', response);
        
        if (response.authResponse) {
            console.log('✅ Facebook autenticado');
            
            FB.api('/me', { fields: 'id,name,email,picture.width(200).height(200)' }, 
                async function(userData) {
                    console.log('👤 Dados do usuário Facebook:', userData);
                    
                    try {
                        const serverResponse = await fetch('login.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                action: 'facebook_login',
                                facebook_id: userData.id,
                                email: userData.email || `fb_${userData.id}@facebook.com`,
                                name: userData.name,
                                photo: userData.picture?.data?.url || ''
                            })
                        });
                        
                        const result = await serverResponse.json();
                        console.log('✅ Resposta do servidor Facebook:', result);
                        
                        if (result.success) {
                            if (typeof setLoggedUser === 'function') {
                                setLoggedUser(result.user);
                            } else {
                                localStorage.setItem('skymilles_user', JSON.stringify(result.user));
                            }
                            
                            if (typeof showNotification === 'function') {
                                showNotification('✅ Login com Facebook realizado! Redirecionando...', 'success');
                            } else {
                                showSuccess(result.message);
                            }
                            
                            const destino = result.user.is_admin ? 'adm.html' : 'index.html';
                            setTimeout(() => {
                                window.location.href = destino;
                            }, 1500);
                        } else {
                            showError(result.message);
                        }
                    } catch (error) {
                        console.error('❌ Erro ao enviar dados Facebook:', error);
                        showError('Erro ao fazer login com Facebook');
                    }
                }
            );
        } else {
            console.log('❌ Facebook login cancelado');
            showError('Login com Facebook cancelado');
        }
    }, {scope: 'public_profile,email'});
}

// ============================================
// GERENCIAMENTO DE SESSÃO
// ============================================
function checkSession() {
    const user = typeof getLoggedUser === 'function' ? getLoggedUser() : null;
    
    if (!user) {
        const userStr = localStorage.getItem('skymilles_user');
        if (userStr) {
            try {
                const userData = JSON.parse(userStr);
                console.log('✅ Sessão encontrada:', userData);
                displayUserInfo(userData);
            } catch (error) {
                console.error('Erro ao carregar sessão:', error);
                localStorage.removeItem('skymilles_user');
            }
        }
    } else {
        displayUserInfo(user);
    }
}

function displayUserInfo(user) {
    const loginForm = document.getElementById('loginForm');
    const userInfo = document.getElementById('userInfo');
    
    if (loginForm) loginForm.style.display = 'none';
    if (userInfo) {
        userInfo.style.display = 'block';
        
        const userName = document.getElementById('userName');
        const userEmail = document.getElementById('userEmail');
        const userPhoto = document.getElementById('userPhoto');
        
        if (userName) userName.textContent = user.name;
        if (userEmail) userEmail.textContent = user.email;
        if (userPhoto) {
            userPhoto.src = user.photo || 'https://i.postimg.cc/qMvvdyYp/download-3.jpg';
        }
    }
}

function logout() {
    if (confirm('Deseja realmente sair?')) {
        console.log('👋 Fazendo logout...');
        
        if (typeof clearLoggedUser === 'function') {
            clearLoggedUser();
        } else {
            localStorage.removeItem('skymilles_user');
        }
        
        fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'logout'
            })
        });
        
        if (googleInitialized && typeof google !== 'undefined') {
            google.accounts.id.disableAutoSelect();
        }
        
        if (facebookInitialized && typeof FB !== 'undefined') {
            FB.logout();
        }
        
        window.location.reload();
    }
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================
function goBack() {
        window.history.back();
}

function showError(message) {
    console.error('❌', message);
    
    if (typeof showNotification === 'function') {
        showNotification(message, 'error');
    } else {
        const errorDiv = document.getElementById('errorMessage');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            
            setTimeout(() => {
                errorDiv.style.display = 'none';
            }, 5000);
        }
    }
}

function showSuccess(message) {
    console.log('✅', message);
    
    if (typeof showNotification === 'function') {
        showNotification(message, 'success');
    } else {
        const successDiv = document.getElementById('successMessage');
        if (successDiv) {
            successDiv.textContent = message;
            successDiv.style.display = 'block';
            
            setTimeout(() => {
                successDiv.style.display = 'none';
            }, 3000);
        }
    }
}

// ============================================
// DEBUG INFO
// ============================================
console.log('==========================================');
console.log('🔐 SISTEMA DE LOGIN SKYMILLES');
console.log('==========================================');
console.log('📋 Credenciais de teste:');
console.log('   Use usuários cadastrados no banco');
console.log('   Ou cadastre em: cadastro.html');
console.log('==========================================');
console.log('🔑 Configurações:');
console.log('   Google Client ID:', GOOGLE_CLIENT_ID);
console.log('   Facebook App ID:', FACEBOOK_APP_ID);
console.log('==========================================');

