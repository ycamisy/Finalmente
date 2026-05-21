// ==================== ELEMENTOS DOM ====================
const heroSearchInput = document.getElementById('heroSearchInput');
const searchInput = document.getElementById('search-input');
const searchIcon = document.getElementById('searchIcon');
const searchInputContainer = document.getElementById('searchInputContainer');
const btnCanais = document.querySelectorAll('.btn-canal');
const categoriasAjuda = document.querySelectorAll('.categoria-ajuda-card');
const formContato = document.getElementById('formContato');

let searchActive = false;

// ==================== BUSCA NO HERO ====================
function initHeroSearch() {
    if (heroSearchInput) {
        heroSearchInput.addEventListener('input', (e) => {
            pesquisarAjuda(e.target.value);
        });
        
        heroSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                pesquisarAjuda(e.target.value);
            }
        });
    }
}

function pesquisarAjuda(termo) {
    const termoBusca = termo.toLowerCase().trim();
    
    if (termoBusca === '') {
        limparPesquisa();
        return;
    }
    
    let encontrados = 0;
    let primeiroResultado = null;
    
    // Buscar nas categorias de ajuda
    categoriasAjuda.forEach(card => {
        const categoria = card.dataset.categoria || '';
        const texto = card.textContent.toLowerCase();
        
        if (categoria.includes(termoBusca) || texto.includes(termoBusca)) {
            card.style.border = '3px solid #f8c537';
            card.style.boxShadow = '0 0 20px rgba(248, 197, 55, 0.6)';
            encontrados++;
            
            if (!primeiroResultado) {
                primeiroResultado = card;
            }
        } else {
            card.style.border = 'none';
            card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
        }
    });
    
    if (primeiroResultado) {
        setTimeout(() => {
            primeiroResultado.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center'
            });
        }, 300);
        mostrarMensagem(`${encontrados} categoria(s) encontrada(s)`);
    } else {
        mostrarMensagem(`Nenhum resultado encontrado para "${termo}"`);
        
        // Sugerir usar formulário de contato
        setTimeout(() => {
            if (confirm('Não encontrou o que procura? Deseja preencher o formulário de contato?')) {
                document.querySelector('.formulario-section').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        }, 1500);
    }
}

function limparPesquisa() {
    categoriasAjuda.forEach(card => {
        card.style.border = 'none';
        card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
    });
}

// ==================== BUSCA NO HEADER ====================
function initHeaderSearch() {
    if (!searchIcon || !searchInputContainer || !searchInput) return;

    searchIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        searchActive = !searchActive;

        if (searchActive) {
            searchInputContainer.classList.add('active');
            searchIcon.classList.add('active');
            setTimeout(() => searchInput.focus(), 400);
        } else {
            searchInputContainer.classList.remove('active');
            searchIcon.classList.remove('active');
            searchInput.value = '';
            limparPesquisa();
        }
    });

    searchInput.addEventListener('input', (e) => {
        pesquisarAjuda(e.target.value);
    });

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchActive = false;
            searchInputContainer.classList.remove('active');
            searchIcon.classList.remove('active');
            searchInput.value = '';
            limparPesquisa();
            searchInput.blur();
        }
    });
}

// ==================== CANAIS DE ATENDIMENTO ====================
function initCanais() {
    btnCanais.forEach(btn => {
        btn.addEventListener('click', () => {
            const canalCard = btn.closest('.canal-card');
            const canalTitulo = canalCard.querySelector('h3').textContent;
            
            switch(canalTitulo) {
                case 'WhatsApp':
                    mostrarMensagem('Redirecionando para WhatsApp...');
                    setTimeout(() => {
                        window.open('https://wa.me/5511999999999', '_blank');
                    }, 1000);
                    break;
                    
                case 'E-mail':
                    mostrarMensagem('Abrindo cliente de e-mail...');
                    setTimeout(() => {
                        window.location.href = 'mailto:contato@skymilles.com.br';
                    }, 1000);
                    break;
                    
                case 'Telefone':
                    mostrarMensagem('Ligue para: 0800 123 4567');
                    break;
                    
                case 'Chat Online':
                    mostrarMensagem('Iniciando chat online...');
                    setTimeout(() => {
                        // Simular abertura de chat
                        alert('Chat online iniciado! Um atendente estará com você em instantes.');
                    }, 1000);
                    break;
            }
        });
    });
}

// ==================== CATEGORIAS DE AJUDA ====================
function initCategoriasAjuda() {
    categoriasAjuda.forEach(card => {
        card.addEventListener('click', () => {
            const categoria = card.dataset.categoria;
            const titulo = card.querySelector('h3').textContent;
            
            mostrarMensagem(`Abrindo categoria: ${titulo}...`);
            
            // Simular navegação para página de categoria
            setTimeout(() => {
                alert(`Você seria redirecionado para a página de ajuda sobre ${titulo}`);
            }, 1000);
        });
    });
}

// ==================== FORMULÁRIO DE CONTATO ====================
function initFormulario() {
    if (!formContato) return;
    
    formContato.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const reserva = document.getElementById('reserva').value.trim();
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value.trim();
        
        // Validações
        if (!nome || !email || !assunto || !mensagem) {
            mostrarMensagem('Por favor, preencha todos os campos obrigatórios');
            return;
        }
        
        if (!validarEmail(email)) {
            mostrarMensagem('Por favor, insira um e-mail válido');
            return;
        }
        
        // Simular envio
        const btnEnviar = formContato.querySelector('.btn-enviar');
        btnEnviar.disabled = true;
        btnEnviar.textContent = 'Enviando...';
        
        setTimeout(() => {
            mostrarMensagem('Mensagem enviada com sucesso! Retornaremos em breve. ✓');
            formContato.reset();
            btnEnviar.disabled = false;
            btnEnviar.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
                Enviar Mensagem
            `;
            
            // Scroll para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);
    });
    
    // Formatação de telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d*)/, '($1');
            }
            
            e.target.value = value;
        });
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ==================== UTILIDADES ====================
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

// ==================== ANIMAÇÕES ====================
function initAnimacoes() {
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
        ".canal-card, .categoria-ajuda-card, .status-card"
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease";
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });
}

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    initHeroSearch();
    initHeaderSearch();
    initCanais();
    initCategoriasAjuda();
    initFormulario();
    initAnimacoes();
    
    // Adicionar estilos de animação
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
});