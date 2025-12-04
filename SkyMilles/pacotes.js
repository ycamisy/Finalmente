// ==================== VARIÁVEIS GLOBAIS ====================
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
let paginaAtual = 1;
const pacotesPorPagina = 6;

// ==================== DROPDOWN PERFIL ====================
document.addEventListener('DOMContentLoaded', function() {
    const perfilImg = document.getElementById("perfil-img");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const mobilePerfilImg = document.getElementById("mobile-perfil-img");
    const mobileDropdownMenu = document.getElementById("mobile-dropdown-menu");

    // Toggle do dropdown do perfil (desktop)
    if (perfilImg && dropdownMenu) {
        perfilImg.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle("active");
            
            if (mobileDropdownMenu) {
                mobileDropdownMenu.classList.remove("active");
            }
        });
    }

    // Toggle do dropdown do perfil (mobile)
    if (mobilePerfilImg && mobileDropdownMenu) {
        mobilePerfilImg.addEventListener("click", (e) => {
            e.stopPropagation();
            mobileDropdownMenu.classList.toggle("active");
        });
    }

    // Fechar dropdowns ao clicar fora
    document.addEventListener("click", (e) => {
        if (dropdownMenu && !dropdownMenu.contains(e.target) && e.target !== perfilImg) {
            dropdownMenu.classList.remove("active");
        }
        
        if (mobileDropdownMenu && !mobileDropdownMenu.contains(e.target) && e.target !== mobilePerfilImg) {
            mobileDropdownMenu.classList.remove("active");
        }
    });

    if (dropdownMenu) {
        dropdownMenu.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }

    if (mobileDropdownMenu) {
        mobileDropdownMenu.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }

    // Inicializar tudo
    initAll();
});

// ==================== MENU MOBILE ====================
function initMobileMenu() {
    if (hamburger && mobileMenu && overlay) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            mobileMenu.classList.toggle("active");
            overlay.classList.toggle("active");
            
            const dropdownMenu = document.getElementById("dropdown-menu");
            const mobileDropdownMenu = document.getElementById("mobile-dropdown-menu");
            
            if (dropdownMenu) dropdownMenu.classList.remove("active");
            if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
            
            document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto";
        });

        overlay.addEventListener("click", () => {
            hamburger.classList.remove("active");
            mobileMenu.classList.remove("active");
            overlay.classList.remove("active");
            
            const dropdownMenu = document.getElementById("dropdown-menu");
            const mobileDropdownMenu = document.getElementById("mobile-dropdown-menu");
            
            if (dropdownMenu) dropdownMenu.classList.remove("active");
            if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
            
            document.body.style.overflow = "auto";
        });
    }

    if (backArrow) {
        backArrow.addEventListener("click", () => {
            if (hamburger) hamburger.classList.remove("active");
            if (mobileMenu) mobileMenu.classList.remove("active");
            if (overlay) overlay.classList.remove("active");
            
            const mobileDropdownMenu = document.getElementById("mobile-dropdown-menu");
            if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
            
            document.body.style.overflow = "auto";
        });
    }

    const mobileMenuItems = document.querySelectorAll(".mobile-menu-item");
    if (mobileMenuItems.length) {
        mobileMenuItems.forEach(item => {
            item.addEventListener("click", () => {
                if (hamburger) hamburger.classList.remove("active");
                if (mobileMenu) mobileMenu.classList.remove("active");
                if (overlay) overlay.classList.remove("active");
                
                const mobileDropdownMenu = document.getElementById("mobile-dropdown-menu");
                if (mobileDropdownMenu) mobileDropdownMenu.classList.remove("active");
                
                document.body.style.overflow = "auto";
            });
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 767) {
            if (hamburger) hamburger.classList.remove("active");
            if (mobileMenu) mobileMenu.classList.remove("active");
            if (overlay) overlay.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });
}

