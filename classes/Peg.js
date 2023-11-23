class Pegs {
    constructor() {
        this.group = new Group();
        this.group.radius = scl * 0.8;
        this.group.color = "aquamarine";
        this.group.collider = "k";

        for (let j = 0; j < 7; j++) {
            for (let i = 0; i < 7; i++) {
                if (((i >= 2 && i <= 4) || (j >= 2 && j <= 4)) && !(i == 3 && j == 3)) {
                    let p = new this.group.Sprite();
                    p.x = (scl * 3 * i) + (scl * 2);
                    p.y = (scl * 3 * j) + (scl * 2);
                    p.coords = {
                        c: i,
                        r: j
                    };
                }
            }
        }
    }
    move(peg, hole) {
        const pegC = peg.coords.c;
        const pegR = peg.coords.r;
        const holeC = hole.coords.c;
        const holeR = hole.coords.r;
        // console.log(abs(pegC - holeC), abs(pegR - holeR))
        if (
            (abs(pegC - holeC) === 0 && abs(pegR - holeR) === 2) ||
            (abs(pegC - holeC) === 2 && abs(pegR - holeR) === 0)
        ) {
            const col = lerp(pegC, holeC, 0.5);
            const row = lerp(pegR, holeR, 0.5);
            if (!holes.isEmpty(col, row)){ // is a valid move
                this.getPeg(col, row).remove();
                peg.moveTo(hole, 4);
                peg.coords = {
                    c: hole.coords.c,
                    r: hole.coords.r
                }
                // check for win / lose
                this.checkWinLose();
            }
        }
    }
    checkWinLose() {
        if (this.group.length === 1) {
            this.win();
        } else {
            let count = 0;
            for (let i = 0; i < this.group.length; i++) {
                const peg = this.group[i];
                if (this.isMovable(peg)) {
                    count++;
                }
            }
            if (count === 0) {
                this.lose();
            }
        }
    }
    win() {
        const spr = new Sprite();
        spr.textSize = 35;
        spr.collider = 'n';
        spr.diameter = width / 2;
        spr.color = '#00FFFFBB';
        spr.stroke = '#00FFFF';
        spr.text = "YOU WIN";
        spr.textColor = "#fff";
    }
    lose() {
        // background("pink");
        const spr = new Sprite();
        spr.textSize = 35;
        spr.collider = 'n';
        spr.diameter = width / 2;
        spr.color = '#FF0000BB';
        spr.stroke = '#FF0000';
        spr.text = "YOU LOSE";
        spr.textColor = "#fff";
    }
    getPeg(col, row) {
        for (let i = 0; i < this.group.length; i++) {
            const peg = this.group[i];
            if (col === peg.coords.c && row === peg.coords.r) {
                return peg;
            }
        }
        return false;
    }
    checkDrag() {
        for (let i = 0; i < this.group.length; i++) {
            const peg = this.group[i];

            if (peg.mouse.dragging()) {
                peg.color = "red";
                this.getValidMoves(peg);
            }
            if (peg.mouse.released()) {
                peg.color = "aquamarine";
                // console.log(peg.coords);
                const hole = holes.getHole();
                // console.log(hole.coords);

                if (hole && holes.isEmpty(hole.coords.c, hole.coords.r)) {
                    this.move(peg, hole);
                }
                holes.group.color = "black";
            }

        }
    }
    isMovable(peg) {
        if (this.getValidMoves(peg).length) {
            return true;
        }
        return false;
    }
    getValidMoves(peg) {
        const col = peg.coords.c;
        const row = peg.coords.r;
        const validHoles = [];
        let lixo;
        lixo = holes.getWholeEmptyHole(col - 2, row);
        if (lixo && !holes.isEmpty(col - 1, row)){
            validHoles.push(lixo);
        }
        lixo = holes.getWholeEmptyHole(col + 2, row);
        if (lixo && !holes.isEmpty(col + 1, row)){
            validHoles.push(lixo);
        }
        lixo = holes.getWholeEmptyHole(col, row - 2);
        if (lixo && !holes.isEmpty(col, row - 1)){
            validHoles.push(lixo);
        }
        lixo = holes.getWholeEmptyHole(col, row + 2);
        if (lixo && !holes.isEmpty(col, row + 1)){
            validHoles.push(lixo);
        }
        for (let i = 0; i < validHoles.length; i++) {
            validHoles[i].color = "purple";
        }
        return validHoles;
    }
}