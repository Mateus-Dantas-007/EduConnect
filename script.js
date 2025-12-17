// 1. Estrutura de Dados Inicial (Unificada)
let dados = JSON.parse(localStorage.getItem('educonnect_dados')) || [
    { id: 1, titulo: 'Introdução ao JS', categoria: 'Tecnologia', data: '2025-05-01', descricao: 'Aulas iniciais', curtidas: 0 },
    { id: 2, titulo: 'Check-up Mensal', categoria: 'Saúde', data: '2025-06-10', descricao: 'Rotina de saúde', curtidas: 2 }
];

// Seleção de elementos do DOM
const containerCards = document.getElementById('containerCards');
const formCadastro = document.getElementById('formCadastro');
const msgFeedback = document.getElementById('mensagemSucesso');

// 2. Renderização Dinâmica (Função única e poderosa)
function renderizarCards(listaParaExibir) {
    containerCards.innerHTML = ''; // Limpa o container antes de renderizar

    if (listaParaExibir.length === 0) {
        containerCards.innerHTML = '<p>Nenhum registro encontrado.</p>';
        return;
    }

    listaParaExibir.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.titulo}</h3>
            <p><strong>Categoria:</strong> ${item.categoria}</p>
            <p><strong>Data:</strong> ${item.data}</p>
            <p>${item.descricao || ''}</p>
            <div class="acoes">
                <span>👍 ${item.curtidas}</span>
                <button onclick="curtir(${item.id})">Curtir</button>
            </div>
        `;
        containerCards.appendChild(card);
    });
}

// 3. Filtros e Pesquisa
function filtrar() {
    const busca = document.getElementById('inputBusca').value.toLowerCase();
    const categoriaFiltro = document.getElementById('filtroCategoria').value;

    const dadosFiltrados = dados.filter(item => {
        const matchesBusca = item.titulo.toLowerCase().includes(busca);
        const matchesCategoria = categoriaFiltro === 'Todos' || item.categoria === categoriaFiltro;
        return matchesBusca && matchesCategoria;
    });

    renderizarCards(dadosFiltrados);
}

// Eventos de Filtro e Busca
document.getElementById('inputBusca').addEventListener('input', filtrar);
document.getElementById('filtroCategoria').addEventListener('change', filtrar);

// 4. Ordenação (Novas funcionalidades)
document.getElementById("ordenarCurtidas").addEventListener("click", () => {
    dados.sort((a, b) => b.curtidas - a.curtidas);
    salvarERenderizar();
});

document.getElementById("ordenarData").addEventListener("click", () => {
    dados.sort((a, b) => new Date(a.data) - new Date(b.data));
    salvarERenderizar();
});

// 5. Formulário de Cadastro (Validação e Persistência)
formCadastro.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const tituloVal = document.getElementById('titulo').value.trim();
    const categoriaVal = document.getElementById('categoria').value;
    const dataVal = document.getElementById('data').value;
    const descVal = document.getElementById('descricao').value;

    // Validação simples
    if (tituloVal.length < 3) {
        alert("O título deve ter pelo menos 3 caracteres.");
        return;
    }

    const novoItem = {
        id: Date.now(), 
        titulo: tituloVal,
        categoria: categoriaVal,
        data: dataVal,
        descricao: descVal,
        curtidas: 0
    };

    dados.push(novoItem);
    salvarERenderizar();
    
    formCadastro.reset();
    mostrarFeedback("Registro adicionado com sucesso!", "green");
});

// 6. Funções Auxiliares (Reutilizáveis)
function curtir(id) {
    const item = dados.find(d => d.id === id);
    if (item) {
        item.curtidas++;
        salvarERenderizar();
    }
}

function salvarERenderizar() {
    localStorage.setItem('educonnect_dados', JSON.stringify(dados));
    // Após salvar, chamamos o filtrar para manter a busca/categoria atual se houver
    filtrar(); 
}

function mostrarFeedback(texto, cor) {
    msgFeedback.innerText = texto;
    msgFeedback.style.color = cor;
    msgFeedback.style.display = 'block';
    setTimeout(() => msgFeedback.style.display = 'none', 3000);
}

// Inicialização da página
renderizarCards(dados);