// ==================== SISTEMA DE PESQUISA ====================
function initSearchSystem() {
    if (!searchIcon || !searchInputContainer || !searchInput) return;

    searchIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        searchActive = !searchActive;
        
        if (searchActive) {
            searchInputContainer.classList.add("active");
            searchIcon.classList.add("active");
            setTimeout(() => {
                searchInput.focus();
            }, 400);
        } else {
            searchInputContainer.classList.remove("active");
            searchIcon.classList.remove("active");
            searchInput.value = "";
            limparPesquisaPacotes();
        }
    });

    // Pesquisar ao digitar (com debounce)
    let timeoutPesquisa;
    searchInput.addEventListener("input", (e) => {
        clearTimeout(timeoutPesquisa);
        timeoutPesquisa = setTimeout(() => {
            pesquisarPacotes(e.target.value);
        }, 500);
    });

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            clearTimeout(timeoutPesquisa);
            pesquisarPacotes(e.target.value);
        } else if (e.key === "Escape") {
            searchActive = false;
            searchInputContainer.classList.remove("active");
            searchIcon.classList.remove("active");
            searchInput.value = "";
            limparPesquisaPacotes();
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

    searchInput.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}

// Função de pesquisa específica para pacotes
function pesquisarPacotes(termo) {
    const termoBusca = termo.toLowerCase().trim();
    
    if (termoBusca === "") {
        limparPesquisaPacotes();
        return;
    }
    
    const pacotes = document.querySelectorAll('.pacote-card');
    const filtrosContainer = document.querySelector('.filtros-container');
    const paginacao = document.querySelector('.paginacao');
    let encontrados = 0;
    
    // Ocultar paginação durante a pesquisa
    if (paginacao) paginacao.style.display = 'none';
    
    // Ocultar todos os pacotes primeiro
    pacotes.forEach(pacote => {
        pacote.style.display = 'none';
    });
    
    // Mostrar apenas pacotes que correspondem à pesquisa
    pacotes.forEach(pacote => {
        const destino = pacote.querySelector('.pacote-destino h3')?.textContent || '';
        const descricao = pacote.querySelector('.pacote-descricao')?.textContent || '';
        const detalhes = Array.from(pacote.querySelectorAll('.detalhe-item span'))
            .map(span => span.textContent).join(' ');
        const badge = pacote.querySelector('.pacote-badge')?.textContent || '';
        
        const texto = `${destino} ${descricao} ${detalhes} ${badge}`.toLowerCase();
        
        if (texto.includes(termoBusca)) {
            pacote.style.display = 'flex';
            pacote.style.opacity = '1';
            pacote.style.transform = 'scale(1)';
            pacote.style.border = '2px solid #f8c537';
            pacote.style.borderRadius = '20px';
            encontrados++;
            
            // Scroll para o primeiro resultado
            if (encontrados === 1) {
                setTimeout(() => {
                    pacote.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        }
    });
    
    // Mensagem
    if (encontrados === 0) {
        mostrarMensagemPacotes(`Nenhum pacote encontrado para "${termo}"`);
        limparPesquisaPacotes();
    } else {
        mostrarMensagemPacotes(`${encontrados} pacote(s) encontrado(s)`);
    }
}

function limparPesquisaPacotes() {
    const pacotes = document.querySelectorAll('.pacote-card');
    const filtrosContainer = document.querySelector('.filtros-container');
    const paginacao = document.querySelector('.paginacao');
    
    // Mostrar paginação novamente
    if (paginacao) paginacao.style.display = 'flex';
    
    // Remover bordas de destaque
    pacotes.forEach(pacote => {
        pacote.style.opacity = '1';
        pacote.style.transform = 'scale(1)';
        pacote.style.border = 'none';
    });
    
    if (filtrosContainer) filtrosContainer.style.opacity = '1';
    
    // Restaurar visualização da página atual
    mostrarPaginaAtual();
}

function mostrarMensagemPacotes(texto) {
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

// ==================== SISTEMA DE PAGINAÇÃO ====================
function initPagination() {
    mostrarPaginaAtual();
    
    // Seleciona apenas os botões numéricos (1, 2, 3)
    const botoesNumericos = document.querySelectorAll('.paginacao button');
    const botoesFiltrados = Array.from(botoesNumericos).filter(btn => {
        const texto = btn.textContent.trim();
        return !isNaN(texto) && texto !== '';
    });
    
    botoesFiltrados.forEach((btn) => {
        btn.addEventListener('click', function() {
            const numeroPagina = parseInt(this.textContent.trim());
            
            // Remove active de todos
            botoesFiltrados.forEach(b => b.classList.remove('active'));
            
            // Adiciona active no clicado
            this.classList.add('active');
            
            // Atualiza página atual
            paginaAtual = numeroPagina;
            
            // Mostra pacotes
            mostrarPaginaAtual();
        });
    });
}

function mostrarPaginaAtual() {
    const todosPacotes = document.querySelectorAll('.pacote-card');
    
    // Esconde todos
    todosPacotes.forEach(pacote => {
        pacote.style.display = 'none';
    });
    
    // Calcula quais mostrar
    const inicio = (paginaAtual - 1) * pacotesPorPagina;
    const fim = inicio + pacotesPorPagina;
    
    // Mostra os da página atual
    for (let i = inicio; i < fim && i < todosPacotes.length; i++) {
        todosPacotes[i].style.display = 'flex';
    }
    
    // Scroll suave e lento para o topo
    scrollToTopSlow();
}

// Função de scroll customizada com velocidade controlada
function scrollToTopSlow() {
    const start = window.pageYOffset;
    const duration = 1800; // Duração em milissegundos (1200ms = 1.2 segundos)
    const startTime = performance.now();
    
    function animation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeInOutCubic) para movimento mais suave
        const easing = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, start * (1 - easing));
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

function mudarPagina(direcao) {
    const botoesNumericos = document.querySelectorAll('.paginacao button');
    const botoesFiltrados = Array.from(botoesNumericos).filter(btn => {
        const texto = btn.textContent.trim();
        return !isNaN(texto) && texto !== '';
    });
    
    const totalPaginas = botoesFiltrados.length;
    const novaPagina = paginaAtual + direcao;
    
    if (novaPagina >= 1 && novaPagina <= totalPaginas) {
        // Remove active do atual
        botoesFiltrados.forEach(btn => {
            if (parseInt(btn.textContent.trim()) === paginaAtual) {
                btn.classList.remove('active');
            }
        });
        
        // Adiciona active no novo
        botoesFiltrados.forEach(btn => {
            if (parseInt(btn.textContent.trim()) === novaPagina) {
                btn.classList.add('active');
            }
        });
        
        paginaAtual = novaPagina;
        mostrarPaginaAtual();
    }
}

// ==================== SISTEMA DE FILTROS ====================
function initFilters() {
    const inputs = document.querySelectorAll('.filtro-group input, .filtro-group select');
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') aplicarFiltros();
        });
    });
}

