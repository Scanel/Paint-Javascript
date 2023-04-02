export class Element{
    constructor(x1, y1, x2, y2, type, pencil, sides, color,grosor){
        this.type = type;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = 0;
        this.y3 = 0;
        this.x4 = 0;
        this.y4 = 0;
        this.dx = x2-x1;
        this.dy = y2-y1;
        this.sides = sides;
        this.angle = 0;
        this.color = color;
        this.selected = false;
        this.pencil = pencil;
        this.grosor = grosor;
    }
}

export class Pencil{
    constructor(){
        this.points = [];
    }
}

export class Layer{
    constructor(){
        this.elements = [];
    }
}
