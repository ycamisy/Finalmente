// ==================== VARIÁVEIS GLOBAIS ====================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("overlay");
const backArrow = document.getElementById("back-arrow");
const perfilImg = document.getElementById("perfil-img");
const dropdownMenu = document.getElementById("dropdown-menu");
const mobilePerfilImg = document.getElementById("mobile-perfil-img");
const mobileDropdownMenu = document.getElementById("mobile-dropdown-menu");
const cardWrappers = document.querySelectorAll('.card-wrapper');
const searchIcon = document.getElementById("searchIcon");
const searchInputContainer = document.getElementById("searchInputContainer");
const searchInput = document.getElementById("search-input");
const airlineCards = document.querySelectorAll('.airline-card');
const currentAirlineLogo = document.getElementById('current-airline-logo');
const currentAirlineName = document.querySelector('.current-airline-name');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const planoCards = document.querySelectorAll('.plano-card');

let searchActive = false;
let currentAirlineIndex = 0;
let activeCard = null;

const airlines = [
    { name: 'embraer', logo: 'https://i.postimg.cc/T39wB2pH/embraer-1.jpg', displayName: 'Embraer' },
    { name: 'azul', logo: 'https://i.postimg.cc/hGtjnFdr/azul.png', displayName: 'Azul' },
    { name: 'latam', logo: 'https://i.postimg.cc/TP3wx8D0/latam.png', displayName: 'LATAM' },
    { name: 'qatar', logo: 'https://i.postimg.cc/Bng6RZX7/qatar.jpg', displayName: 'Qatar Airways' },
    { name: 'eurowings', logo: 'https://i.postimg.cc/YC39T2hX/eurowings-1.jpg', displayName: 'Eurowings' },
    { name: 'airfrance', logo: 'https://i.postimg.cc/nLhzx8DK/france-Airlines.jpg', displayName: 'Air France' },
    { name: 'ethiopian', logo: 'https://i.postimg.cc/qvLRWBzL/ethiopian-1.jpg', displayName: 'Ethiopian Airways' },
    { name: 'jal', logo: 'https://i.postimg.cc/2Sw6gjVc/japan-1.jpg', displayName: 'Japan Airlines' },
    { name: 'easyjet', logo: 'https://i.postimg.cc/pdLTvNFJ/ease-Jet.png', displayName: 'EasyJet' }
];

// ==================== MENU MOBILE ====================
function initMobileMenu() {
    if (!hamburger || !mobileMenu || !overlay) return;

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
        overlay.classList.toggle("active");

        if (dropdownMenu) dropdownMenu.classList.remove("active");
        if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");

        document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto";
    });

    overlay.addEventListener("click", () => {
        closeAllMenus();
    });

    if (backArrow) {
        backArrow.addEventListener("click", () => {
            closeAllMenus();
        });
    }

    const mobileMenuItems = document.querySelectorAll(".mobile-menu-item");
    if (mobileMenuItems.length) {
        mobileMenuItems.forEach(item => {
            item.addEventListener("click", () => {
                closeAllMenus();
            });
        });
    }
}

function closeAllMenus() {
    if (hamburger) hamburger.classList.remove("active");
    if (mobileMenu) mobileMenu.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    if (dropdownMenu) dropdownMenu.classList.remove("active");
    if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
    document.body.style.overflow = "auto";
}

// ==================== DROPDOWN DO PERFIL ====================
function initProfileDropdown() {
    if (perfilImg && dropdownMenu) {
        perfilImg.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle("active");
        });
    }

    if (mobilePerfilImg && mobileDropdownMenu) {
        mobilePerfilImg.addEventListener("click", (e) => {
            e.stopPropagation();
            mobileDropdownMenu.classList.toggle("active");
        });
    }

    document.addEventListener("click", (e) => {
        if (dropdownMenu && !dropdownMenu.contains(e.target) && e.target !== perfilImg) {
            dropdownMenu.classList.remove("active");
        }
        if (mobileDropdownMenu && !mobileDropdownMenu.contains(e.target) && e.target !== mobilePerfilImg) {
            mobileDropdownMenu.classList.remove("active");
        }
    });

    if (dropdownMenu) {
        dropdownMenu.addEventListener("click", (e) => e.stopPropagation());
    }
    if (mobileDropdownMenu) {
        mobileDropdownMenu.addEventListener("click", (e) => e.stopPropagation());
    }
}

