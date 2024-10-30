const palavraSecreta = "dados";
const maxTentativas = 6;
let tentativaAtual = 0;

const gameBoard = document.getElementById("game-board");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const message = document.getElementById("message");

function criarGrade() {
    for (let i = 0; i < maxTentativas; i++) {
        for (let j = 0; j < palavraSecreta.length; j++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = `tile-${i}-${j}`;
            gameBoard.appendChild(tile);
        }
    }
}

function verificarPalpite() {
    const palpite = guessInput.value.toLowerCase();
    if (palpite.length !== palavraSecreta.length) {
        message.textContent = "A palavra precisa ter 5 letras!";
        return;
    }

    if (tentativaAtual >= maxTentativas) {
        message.textContent = "Você atingiu o número máximo de tentativas!";
        return;
    }

    for (let i = 0; i < palavraSecreta.length; i++) {
        const tile = document.getElementById(`tile-${tentativaAtual}-${i}`);
        tile.textContent = palpite[i];

        if (palpite[i] === palavraSecreta[i]) {
            tile.classList.add("correct");
        } else if (palavraSecreta.includes(palpite[i])) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }

    if (palpite === palavraSecreta) {
        message.textContent = "Parabéns! Você acertou a palavra!";
        guessButton.disabled = true;
        guessInput.disabled = true;
    } else if (tentativaAtual < maxTentativas - 1) {
        tentativaAtual++;
        guessInput.value = "";
        message.textContent = "";
    } else {
        message.textContent = `Fim de jogo! A palavra era "${palavraSecreta}".`;
        guessButton.disabled = true;
        guessInput.disabled = true;
    }
}

guessButton.addEventListener("click", verificarPalpite);
guessInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        verificarPalpite();
    }
});

criarGrade();
