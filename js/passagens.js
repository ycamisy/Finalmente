// ==================== ELEMENTOS DOM ====================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("overlay");
const backArrow = document.getElementById("back-arrow");
const perfilImg = document.getElementById("perfil-img");
const dropdownMenu = document.getElementById("dropdown-menu");
const mobilePerfilImg = document.getElementById("mobile-perfil-img");
const mobileDropdownMenu = document.getElementById("mobile-dropdown-menu");
const searchIcon = document.getElementById("searchIcon");
const searchInputContainer = document.getElementById("searchInputContainer");
const searchInput = document.getElementById("search-input");

// Elementos do formulário
const tripTypeRadios = document.querySelectorAll('input[name="trip"]');
const dataVoltaGroup = document.getElementById('dataVoltaGroup');
const origemInput = document.getElementById('origem');
const destinoInput = document.getElementById('destino');
const swapBtn = document.getElementById('swapBtn');
const passageirosInput = document.getElementById('passageirosInput');
const passengersPanel = document.getElementById('passengersPanel');
const counterButtons = document.querySelectorAll('.counter-btn');
const btnSearch = document.getElementById('btnSearch');
const btnNewsletter = document.querySelector('.btn-newsletter');
const newsletterEmail = document.getElementById('newsletterEmail');

let searchActive = false;
let timeoutPesquisa;
let passageiros = {
    adultos: 1,
    criancas: 0,
    bebes: 0
};

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
    mobileMenuItems.forEach(item => {
        item.addEventListener("click", () => {
            closeAllMenus();
        });
    });
}

function closeAllMenus() {
    if (hamburger) hamburger.classList.remove("active");
    if (mobileMenu) mobileMenu.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    if (dropdownMenu) dropdownMenu.classList.remove("active");
    if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
    document.body.style.overflow = "auto";
}

// ==================== DROPDOWN PERFIL ====================
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

    if (dropdownMenu) dropdownMenu.addEventListener("click", (e) => e.stopPropagation());
    if (mobileDropdownMenu) mobileDropdownMenu.addEventListener("click", (e) => e.stopPropagation());
}

// ==================== BARRA DE PESQUISA ====================
function initSearchSystem() {
    if (!searchIcon || !searchInputContainer || !searchInput) return;

    searchIcon.addEventListener("click", (e) => {
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

    searchInput.addEventListener("input", (e) => {
        clearTimeout(timeoutPesquisa);
        timeoutPesquisa = setTimeout(() => {
            pesquisarDestinos(e.target.value);
        }, 500);
    });

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            clearTimeout(timeoutPesquisa);
            pesquisarDestinos(e.target.value);
        } else if (e.key === "Escape") {
            searchActive = false;
            searchInputContainer.classList.remove("active");
            searchIcon.classList.remove("active");
            searchInput.value = "";
            limparPesquisa();
            searchInput.blur();
        }
    });

    document.addEventListener("click", (e) => {
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

    searchInput.addEventListener("click", (e) => e.stopPropagation());
}

function pesquisarDestinos(termo) {
    const termoBusca = termo.toLowerCase().trim();
    
    if (termoBusca === "") {
        limparPesquisa();
        return;
    }
    
    const destinoCards = document.querySelectorAll('.destino-card');
    const ofertaCards = document.querySelectorAll('.oferta-card');
    let encontrados = 0;
    let primeiroResultado = null;
    
    destinoCards.forEach(card => {
        const destino = card.dataset.destino?.toLowerCase() || '';
        const texto = card.textContent.toLowerCase();
        
        if (destino.includes(termoBusca) || texto.includes(termoBusca)) {
            card.style.border = '3px solid #f8c537';
            card.style.boxShadow = '0 0 20px rgba(248, 197, 55, 0.6)';
            encontrados++;
            
            if (!primeiroResultado) {
                primeiroResultado = card;
            }
        } else {
            card.style.border = 'none';
            card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    ofertaCards.forEach(card => {
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
            card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    if (primeiroResultado) {
        setTimeout(() => {
            primeiroResultado.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center'
            });
        }, 300);
        mostrarMensagem(`${encontrados} resultado(s) encontrado(s)`);
    } else {
        mostrarMensagem(`Nenhum resultado encontrado para "${termo}"`);
    }
}

function limparPesquisa() {
    const destinoCards = document.querySelectorAll('.destino-card');
    const ofertaCards = document.querySelectorAll('.oferta-card');
    
    destinoCards.forEach(card => {
        card.style.border = 'none';
        card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    });
    
    ofertaCards.forEach(card => {
        card.style.border = 'none';
        card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
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

// ==================== FORMULÁRIO DE BUSCA ====================
function initFormularioBusca() {
    // Tipo de viagem
    tripTypeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'somente-ida') {
                dataVoltaGroup.style.display = 'none';
            } else {
                dataVoltaGroup.style.display = 'flex';
            }
        });
    });

    // Trocar origem/destino
    if (swapBtn) {
        swapBtn.addEventListener('click', () => {
            const temp = origemInput.value;
            origemInput.value = destinoInput.value;
            destinoInput.value = temp;
        });
    }

    // Dropdown de passageiros
    if (passageirosInput) {
        passageirosInput.addEventListener('click', (e) => {
            e.stopPropagation();
            passengersPanel.classList.toggle('active');
        });
    }

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', (e) => {
        if (passengersPanel && 
            !passengersPanel.contains(e.target) && 
            e.target !== passageirosInput) {
            passengersPanel.classList.remove('active');
        }
    });

    // Contadores de passageiros
    counterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            const type = button.dataset.type;
            
            if (action === 'increase') {
                passageiros[type]++;
            } else if (action === 'decrease' && passageiros[type] > 0) {
                if (type === 'adultos' && passageiros[type] === 1) return;
                passageiros[type]--;
            }
            
            atualizarPassageiros();
        });
    });

    // Buscar passagens
    if (btnSearch) {
        btnSearch.addEventListener('click', () => {
            buscarPassagens();
        });
    }

    // Definir data mínima para hoje
    const hoje = new Date().toISOString().split('T')[0];
    const dataIdaInput = document.getElementById('dataIda');
    const dataVoltaInput = document.getElementById('dataVolta');
    
    if (dataIdaInput) dataIdaInput.min = hoje;
    if (dataVoltaInput) dataVoltaInput.min = hoje;
}

