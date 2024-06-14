
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;
let velocidadexBolinha = 3;
let velocidadeyBolinha = 3;
let xRaquete1 = 10;
let yRaquete1 = 170;
let raqueteComprimento1 = 10;
let raqueteAltura1 = 90;
let xRaquete2 = 590;
let yRaquete2 = 260;
let raqueteComprimento2 = -10;
let raqueteAltura2 = -90;
let colidiu = false;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentoDaBolinha();
  verificaColisaoBolinha();
  movimentaMinhaRaquete1();
  movimentaMinhaRaquete2();
  mostraAsRaquetes();
  // verificaColisaoRaquete1();
  verificaColisaoRaquete2();
  colidiuComARaquete();
  marcaPonto();
  incluiPlacar();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentoDaBolinha() {
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function verificaColisaoBolinha() {
  if (xBolinha + raio > width) {
    velocidadexBolinha *= -1;
  }
  if (xBolinha - raio < 0) {
    velocidadexBolinha *= -1;
  }
  if (yBolinha + raio > height) {
    velocidadeyBolinha *= -1;
  }
  if (yBolinha - raio < 0) {
    velocidadeyBolinha *= -1;
  }
}

function movimentaMinhaRaquete1() {
  if (keyIsDown(87)) {
    yRaquete1 -= 10;
  }
  if (keyIsDown(83)) {
    yRaquete1 += 10;
  }
}

function movimentaMinhaRaquete2() {
  if (keyIsDown(87)) {
    yRaquete2 += 10;
  }
  if (keyIsDown(83)) {
    yRaquete2 -= 10;
  }
}

function mostraAsRaquetes() {
  rect(xRaquete1, yRaquete1, raqueteComprimento1, raqueteAltura1);
  rect(xRaquete2, yRaquete2, raqueteComprimento2, raqueteAltura2);
}

function verificaColisaoRaquete1() {
  if (
    xBolinha - raio < xRaquete1 + raqueteComprimento1 &&
    yBolinha - raio < yRaquete1 + raqueteAltura1 &&
    yBolinha + raio > yRaquete1
  ) {
    velocidadexBolinha *= -1;
  }
}

function verificaColisaoRaquete2() {
  if (
    xBolinha + raio > xRaquete2 + raqueteComprimento2 &&
    yBolinha + raio > yRaquete2 + raqueteAltura2 &&
    yBolinha - raio < yRaquete2
  ) {
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function colidiuComARaquete() {
  hit = collideRectCircle(
    xRaquete1,
    yRaquete1,
    raqueteComprimento1,
    raqueteAltura1,
    xBolinha,
    yBolinha,
    raio
  );
  if (hit) {
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar() {
  textAlign(CENTER);
  textSize(19);
  fill(255);
  text(meusPontos, 278, 26);
  text(pontosDoOponente, 321, 26);
}

function marcaPonto() {
  if (xBolinha > 591) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 9) {
    pontosDoOponente += 1;
  }
}
