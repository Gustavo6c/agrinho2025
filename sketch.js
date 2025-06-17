//jogo criado com IA, chatgpt Prompt:Criar um jogo no p5js inspirado em Subway Surfers, mas com um tema sobre o ciclo de plantio e colheita. O jogo terá uma rota otimizada entre o campo e a cidade, com o objetivo de transportar as colheitas de forma eficiente.

//Visão geral do jogo:
//Cenário: Teremos um campo e uma cidade como cenários principais. O jogador deve transportar as colheitas do campo para a cidade, mas há obstáculos no caminho.

//Objetivo: O objetivo do jogo é otimizar o tempo para transportar a colheita, evitando obstáculos, e realizando um ciclo de plantio e colheita com a menor quantidade de erros e tempo possível.

//Mecânica: O jogador controla um personagem que deve seguir trilhos entre o campo e a cidade. A rota entre o campo e a cidade será otimizada, mas o jogador pode escolher entre diferentes rotas para evitar obstáculos e minimizar o tempo. em linguagem javascrip
 let gameState = "start";

let laneWidth = 100;
let totalLanes = 3;
let lanes = [];

let player;
let obstacles = [];
let obstacleTimer = 0;
let obstacleInterval = 80;

let passedObstacles = 0;

function setup() {
  createCanvas(400, 600);

  let margin = (width - laneWidth * totalLanes) / 2;
  for (let i = 0; i < totalLanes; i++) {
    lanes[i] = margin + i * laneWidth;
  }

  player = {
    lane: 1,
    y: height - 60,
    size: 40
  };
}

function draw() {
  if (gameState === "start") {
   function drawStartScreen() {
  background(200, 250, 200);
  fill(0);
  textAlign(CENTER);

  // Título do Jogo
  textSize(42);
  text("🌽 AGRO DASH 🌾", width / 2, 60);

  // Descrição do jogo
  textSize(14);
  text("Bem-vindo ao Agro Dash!", width / 2, 110);
  text("Este é um jogo de desviar de obstáculos", width / 2, 140);
  text("com o objetivo de transportar colheitas do campo até a cidade.", width / 2, 170);

  // Como jogar
  textSize(18);
  text("🎮 Como Jogar:", width / 2, 220);
  textSize(13);
  text("Use as teclas ← e → para mover seu personagem entre as rotas.", width / 2, 250);
  text("Desvie de obstáculos como pedras, galhos e carros.", width / 2, 280);
  text("A cada 10 obstáculos desviados, o cenário muda.", width / 2, 310);

  // Objetivo
  textSize(18);
  text("🎯 Objetivo:", width / 2, 370);
  textSize(13);
  text("Chegue até a cidade depois de desviar de 50 obstáculos sem colidir.", width / 2, 400);
  text("Se bater em algum obstáculo, o jogo recomeça.", width / 2, 430);

  // Instrução para iniciar
  textSize(16);
  fill(50, 100, 50);
  text("Pressione qualquer tecla para começar 🌱", width / 2, height - 40);
}

    drawStartScreen();
  } else if (gameState === "transporte") {
    drawGame();
    // Mostra contador de obstáculos
fill(0);
textSize(18);
textAlign(LEFT);
text("Obstáculos desviados: " + passedObstacles, 10, 30);

  } else if (gameState === "fim") {
    drawEndScreen();
  }
}

function drawStartScreen() {
  background(144, 238, 144);
  fill(255);
  textAlign(CENTER);
  textSize(28);
  text("🌾 Agro Dash 🌾", width / 2, 80);
  textSize(16);
  text("Desvie dos obstáculos.\nA cada 10 obstáculos, o cenário muda.", width / 2, 150);
  text("Pressione qualquer tecla para começar", width / 2, height - 60);
}

function drawEndScreen() {
  background(255, 215, 0);
  fill(0);
  textAlign(CENTER);
  textSize(28);
  text("Parabéns!", width / 2, height / 2 - 40);
  textSize(18);
  text("Você completou 50 obstáculos!", width / 2, height / 2);
  text("Pressione qualquer tecla para jogar novamente.", width / 2, height - 50);
}

function drawGame() {
  // Alternância entre campo e cidade
  let modulo = floor(passedObstacles / 10) % 2;
  if (modulo === 0) {
    background(144, 238, 144); // Campo
  } else {
    background(180, 180, 200); // Cidade
  }

  drawLanes();
  drawPlayer();
  updateObstacles();

  if (passedObstacles >= 50) {
    gameState = "fim";
  }
}

function drawLanes() {
  for (let i = 0; i < totalLanes; i++) {
    fill(160);
    rect(lanes[i], 0, laneWidth - 10, height);
  }
}

function drawPlayer() {
  fill(255, 100, 100);
  ellipse(lanes[player.lane] + laneWidth / 2 - 5, player.y, player.size);
}

function updateObstacles() {
  obstacleTimer++;
  if (obstacleTimer > obstacleInterval) {
    let lane = floor(random(0, totalLanes));
    obstacles.push({
      lane: lane,
      y: -20,
      size: 30,
      speed: 4
    });
    obstacleTimer = 0;
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obs = obstacles[i];
    obs.y += obs.speed;

    fill(80, 80, 80);
    rect(lanes[obs.lane] + laneWidth / 2 - 15, obs.y, obs.size, obs.size);

    if (
      obs.lane === player.lane &&
      obs.y + obs.size / 2 > player.y - player.size / 2 &&
      obs.y - obs.size / 2 < player.y + player.size / 2
    ) {
      gameState = "start";
      obstacles = [];
      passedObstacles = 0;
      return;
    }

    if (obs.y > height) {
      obstacles.splice(i, 1);
      passedObstacles++;
    }
  }
}

function keyPressed() {
  if (gameState === "start" || gameState === "fim") {
    gameState = "transporte";
    obstacles = [];
    passedObstacles = 0;
  } else if (gameState === "transporte") {
    if (keyCode === LEFT_ARROW && player.lane > 0) {
      player.lane--;
    } else if (keyCode === RIGHT_ARROW && player.lane < totalLanes - 1) {
      player.lane++;
    }
  }
}