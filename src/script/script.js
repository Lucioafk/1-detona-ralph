const estado = {
    tela: {
        quadrados: document.querySelectorAll(".quadrado"),
        inimigo: document.querySelector(".inimigo"),
        tempoRestante: document.querySelector("#tempo-restante"),
        pontuacao: document.querySelector("#pontuacao"),
    }, 
    valores: {
        intervaloInimigo: setInterval(sorteiaQuadrado, 1000),
        intervaloTempo: setInterval(contagemRegressiva, 1000),
        velocidadeJogo: 1000,
        posicaoAcerto: 0,
        pontos: 0,
        tempoAtual: 60,
    },
};

function contagemRegressiva() {
    estado.valores.tempoAtual--;
    estado.tela.tempoRestante.textContent = estado.valores.tempoAtual;

    if (estado.valores.tempoAtual < 0) {
        alert("Fim de Jogo! Pontos: " + estado.valores.pontos);
    }
}

function tocarSom() {
    let audio = new Audio("src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function sorteiaQuadrado() {
    estado.tela.quadrados.forEach((quadrado) => {
        quadrado.classList.remove("inimigo");
    });

    let numeroAleatorio = Math.floor(Math.random() * 9);
    let quadradoEscolhido = estado.tela.quadrados[numeroAleatorio];
    quadradoEscolhido.classList.add("inimigo");

    estado.valores.posicaoAcerto = quadradoEscolhido.id;
}

function moverInimigo() {
    estado.valores.intervaloInimigo = setInterval(
        sorteiaQuadrado,
        estado.valores.velocidadeJogo
    );
}

function adicionarEventos() {
    estado.tela.quadrados.forEach((quadrado) => {
        quadrado.addEventListener("mousedown", () => {
            if (quadrado.id === estado.valores.posicaoAcerto) {
                estado.valores.pontos++;
                estado.tela.pontuacao.textContent = estado.valores.pontos;
                estado.valores.posicaoAcerto = null;
                tocarSom();
            }
        });
    });
}

function iniciar() {
    sorteiaQuadrado();
    adicionarEventos();
}

iniciar();