// ==================== SISTEMA DE PESQUISA ====================
searchIcon.addEventListener("click", e => {
    e.stopPropagation();
    searchActive = !searchActive;

    if (searchActive) {
        searchInputContainer.classList.add("active");
        searchIcon.classList.add("active");
        setTimeout(() => searchInput.focus(), 400);
    } else {
        searchInputContainer.classList.remove("active");
        searchIcon.classList.remove("active");
        searchInput.value = "";
        limparPesquisa();
    }
});

// Função de pesquisa
function pesquisarConteudo(termo) {
    const termoBusca = termo.toLowerCase().trim();
    
    if (termoBusca === "") {
        limparPesquisa();
        return;
    }
    
    // Elementos pesquisáveis
    const secoes = document.querySelectorAll('.historia-section, .valores-section, .diferenciais-section, .depoimentos-section');
    const cards = document.querySelectorAll('.valor-card, .diferencial-card, .depoimento-card');
    let encontrados = 0;
    
    // Resetar todos
    secoes.forEach(secao => {
        secao.style.opacity = '0.3';
        secao.style.pointerEvents = 'none';
    });
    
    cards.forEach(card => {
        card.style.opacity = '0.3';
        card.style.transform = 'scale(0.95)';
    });
    
    // Buscar em textos
    cards.forEach(card => {
        const texto = card.textContent.toLowerCase();
        if (texto.includes(termoBusca)) {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            card.style.border = '2px solid #f8c537';
            card.closest('section').style.opacity = '1';
            card.closest('section').style.pointerEvents = 'auto';
            encontrados++;
            
            // Scroll suave para o primeiro resultado
            if (encontrados === 1) {
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        }
    });
    
    // Mensagem se nada for encontrado
    if (encontrados === 0) {
        mostrarMensagem(`Nenhum resultado encontrado para "${termo}"`);
        limparPesquisa();
    } else {
        mostrarMensagem(`${encontrados} resultado(s) encontrado(s)`);
    }
}

function limparPesquisa() {
    const secoes = document.querySelectorAll('.historia-section, .valores-section, .diferenciais-section, .depoimentos-section');
    const cards = document.querySelectorAll('.valor-card, .diferencial-card, .depoimento-card');
    
    secoes.forEach(secao => {
        secao.style.opacity = '1';
        secao.style.pointerEvents = 'auto';
    });
    
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.border = 'none';
    });
}

function mostrarMensagem(texto) {
    const mensagemExistente = document.querySelector('.mensagem-pesquisa');
    if (mensagemExistente) mensagemExistente.remove();
    
    const mensagem = document.createElement('div');
    mensagem.className = 'mensagem-pesquisa';
    mensagem.style.cssText = `
        position: fixed; top: 120px; right: 20px; z-index: 9999;
        background: rgba(0, 0, 0, 0.9); color: white; padding: 15px 25px;
        border-radius: 8px; font-size: 14px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease;
    `;
    mensagem.textContent = texto;
    document.body.appendChild(mensagem);
    
    setTimeout(() => {
        mensagem.style.opacity = '0';
        mensagem.style.transition = 'opacity 0.3s';
        setTimeout(() => mensagem.remove(), 300);
    }, 3000);
}

// Pesquisar ao digitar (com debounce)
let timeoutPesquisa;
searchInput.addEventListener("input", e => {
    clearTimeout(timeoutPesquisa);
    timeoutPesquisa = setTimeout(() => {
        pesquisarConteudo(e.target.value);
    }, 500);
});

// Pesquisar ao pressionar Enter
searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        clearTimeout(timeoutPesquisa);
        pesquisarConteudo(e.target.value);
    } else if (e.key === "Escape") {
        searchActive = false;
        searchInputContainer.classList.remove("active");
        searchIcon.classList.remove("active");
        searchInput.value = "";
        limparPesquisa();
        searchInput.blur();
    }
});

