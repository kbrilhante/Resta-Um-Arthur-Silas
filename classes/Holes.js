class Holes {
    constructor() {
        this.group = new Group();
        this.group.radius = scl;
        this.group.color = 0;
        this.group.collider = "k";
        this.group.addAni("hole", hole);
        this.group.addAni("down", down);
        this.aniScale = (2 * scl / norm.w) + 0.14;
        for (let j = 0; j < 7; j++) {
            for (let i = 0; i < 7; i++) {
                if ((i >= 2 && i <= 4) || (j >= 2 && j <= 4)){
                    let h = new this.group.Sprite();
                    h.x = (scl * 3 * i) + (scl * 2);
                    h.y = (scl * 3 * j) + (scl * 2);
                    h.coords = {
                        c: i,
                        r: j
                    };
                    this.setAni(h, "hole");
                }
            }
        }
    }
    setAni(h, key) {
        h.changeAni(key);
        h.ani.scale = this.aniScale;
    }
    getHole() {
        for (let i = 0; i < this.group.length; i++) {
            const hole = this.group[i];
            if (hole.mouse.hovering()) {
                return hole;
            }
        }
        return false;
    }
    isEmpty(col, row) {
        for (let i = 0; i < pegs.group.length; i++) {
            const peg = pegs.group[i];
            if (col === peg.coords.c && row === peg.coords.r) {
                return false;
            }
        }
        return true;
    }
    getWholeEmptyHole(col, row) {
        for (let i = 0; i < this.group.length; i++) {
            const hole = this.group[i];
            if (col === hole.coords.c && row === hole.coords.r && this.isEmpty(col, row)) {
                return hole;
            }
        }
        return false
    }
}
