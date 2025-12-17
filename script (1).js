let dados = JSON.parse(localStorage.getItem("registros")) || [
  {
    id: 1,
    titulo: "Estudar JavaScript",
    data: "2025-05-01",
    curtidas: 1
  },
  {
    id: 2,
    titulo: "Revisar HTML",
    data: "2025-06-10",
    curtidas: 3
  }
];

const conteudo = document.getElementById("conteudo");
const mensagem = document.getElementById("mensagem");

/* ===== Renderização ===== */
function renderizar() {
  conteudo.innerHTML = "";

  dados.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <h3>${item.titulo}</h3>
      <p>Data: ${item.data}</p>
      <p>Curtidas: ${item.curtidas}</p>
      <button onclick="curtir(${item.id})">Curtir</button>
    `;

    conteudo.appendChild(div);
  });
}

/* ===== Feedback + Curtidas ===== */
function curtir(id) {
  const registro = dados.find(r => r.id === id);
  registro.curtidas++;

  salvar();
  mensagem.textContent = "Curtida registrada com sucesso!";
  mensagem.className = "sucesso";

  renderizar();
}

/* ===== LocalStorage ===== */
function salvar() {
  localStorage.setItem("registros", JSON.stringify(dados));
}

/* ===== Ordenação ===== */
document.getElementById("ordenarCurtidas").addEventListener("click", () => {
  dados.sort((a, b) => b.curtidas - a.curtidas);
  salvar();
  renderizar();
});

document.getElementById("ordenarData").addEventListener("click", () => {
  dados.sort((a, b) => new Date(a.data) - new Date(b.data));
  salvar();
  renderizar();
});

/* ===== Validação ===== */
document.getElementById("formulario").addEventListener("submit", e => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const data = document.getElementById("data").value;

  if (titulo.length < 3) {
    mensagem.textContent = "Erro: título deve ter pelo menos 3 caracteres.";
    mensagem.className = "erro";
    return;
  }

  if (!data) {
    mensagem.textContent = "Erro: data obrigatória.";
    mensagem.className = "erro";
    return;
  }

  dados.push({
    id: Date.now(),
    titulo,
    data,
    curtidas: 0
  });

  salvar();
  mensagem.textContent = "Registro salvo com sucesso!";
  mensagem.className = "sucesso";

  e.target.reset();
  renderizar();
});

renderizar();
