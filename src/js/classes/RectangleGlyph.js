import AnimatedGlyph from './AnimatedGlyph.js';

export default class RectangleGlyph extends AnimatedGlyph {

    constructor(p5, x, y, width) {
        super(p5, x, y, width);
        this.width = width / 16;
    }

    draw() {
        const currentTime = this.p.millis();
        if(currentTime < this.endTime){
            const scale = this.p.min(1, (currentTime - this.startTime) / (this.endTime - this.startTime)),
                dist = window.p5.Vector.sub(this.destination, this.origin).mult(scale),
                pos = window.p5.Vector.add(this.origin, dist);
            this.p.translate(pos.x, pos.y);
            this.p.rotate(this.rotation);
            this.p.strokeWeight(4 / this.maxWidth * this.width);
            this.p.stroke(this.hue, 100, 100);
            this.p.fill(this.hue, 100, 100, 0.1);
            this.p.rect(0, 0, this.width, this.width);
            this.p.rect(0, 0, this.width / 4 * 3, this.width / 4 * 3);
            this.p.rect(0, 0, this.width / 4 * 2, this.width / 4 * 2);
            this.p.rect(0, 0, this.width / 4 * 1, this.width / 4 * 1);
            this.p.rotate(-this.rotation);
            this.p.translate(-pos.x, -pos.y);
        }
    }
}