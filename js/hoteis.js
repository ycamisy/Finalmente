// ==================== DADOS DOS HOTÉIS ====================
const hoteis = [
    {
        nome: "Grand Paris Palace",
        localizacao: "Paris, França",
        estrelas: 5,
        preco: 890,
        imagem: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
        comodidades: ["Wi-Fi", "Piscina", "Spa", "Restaurante"],
        destaque: "Luxo"
    },
    {
        nome: "Roma Heritage Hotel",
        localizacao: "Roma, Itália",
        estrelas: 4,
        preco: 650,
        imagem: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800",
        comodidades: ["Wi-Fi", "Bar", "Academia", "Café da Manhã"],
        destaque: null
    },
    {
        nome: "Tokyo Bay Resort",
        localizacao: "Tóquio, Japão",
        estrelas: 5,
        preco: 1120,
        imagem: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
        comodidades: ["Wi-Fi", "Piscina", "Vista Mar", "Spa"],
        destaque: "Mais Popular"
    },
    {
        nome: "Dubai Luxury Suites",
        localizacao: "Dubai, EAU",
        estrelas: 5,
        preco: 1450,
        imagem: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        comodidades: ["Wi-Fi", "Piscina", "Spa", "Butler Service"],
        destaque: "Premium"
    },
    {
        nome: "London City Hotel",
        localizacao: "Londres, Inglaterra",
        estrelas: 4,
        preco: 780,
        imagem: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        comodidades: ["Wi-Fi", "Bar", "Academia", "Estacionamento"],
        destaque: null
    },
    {
        nome: "Barcelona Beach Resort",
        localizacao: "Barcelona, Espanha",
        estrelas: 4,
        preco: 590,
        imagem: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        comodidades: ["Wi-Fi", "Praia Privativa", "Piscina", "Restaurante"],
        destaque: "Melhor Custo"
    }
];

