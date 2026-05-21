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

let searchActive = false;

// ==================== MENU MOBILE ====================
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    
    if (dropdownMenu) dropdownMenu.classList.remove("active");
    if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
    
    document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto";
});

overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    if (dropdownMenu) dropdownMenu.classList.remove("active");
    if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
    document.body.style.overflow = "auto";
});

backArrow.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
    document.body.style.overflow = "auto";
});

const mobileMenuItems = document.querySelectorAll(".mobile-menu-item");
mobileMenuItems.forEach(item => {
    item.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
        document.body.style.overflow = "auto";
    });
});

// ==================== DROPDOWN PERFIL ====================
if (perfilImg) {
    perfilImg.addEventListener("click", e => {
        e.stopPropagation();
        dropdownMenu.classList.toggle("active");
    });
}

if (mobilePerfilImg) {
    mobilePerfilImg.addEventListener("click", e => {
        e.stopPropagation();
        mobileDropdownMenu.classList.toggle("active");
    });
}

document.addEventListener("click", e => {
    if (dropdownMenu && !dropdownMenu.contains(e.target) && e.target !== perfilImg) {
        dropdownMenu.classList.remove("active");
    }
    if (mobileDropdownMenu && !mobileDropdownMenu.contains(e.target) && e.target !== mobilePerfilImg) {
        mobileDropdownMenu.classList.remove("active");
    }
});

if (dropdownMenu) dropdownMenu.addEventListener("click", e => e.stopPropagation());
if (mobileDropdownMenu) mobileDropdownMenu.addEventListener("click", e => e.stopPropagation());

// ==================== BARRA DE PESQUISA ====================
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

// ==================== SCROLL SUAVE ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// ==================== ANIMAÇÕES ====================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".depoimento-card, .stat-item");

    animatedElements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease";
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// ==================== RESPONSIVIDADE ====================
window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});

// ==================== CONTADORES ANIMADOS ====================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) return (num / 1000).toFixed(0) + "K+";
    return num + (num === 98 ? "%" : "+");
}

const statsSection = document.querySelector(".stats-section");
if (statsSection) {
    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll(".stat-number");
                const targets = [50000, 120, 15, 98];

                statNumbers.forEach((stat, index) => animateCounter(stat, targets[index]));

                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Adicionar CSS para animação
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