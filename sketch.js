const scl = 20;
const tiles = 3 * 7 + 1;

let holes, pegs;

function preload() { }

function setup() {
    new Canvas(scl * tiles, scl * tiles);

    holes = new Holes();

    pegs = new Pegs();
}

function draw() {
    background("#fff");
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