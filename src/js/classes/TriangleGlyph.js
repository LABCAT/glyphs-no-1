import AnimatedGlyph from './AnimatedGlyph.js';

export default class TriangleGlyph extends AnimatedGlyph {

    draw() {
        const x1 = 0 - (this.width/2),   
            y1 = 0 + (this.width/2), 
            x2 = 0,
            y2 = 0 - (this.width/2),
            x3 = 0 + (this.width/2), 
            y3 = 0 + (this.width/2),
            currentTime = this.p.millis();
        if(currentTime < this.endTime){
            const scale = this.p.min(1, (currentTime - this.startTime) / (this.endTime - this.startTime)),
                dist = window.p5.Vector.sub(this.destination, this.origin).mult(scale),
                pos = window.p5.Vector.add(this.origin, dist);
            this.p.translate(pos.x, pos.y);
            this.p.rotate(this.rotation);
            this.p.strokeWeight(4);
            this.p.stroke(this.hue, 100, 100);
            this.p.fill(this.hue, 100, 100, 0.25);
            this.p.triangle(x1, y1, x2, y2, x3, y3);
            this.p.rotate(-this.rotation);
            this.p.translate(-pos.x, -pos.y);
        }
    }
}