function atualizarPassageiros() {
    const adultos = passageiros.adultos;
    const criancas = passageiros.criancas;
    const bebes = passageiros.bebes;
    
    // Atualizar valores na tela
    document.getElementById('adultosValue').textContent = adultos;
    document.getElementById('criancasValue').textContent = criancas;
    document.getElementById('bebesValue').textContent = bebes;
    
    // Atualizar texto do input
    let texto = `${adultos} Adulto${adultos > 1 ? 's' : ''}`;
    if (criancas > 0) texto += `, ${criancas} Criança${criancas > 1 ? 's' : ''}`;
    if (bebes > 0) texto += `, ${bebes} Bebê${bebes > 1 ? 's' : ''}`;
    
    passageirosInput.value = texto;
}

function buscarPassagens() {
    const origem = origemInput.value;
    const destino = destinoInput.value;
    const dataIda = document.getElementById('dataIda').value;
    const tripType = document.querySelector('input[name="trip"]:checked').value;
    
    if (!origem || !destino || !dataIda) {
        mostrarMensagem('Por favor, preencha todos os campos obrigatórios');
        return;
    }
    
    // Simular busca
    mostrarMensagem('Buscando passagens disponíveis...');
    
    setTimeout(() => {
        mostrarMensagem(`Encontramos 45 voos de ${origem} para ${destino}!`);
    }, 2000);
}

// ==================== CARDS DE DESTINO ====================
function initDestinoCards() {
    const destinoCards = document.querySelectorAll('.destino-card');
    
    destinoCards.forEach(card => {
        const btnVerVoos = card.querySelector('.btn-ver-voos');
        
        if (btnVerVoos) {
            btnVerVoos.addEventListener('click', (e) => {
                e.stopPropagation();
                const destino = card.dataset.destino;
                destinoInput.value = destino;
                
                // Scroll para o formulário
                document.querySelector('.hero-section').scrollIntoView({ 
                    behavior: 'smooth' 
                });
                
                setTimeout(() => {
                    destinoInput.focus();
                }, 800);
            });
        }
    });
}

// ==================== OFERTAS ====================
function initOfertas() {
    const btnReservar = document.querySelectorAll('.btn-reservar');
    
    btnReservar.forEach(btn => {
        btn.addEventListener('click', () => {
            mostrarMensagem('Redirecionando para finalizar a reserva...');
            setTimeout(() => {
                // Simular redirecionamento
                console.log('Reserva iniciada');
            }, 1000);
        });
    });
}

// ==================== NEWSLETTER ====================
function initNewsletter() {
    if (btnNewsletter && newsletterEmail) {
        btnNewsletter.addEventListener('click', () => {
            const email = newsletterEmail.value.trim();
            
            if (!email) {
                mostrarMensagem('Por favor, insira seu e-mail');
                return;
            }
            
            if (!validarEmail(email)) {
                mostrarMensagem('Por favor, insira um e-mail válido');
                return;
            }
            
            mostrarMensagem('Inscrição realizada com sucesso! 🎉');
            newsletterEmail.value = '';
        });
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ==================== ANIMAÇÕES DE ENTRADA ====================
function initScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { 
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
    });

    const animatedElements = document.querySelectorAll(
        ".destino-card, .oferta-card, .vantagem-card"
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease";
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });
}

// ==================== RESPONSIVIDADE ====================
function initResponsive() {
    window.addEventListener("resize", () => {
        if (window.innerWidth > 767) {
            closeAllMenus();
        }
    });
}

// ==================== INICIALIZAÇÃO GERAL ====================
function initAll() {
    initMobileMenu();
    initProfileDropdown();
    initSearchSystem();
    initFormularioBusca();
    initDestinoCards();
    initOfertas();
    initNewsletter();
    initScrollAnimations();
    initResponsive();
    
    // Inicializar passageiros
    atualizarPassageiros();
}

// ==================== EXECUÇÃO ====================
document.addEventListener('DOMContentLoaded', initAll);