// Fechar pesquisa ao clicar fora
document.addEventListener("click", e => {
    if (searchActive && 
        !searchInputContainer.contains(e.target) && 
        e.target !== searchIcon) {
        if (searchInput.value.trim() === "") {
            searchActive = false;
            searchInputContainer.classList.remove("active");
            searchIcon.classList.remove("active");
        }
    }
});

searchInput.addEventListener("click", e => e.stopPropagation());

// ==================== SISTEMA DE PESQUISA ====================
function initSearchSystem() {
    const searchIcon = document.getElementById("searchIcon");
    const searchInputContainer = document.getElementById("searchInputContainer");
    const searchInput = document.getElementById("search-input");
    
    if (!searchIcon || !searchInputContainer || !searchInput) {
        console.error('Elementos de pesquisa não encontrados!');
        return;
    }

    console.log('✅ Sistema de pesquisa carregado');

    // Click na lupa
    searchIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        searchActive = !searchActive;
        console.log('🔍 Pesquisa ativa:', searchActive);

        if (searchActive) {
            searchInputContainer.classList.add("active");
            searchIcon.classList.add("active");
            setTimeout(() => searchInput.focus(), 400);
        } else {
            searchInputContainer.classList.remove("active");
            searchIcon.classList.remove("active");
            searchInput.value = "";
            limparPesquisa();
        }
    });

    // Digitar na busca
    searchInput.addEventListener('input', function(e) {
        const termo = e.target.value;
        console.log('📝 Digitando:', termo);
        clearTimeout(timeoutPesquisa);
        timeoutPesquisa = setTimeout(() => {
            pesquisarConteudo(termo);
        }, 500);
    });

    // Teclas
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === "Enter") {
            console.log('⏎ Enter pressionado');
            clearTimeout(timeoutPesquisa);
            pesquisarConteudo(e.target.value);
        } else if (e.key === "Escape") {
            console.log('⎋ Escape pressionado');
            searchActive = false;
            searchInputContainer.classList.remove("active");
            searchIcon.classList.remove("active");
            searchInput.value = "";
            limparPesquisa();
            searchInput.blur();
        }
    });

    // Clique fora (usar addEventListener no final do documento)
    setTimeout(() => {
        document.addEventListener('click', function(e) {
            if (searchActive && 
                !searchInputContainer.contains(e.target) && 
                !searchIcon.contains(e.target)) {
                if (searchInput.value.trim() === "") {
                    searchActive = false;
                    searchInputContainer.classList.remove("active");
                    searchIcon.classList.remove("active");
                }
            }
        });
    }, 100);

    searchInput.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// Função de pesquisa para página inicial
