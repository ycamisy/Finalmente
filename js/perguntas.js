// ==================== PERGUNTAS ====================

// Elementos do formulário
const contatoForm = document.getElementById('contato-form');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const telefoneInput = document.getElementById('telefone');
const assuntoSelect = document.getElementById('assunto');
const mensagemTextarea = document.getElementById('mensagem');

// FAQ - Accordion
const faqPerguntas = document.querySelectorAll('.faq-pergunta');

// Inicializar FAQ Accordion
faqPerguntas.forEach(pergunta => {
    pergunta.addEventListener('click', () => {
        const faqItem = pergunta.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');

        // Fechar todos os itens da mesma categoria
        const categoria = faqItem.closest('.faq-categoria');
        const itensCategoria = categoria.querySelectorAll('.faq-item');
        itensCategoria.forEach(item => {
            item.classList.remove('active');
        });

        // Abrir o item clicado se não estava ativo
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Submissão do formulário
contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    enviarPergunta();
});

// Função para enviar pergunta
function enviarPergunta() {
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const telefone = telefoneInput.value.trim();
    const assunto = assuntoSelect.value;
    const mensagem = mensagemTextarea.value.trim();

    // Validação básica
    if (!nome || !email || !assunto || !mensagem) {
        mostrarMensagem('Por favor, preencha todos os campos obrigatórios!', 'erro');
        return;
    }

    if (!validarEmail(email)) {
        mostrarMensagem('Por favor, insira um email válido!', 'erro');
        return;
    }

    // Dados da pergunta
    const dadosPergunta = {
        nome: nome,
        email: email,
        telefone: telefone || 'Não informado',
        assunto: assunto,
        mensagem: mensagem,
        data: new Date().toLocaleString('pt-BR')
    };

    console.log('Pergunta enviada:', dadosPergunta);

    // Simular envio
    mostrarMensagem('Sua pergunta foi enviada com sucesso! Responderemos em breve.', 'sucesso');

    // Limpar formulário
    contatoForm.reset();

    // Scroll para o topo
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Mostrar mensagem de feedback
function mostrarMensagem(texto, tipo) {
    // Remover mensagem existente
    const mensagemExistente = document.querySelector('.mensagem-sucesso, .mensagem-erro');
    if (mensagemExistente) {
        mensagemExistente.remove();
    }

    const mensagem = document.createElement('div');
    mensagem.className = tipo === 'sucesso' ? 'mensagem-sucesso' : 'mensagem-erro';
    
    if (tipo === 'erro') {
        mensagem.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 15px;
            animation: slideInRight 0.4s ease;
        `;
        mensagem.innerHTML = `<span style="font-size: 28px; font-weight: bold;">⚠</span><span>${texto}</span>`;
    } else {
        mensagem.textContent = texto;
    }

    document.body.appendChild(mensagem);

    // Remover após 4 segundos
    setTimeout(() => {
        mensagem.style.opacity = '0';
        mensagem.style.transition = 'opacity 0.3s';
        setTimeout(() => mensagem.remove(), 300);
    }, 4000);
}

// Máscara de telefone (simples)
telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        e.target.value = value;
    }
});

// Busca nas FAQs
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase().trim();
        buscarFAQ(termo);
    });
}

// Função para buscar nas FAQs
function buscarFAQ(termo) {
    if (termo === '') {
        // Resetar todas as FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.style.display = 'block';
            item.style.opacity = '1';
        });
        document.querySelectorAll('.faq-categoria').forEach(cat => {
            cat.style.display = 'block';
        });
        return;
    }

    let encontrados = 0;

    document.querySelectorAll('.faq-categoria').forEach(categoria => {
        let temResultado = false;
        const itens = categoria.querySelectorAll('.faq-item');

        itens.forEach(item => {
            const pergunta = item.querySelector('.faq-pergunta span').textContent.toLowerCase();
            const resposta = item.querySelector('.faq-resposta p').textContent.toLowerCase();

            if (pergunta.includes(termo) || resposta.includes(termo)) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.border = '2px solid #f8c537';
                temResultado = true;
                encontrados++;

                // Abrir automaticamente se encontrou
                if (!item.classList.contains('active')) {
                    item.classList.add('active');
                }
            } else {
                item.style.display = 'none';
                item.style.opacity = '0.3';
                item.style.border = 'none';
            }
        });

        // Mostrar/ocultar categoria
        categoria.style.display = temResultado ? 'block' : 'none';
    });

    // Scroll para primeira FAQ encontrada
    if (encontrados > 0) {
        const primeiraAtiva = document.querySelector('.faq-item[style*="border: 2px solid"]');
        if (primeiraAtiva) {
            setTimeout(() => {
                primeiraAtiva.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    }
}

// Abrir FAQ específica via URL (ex: ?faq=passagens)
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const faqParam = urlParams.get('faq');
    
    if (faqParam) {
        const categorias = {
            'passagens': 0,
            'hoteis': 1,
            'planos': 2,
            'pagamento': 3
        };

        const indice = categorias[faqParam];
        if (indice !== undefined) {
            const categoria = document.querySelectorAll('.faq-categoria')[indice];
            if (categoria) {
                setTimeout(() => {
                    categoria.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Abrir primeiro item da categoria
                    const primeiroItem = categoria.querySelector('.faq-item');
                    if (primeiroItem) {
                        primeiroItem.classList.add('active');
                    }
                }, 500);
            }
        }
    }
});

// Contador de caracteres no textarea
mensagemTextarea.addEventListener('input', () => {
    const maxLength = 1000;
    const currentLength = mensagemTextarea.value.length;
    
    let contador = mensagemTextarea.nextElementSibling;
    if (!contador || !contador.classList.contains('char-counter')) {
        contador = document.createElement('div');
        contador.className = 'char-counter';
        contador.style.cssText = 'text-align: right; font-size: 12px; color: #666; margin-top: 5px;';
        mensagemTextarea.parentElement.appendChild(contador);
    }
    
    contador.textContent = `${currentLength}/${maxLength} caracteres`;
    
    if (currentLength > maxLength) {
        contador.style.color = '#e74c3c';
        mensagemTextarea.style.borderColor = '#e74c3c';
    } else {
        contador.style.color = '#666';
        mensagemTextarea.style.borderColor = '#e0e0e0';
    }
});