function aplicarFiltros() {
    const destino = document.getElementById('filtro-destino').value;
    const duracao = document.getElementById('filtro-duracao').value;
    const preco = document.getElementById('filtro-preco').value;
    const ordem = document.getElementById('filtro-ordem').value;
    
    const pacotes = document.querySelectorAll('.pacote-card');
    let pacotesFiltrados = Array.from(pacotes);
    
    if (destino) {
        pacotesFiltrados = pacotesFiltrados.filter(pacote => {
            return pacote.dataset.continente === destino;
        });
    }
    
    if (duracao) {
        pacotesFiltrados = pacotesFiltrados.filter(pacote => {
            const duracaoPacote = parseInt(pacote.dataset.duracao);
            if (duracao === '3') return duracaoPacote >= 3 && duracaoPacote <= 5;
            else if (duracao === '7') return duracaoPacote >= 6 && duracaoPacote <= 10;
            else if (duracao === '14') return duracaoPacote >= 11 && duracaoPacote <= 15;
            else if (duracao === '15+') return duracaoPacote > 15;
            return true;
        });
    }
    
    if (preco && preco > 0) {
        pacotesFiltrados = pacotesFiltrados.filter(pacote => {
            return parseInt(pacote.dataset.preco) <= parseInt(preco);
        });
    }
    
    if (ordem === 'preco-menor') {
        pacotesFiltrados.sort((a, b) => parseInt(a.dataset.preco) - parseInt(b.dataset.preco));
    } else if (ordem === 'preco-maior') {
        pacotesFiltrados.sort((a, b) => parseInt(b.dataset.preco) - parseInt(a.dataset.preco));
    } else if (ordem === 'promocao') {
        pacotesFiltrados.sort((a, b) => {
            const aPromocao = a.querySelector('.pacote-badge.promocao') ? 1 : 0;
            const bPromocao = b.querySelector('.pacote-badge.promocao') ? 1 : 0;
            return bPromocao - aPromocao;
        });
    } else if (ordem === 'popular') {
        pacotesFiltrados.sort((a, b) => {
            const aPopular = a.querySelector('.pacote-badge.popular') ? 1 : 0;
            const bPopular = b.querySelector('.pacote-badge.popular') ? 1 : 0;
            return bPopular - aPopular;
        });
    }
    
    pacotes.forEach(pacote => {
        pacote.style.display = 'none';
        pacote.style.order = '0';
    });
    
    if (pacotesFiltrados.length > 0) {
        pacotesFiltrados.forEach((pacote, index) => {
            pacote.style.display = 'flex';
            pacote.style.order = index;
        });
        
        paginaAtual = 1;
        const botoesNumericos = document.querySelectorAll('.paginacao button');
        const botoesFiltrados = Array.from(botoesNumericos).filter(btn => {
            const texto = btn.textContent.trim();
            return !isNaN(texto) && texto !== '';
        });
        
        botoesFiltrados.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === 0);
        });
        
        mostrarPaginaAtual();
    } else {
        mostrarMensagem('Nenhum pacote encontrado com os filtros selecionados.');
        setTimeout(() => {
            pacotes.forEach(pacote => pacote.style.display = 'flex');
            mostrarPaginaAtual();
        }, 2000);
    }
}