function pesquisarConteudo(termo) {
    const termoBusca = termo.toLowerCase().trim();
    
    if (termoBusca === "") {
        limparPesquisa();
        return;
    }
    
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    const airlineCards = document.querySelectorAll('.airline-card');
    const planoCards = document.querySelectorAll('.plano-card');
    
    let encontrados = 0;
    let primeiroResultado = null;
    
    // Buscar destinos
    cardWrappers.forEach(wrapper => {
        const destino = wrapper.querySelector('.card-label span');
        const info = wrapper.querySelector('.info h2');
        const descricao = wrapper.querySelector('.info p');
        const texto = (destino?.textContent || '') + ' ' + 
                      (info?.textContent || '') + ' ' + 
                      (descricao?.textContent || '');
        
        if (texto.toLowerCase().includes(termoBusca)) {
            wrapper.style.border = '3px solid #f8c537';
            wrapper.style.borderRadius = '12px';
            wrapper.style.padding = '2px';
            wrapper.style.boxShadow = '0 0 20px rgba(248, 197, 55, 0.6)';
            encontrados++;
            
            if (!primeiroResultado) {
                primeiroResultado = wrapper;
            }
        } else {
            wrapper.style.border = 'none';
            wrapper.style.padding = '0';
            wrapper.style.boxShadow = 'none';
        }
    });
    
    // Buscar companhias
    airlineCards.forEach(card => {
        const texto = card.textContent.toLowerCase();
        if (texto.includes(termoBusca)) {
            card.style.border = '3px solid #f8c537';
            card.style.boxShadow = '0 0 20px rgba(248, 197, 55, 0.6)';
            encontrados++;
            
            if (!primeiroResultado) {
                primeiroResultado = card;
            }
        } else {
            card.style.border = 'none';
            card.style.boxShadow = 'none';
        }
    });
    
    // Buscar planos
    planoCards.forEach(card => {
        const texto = card.textContent.toLowerCase();
        if (texto.includes(termoBusca)) {
            card.style.border = '3px solid #f8c537';
            card.style.boxShadow = '0 0 20px rgba(248, 197, 55, 0.6)';
            encontrados++;
            
            if (!primeiroResultado) {
                primeiroResultado = card;
            }
        } else {
            card.style.border = 'none';
            card.style.boxShadow = 'none';
        }
    });
    
    // Scroll para o primeiro resultado
    if (primeiroResultado) {
        setTimeout(() => {
            primeiroResultado.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
            });
        }, 300);
        mostrarMensagem(`${encontrados} resultado(s) encontrado(s)`);
    } else {
        mostrarMensagem(`Nenhum resultado encontrado para "${termo}"`);
    }
}

function limparPesquisa() {
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    const airlineCards = document.querySelectorAll('.airline-card');
    const planoCards = document.querySelectorAll('.plano-card');
    
    cardWrappers.forEach(wrapper => {
        wrapper.style.border = 'none';
        wrapper.style.padding = '0';
        wrapper.style.boxShadow = 'none';
    });
    
    airlineCards.forEach(card => {
        card.style.border = 'none';
        card.style.boxShadow = 'none';
    });
    
    planoCards.forEach(card => {
        card.style.border = 'none';
        card.style.boxShadow = 'none';
    });
}

function mostrarMensagem(texto) {
    const mensagemExistente = document.querySelector('.mensagem-pesquisa');
    if (mensagemExistente) mensagemExistente.remove();
    
    const mensagem = document.createElement('div');
    mensagem.className = 'mensagem-pesquisa';
    mensagem.style.cssText = `
        position: fixed; top: 120px; right: 20px; z-index: 9999;
        background: rgba(0, 0, 0, 0.9); color: white; padding: 15px 25px;
        border-radius: 8px; font-size: 14px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease;
    `;
    mensagem.textContent = texto;
    document.body.appendChild(mensagem);
    
    setTimeout(() => {
        mensagem.style.opacity = '0';
        mensagem.style.transition = 'opacity 0.3s';
        setTimeout(() => mensagem.remove(), 300);
    }, 3000);
}

