// 1. Estrutura de Dados Inicia
let dados = JSON.parse(localStorage.getItem('educonnect_dados')) || [
  { id: 1, titulo: 'Introdução ao JS', categoria: 'Tecnologia', data: '2025-05-01', descricao: 'Aulas iniciais', curtidas: 0 },
  { id: 2, titulo: 'Check-up Mensal', categoria: 'Saúde', data: '2025-06-10', descricao: 'Rotina de saúde', curtidas: 2 }
];

const containerCards = document.getElementById('containerCards');
const formCadastro = document.getElementById('formCadastro');

// 2. Renderização Dinâmica
function renderizarCards(listaParaExibir) {
  containerCards.innerHTML = '';

  listaParaExibir.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.titulo}</h3>
      <p><strong>Categoria:</strong> ${item.categoria}</p>
      <p><strong>Data:</strong> ${item.data}</p>
      <p>${item.descricao}</p>
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

// Eventos de Filtro
document.getElementById('inputBusca').addEventListener('input', filtrar);
document.getElementById('filtroCategoria').addEventListener('change', filtrar);

// 4. Formulário de Cadastro e LocalStorage
formCadastro.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const novoItem = {
    id: Date.now(), 
    titulo: document.getElementById('titulo').value,
    categoria: document.getElementById('categoria').value,
    data: document.getElementById('data').value,
    descricao: document.getElementById('descricao').value,
    curtidas: 0
  };

  dados.push(novoItem);
  salvarERenderizar();
  
  formCadastro.reset();
  mostrarMensagem();
});

function curtir(id) {
  const item = dados.find(d => d.id === id);
  if (item) {
    item.curtidas++;
    salvarERenderizar();
  }
}

function salvarERenderizar() {
  localStorage.setItem('educonnect_dados', JSON.stringify(dados));
  renderizarCards(dados);
}

function mostrarMensagem() {
  const msg = document.getElementById('mensagemSucesso');
  msg.style.display = 'block';
  setTimeout(() => msg.style.display = 'none', 3000);
}

renderizarCards(dados);