function limparFiltros() {
    document.getElementById('filtro-destino').value = '';
    document.getElementById('filtro-duracao').value = '';
    document.getElementById('filtro-preco').value = '';
    document.getElementById('filtro-ordem').value = 'popular';
    
    const todosCards = document.querySelectorAll('.pacote-card');
    todosCards.forEach(card => {
        card.style.display = 'flex';
    });
    
    paginaAtual = 1;
    const botoesNumericos = document.querySelectorAll('.paginacao button');
    const botoesFiltrados = Array.from(botoesNumericos).filter(btn => {
        const texto = btn.textContent.trim();
        return !isNaN(texto) && texto !== '';
    });
    
    botoesFiltrados.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === 0);
    });
    
    mostrarPaginaAtual();
    
    const btnLimpar = document.querySelector('.btn-limpar');
    if (btnLimpar) {
        btnLimpar.textContent = '✓ Filtros Limpos';
        setTimeout(() => {
            btnLimpar.textContent = 'Limpar Filtros';
        }, 1500);
    }
}

// ==================== ANIMAÇÕES ====================
function initAnimations() {
    // Adicionar listeners aos botões "Ver Pacote"
    setTimeout(() => {
        const botoesVerPacote = document.querySelectorAll('.btn-ver-pacote');
        console.log('Botões encontrados:', botoesVerPacote.length);
        
        botoesVerPacote.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Botão clicado!');
                const pacote = this.closest('.pacote-card');
                abrirModalPacote(pacote);
            });
        });
    }, 500);
    
    const pacoteCards = document.querySelectorAll('.pacote-card');
    pacoteCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// ==================== MODAL DE DETALHES DO PACOTE ====================