// ==================== RENDERIZAR HOTÉIS ====================
function renderizarHoteis(listaHoteis = hoteis) {
    const grid = document.getElementById('hoteis-grid');
    grid.innerHTML = '';

    listaHoteis.forEach(hotel => {
        const card = document.createElement('div');
        card.className = 'hotel-card';
        
        card.innerHTML = `
            <div style="position: relative; overflow: hidden; border-radius: 20px 20px 0 0;">
                <img class="hotel-image" src="${hotel.imagem}" alt="${hotel.nome}">
                ${hotel.destaque ? `<div class="hotel-badge">${hotel.destaque}</div>` : ''}
            </div>
            <div class="hotel-info">
                <div class="hotel-header">
                    <div class="hotel-nome">${hotel.nome}</div>
                    <div class="hotel-estrelas">${'★'.repeat(hotel.estrelas)}</div>
                </div>
                <div class="hotel-localizacao">
                    📍 ${hotel.localizacao}
                </div>
                <div class="hotel-comodidades">
                    ${hotel.comodidades.map(c => `<span class="comodidade-tag">${c}</span>`).join('')}
                </div>
                <div class="hotel-footer">
                    <div class="hotel-preco">
                        <span class="preco-label">A partir de</span>
                        <span class="preco-valor">R$ ${hotel.preco}</span>
                        <span class="preco-noite">/noite</span>
                    </div>
                    <button class="btn-reservar" onclick="reservarHotel('${hotel.nome}')">Reservar</button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// ==================== BUSCAR HOTÉIS ====================
function buscarHoteis() {
    const destino = document.getElementById('destino').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    
    if (!destino) {
        mostrarMensagem('Por favor, informe um destino!', 'warning');
        return;
    }
    
    if (!checkin || !checkout) {
        mostrarMensagem('Por favor, selecione as datas de check-in e check-out!', 'warning');
        return;
    }
    
    mostrarMensagem(`Buscando hotéis em ${destino}...`, 'success');
    
    // Scroll suave até os resultados
    setTimeout(() => {
        document.getElementById('hoteis-grid').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 500);
    
    renderizarHoteis();
}

// ==================== FILTRAR POR CATEGORIA ====================
function filtrarCategoria(categoria) {
    mostrarMensagem(`Mostrando hotéis da categoria: ${categoria}`, 'info');
    
    // Scroll suave até os resultados
    setTimeout(() => {
        document.getElementById('hoteis-grid').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 300);
    
    renderizarHoteis();
}

// ==================== RESERVAR HOTEL ====================
function reservarHotel(nomeHotel) {
    const hotel = hoteis.find(h => h.nome === nomeHotel);
    
    if (!hotel) {
        mostrarMensagem('Hotel não encontrado!', 'error');
        return;
    }
    
    mostrarMensagem(`Iniciando reserva para: ${nomeHotel}`, 'success');
    
    // Simular redirecionamento
    setTimeout(() => {
        console.log(`Redirecionando para pagamento do ${nomeHotel}`);
        // window.location.href = `pagamento.html?hotel=${encodeURIComponent(nomeHotel)}`;
    }, 1500);
}

// ==================== MOSTRAR MENSAGEM ====================
function mostrarMensagem(texto, tipo = 'info') {
    // Remover mensagem existente
    const mensagemExistente = document.querySelector('.mensagem-notificacao');
    if (mensagemExistente) mensagemExistente.remove();
    
    // Cores por tipo
    const cores = {
        success: 'linear-gradient(135deg, #4d9fb8, #2c5f7f)',
        warning: 'linear-gradient(135deg, #f8c537, #e6b325)',
        error: 'linear-gradient(135deg, #e74c3c, #c0392b)',
        info: 'linear-gradient(135deg, #3498db, #2980b9)'
    };
    
    const mensagem = document.createElement('div');
    mensagem.className = 'mensagem-notificacao';
    mensagem.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        z-index: 99999;
        background: ${cores[tipo] || cores.info};
        color: white;
        padding: 18px 28px;
        border-radius: 50px;
        font-size: 15px;
        font-weight: bold;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.4s ease;
        max-width: 400px;
    `;
    mensagem.textContent = texto;
    document.body.appendChild(mensagem);
    
    // Remover após 3 segundos
    setTimeout(() => {
        mensagem.style.opacity = '0';
        mensagem.style.transform = 'translateX(400px)';
        mensagem.style.transition = 'all 0.3s ease';
        setTimeout(() => mensagem.remove(), 300);
    }, 3000);
}

// ==================== CONFIGURAR DATAS ====================
const hoje = new Date().toISOString().split('T')[0];
document.getElementById('checkin').min = hoje;
document.getElementById('checkout').min = hoje;

document.getElementById('checkin').addEventListener('change', function() {
    document.getElementById('checkout').min = this.value;
});

// ==================== RENDERIZAR HOTÉIS AO CARREGAR ====================
renderizarHoteis();

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

// ==================== ANIMAÇÕES DE ENTRADA ====================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(
        ".depoimento-hotel-card, .stat-item, .diferencial-hotel-card"
    );

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
    const hasK = target >= 1000;
    const hasStar = element.textContent.includes('★');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            if (hasK) {
                element.textContent = (target / 1000).toFixed(0) + "K+";
            } else if (hasStar) {
                element.textContent = target.toFixed(1) + "★";
            } else {
                element.textContent = target + "+";
            }
            clearInterval(timer);
        } else {
            if (hasK) {
                element.textContent = (current / 1000).toFixed(0) + "K+";
            } else if (hasStar) {
                element.textContent = current.toFixed(1) + "★";
            } else {
                element.textContent = Math.floor(current) + "+";
            }
        }
    }, 16);
}

const statsSection = document.querySelector(".stats-section");
if (statsSection) {
    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll(".stat-number");
                const targets = [500000, 180, 4.8, 10000]; // Ajuste conforme necessário

                statNumbers.forEach((stat, index) => {
                    animateCounter(stat, targets[index]);
                });

                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ==================== ADICIONAR ESTILOS DE ANIMAÇÃO ====================
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

console.log('✅ Script de hotéis carregado com sucesso!');