// ==================== SISTEMA DE COMPANHIAS AÉREAS ====================
function initAirlinesSystem() {
    if (!airlineCards.length || !currentAirlineLogo) return;

    updateAirlineDisplay(currentAirlineIndex);

    if (leftArrow) {
        leftArrow.addEventListener('click', () => {
            currentAirlineIndex = (currentAirlineIndex - 1 + airlines.length) % airlines.length;
            updateAirlineDisplay(currentAirlineIndex);
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener('click', () => {
            currentAirlineIndex = (currentAirlineIndex + 1) % airlines.length;
            updateAirlineDisplay(currentAirlineIndex);
        });
    }

    airlineCards.forEach((card) => {
        card.addEventListener('click', () => {
            const airlineName = card.dataset.airline;
            const airlineIndex = airlines.findIndex(a => a.name === airlineName);
            if (airlineIndex !== -1) {
                currentAirlineIndex = airlineIndex;
                updateAirlineDisplay(currentAirlineIndex);
            }
        });
    });
}

function updateAirlineDisplay(idx) {
    if (!currentAirlineLogo) return;

    currentAirlineLogo.style.opacity = '0';
    if (currentAirlineName) currentAirlineName.style.opacity = '0';

    setTimeout(() => {
        currentAirlineLogo.src = airlines[idx].logo;
        currentAirlineLogo.alt = airlines[idx].name;
        if (currentAirlineName) currentAirlineName.textContent = airlines[idx].displayName;
        currentAirlineLogo.style.opacity = '1';
        if (currentAirlineName) currentAirlineName.style.opacity = '1';
    }, 300);

    airlineCards.forEach(card => {
        const airlineName = card.dataset.airline;
        card.style.display = (airlineName === airlines[idx].name) ? 'none' : 'flex';
    });
}

// ==================== CARROSSEL TOUCH - ADICIONAR NO FINAL DO SEU js.js ====================

// Função para inicializar o sistema de toque no carrossel
function initTouchCards() {
    const cardWrappers = document.querySelectorAll('.card-wrapper');
    
    // Função para detectar se é dispositivo móvel
    function isMobileDevice() {
        return window.innerWidth <= 767;
    }
    
    // Variável para rastrear card ativo
    let activeWrapper = null;
    
    // Adicionar evento de clique/toque para cada card wrapper
    cardWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function(e) {
            // Só aplicar em mobile
            if (!isMobileDevice()) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            // Se clicar no card que já está ativo, fecha
            if (activeWrapper === wrapper && wrapper.classList.contains('active')) {
                wrapper.classList.remove('active');
                activeWrapper = null;
            } else {
                // Fecha todos os outros cards
                cardWrappers.forEach(w => {
                    w.classList.remove('active');
                });
                
                // Abre o card clicado
                wrapper.classList.add('active');
                activeWrapper = wrapper;
            }
        });
        
        // Prevenir propagação no botão "Ver Passagens"
        const button = wrapper.querySelector('.ButtonPassagem');
        if (button) {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    });
    
    // Fechar card ao clicar fora (apenas mobile)
    document.addEventListener('click', function(e) {
        if (!isMobileDevice()) return;
        
        if (!e.target.closest('.card-wrapper')) {
            cardWrappers.forEach(wrapper => {
                wrapper.classList.remove('active');
            });
            activeWrapper = null;
        }
    });
    
    // Limpar estados ao redimensionar tela
    window.addEventListener('resize', function() {
        if (!isMobileDevice()) {
            cardWrappers.forEach(wrapper => {
                wrapper.classList.remove('active');
            });
            activeWrapper = null;
        }
    });
}

// IMPORTANTE: Atualizar a função initAll() para incluir initTouchCards
// Procure por "function initAll()" no seu js.js e certifique-se de que está assim:

/*
function initAll() {
    initMobileMenu();
    initProfileDropdown();
    initAirlinesSystem();
    initPlansSystem();
    initTouchCards(); // <-- Esta linha deve estar aqui
}
*/

// ==================== SISTEMA DE PLANOS ====================
function initPlansSystem() {
    if (!planoCards.length) return;

    planoCards.forEach((card) => {
        if (!card.classList.contains('destaque')) {
            card.style.transform = 'scale(1)';
        }
    });

    planoCards.forEach((card) => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-assinar')) return;
            highlightPlan(card);
        });
    });
}

function highlightPlan(selectedCard) {
    planoCards.forEach(p => {
        p.classList.remove('destaque');
        p.style.transform = 'scale(1)';
    });

    selectedCard.classList.add('destaque');
    selectedCard.style.transform = 'scale(1.1)';
}

// ==========================================
// FUNÇÃO PARA ASSINAR PLANOS
// ==========================================
function assinarPlano(plano) {
    console.log('📦 Assinando plano:', plano);
    
    // Salvar plano no localStorage
    localStorage.setItem('planoSelecionado', plano);
    
    // Redirecionar para página de pagamento
    window.location.href = `pagamento.html?plano=${plano}`;
}

// ==================== INICIALIZAÇÃO GERAL ====================
function initAll() {
    initMobileMenu();
    initProfileDropdown();
    initAirlinesSystem();
    initPlansSystem();
    initTouchCards();
}

// ==================== EXECUÇÃO ====================
document.addEventListener('DOMContentLoaded', initAll);