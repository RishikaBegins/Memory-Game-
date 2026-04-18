const game = document.querySelector(".game");
const timeText = document.getElementById("time");
const movesText = document.getElementById("moves");
const popup = document.getElementById("popup");
const finalTime = document.getElementById("finalTime");
const finalMoves = document.getElementById("finalMoves");
const flipSound = document.getElementById("flipSound");
const matchSound = document.getElementById("matchSound");
const winSound = document.getElementById("winSound");
const difficultySelect = document.getElementById("difficulty");

let first = null;
let second = null;
let lock = false;

let moves = 0;
let time = 0;
let timer;
let matchedCount = 0;
let gridSize = 4;

// ✅ 100% WORKING IMAGE LIST
const baseImages = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/groovy/groovy-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/objectivec/objectivec-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/delphi/delphi-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fortran/fortran-original.svg",
];

function startGame() {
  game.innerHTML = "";
  moves = 0;
  time = 0;
  matchedCount = 0;
  movesText.textContent = moves;
  timeText.textContent = time;

  clearInterval(timer);
  timer = setInterval(() => {
    time++;
    timeText.textContent = time;
  }, 1000);

  let totalCards = gridSize * gridSize;
  let needed = totalCards / 2;

  let chosen = baseImages.slice(0, needed);
  let cards = [...chosen, ...chosen];
  cards.sort(() => Math.random() - 0.5);

  game.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  cards.forEach((img) => {
    let card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="inner">
        <div class="front"></div>
        <div class="back"><img src="${img}"></div>
      </div>
    `;

    card.addEventListener("click", () => flipCard(card));
    game.appendChild(card);
  });
}

function flipCard(card) {
  if (lock || card.classList.contains("flipped")) return;

  flipSound.play();
  card.classList.add("flipped");

  if (!first) {
    first = card;
    return;
  }

  second = card;
  moves++;
  movesText.textContent = moves;
  checkMatch();
}

function checkMatch() {
  let img1 = first.querySelector("img").src;
  let img2 = second.querySelector("img").src;

  if (img1 === img2) {
    matchSound.play();
    first.classList.add("match");
    second.classList.add("match");
    matchedCount++;

    first = null;
    second = null;

    if (matchedCount === (gridSize * gridSize) / 2) {
      setTimeout(showPopup, 700);
    }
  } else {
    lock = true;
    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
      first = null;
      second = null;
      lock = false;
    }, 700);
  }
}

function showPopup() {
  clearInterval(timer);
  winSound.play();

  confetti({
    particleCount: 300,
    spread: 90,
    origin: { y: 0.6 },
  });

  finalTime.textContent = time;
  finalMoves.textContent = moves;
  popup.style.display = "flex";
}

function restartGame() {
  location.reload();
}

document.getElementById("restart").addEventListener("click", restartGame);

difficultySelect.addEventListener("change", () => {
  gridSize = parseInt(difficultySelect.value);
  startGame();
});

startGame();
