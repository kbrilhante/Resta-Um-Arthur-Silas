const scl = 20;
const tiles = 3 * 7 + 1;

let holes, pegs;

let norm, lit, down, hole;

function preload() {
    norm = loadImage("./assets/norm.png");
    lit = loadImage("./assets/lit.png");
    down = loadImage("./assets/down.png");
    hole = loadImage("./assets/hole.png");
}

function setup() {
    new Canvas(scl * tiles, scl * tiles);

    holes = new Holes();

    pegs = new Pegs();
}

function draw() {
    background("#444");
    // drawGrid();
    pegs.checkDrag();
}

function drawGrid() {
    push();
    stroke(0);
    strokeWeight(1);
    for (let i = 0; i < width; i += scl) {
        line(i, 0, i, height);
    }
    for (let i = 0; i < height; i += scl) {
        line(0, i, width, i);
    }
    pop();
}