function abrirModalPacote(pacoteCard) {
    console.log('Abrindo modal para:', pacoteCard);
    
    const modal = document.getElementById('modal-pacote');
    const modalOverlay = document.getElementById('modal-overlay');
    
    if (!modal || !modalOverlay) {
        console.error('Modal ou overlay não encontrado!');
        return;
    }
    
    // Extrair informações do pacote
    const imagem = pacoteCard.querySelector('.pacote-imagem').src;
    const destino = pacoteCard.querySelector('.pacote-destino h3').textContent;
    const descricao = pacoteCard.querySelector('.pacote-descricao').textContent;
    const badge = pacoteCard.querySelector('.pacote-badge');
    const badgeClasses = badge ? badge.className : '';
    const badgeText = badge ? badge.textContent : '';
    const preco = pacoteCard.querySelector('.preco-valor').textContent;
    const parcela = pacoteCard.querySelector('.preco-parcela').textContent;
    
    // Extrair detalhes
    const detalhes = Array.from(pacoteCard.querySelectorAll('.detalhe-item span')).map(span => span.textContent);
    
    console.log('Dados extraídos:', { destino, preco, detalhes });
    
    // Montar HTML do modal
    modal.innerHTML = `
        <div class="modal-header">
            <img src="${imagem}" alt="${destino}">
            ${badge ? `<div class="${badgeClasses}">${badgeText}</div>` : ''}
            <button class="modal-close" onclick="fecharModalPacote()">×</button>
        </div>
        
        <div class="modal-body">
            <div class="modal-destino">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <h2>${destino}</h2>
            </div>
            
            <p class="modal-descricao">${descricao}</p>
            
            <div class="modal-info-grid">
                <div class="modal-info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    <div class="modal-info-content">
                        <h4>Duração</h4>
                        <p>${detalhes[0] || 'Consultar'}</p>
                    </div>
                </div>
                
                <div class="modal-info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                    </svg>
                    <div class="modal-info-content">
                        <h4>Transporte</h4>
                        <p>${detalhes[1] || 'Voo incluso'}</p>
                    </div>
                </div>
                
                <div class="modal-info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V6H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>
                    </svg>
                    <div class="modal-info-content">
                        <h4>Hospedagem</h4>
                        <p>${detalhes[2] || 'Hotel incluso'}</p>
                    </div>
                </div>
                
                <div class="modal-info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <div class="modal-info-content">
                        <h4>Extras</h4>
                        <p>${detalhes[3] || 'Consultar'}</p>
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    O que está incluído
                </h3>
                <div class="modal-inclusos">
                    <div class="incluso-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        <span>Passagens aéreas ida e volta</span>
                    </div>
                    <div class="incluso-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        <span>Hospedagem com café da manhã</span>
                    </div>
                    <div class="incluso-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        <span>Traslados aeroporto-hotel</span>
                    </div>
                    <div class="incluso-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        <span>Seguro viagem</span>
                    </div>
                    <div class="incluso-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        <span>City tour guiado</span>
                    </div>
                    <div class="incluso-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        <span>Suporte 24h em português</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal-footer">
            <div class="modal-preco-container">
                <span class="modal-preco-label">A partir de</span>
                <span class="modal-preco-valor">${preco}</span>
                <span class="modal-preco-parcela">${parcela}</span>
            </div>
            
            <div class="modal-acoes">
                <button class="btn-modal btn-favoritar" onclick="favoritarPacote('${destino}')">
                    ♥ Favoritar
                </button>
                <button class="btn-modal btn-reservar" onclick="reservarPacote('${destino}', '${preco}')">
                    Reservar Agora
                </button>
            </div>
        </div>
    `;
    
    // Mostrar modal
    console.log('Ativando modal...');
    setTimeout(() => {
        modalOverlay.classList.add('active');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Modal ativado!');
        
        // Adicionar listener única vez (remover anterior se existir)
        modalOverlay.removeEventListener('click', fecharModalPacote);
        modalOverlay.addEventListener('click', fecharModalAoClicarOverlay);
    }, 10);
}

// Função separada para fechar o modal ao clicar no overlay
function fecharModalAoClicarOverlay(e) {
    // Verifica se clicou especificamente no overlay e não em um elemento dentro
    if (e.target.id === 'modal-overlay') {
        fecharModalPacote();
    }
}

function fecharModalPacote() {
    console.log('Fechando modal...');
    const modal = document.getElementById('modal-pacote');
    const modalOverlay = document.getElementById('modal-overlay');
    
    if (modal && modalOverlay) {
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Remover event listener
        modalOverlay.removeEventListener('click', fecharModalAoClicarOverlay);
    }
}

function favoritarPacote(destino) {
    mostrarMensagem(`❤️ ${destino} foi adicionado aos seus favoritos!`);
}

function reservarPacote(destino, preco) {
    const confirmacao = confirm(`Deseja prosseguir com a reserva?\n\nDestino: ${destino}\nValor: ${preco}\n\nVocê será redirecionado para o checkout.`);
    if (confirmacao) {
        mostrarMensagem('🎉 Redirecionando para o checkout...');
        // Aqui você pode adicionar o redirecionamento para página de checkout
        // window.location.href = 'checkout.html';
    }
}

// ==================== UTILITÁRIOS ====================
function mostrarMensagem(texto) {
    const mensagem = document.createElement('div');
    mensagem.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9); color: white; padding: 20px 40px;
        border-radius: 10px; font-size: 16px; z-index: 10000;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    `;
    mensagem.textContent = texto;
    document.body.appendChild(mensagem);
    
    setTimeout(() => {
        mensagem.style.opacity = '0';
        mensagem.style.transition = 'opacity 0.3s';
        setTimeout(() => document.body.removeChild(mensagem), 300);
    }, 2000);
}

// ==================== INICIALIZAÇÃO GERAL ====================
function initAll() {
    initMobileMenu();
    initSearchSystem();
    initPagination();
    initFilters();
    initAnimations();
}

// ==================== EXPORTAÇÃO DE FUNÇÕES GLOBAIS ====================
window.aplicarFiltros = aplicarFiltros;
window.limparFiltros = limparFiltros;
window.mudarPagina = mudarPagina;